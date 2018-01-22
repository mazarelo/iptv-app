import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToasterProvider } from '../../providers/toaster/toaster';
import { FileChooser } from '@ionic-native/file-chooser';
import { M3u8Provider } from '../../providers/m3u8/m3u8'

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public settings = {
    offlineUse: false,

  }

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public toastProvider: ToasterProvider,
    private fileChooser: FileChooser,
    private m3u8Provider: M3u8Provider,
  ) {}

  refreshPlaylist(){
    this.storage.remove('playlist').then(el=>{
      this.toastProvider.presentToast('Playlist refreshed')
    }).catch(err=>{
      this.toastProvider.presentToast('Error refreshing playlist')
    })
  }

  uploadPlaylist(){
    this.getPlayList()
  }

  getPlayList(){
    this.m3u8Provider.getList('').subscribe(data =>{
      console.log('retrieve list method: ', data)
      if(data.err){
        this.m3u8Provider.askPlaylistUrlOrFile().subscribe(data =>{
          console.log('Returned to GetPlayList()',data)
        })
      }
    })
  }

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

  cleanFavorites(){
    this.storage.remove('favorites').then(data=>{
      this.toastProvider.presentToast('Favorites removed')
    }).catch(err=>{
      this.toastProvider.presentToast('error removing favorites')
    })
  }
  
  wipeAllData(){
    this.storage.clear().then(data=>{
      this.toastProvider.presentToast('All Data wiped')
    })
  }

  cleanPlaylists(){
    this.storage.keys().then(keys=>{
      keys.forEach(item=>{
        if(item.indexOf('iptv-playlist-')){
          this.storage.remove('playlist')
        }
      })
      this.toastProvider.presentToast('Playlists removed')
    })
  }

}
