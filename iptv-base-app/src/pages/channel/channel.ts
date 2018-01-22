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
    // this.videoProvider.start(this.item)
  }

  ngOnInit(){}

  playItem(item){
    /*
    this.item = item
    this.player.src('')
    this.player.src({type: 'application/x-mpegURL', src: item.url})
    this.player.play();
    */
  }

  startPlayer(){
    this.plt.ready().then(data=>{
      if (this.plt.is('ios')) {
        this.startVideoJsPlayer()
      }else if (this.plt.is('android')){
        this.videoProvider.startExoplayer(this.item)
      }else{
        this.startVideoJsPlayer()
      }
    })
  }

  startVideoJsPlayer(){
    let self = this
    // ID with which to access the template's video element
    let el = 'stream-video'
    var playerInitTime = Date.now();
    // setup the player via the unique element ID
    // html5 for html hls
    this.player = videojs(document.getElementById(el), {
      html5: {
        nativeAudioTracks: false,
        nativeVideoTracks: false,
        hls: {
          withCredentials: false,
          overrideNative: true,
        }
      }
    });
    this.player.ready(function() {
      this.src({
        src: 'http://clientportal.link:8080/live/C0HCVMO3025/JcFT4I6502/3227.m3u8',
        type: 'application/x-mpegURL',
      });
    });
  }

  ngAfterViewInit() {
    this.startPlayer()
  }

}
