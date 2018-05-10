import { Component, OnInit, ViewChild } from '@angular/core';
import { 
  NavController,NavParams, 
  Slides, ModalController, 
  ActionSheetController,
  Platform, 
} from 'ionic-angular';
// import * as m3u from 'm3u8-reader'
// import { M3u8Provider } from '../../providers/m3u8/m3u8'
import { ChannelsPage } from '../channels/channels';
import { VideoProvider } from '../../providers/video/video';
import { ToasterProvider } from '../../providers/toaster/toaster';
// import { LoadingProvider } from '../../providers/loading/loading';
import { EpgProvider } from '../../providers/epg/epg';
import { SearchPage } from '../search/search';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
  selector: 'page-countries',
  templateUrl: 'countries.html',
})
export class CountriesPage implements OnInit {
  @ViewChild(Slides) slides: Slides;
  public countries = [];
  public favorites = [];
  public userPlaylists: any = [];
  private playlist: any;
  public title = '';
  private activeElement: number = 0;
  // ca-app-pub-1728583878769269~6292872071
  // ca-app-pub-1728583878769269/5801917485
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  //  private m3u8Provider: M3u8Provider,
    private videoProvider: VideoProvider,
    private toasterProvider: ToasterProvider,
  //  private loadingProvider: LoadingProvider,
    private actionSheetCtrl: ActionSheetController,
    private epgProvider: EpgProvider,
    private navController: NavController,
    public modalCtrl: ModalController,
    private admobFree: AdMobFree,
    private platform: Platform,
  ) {
    this.playlist = this.navParams.get('data');
    // get playlist url
    this.getDataFromPlaylist(this.playlist);
    this.platform.ready().then((data) => {
    });
  }

  keyEvents(event) {
    event.preventDefault();
    switch (event.keyCode){
      case 40:
        this.goDownOnList();
        break;
      case 38:
        this.goUpOnList();
        break;
      case 13:
        // pressed enter
        this.goToCountry(this.countries[this.activeElement]);
        break;
      case 27:
      case 8:
        // pressed back btn
        this.navController.pop();
        break;
    }
  }
  
  goUpOnList() {
    if (this.activeElement <= 0) return;
    this.activeElement = this.activeElement - 1;
    console.log('GO UP ON LIST', this.activeElement);
    
    const target: any = document.querySelector('.groups-item-' + this.activeElement);
    if (target) {
      target.focus();
    }
  }

  goDownOnList() {
    if (this.activeElement === this.userPlaylists.length) return;
    this.activeElement = this.activeElement + 1;
    console.log('GO DOWN ON LIST', this.activeElement);
    
    const target: any = document.querySelector('.groups-item-' + this.activeElement);
    if (target) {
      target.focus();
    }
  }

  getFlagUrL(country) {
    return 'assets/imgs/flags/' + country.toLowerCase().replace(' ', '-') + '.jpg';
  }

  goToCountry(country) {
    this.navCtrl.push(ChannelsPage, {
      channels: this.playlist.data[country],
      playlist: this.playlist.name,
      title: country,
    });
  }

  openSearchModal() {
    const searchModal = this.modalCtrl.create(SearchPage, { items: this.countries, type: 'group' });
    searchModal.present();
  }

  getDataFromPlaylist(playlist) {
    this.title = playlist.name;
    if (playlist.data.countries) {
      this.countries = playlist.data.countries;
    }
  }

  /*
  retrieveList(url){
    //let loader = this.loadingProvider.presentLoadingDefault('Generating M3U list')
    this.m3u8Provider.getList(url).subscribe(data =>{
      console.log('retrieve list method: ', data)
      if(data.err){
        this.toasterProvider.presentToast('Couldnt load playlist')
        //loader.dismiss()
      }else{
        this.data = data
        this.countries = data.countries
        //loader.dismiss()
      }
    })

    this.favoritesProvider.list().then(data =>{
      if(data){
        this.favorites = data
      }
    })
  }
  */

  loadOptions(item) {
    const actionSheet = this.actionSheetCtrl.create({
      title: item.name + ' options',
      subTitle: '',
      buttons: [
        {
          text: 'Add EPG',
          icon: 'add',
          handler: () => {
            this.epgProvider.addEpg(item.name).subscribe((data) => {
              if (data) {
                this.toasterProvider.presentToast('EPG added successfully');
              }else {
                this.toasterProvider.presentToast('Failed to add EPG');
              }
            });
          },
        },
        {
          text: 'Clear EPG data',
          icon: 'trash',
          handler: () => {
            this.epgProvider.remove(item.name).then((data) => {
              if (data) {
                this.toasterProvider.presentToast('EPG removed successfully');
              }else {
                this.toasterProvider.presentToast('Failed to remove EPG');
              }
            });
          },
        },
        {
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

  playChannel(item) {
    this.videoProvider.start(item);
  }

  favoritesInCountry(country) {
    return this.favorites.filter(item => item.groupName === country);
  }

  ngOnInit() {}

}



