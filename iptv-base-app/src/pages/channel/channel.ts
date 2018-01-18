import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { VideoProvider } from '../../providers/video/video'
import * as mux from 'mux.js'
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
  ) {
    this.item = this.navParams.get('channel')
    this.list = this.navParams.get('list')
    // this.videoProvider.start(this.item)
  }

  ngOnInit(){}
  
  playItem(item){
    this.item = item
    this.player.src({type: 'application/x-mpegURL', src: item.url})
    this.player.play();
  }

  startPlayer(){
    // ID with which to access the template's video element
    let el = 'stream-video'
    var playerInitTime = Date.now();
    // setup the player via the unique element ID
    this.player = videojs(document.getElementById(el));

    this.player.mux({
      debug: false,
      data: { property_key: '7qih6ockfi09d1p0t07dr5bei'}
    })

    this.player.play()

  }

  ngAfterViewInit() {
    this.startPlayer()
  }

}
