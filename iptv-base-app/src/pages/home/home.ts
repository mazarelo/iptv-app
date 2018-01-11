import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
//import * as m3u from 'm3u8-reader'
import { M3u8Provider } from '../../providers/m3u8/m3u8'
import { ChannelsPage } from '../channels/channels'
import { FavoritesProvider } from '../../providers/favorites/favorites';
import { VideoProvider } from '../../providers/video/video';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { PlayListProvider } from '../../providers/playlist/playlist';
import { CountriesPage } from '../countries/countries'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild(Slides) slides: Slides;
  private data = null;
  public countries = []
  public favorites = [];
  public userPlaylists: any = []
  constructor(
    public navCtrl: NavController,
    private m3u8Provider: M3u8Provider,
    private favoritesProvider: FavoritesProvider,
    private videoProvider: VideoProvider,
    private playlistProvider: PlayListProvider,
    private screenOrientation: ScreenOrientation
  ) {
    /* detect orientation changes
      this.screenOrientation.onChange().subscribe(() => {
          console.log("Orientation Changed");
          this.slides.update()
      });
    */
  }
  
  retrievePlaylists(){
    this.playlistProvider.list().subscribe(response=>{
      let data: any = response
      console.log("Playlist Data", data)
      if(!data.err){
        this.userPlaylists = data
      }
    })
  }
  
  goToPlaylist(item){
    this.navCtrl.push(CountriesPage, {
      data: item,
    });
  }

  addPlayList(){
    this.playlistProvider.add().subscribe(data=>{
      console.log("DATA", data)
      this.userPlaylists.push(data)
    })
    /*
    this.m3u8Provider.askPlaylistUrlOrFile().subscribe(data=>{
      console.log("data", data)
    })
    */
  }

  ngOnInit(){
    //this.retrieveList()
    this.playlistProvider.list().subscribe(data=>{
      console.log('NG INIT',data)
      this.userPlaylists = data
    })
  }
}



