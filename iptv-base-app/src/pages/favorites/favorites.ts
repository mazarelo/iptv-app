import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { FavoritesProvider } from '../../providers/favorites/favorites';
import { ToasterProvider } from '../../providers/toaster/toaster';
import { ChannelPage } from '../channel/channel';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit{
  public channels: any = [];
  private data: any = [];
  
  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    private favorites: FavoritesProvider,
    private toastProvider: ToasterProvider,
  ) {}

  presentActionSheet(index) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Choose',
      buttons: [
        /*{
          text: 'Hide',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },*/
        {
          text: 'Play',
          icon: 'arrow-dropright-circle',
          handler: () => {
            this.playChannel(this.channels[index].url);
          },
        },
        {
          text: 'Remove from Favorites',
          icon: 'heart-outline',
          handler: () => {
            this.favorites.remove(this.channels[index]).subscribe((data) => {
              if (!data) {
                this.toastProvider.presentToast('Could not remove from Favorites');
                return false;
              }
              this.channels = data;
              this.data = data;
              this.toastProvider.presentToast('Removed from Favorites');
            });
          },
        },{
          text: 'Cancel',
          icon: 'cross',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    actionSheet.present();
  }

  initializeItems() {
    this.channels = this.data;
  }

  playChannel(item) {
    this.navCtrl.push(ChannelPage, { channel: item, list: this.data });
  }

  doInfinite(infiniteScroll) {
    this.channels.map((el) => {
      if (el) {
        this.channels.push(el);
      }else {
        return infiniteScroll.complete();
      }
    });

    infiniteScroll.complete();
  }

  doRefresh(refresher) {
    this.favorites.list().then((data) => {
      this.channels = data; 
      this.data = data;
      refresher.complete();
    });
  }

  ngOnInit() {
    this.favorites.list().then((data) => {
      this.channels = data; 
      this.data = data;
    });
  }
}
