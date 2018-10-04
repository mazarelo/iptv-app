import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';
import { StorageProvider } from '../storage/storage';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { FileChooser } from '@ionic-native/file-chooser';
import { M3u8Provider } from '../m3u8/m3u8';
import { LoadingProvider } from '../loading/loading';
import { ToasterProvider } from '../toaster/toaster';

@Injectable()
export class PlayListProvider {
  private playlistPrefix = 'iptv-playlist-';
  constructor(
      private storage: StorageProvider,
      public toastCtrl: ToastController,
      private alertCtrl: AlertController,
      private fileChooser: FileChooser,
      private androidPermissions: AndroidPermissions,
      private m3u8Provider: M3u8Provider,
      private loadingProvider: LoadingProvider,
      private toasterProvider: ToasterProvider,
  ) {}

  async add() {
    return new Promise((resolve, reject) => {
      this.presentPlaylistDataPrompt().then((data) => {
        console.log('subscribe returning to add()', data);
        resolve(data);
      });
    });
  }

  current() {
    return this.storage.get('playlist-url');
  }

  get(name) {
    return this.storage.get('playlist-' + name);
  }

  async list() {
    const playList: any = await this.storage.listAll().catch((err) => {
      return { error: true, message: err }; 
    });
      
    if (!playList) return { err: true, message: 'no playlist' };
    const playlists: any = [];
    const playlistArr = playList.filter(el => el.indexOf(this.playlistPrefix) > -1);
    playlistArr.map(async (el, index) => {
      if (el.indexOf(this.playlistPrefix) > -1) {
        const item = await this.storage.get(el);
        playlists.push(JSON.parse(item));
      }
    });
    return playlists;
  }

  use() {}

  presentPlaylistDataPrompt() {
    return new Promise((resolve, reject) => {
      const alert = this.alertCtrl.create({
        title: 'New Playlist',
        inputs: [
          {
            name: 'playlist',
            placeholder: 'name',
          },
          {
            name: 'url',
            placeholder: 'url',
          },
        ],
        buttons: [
          /*{
            text: 'Import File',
            handler: data => {
              this.uploadFile().then(data=>{
                console.log("RETURNED DATA FROM FILE", data)
              })
              console.log('file clicked');
            }
          },*/
          {
            text: 'Cancel',
            role: 'cancel',
            handler: (data) => {
              console.log('Cancel clicked');
              resolve({ err: true, message: 'canceled' });
            },
          },
          {
            text: 'Save',
            handler: (data) => {
              this.savePlaylistHandler(data).then(data => resolve(data));
            },
          },
        ],
      });
      alert.present();
    });
  }

  savePlaylistHandler(data) {
    return new Promise(async (resolve, reject) => {
      const loader = this.loadingProvider.presentLoadingDefault('Generating M3U list');

      if (data.playlist.length > 0 && data.url.length > 0) {
        const newPlaylist = { 
          name: data.playlist,
          url: data.url, 
          order: 0, 
          type: null, 
          data: null, 
        };
        newPlaylist.data = await this.retrieveList(data.url).catch(
          err => console.log('Err getting playlist',err),
        );

        await this.storage.set(this.playlistPrefix + data.playlist, newPlaylist);

        loader.dismiss();
        resolve(newPlaylist);
      } else {
        console.log('Invalid data', data);
        if (loader) loader.dismiss();
        reject(false);
      }
    });
  }

  async retrieveList(url) {
    const playlist: any = await this.m3u8Provider.getList(url);// .subscribe(data =>{

    if (playlist.err) {
      this.toasterProvider.presentToast('Couldnt load playlist');
      return null;
    }
    this.toasterProvider.presentToast('Playlist saved');
    return playlist;
    /*
        this.favoritesProvider.list().then(data =>{
          if(data){
            this.favorites = data
          }
        })
    */
  }

  async remove(playlist) {
    console.log('Deleting:',playlist);
    await this.storage.remove(this.playlistPrefix + playlist.name);
    return this.storage.remove('url-' + playlist.url);
  }

  uploadFile() {
    return this.androidPermissions.requestPermissions(
      [
        this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
      ])
    .then((result) => {
      this.openFilePicker().then((uri) => {
        console.log('URI FROM FILEPICKER: ',uri);
        this.m3u8Provider.getPlaylistFromFileSystem(uri).then((data) => {
          console.log('DATA FROM BUILD PLAYLIST', data);
        });
      })
      .catch(e => console.log('FILEPICKER ERR: ',e));
      /*
        if(result.hasPermission){
          //this.uploadPlaylistToApp()
          console.log("HAS PERMISSIONS")
          this.openFilePicker().then(uri => {
            console.log('URI FROM FILEPICKER: ',uri)
            this.m3u8Provider.getPlaylistFromFileSystem(uri).then(data=>{
              console.log('DATA FROM BUILD PLAYLIST', data)
            })
          })
          .catch(e => console.log('FILEPICKER ERR: ',e));

        }else{
          console.log('Before request permission')
          this.androidPermissions.requestPermission( 
            this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE 
          ).then(res =>{
            console.log('SO...permission?', res)
            if(res.hasPermission){
              // this.uploadPlaylistToApp()
              this.openFilePicker().then(uri => {
                console.log('URI FROM FILEPICKER: ',uri)
                this.m3u8Provider.getPlaylistFromFileSystem(uri).then(data=>{
                  console.log('DATA FROM BUILD PLAYLIST', data)
                })
              })
              .catch(e => console.log('FILEPICKER ERR: ',e));
            }
          })
        }
      },
      (err) => this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
      )
      */
    });

  }

  openFilePicker() {
    return this.fileChooser.open();
  }
}
