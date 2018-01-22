import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { StorageProvider } from '../storage/storage';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { FileChooser } from '@ionic-native/file-chooser';
import { M3u8Provider } from '../m3u8/m3u8';
import { LoadingProvider } from '../loading/loading';

@Injectable()
export class PlayListProvider {
  private playlistPrefix = "iptv-playlist-"
  constructor(
      private storage: StorageProvider,
      public toastCtrl: ToastController,
      private alertCtrl: AlertController,
      private fileChooser: FileChooser,
      private androidPermissions: AndroidPermissions,
      private m3uProvider: M3u8Provider,
      private loadingProvider: LoadingProvider,
  ) {}

  add(){
    return new Observable(observer =>{
      this.presentPlaylistDataPrompt().subscribe(data=>{
        console.log("subscribe returning to add()", data)
        observer.next(data)
      })
    })
  }

  current(){
    return this.storage.get('playlist-url')
  }

  get(name){
    return this.storage.get('playlist-'+ name)
  }

  list(){
    return new Observable( observer =>{
      this.storage.listAll().then(data =>{
          if(!data) return {err: true, message: 'no playlist'}
          let playlists: any = []
          let playlistArr = data.filter(el => el.indexOf(this.playlistPrefix) > -1)
          playlistArr.map( (el, index) => {
              if(el.indexOf(this.playlistPrefix) > -1){
                this.storage.get(el).then(res=>{
                  playlists.push(JSON.parse(res))
                })
              }
          })
          observer.next(playlists)
      }, err =>{
          console.log('Error:', err)
          let error: any = {error: true, message: err}
          observer.next(error)
      })
    })
  }

  use(){}

  presentPlaylistDataPrompt() {
      return new Observable((observer)=>{
        let alert = this.alertCtrl.create({
        title: 'New Playlist',
        inputs: [
            {
              name: 'playlist',
              placeholder: 'name'
            },
            {
                name: 'url',
                placeholder: 'url'
            }
        ],
        buttons: [
          {
            text: 'Import File',
            handler: data => {
              this.uploadFile().then(data=>{
                console.log("RETURNED DATA FROM FILE", data)
              })
              console.log('file clicked');
            }
          },
          {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                  console.log('Cancel clicked');
              }
            },
            {
            text: 'Save',
            handler: data => {
                let loader = this.loadingProvider.presentLoadingDefault('Generating M3U list')
                if (data.playlist.length > 0 && data.url.length > 0) {
                  let newPlaylist = { name: data.playlist, url: data.url, order: 0 }
                  this.storage.set(this.playlistPrefix + data.playlist, newPlaylist).then(() =>{
                    observer.next(newPlaylist)
                    loader.dismiss()
                  }, err=>{
                    console.log('Error Saving:',err)
                    loader.dismiss()
                  })
                } else {
                  // invalid data
                  console.log('Invalid data', data)
                  loader.dismiss()
                  return false;
                }
              }
            }
        ]
        });
        alert.present();
    })
  }

  remove(playlist){
    console.log('Deleting:',playlist)
      return this.storage.remove(this.playlistPrefix + playlist.name).then(()=>{
        return this.storage.remove('url-'+playlist.url)
      })
  }

  uploadFile(){
    return this.androidPermissions.requestPermissions(
      [
        this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      ])
    .then(result => {
      this.openFilePicker().then(uri => {
        console.log('URI FROM FILEPICKER: ',uri)
        this.m3uProvider.getPlaylistFromFileSystem(uri).then(data=>{
          console.log('DATA FROM BUILD PLAYLIST', data)
        })
      })
      .catch(e => console.log('FILEPICKER ERR: ',e));
      /*
        if(result.hasPermission){
          //this.uploadPlaylistToApp()
          console.log("HAS PERMISSIONS")
          this.openFilePicker().then(uri => {
            console.log('URI FROM FILEPICKER: ',uri)
            this.m3uProvider.getPlaylistFromFileSystem(uri).then(data=>{
              console.log('DATA FROM BUILD PLAYLIST', data)
            })
          })
          .catch(e => console.log('FILEPICKER ERR: ',e));

        }else{
          console.log('Before request permission')
          this.androidPermissions.requestPermission( this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE ).then(res =>{
            console.log('SO...permission?', res)
            if(res.hasPermission){
              // this.uploadPlaylistToApp()
              this.openFilePicker().then(uri => {
                console.log('URI FROM FILEPICKER: ',uri)
                this.m3uProvider.getPlaylistFromFileSystem(uri).then(data=>{
                  console.log('DATA FROM BUILD PLAYLIST', data)
                })
              })
              .catch(e => console.log('FILEPICKER ERR: ',e));
            }
          })
        }
      },
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      */
    });
    
  }

  openFilePicker(){
    return this.fileChooser.open()
  }
}
