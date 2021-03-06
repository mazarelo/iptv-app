import { NavParams, ActionSheetController, NavController, ModalController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ToasterProvider } from '../../providers/toaster/toaster';
import { ChannelPage } from '../channel/channel';
import { EpgProvider } from '../../providers/epg/epg';
import { SearchPage } from '../search/search';
/**
 * Generated class for the ChannelsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'channels',
  templateUrl: 'channels.html',
})
export class ChannelsPage {
/*
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    event.preventDefault();
    switch(event.keyCode){
      case 40:
        this.goDownOnList()
      break;
      case 38:
        this.goUpOnList()
      break;
      case 13:
        // pressed enter
        this.playChannel(this.channels[this.activeElement])
      break;
      case 27:
      case 8:
        // pressed back btn
        this.navController.pop()
      break;
    }
  }
*/
  private activeElement: number = 0;
  public title: string;
  public channels = [];
  private data;
  public amount = 30;
  // private options: StreamingVideoOptions

  constructor(
    // private streamingMedia: StreamingMedia,
    public navParams: NavParams,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public toastProvider: ToasterProvider,
    private epgProvider: EpgProvider,
    public modalCtrl: ModalController,
  ) {
    this.data = this.navParams.get('channels');
    this.title = this.navParams.get('title');
    this.channels = this.data;
    this.getCountryEpgList();
  }

  goUpOnList() {
    if (this.activeElement === 0) return;
    this.activeElement = this.activeElement - 1;
    const target: any = document.querySelector('.item-' + this.activeElement);
    target.focus();
  }

  goDownOnList() {
    if (this.activeElement === this.channels.length + 1) return;
    this.activeElement = this.activeElement + 1;
    const target: any = document.querySelector('.item-' + this.activeElement);
    target.focus();
  }

  openSearchModal() {
    const searchModal = this.modalCtrl.create(SearchPage, { items: this.channels, type: 'item' });
    searchModal.present();
  }
  
  focusFirstElement() {
    const target: any = document.querySelector('.item-0');
    target.focus();
  }

  playChannel(item) {
    this.navCtrl.push(ChannelPage, { channel: item, list: this.data });
  }

  getCountryEpgList() {
    this.epgProvider.getCountryEPG(this.title).subscribe((data) => {
      if (data) {
        const epgList: any = data;
        this.data.map((el, index) => {
          const channelEpg = epgList.channel.filter(epg => epg._id === el.id);
          
          if (channelEpg) {
            const programme = epgList.programme.filter(
              prog => prog._channel === el.id && this.epgProvider.isEpdDateValid(prog),
            );
            this.data[index].epg = programme;
          }
        });
      }else {
        this.toastProvider.presentToast('Error fetching EPG list');
      }
    });
  }

  doInfinite(infiniteScroll) {
    this.amount = this.amount + 30;
    infiniteScroll.complete();
  }

  goToSearch() {
    this.navCtrl.push(SearchPage, { channels: this.data });
  }

}
