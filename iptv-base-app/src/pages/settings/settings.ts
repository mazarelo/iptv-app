import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToasterProvider } from '../../providers/toaster/toaster';
import { FileChooser } from '@ionic-native/file-chooser';
import { M3u8Provider } from '../../providers/m3u8/m3u8'
import { AndroidPermissions } from '@ionic-native/android-permissions';

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
    private androidPermissions: AndroidPermissions
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
    //this.uploadPlaylistToApp()
    /*
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
      result => {
        console.log('Has permission?',result)
        if(result.hasPermission){
          
        }else{
          console.log('Before request permission')
          this.androidPermissions.requestPermission( this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE ).then(res =>{
            console.log('SO...permission?', res)
            if(res.hasPermission){
              this.uploadPlaylistToApp()
            }
          })
        }
      },
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
    );*/
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

  cleanPlaylist(){
    this.storage.remove('playlist').then(data=>{
      this.toastProvider.presentToast('Playlist removed')
    }).catch(err=>{
      this.toastProvider.presentToast('error removing Playlist')
    })
  }

}
