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
// declare let Hls: any;

@Component({
  selector: 'channel',
  templateUrl: 'channel.html'
})
export class ChannelPage implements OnInit {
  item
  player
  list
  current = new Date().getTime()
  amount = 30
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
    this.item = this.navParams.get('channel')
    this.list = this.navParams.get('list')
    
    this.platform.ready().then(data=>{
      this.statusBar.hide()
      this.insomnia.keepAwake().then( () => console.log('success'), () => console.log('error'));
      //this.activateOrientationDetection()
    })
  }

  ngOnInit(){}

  activateOrientationDetection(){
    // Detect orientation changes
    this.screenOrientation.onChange().subscribe(
      (data) => {
        if(this.screenOrientation.type.indexOf('landscape') > -1){
          // Not working
          this.player.enterFullWindow()
          this.player.height( '100%' )
        }else{
          // Not working
          this.player.exitFullWindow()
          this.player.height( '200px' )
        }
      }
    );
  }
  
  registerPlayerButtons(){
    var Button = videojs.getComponent('Button');
    var MyButton = videojs.extend(Button, {
      constructor: function() {
        Button.apply(this, arguments);
        /* initialize your button */
      },
      handleClick: function() {
        /* do something on click */
      },
      buildCSSClass: function() {
        return "vjs-icon-next-item vjs-control vjs-button";
      }
    });
    videojs.registerComponent('MyButton', MyButton);
  }

  playItem(item){
    this.item = item
    this.player.pause();
    this.player.src('');
    this.player.src({
      src: this.item.url,
      type: this.getFileExtention(this.item.url),
    })
    this.player.play();
  }

    playVideoJsHLS(){
      // https://github.com/streamroot/videojs5-hlsjs-source-handler
      var self = this;
      var options = {
        fluid: true,
        html5: {
          hlsjsConfig: {
            debug: false
          }
        },
        nativeControlsForTouch: false
      };

      try{
        this.player = videojs('stream-video', options);
        this.player.qualityPickerPlugin();
        //this.player.requestFullscreen();
        
        this.player.ready(function(){
          this.src({
            src: self.item.url,
            type: self.getFileExtention(self.item.url),
          })
          this.play()
        })
      }catch(err){
        console.log("ERR VIDEOJS", err)
        this.navController.pop()
      }

      // VIDEOJS Error handling
      this.player.on('error', (e)=> {
        console.log("VIDEOJS ERROR:", e)
        this.navController.pop()
      })
    }

    getFileExtention(url){
      const extension = url.split('.').pop();
      switch(extension){
        case 'mkv':
          this.toggleProgressAndTimeBar()
          return 'video/webm';
          break;
        case 'mp4':
          this.toggleProgressAndTimeBar()
          return 'video/mp4';
          break;
        case 'ogg':
          this.toggleProgressAndTimeBar()
          return 'video/ogg';
          break;
        default:
         return"application/x-mpegURL";
      }
    }
    
    toggleProgressAndTimeBar(){
      this.showProgressAndTime = true;
    }

  ionViewWillLeave(){
    this.player.dispose()
    if(!this.statusBar.isVisible){
      this.statusBar.show()
    }
    this.insomnia.allowSleepAgain().then(() => console.log('success'), () => console.log('error'));
  }

  ngAfterViewInit() {
    this.platform.ready().then(data=>{
      this.playVideoJsHLS()
    // this.videoProvider.playVideoJsHLS(this.item)
    })
  }

  doInfinite(infiniteScroll) {
    this.amount = this.amount + 30
    infiniteScroll.complete();
  }
}
