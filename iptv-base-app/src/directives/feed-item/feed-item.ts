import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { NavController, ActionSheetController, ModalController } from 'ionic-angular';
import { FavoritesProvider } from '../../providers/favorites/favorites'
import { ToasterProvider } from '../../providers/toaster/toaster'
import { EpgModalPage } from '../../pages/epg/epg'

@Component({
    selector: 'feed-item',
    templateUrl: './feed-item.html'
})
export class FeedItemComponent implements OnInit, OnDestroy {
    @Input() obj: any;
    @Input() index: number;
    @Output() goToPlayChannel = new EventEmitter();
    channel
    private current = new Date().getTime()
    constructor(
      public navCtrl: NavController,
      public actionSheetCtrl: ActionSheetController,
      private favorites: FavoritesProvider,
      public toastProvider: ToasterProvider,
      public modalCtrl: ModalController,

    ) {}

  playChannel(item){
    this.goToPlayChannel.emit(this.channel);
  }

  getCurrentEPGTimeBar(programme){
      let stop = new Date(programme._stop).getTime()
      let start = new Date(programme._start).getTime()
      let output = Math.floor(( (this.current - start) * 100 / (stop - start) ))

      return output >= 100 || output <=0 ? "0%" : output.toString() + "%"
  }

  itemOptions(index) {
    let item = this.channel
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
          text: 'Programme list',
          icon: 'list-box',
          handler: ()=>{
            if(item.epg.length > 0){
              this.presentEpgModal(item)
            }else{
              this.toastProvider.presentToast('No EPG available')
            }
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

    presentEpgModal(item) {
      let profileModal = this.modalCtrl.create(EpgModalPage, { item });
      profileModal.present();
    }


    ngOnInit() {
      this.channel = this.obj
      console.log('FROM ITEM',this.channel, this.index)
    }

    ngOnDestroy() {
    }
}