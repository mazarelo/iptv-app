import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { FavoritesProvider } from '../../providers/favorites/favorites'
import { ToasterProvider } from '../../providers/toaster/toaster'
import { ChannelPage } from '../channel/channel'
import { VideoProvider } from '../../providers/video/video'
/**
 * Generated class for the ChannelsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'channels',
  templateUrl: 'channels.html'
})
export class ChannelsPage {

  public title: string;
  public channels = []
  private data;
  //private options: StreamingVideoOptions

  constructor(
    //private streamingMedia: StreamingMedia,
    public navParams: NavParams,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    private favorites: FavoritesProvider,
    public toastProvider: ToasterProvider,
    private videoProvider: VideoProvider
  ) {
    this.data = this.navParams.get('channels')
    this.title = this.navParams.get('title')
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

  presentActionSheet(index) {
    let item = this.channels[index]
    let actionSheet = this.actionSheetCtrl.create({
      title: item.tvName,
      subTitle: item.tvGroup,
      buttons: [
        /*{
          text: 'Hide',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },*/
        {
          text: "Play",
          icon: 'arrow-dropright-circle',
          handler: ()=>{
            this.playChannel(item)
          }
        },
        {
          text: 'Add to Favorites',
          icon: 'heart-outline',
          handler: () => {
            this.favorites.add(item).subscribe(data=>{
              if(!data) {
                this.toastProvider.presentToast('Could not add to Favorites')
                return false
              }
              this.toastProvider.presentToast('Added to Favorites')
            })
          }
        },
        {
          text: "Hide",
          icon: 'eye-off',
          handler: () =>{
            // Hide object
            this.toastProvider.presentToast('Feature not enabled')
          }
        },
        {
          text: 'Cancel',
          icon: 'cross',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  playChannel(item){
    this.videoProvider.start(item)
   }

  doInfinite(infiniteScroll) {
    let count = this.channels.length
    for (let i = this.channels.length; i < (count+30); i++) {
      if(this.data[i]){
        this.channels.push( this.data[i] );
      }else{
        return infiniteScroll.complete();
      }
    }
    infiniteScroll.complete();
  }

}
