import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { StorageProvider } from '../storage/storage';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlayListProvider {
    private playlistPrefix = "playlist-"
    constructor(
        private storage: StorageProvider,
        public toastCtrl: ToastController,
        private alertCtrl: AlertController
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

      list(){
        return new Observable( observer =>{
          this.storage.listAll().then(data =>{
              if(!data) return {err: true, message: 'no playlist'}
              let playlists: any = []
              data.map( (el, index) => {
                  if(el.indexOf(this.playlistPrefix) > -1){
                    this.storage.get(el).then(res=>{
                      playlists.push(JSON.parse(res))
                      if(index == data.length - 1){
                        observer.next(playlists)
                      }
                    })
                  }
              })
              
          }, err =>{
              console.log('Error:', err)
              let error: any = {error: true, message: err}
              observer.next(error)
          })
        })
      }

      use(){

      }

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
                  text: 'Cancel',
                  role: 'cancel',
                  handler: data => {
                      console.log('Cancel clicked');
                  }
                },
                {
                text: 'Save',
                handler: data => {
                    if (data.playlist && data.url) {
                      // logged in!
                      let newPlaylist = { name: data.playlist, url: data.url, order: 0 }
                      this.storage.set(this.playlistPrefix + data.playlist, newPlaylist).then(() =>{
                        console.log("Afer storage")
                        observer.next(newPlaylist)
                      }, err=>{
                        console.log('Error Saving:',err)
                      })
                    } else {
                      // invalid data
                      console.log('Invalid data', data)
                      return false;
                    }
                }
                }
            ]
            });
            alert.present();
        })
      }

      remove(name){
        this.storage.remove(this.playlistPrefix + name)
      }
}
