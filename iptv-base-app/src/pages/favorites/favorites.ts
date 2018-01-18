import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FavoritesProvider } from '../../providers/favorites/favorites'
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { ActionSheetController } from 'ionic-angular';
import { ToasterProvider } from '../../providers/toaster/toaster';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage implements OnInit{
  public channels: any = []
  private data: any = []
  private options: StreamingVideoOptions
  
  constructor(
    public navCtrl: NavController,
    private streamingMedia: StreamingMedia,
    public actionSheetCtrl: ActionSheetController,
    private favorites: FavoritesProvider,
    private toastProvider: ToasterProvider
  ) {

    this.options = {
      successCallback: () => { 
        console.log('Video played')
      },
      errorCallback: (e) => { 
        this.toastProvider.presentToast('Error playing Stream')
      },
      orientation: 'landscape'
    };
  }

  presentActionSheet(index) {
    let actionSheet = this.actionSheetCtrl.create({
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
          text: "Play",
          icon: 'arrow-dropright-circle',
          handler: ()=>{
            this.playChannel(this.channels[index].url)
          }
        },
        {
          text: 'Remove from Favorites',
          icon: 'heart-outline',
          handler: () => {
            this.favorites.remove(this.channels[index]).subscribe(data=>{
              if(!data) {
                this.toastProvider.presentToast('Could not remove from Favorites')
                return false
              }
              this.channels = data
              this.data = data
              this.toastProvider.presentToast('Removed from Favorites')
            })
          }
        },{
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

  initializeItems(){
    this.channels = this.data
  }

  playChannel(videoUrl){
    //this.androidExoPlayer.show({url: videoUrl});
    this.streamingMedia.playVideo(videoUrl, this.options);
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

  doRefresh(refresher) {
    this.favorites.list().then(data => {
      this.channels = data; 
      this.data = data
      refresher.complete();
   })
  }

  ngOnInit(){
    this.favorites.list().then(data => {
      this.channels = data; 
      this.data = data
   })
  }
}
