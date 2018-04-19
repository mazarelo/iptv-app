import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { DatabaseProvider } from '../database/database.provider';

/*
  Generated class for the M3u8Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class M3u8Provider {
  public data;
  private urlStorePrefix = 'url'
  constructor(
    public http: HttpClient,
    private alertCtrl: AlertController,
    private fileProvider: File,
    private androidPermissions: AndroidPermissions,
    private database: DatabaseProvider,
    private storage: Storage) {
    }

  fetchAndBuildPlayList(url){
    if(!url){
      alert("URL NOT FOUND")
    }
    if(url.indexOf('content://') == -1){
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
          console.log("RESOLVIGN PATH:", val)
          return this.fileProvider.getFile(val , fileName,  {create: true, exclusive: false})
        }).catch(err=> console.log('ERR resolving dir:', err))
      }
    }) 
  }

  // this.storage.get('playlist').then((val) => {})
  getList(url) : any{
    return new Observable(observer => {
      // Checks if there is any formated playlist stored
     this.storage.get(this.urlStorePrefix+'-'+url).then((val) => {
        if(val){
          try{
            observer.next(JSON.parse(val))
          }catch(err){
            observer.next({err: true, message: 'Error parsing json'})
          }
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
      }, err=>{
        console.log("Error from Fetch")
        observer.next(false)
      })
    });
  }

  getCountries(){
    return this.data.countries
  }


  validateFile(dataArr){
    if(dataArr.length < 1) return false

    let output:any
    switch(true){
      case dataArr[0].indexOf('#EXTM3U') > -1:
        if(dataArr[1].indexOf('#EXTINF:-1,') > -1, dataArr[1].indexOf('#EXTINF:0,') > -1){
          output = this.parseM3uSimple(dataArr)
        }else{
          output = this.parseM3uWithOptions(dataArr)
        }
      break;
    }
    return output
  }

  convertM3uToJson(text, url){
    let dataArr = text.split('\n')
    let output = this.validateFile(dataArr)
    this.storage.set(this.urlStorePrefix+'-'+url, JSON.stringify(output));
    return output
  }

  parseM3uWithOptions(data){
    let output:any = {}
    let previous = null

    data.forEach((el, index) =>{
      if(index == 0) return false
      if(el.match(/ group-title="([^"]*)"/) == null && el.indexOf("http") > -1){
        let previousCountry =  output[previous]
        output[previous][previousCountry.length -1].url = el.toString().replace("\r", "")
        return false
      }

      // Build object dynamicly
      el = el.replace('#EXTINF:-1 ', '').replace('#EXTINF:-0 ', '').split(',')[0]
      let attrs = el.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g)
      let options = {}
      
      if(!attrs) return false

      attrs.forEach(attr=>{
        let splited = attr.split('=')
        splited[1] = splited[1].replace(/"/g,'')
        options[splited[0]] = splited[1] 
      })
      
      if(!options['tvg-name']) return false

      let elObj = {
        id: options['tvg-id'],
        groupName: options['group-title'],
        tvLogo: options['tvg-logo'],
        tvName: options['tvg-name'],
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

      // Save to PouchDB
      this.database.put(elObj.id.toLowerCase() , elObj)
    })

    output.countries.map(el =>{
      el.channels = output[el.name].length
    })

    return output
  }

  parseM3uSimple(data: Array<any>){
    let output:any = {}
    let previous = null

    data.forEach((el, index) =>{
      if(index == 0) return false
      
      if(el.match(/#EXTINF:-1,/) == null && el.indexOf("http") > -1){
        let previousEl =  output[previous]
        output[previousEl.length -1]['url'] = el.toString().replace("\r", "")
        return false
      }
    
      let name = el.split('#EXTINF:-1,')[1]
      output.push({tvName: name})
      previous = index
    })
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
              var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
              var regex = new RegExp(expression);

              if(data.url.match(regex)){
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
