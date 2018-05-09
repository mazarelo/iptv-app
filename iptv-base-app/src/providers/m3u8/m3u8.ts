import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

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
      if(!url) alert("URL NOT FOUND")

      if(url.indexOf('content://') == -1){
        return this.http.get(url, { responseType: 'text' }).map(data => this.convertM3uToJson(data, url)).toPromise()
      }
    /*
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
     */
  }

  async getPlaylistFromFileSystem(url){
    let folderPath = url.split('\\').pop().split('/')
    folderPath.pop()
    folderPath = folderPath.join("/")
    let fileName = url.split('\\').pop().split('/').pop();
    console.log("FOLDER:", folderPath, "FILE:", fileName)
    let permissions: any = await this.androidPermissions.requestPermissions(
      [
        this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      ]).catch(err=> console.log('ERR resolving dir:', err))

      console.log('SO...permission?', permissions)
      if(permissions.hasPermission){
        let dirPath: any = await this.fileProvider.resolveDirectoryUrl(folderPath)
        console.log("RESOLVIGN PATH:", dirPath)
        return this.fileProvider.getFile(dirPath , fileName,  {create: true, exclusive: false})
      }

  }

  // this.storage.get('playlist').then((val) => {})
   getList(url) : any {
    return new Promise( async (resolve, reject) =>{
      let storageResult = await this.storage.get(this.urlStorePrefix+'-'+url).catch(err =>{
        console.log("Err getting stored playlist", err)
        resolve({err: true, message: 'No playlist found'})
      })

      if(storageResult){
        try{
          resolve(JSON.parse(storageResult))
        }catch(err){
          console.log("ERROR PARSING DATA:", err)
          resolve({err: true, message: 'Error parsing json'})
        }
      }else{
        let playlist = await this.buildPlaylist(url)
        if(playlist) resolve(playlist)

          resolve({err: true, message: 'No playlist found'})
      }
    })
  }

   async buildPlaylist(url){
    let playlist: any = await this.fetchAndBuildPlayList(url).catch(err=> alert("Error"))
    return playlist ? playlist : false
  }

  getCountries(){
    return this.data.countries
  }


  validateFile(dataArr){
    if(dataArr.length < 1) return false

    let output:any = null
    
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

  async parseM3uWithOptions(data){
    let output:any = {}
    let previous = null

    data.map( async (el, index) =>{
      if(index == 0) return false
      if(el.match(/ group-title="([^"]*)"/) == null && el.indexOf("http") > -1){
        let previousCountry = output[previous]
        output[previous][previousCountry.length -1].url = el.toString().replace("\r", "")
        return false
      }

      // Build object dynamicly
      el = el.replace('#EXTINF:-1 ', '').replace('#EXTINF:-0 ', '').split(',')[0]
      let attrs = el.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g)
      let options = {}
      
      if(!attrs) return false

      attrs.map(attr=>{
        let splited = attr.split('=')
        splited[1] = splited[1].replace(/"/g,'')
        options[splited[0]] = splited[1] 
      })
      
      if(!options['tvg-name']) return false

      let elObj = {
        id: options['tvg-id'] ? options['tvg-id'] : options['tvg-name'].replace(/\s/g, '-'),
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
      if(elObj.id) {
        await this.database.put(elObj.id.toLowerCase() , elObj).catch(err => console.log("CouchDB ERR:", err))
      }
    })

    output.countries.map(el =>{
      el.channels = output[el.name].length
    })

    let docs = await this.database.fetch()
    console.log('COUCHDB:', docs)

    return output
  }

  parseM3uSimple(data: Array<any>){
    let output:any = {}
    let previous = null

    data.map((el, index) =>{
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

}
