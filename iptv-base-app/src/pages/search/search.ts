import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { ChannelPage } from '../channel/channel'
/**
 * Generated class for the ChannelsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search',
  templateUrl: 'search.html'
})
export class SearchPage {
  public title: string;
  public channels = []
  private data;
  private current = new Date().getTime()
  //private options: StreamingVideoOptions

  constructor(
    //private streamingMedia: StreamingMedia,
    public navParams: NavParams,
    public navCtrl: NavController,
  ) {
    this.data = this.navParams.get('channels')
    this.channels = this.data.slice(0,30)
  }

  initializeItems(){
    this.channels = this.data
  }

  onInput(ev) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the ev target
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.channels = this.channels.filter((item) => {
        return (item.tvName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getCurrentEPGTimeBar(programme){
    let stop = new Date(programme._stop).getTime()
    let start = new Date(programme._start).getTime()

    let output = Math.floor(( (this.current - start) * 100 / (stop - start) )).toString() + "%"
    return output
  }

  playChannel(item){
    // Push a new View
    this.navCtrl.push( ChannelPage, {channel: item, list: this.data} )
    //this.videoProvider.start(item)
   }
}
