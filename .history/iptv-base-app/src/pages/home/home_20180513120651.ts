import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ActionSheetController, AlertController } from 'ionic-angular';
// import * as m3u from 'm3u8-reader'
import { PlayListProvider } from '../../providers/playlist/playlist';
import { CountriesPage } from '../countries/countries';
// import { EpgProvider } from '../../providers/epg/epg';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  
  private activeElement = 0;
  private allowKeyArrows = true;
  public countries = [];
  public favorites = [];
  public userPlaylists: any = [];
  public editMode: boolean = false;
  constructor(
    public navController: NavController,
    private playlistProvider: PlayListProvider,
    private actionSheetCtrl: ActionSheetController,
    // private epgProvider: EpgProvider,
    private alertCtrl: AlertController,
  ) {
    this.getPlaylist();
    /* detect orientation changes
      this.screenOrientation.onChange().subscribe(() => {
          console.log("Orientation Changed");
          this.slides.update()
      });
    */
  }

  async getPlaylist() {
    this.userPlaylists = await this.playlistProvider.list();
  }

  keyEvents(event) {
    if (this.allowKeyArrows) {
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
          if (this.activeElement !== this.userPlaylists.length) {
            this.goToPlaylist(this.userPlaylists[this.activeElement]);
          }else {
            this.addPlayList();
          }
          break;
        case 27:
        case 8:
          // pressed back btn
          this.navController.pop();
          break;
      }
    }
  }
  
  goUpOnList() {
    if (this.activeElement === 0) return;
    this.activeElement = this.activeElement - 1;
    
    const target: any = document.querySelector('.home-item-' + this.activeElement);
    if (target) {
      target.focus();
    }
  }

  goDownOnList() {
    if (this.activeElement === this.userPlaylists.length - 1) return;
    this.activeElement = this.activeElement + 1;
    
    const target: any = document.querySelector('.home-item-' + this.activeElement);
    if (target) {
      target.focus();
    }
  }

  async retrievePlaylists() {
    const playlists: any = await this.playlistProvider.list();
    if (!playlists.err) {
      this.userPlaylists = playlists;
    }
  }
  
  goToPlaylist(item) {
    if (!this.editMode) {
      this.navController.push(CountriesPage, {
        data: item,
      });
    }else {
      this.promptDeleteConfirmation(item);
    }
  }

  async addPlayList() {
    this.allowKeyArrows = false;
    const playlist: any = await this.playlistProvider.add();
    if (!playlist.err) {
      this.userPlaylists.push(playlist);
    }
    this.allowKeyArrows = true;
    /*
    this.m3u8Provider.askPlaylistUrlOrFile().subscribe(data=>{
      console.log("data", data)
    })
    */
  }

  promptDeleteConfirmation(playlist) {
    const alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete "' + playlist.name + '" playlist?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this.editMode = false;
            this.deletePlaylist(playlist);
          },
        },
      ],
    });
    alert.present();
  }
  loadPlaylistOptions(playlist) {
    const actionSheet = this.actionSheetCtrl.create({
      title: playlist.name + ' options',
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
          text: 'Delete Playlist',
          icon: 'trash',
          handler:() => {
            this.promptDeleteConfirmation(playlist);
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
  loadOptions() {
    const actionSheet = this.actionSheetCtrl.create({
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
          text: 'Add Playlist',
          icon: 'add',
          handler: () => {
            this.addPlayList();
          },
        },
        {
          text: 'Delete Playlist',
          icon: 'trash',
          handler:() => {
            this.editMode = true;
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

  async deletePlaylist(playlist) {
    await this.playlistProvider.remove(playlist);
    this.userPlaylists = this.userPlaylists.filter(el => el.name !== playlist.name);
  }
   
  ngOnInit() {
  }

  ionViewWillLeave() {
  }
  
  ionViewDidLoad() {
  }
 
}



