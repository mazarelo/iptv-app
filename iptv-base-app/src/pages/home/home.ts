import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
//import * as m3u from 'm3u8-reader'
import { PlayListProvider } from '../../providers/playlist/playlist';
import { CountriesPage } from '../countries/countries'
import { ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild(Slides) slides: Slides;
  public countries = []
  public favorites = [];
  public userPlaylists: any = []
  constructor(
    public navCtrl: NavController,
    private playlistProvider: PlayListProvider,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.playlistProvider.list().subscribe(data=>{
      console.log('NG INIT',data)
      this.userPlaylists = data
    })
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

  loadOptions(){
      let actionSheet = this.actionSheetCtrl.create({
        title: '',
        subTitle: '',
        buttons: [
          /*{
            text: 'Hide',
            role: 'destructive',
            handler: () => {
              console.log('Destructive clicked');
            }
          },*/
          {
            text: "Add Playlist",
            icon: 'add',
            handler: () => {
              this.addPlayList()
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

    deletePlaylist(playlist){
      this.playlistProvider.remove(playlist).then(data => {
        this.userPlaylists = this.userPlaylists.filter(el=> el.name !== playlist.name)
      })
    }
   
  ngOnInit(){
    //this.retrieveList()
  }
}



