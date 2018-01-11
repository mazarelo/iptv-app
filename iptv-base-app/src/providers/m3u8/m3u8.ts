import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { PlayListProvider } from '../playlist/playlist'
import { AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { AlertOptions } from 'ionic-angular/components/alert/alert-options';

/*
  Generated class for the M3u8Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class M3u8Provider {
  public data;
  private playlistUrl = null

  constructor(
    public http: HttpClient,
    private playlistProvider: PlayListProvider,
    private alertCtrl: AlertController,
    private fileProvider: File,
    private androidPermissions: AndroidPermissions,
    private storage: Storage) {
    }

  fetchAndBuildPlayList(url){
    if(!url){
      alert("URL NOT FOUND")
    }
    if(url.indexOf('content://') == -1){
      console.log("HTTP GET", url)
      return this.http.get(url, { responseType: 'text' }).map(data => this.convertM3uToJson(data, url))
    }

    return  new Observable(observer => {
      this.getPlaylistFromFileSystem(url).then(data =>{
        if(data){
         observer.next(this.convertM3uToJson(data, url))
        }else{
          observer.next(false)
        }
      }).catch(err =>{
        console.log("ERRRRR from file read", err)
      })
     })
  }

  getPlaylistFromFileSystem(url){
    let folderPath = url.split('\\').pop().split('/')
    folderPath.pop()
    folderPath = folderPath.join("/")
    let fileName = url.split('\\').pop().split('/').pop();
    console.log("FOLDER:", folderPath, "FILE:", fileName)
    return this.androidPermissions.requestPermissions(
      [
        this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      ])
    .then(res => {
      console.log('SO...permission?', res)
      if(res.hasPermission){
        return this.fileProvider.resolveDirectoryUrl(folderPath).then(val =>{
          return this.fileProvider.getFile(val , fileName,  {create: true, exclusive: false})
        })
      }
    }) 
  }

  // this.storage.get('playlist').then((val) => {})
  getList(url) : any{
    return new Observable(observer => {
      // Checks if there is any formated playlist stored
     this.storage.get('playlist-'+url).then((val) => {
        if(val){
          observer.next(JSON.parse(val)) 
        }else{
          this.buildPlaylist(url).subscribe(data=>{
            if(data){
              observer.next(data)
            }
            observer.next({err: true, message: 'No playlist found'})
          })
        }
      }).catch(err =>{
        console.log("Err getting stored playlist", err)
        observer.next({err: true, message: 'No playlist found'})
      })
    })
  }

  buildPlaylist(url){
    return new Observable(observer => {
      console.log("BUILDING PLAYLIST")
      this.fetchAndBuildPlayList(url).subscribe(data =>{
        console.log("FETCHING PLAYLIST", data)
        if(data){
          observer.next(data)
        }else{
          console.log('ERR in GET:', data)
          observer.next(false)
        }
      })
    });
  }

  getCountries(){
    return this.data.countries
  }

  convertM3uToJson(text, url){
    console.log("CONVERTING", text)
    let arrDirty = text.split('\n')
    let output:any = {}
    let previous = null
    
    arrDirty.forEach((el, index) =>{
      if(index == 0) return false
      if(el.match(/ group-title="([^"]*)"/) == null && el.indexOf("http") > -1){
        let previousCountry =  output[previous]
        output[previous][previousCountry.length -1].url = el.toString().replace("\r", "")
        return false
      }
      // Build object
      let elObj = {
         groupName: el.match(/ group-title="([^"]*)"/) ? el.match(/ group-title="([^"]*)"/)[1] : null,
         tvLogo: el.match(/ tvg-logo="([^"]*)"/)? el.match(/ tvg-logo="([^"]*)"/)[1]: null,
         tvName: el.match(/ tvg-name="([^"]*)"/) ? el.match(/ tvg-name="([^"]*)"/)[1]: null,
      }
      
      if(elObj.groupName) {
        let groupName: string = elObj.groupName
        previous = groupName
        
        if(output[groupName]){
          output[groupName].push(elObj)
        } else{
         output[groupName] = []
         output[groupName].push(elObj)

         if(!output.countries){
           output.countries = []
         }
         
         output.countries.push({ 
            name: groupName, 
            channels: null,
            image: null 
          })
        }
      }
    })

    output.countries.map(el =>{
      el.channels = output[el.name].length
    })

    this.storage.set('playlist-'+url, JSON.stringify(output));
    return output
  }

  askPlaylistUrlOrFile() {
    return new Observable(observer => { 
      let alert = this.alertCtrl.create({
        title: 'Playlist url',
        inputs: [
          { name: 'url', placeholder: 'Url' }
        ],
        buttons: [
 
          /* {
            text: 'Local File',
            handler: data => {
              observer.next(false)
            }
          }, */
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data =>{
              console.log(data)
            }
          },
          {
            text: 'Ok',
            handler: data => {
              if(data.url.indexOf('.m3u')){
                this.buildPlaylist(data.url).subscribe(result=>{
                  if(result){
                    console.log(result)
                    alert.dismiss()
                    observer.next(result)
                  }
                })
              }
              observer.next(false)
            }
          }
        ]
      })
      alert.present();
    })
  }
}
