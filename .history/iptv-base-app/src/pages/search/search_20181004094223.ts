import { Component } from '@angular/core';
import { NavParams, NavController, ViewController } from 'ionic-angular';
import { ChannelPage } from '../channel/channel';
/**
 * Generated class for the ChannelsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search',
  templateUrl: 'search.html',
})
export class SearchPage {
  public title: string;
  public items = [];
  private type: string;
  private data;
  public searchText: string;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
  ) {
    this.data = this.navParams.get('items');
    this.type = this.navParams.get('type');
    this.items = this.data.slice(0,30);
  }

  initializeItems() {
    this.items = this.data;
  }

  onInput(ev) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the ev target
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.items = this.items.filter((item) => {
        return (item.tvName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  playChannel(data) {
    // Push a new View
    switch (this.type){
      case 'item':
        this.navCtrl.push(ChannelPage, { channel: data, list: this.data });
        break;
    }
  }
}
