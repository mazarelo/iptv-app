import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToasterProvider } from '../../providers/toaster/toaster';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public settings = {
    offlineUse: false,
  };

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public toastProvider: ToasterProvider,
    private localNotifications: LocalNotifications,
  ) {}

  async refreshPlaylist() {
    await this.storage.remove('playlist').catch((err) => {
      this.toastProvider.presentToast('Error refreshing playlist');
    });
    this.toastProvider.presentToast('Playlist refreshed');
  }

  /*
  uploadPlaylist(){
    this.getPlayList()
  }

  getPlayList(){
    this.m3u8Provider.getList('').subscribe(data =>{
      if(data.err){
       this.m3u8Provider.askPlaylistUrlOrFile().subscribe(data =>{
          console.log('Returned to GetPlayList()',data)
        })
      }
    })
  }
  */
  /*
  uploadPlaylistToApp(){
    this.fileChooser.open().then(url => {
      console.log("URL FILE", url)
      
      this.m3u8Provider.buildPlaylist(url).subscribe(data=>{
        if(data){
          this.toastProvider.presentToast('New Playlist Added')
        }else{
          this.toastProvider.presentToast('Error adding playlist')
        }
      })
    }).catch(e => console.log(e));
  }
  */

  async cleanFavorites() {
    await this.storage.remove('favorites').catch((err) => {
      this.toastProvider.presentToast('Error removing Favorites');
    });
    this.toastProvider.presentToast('Favorites removed');
  }
  
  async wipeAllData() {
    await this.storage.clear();
    await this.cleanAllAlarms();
    this.toastProvider.presentToast('All Data wiped');
  }

  async cleanAllAlarms() {
    await this.localNotifications.cancelAll().catch(err => console.log('ERR', err));
    await this.localNotifications.clearAll().catch((err) => {
      console.log('ERR', err);
    });
  }

  async cleanPlaylists() {
    const storageKeys = await this.storage.keys();
    storageKeys.map((item) => {
      if (item.indexOf('iptv-playlist-')) {
        this.storage.remove('playlist');
      }
    });
    this.toastProvider.presentToast('Playlists removed');
  }

}
