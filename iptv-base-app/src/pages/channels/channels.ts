import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { FavoritesProvider } from '../../providers/favorites/favorites'
import { ToasterProvider } from '../../providers/toaster/toaster'
import { VideoProvider } from '../../providers/video/video'
import { ChannelPage } from '../channel/channel'
import { EpgProvider } from '../../providers/epg/epg';
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
  private current = new Date().getTime()
  //private options: StreamingVideoOptions

  constructor(
    //private streamingMedia: StreamingMedia,
    public navParams: NavParams,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    private favorites: FavoritesProvider,
    public toastProvider: ToasterProvider,
    private videoProvider: VideoProvider,
    private epgProvider: EpgProvider
  ) {
    this.data = this.navParams.get('channels')
    this.title = this.navParams.get('title')
    this.channels = this.data.slice(0,30)
    this.getCountryEpgList()
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

  groupOptions(){
     let actionSheet = this.actionSheetCtrl.create({
      title: 'Group options',
      subTitle: '',
      buttons: [
        {
          text: 'Add EPG',
          icon: 'add',
          handler: () =>{
            this.epgProvider.promptForEPGFileUrl(this.title).subscribe(data=>{
              this.getCountryEpgList()
            })
          }
        },{
          text: "Clear EPG",
          icon: 'trash',
          handler: ()=>{
            this.epgProvider.remove(this.title).then((data) => {
              // Remove EPG from list
              this.channels.map(el=>{
                delete el.epg
              })
            })
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
     actionSheet.present()
  }

  itemOptions(index) {
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
        /*
        {
          text: "Hide",
          icon: 'eye-off',
          handler: () =>{
            // Hide object
            this.toastProvider.presentToast('Feature not enabled')
          }
        },
        */
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
    // Push a new View
    this.navCtrl.push( ChannelPage, {channel: item, list: this.data} )
    //this.videoProvider.start(item)
   }

  getCountryEpgList(){
    this.epgProvider.getCountryEPG(this.title).subscribe(data=>{
      if(data){
        let epgList: any = data
        this.data.map((el, index)=>{
          let channelEpg = epgList.channel.filter(epg => epg._id == el.id )
          
          if(channelEpg){
            let programme = epgList.programme.filter( prog => prog._channel == el.id && this.epgProvider.isEpdDateValid(prog) )
            this.data[index].epg = programme
          }
        })
        console.log('CHANNELS:', this.channels)
      }else{
        this.toastProvider.presentToast('Error fetching EPG list')
      }
    })
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
