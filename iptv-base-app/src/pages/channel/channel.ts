import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
// import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { StatusBar } from '@ionic-native/status-bar';
import { Insomnia } from '@ionic-native/insomnia';

/**
 * Generated class for the ChannelComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
declare let videojs: any;
declare let Hls: any;
// declare let Hls: any;

@Component({
  selector: 'channel',
  templateUrl: 'channel.html',
})
export class ChannelPage implements OnInit {
  item;
  player;
  list;
  current = new Date().getTime();
  amount = 30;
  showProgressAndTime = false;

  constructor(
    public navParams: NavParams,
    public plt: Platform,
    private screenOrientation: ScreenOrientation,
   // private alertController: AlertController,
    private navController: NavController,
    private statusBar: StatusBar,
    private platform: Platform,
    private insomnia: Insomnia,
  ) {
    this.item = this.navParams.get('channel');
    this.list = this.navParams.get('list');
    
    this.platform.ready().then((data) => {
      this.statusBar.hide();
      this.insomnia.keepAwake();
      // this.activateOrientationDetection()
    });
  }

  ngOnInit() {}

  activateOrientationDetection() {
    // Detect orientation changes
    this.screenOrientation.onChange().subscribe(
      (data) => {
        if (this.screenOrientation.type.indexOf('landscape') > -1) {
          // Not working
          this.player.enterFullWindow();
          this.player.height('100%');
        }else {
          // Not working
          this.player.exitFullWindow();
          this.player.height('200px');
        }
      },
    );
  }
  
  registerPlayerButtons() {
    const button = videojs.getComponent('Button');
    const myButton = videojs.extend(button, {
      constructor() {
        button.apply(this, arguments);
        /* initialize your button */
      },
      handleClick() {
        /* do something on click */
      },
      buildCSSClass() {
        return 'vjs-icon-next-item vjs-control vjs-button';
      },
    });
    videojs.registerComponent('MyButton', myButton);
  }

  playItem(item) {
    this.item = item;
    this.player.pause();
    this.player.src('');
    this.player.src({
      src: this.item.url,
      type: this.getFileExtention(this.item.url),
    });
    this.player.play();
  }

  playVideoJsHLS() {
      // https://github.com/streamroot/videojs5-hlsjs-source-handler
    const options = {
      fluid: true,
      html5:{
        hls: {
          withCredentials: false,
        },
      },
      chromecast:{
        appId:'ZENA-PLAYER',
        metadata:{
          title: this.item.name,
          subtitle: 'Synopsis display on tech wrapper',
        },
      },
      nativeControlsForTouch: false,
    };

    try {
      this.player = videojs('stream-video', options);
      // this.player.qualityPickerPlugin();
        // this.player.requestFullscreen();
      const self = this;
      this.player.ready(function () {
        this.src({
          src: self.item.url,
          type: self.getFileExtention(self.item.url),
        });
        this.play();
      });
    }catch (err) {
      console.log('ERR VIDEOJS', err);
      this.navController.pop();
    }

      // VIDEOJS Error handling
    this.player.on('error', (e) => {
      console.log('VIDEOJS ERROR:', e);
      this.navController.pop();
    });
  }

  getFileExtention(url) {
    const extension = url.split('.').pop();
    switch (extension){
      case 'mkv':
        this.showProgressAndTimeBar();
        return 'video/webm';
      case 'mp4':
        this.showProgressAndTimeBar();
        return 'video/mp4';
      case 'ogg':
        this.showProgressAndTimeBar();
        return 'video/ogg';
      default:
        this.hideProgressAndTimeBar();
        return'application/x-mpegURL';
    }
  }
    
  showProgressAndTimeBar() {
    this.showProgressAndTime = true;
  }

  hideProgressAndTimeBar() {
    this.showProgressAndTime = false;
  }

  ionViewWillLeave() {
    this.player.dispose();
    if (!this.statusBar.isVisible) {
      this.statusBar.show();
    }
    this.insomnia.allowSleepAgain().then(() => console.log('success'), () => console.log('error'));
  }

  ngAfterViewInit() {
    this.platform.ready().then((data) => {
      this.playVideoJsHLS();
      // this.playNativeHls();
    });
  }

  playNativeHls() {
    const video: any = document.getElementById('stream-video');
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.item.url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    }else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = this.item.url;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }else {
      video.src(this.item.url);
      video.play();
    }
  }

  doInfinite(infiniteScroll) {
    this.amount = this.amount + 30;
    infiniteScroll.complete();
  }

}
