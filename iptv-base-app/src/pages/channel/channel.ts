import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { VideoProvider } from '../../providers/video/video'
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
    this.player.src('')

    this.player.src({type: 'application/x-mpegURL', src: item.url})
    this.player.play();
  }

  startPlayer(){
    let self = this
    // ID with which to access the template's video element
    let el = 'stream-video'
    var playerInitTime = Date.now();
    // setup the player via the unique element ID
    // html5 for html hls
    this.player = videojs(document.getElementById(el));

    this.player.ready(function() {
      this.src({
        src: self.item.url,
        type: 'application/x-mpegURL',
      });
    });

  }

  ngAfterViewInit() {
    this.startPlayer()
  }

}
