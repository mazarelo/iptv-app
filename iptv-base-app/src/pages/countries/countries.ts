import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController,NavParams , Slides } from 'ionic-angular';
//import * as m3u from 'm3u8-reader'
import { M3u8Provider } from '../../providers/m3u8/m3u8'
import { ChannelsPage } from '../channels/channels'
import { FavoritesProvider } from '../../providers/favorites/favorites';
import { VideoProvider } from '../../providers/video/video';
import {ToasterProvider} from '../../providers/toaster/toaster'

@Component({
  selector: 'page-countries',
  templateUrl: 'countries.html'
})
export class CountriesPage implements OnInit {
  @ViewChild(Slides) slides: Slides;
  private data = null;
  public countries = []
  public favorites = [];
  public userPlaylists: any = []
  private playlist: any;
  public title = ''
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private m3u8Provider: M3u8Provider,
    private favoritesProvider: FavoritesProvider,
    private videoProvider: VideoProvider,
    private toasterProvider: ToasterProvider
  ) {
    this.playlist = this.navParams.get('data')
    this.title = this.playlist.name
    // get playlist url
    this.retrieveList(this.playlist.url)
  }

  getFlagUrL(country){
    return 'assets/imgs/flags/'+ country.toLowerCase().replace(' ', '-') +'.jpg'
  }

  goToCountry(country){
    this.navCtrl.push(ChannelsPage, {
      channels: this.data[country],
      title: country
    });
  }
  
  retrieveList(url){
    this.m3u8Provider.getList(url).subscribe(data =>{
      console.log('retrieve list method: ', data)
      if(data.err){
        this.toasterProvider.presentToast('Couldnt load playlist')
      }else{
        this.data = data
        this.countries = data.countries
      }
    })

    this.favoritesProvider.list().then(data =>{
      if(data){
        this.favorites = data
      }
    })
  }
  
  playChannel(item){
    this.videoProvider.start(item)
  }

  favoritesInCountry(country){
    return this.favorites.filter(item => item.groupName == country)
  }

  ngOnInit(){
  }
}



