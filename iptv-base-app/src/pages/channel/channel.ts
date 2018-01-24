import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { VideoProvider } from '../../providers/video/video'
import { Platform } from 'ionic-angular/platform/platform';
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
  constructor(
    private videoProvider: VideoProvider,
    public navParams: NavParams,
    public plt: Platform
  ) {
    this.item = this.navParams.get('channel')
    this.list = this.navParams.get('list')
  }

  ngOnInit(){}

  playItem(item){
    this.item = item
    this.playVideoJsHLS()
    // this.videoProvider.playVideoJsHLS(this.item)
  }

    playVideoJsHLS(){
      // https://github.com/streamroot/videojs5-hlsjs-source-handler
      var self = this
      var options = {
        html5: {
          hlsjsConfig: {
            debug: true
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
      })
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

  ngAfterViewInit() {
    this.playVideoJsHLS()
    // this.videoProvider.playVideoJsHLS(this.item)
  }

}
