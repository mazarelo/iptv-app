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
    this.videoProvider.playVideoJsHLS(this.item)
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
    //this.startPlayer()
    this.videoProvider.playVideoJsHLS(this.item)
  }

}
