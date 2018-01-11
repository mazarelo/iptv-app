import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { VideoProvider } from '../../providers/video/video'
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
  constructor(
    private videoProvider: VideoProvider,
    public navParams: NavParams,
  ) {
    this.item = this.navParams.get('item')
    this.videoProvider.start(this.item)
  }

  ngOnInit(){}

}
