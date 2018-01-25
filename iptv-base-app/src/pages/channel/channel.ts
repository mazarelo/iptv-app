import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { VideoProvider } from '../../providers/video/video'
import { Platform } from 'ionic-angular/platform/platform';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
/**
 * Generated class for the ChannelComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
declare let videojs: any;
declare let Hls: any;

@Component({
  selector: 'channel',
  templateUrl: 'channel.html'
})
export class ChannelPage implements OnInit {
  item
  player
  list
  current = new Date().getTime()
  constructor(
    private videoProvider: VideoProvider,
    public navParams: NavParams,
    public plt: Platform,
    private screenOrientation: ScreenOrientation
  ) {
    this.item = this.navParams.get('channel')
    this.list = this.navParams.get('list')
    this.activateOrientationDetection()
  }

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

  ngOnInit(){}
  
  playItem(item){
    this.item = item
    this.player.pause();
    this.player.src('');
    this.player.src({
      src: this.item.url,
      type: "application/x-mpegURL",
    })
    this.player.play();
  }

    playVideoJsHLS(){
      // https://github.com/streamroot/videojs5-hlsjs-source-handler
      var self = this
      var options = {
        html5: {
          hlsjsConfig: {
            debug: false
          }
        }
      };

      this.player = videojs('stream-video', options);
      this.player.qualityPickerPlugin();
      this.player.ready(function(){
        this.src({
          src: self.item.url,
          type: "application/x-mpegURL",
        })
        this.play()
      })
    }

  getCurrentEPGTimeBar(programme){
    let stop = new Date(programme._stop).getTime()
    let start = new Date(programme._start).getTime()

    let output = Math.floor(( (this.current - start) * 100 / (stop - start) )).toString() + "%"
    return output
  }

  startPlayer(){
    this.plt.ready().then(data=>{
      if (this.plt.is('ios')) {
         this.videoProvider.playVideoJsHLS(this.item)
      }else if (this.plt.is('android')){
        this.videoProvider.startExoplayer(this.item)
      }else{
         this.videoProvider.playVideoJsHLS(this.item)
      }
    })
  }

  ionViewWillLeave(){
    this.player.dispose()
  }

  ngAfterViewInit() {
    this.playVideoJsHLS()
    // this.videoProvider.playVideoJsHLS(this.item)
  }

}
