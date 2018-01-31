import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {StorageProvider} from '../storage/storage';
import {AlertController} from 'ionic-angular/components/alert/alert-controller';
import {LoadingProvider} from '../loading/loading';
import 'rxjs/add/operator/map';
/*
  Generated class for the ParserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var X2JS : any;

@Injectable()
export class EpgProvider {
  private epgPrefix : string = 'epg-list-'
  constructor(public http : HttpClient, private storage : StorageProvider, private alertCtrl : AlertController, private loadingProvider : LoadingProvider,) {}

  convertXmlToJson(data : string) {
    let jsonData = this.x2jsParser(data)
    if (jsonData) {
      if (jsonData.hasOwnProperty('tv')) {
        jsonData = jsonData.tv
      }

      // Normalize start and finish times before saving in memory
      jsonData.programme.map(programme => {
          programme._start = this.convertEPGDateToReadable(programme._start)
          programme._stop = this.convertEPGDateToReadable(programme._stop)
        })

      jsonData.lastUpdated = new Date()
      return jsonData
    }
  }

  isEpdDateValid(epg) {
    let current = new Date()
    let targetEnd = new Date(epg._stop).getTime()
    let targetStart = new Date(epg._start).getTime()
    let currentTimestamp = current.getTime()

    return currentTimestamp < targetEnd && currentTimestamp > targetStart
  }

  convertEPGDateToReadable(data : number) {
    let output = {
      year: data.toString().slice(0, 4),
      month: data.toString().slice(4, 6),
      day: data.toString().slice(6, 8),
      hour: data.toString().slice(8, 10),
      min: data.toString().slice(10, 12)
    }

    let formatedData = new Date(`${output.year}-${output.month}-${output.day} ${output.hour}:${output.min}`)
    return formatedData
  }

  x2jsParser(data) {
    let xml = data
    var x2js : any = new X2JS();
    console.log( x2js.xml_str2json(xml) )
    var jsonObj = x2js.xml_str2json(xml);
    return jsonObj
  }

  downloadEPGFile(url) {
    // 'https://mazarelo.ddns.net:8443/index.php/s/x9FNZby4dH4PPne/download'
    return this.http.get(url, {responseType: 'text'})
  }

  promptForEPGFileUrl(country) {
    return new Observable(observer => {
      let alert = this.alertCtrl.create({
          title: 'Do you have a EPG url',
          inputs: [
            {
              name: 'url',
              placeholder: 'Url'
            }
          ],
          buttons: [
            {
              text: 'Choose from list',
              handler: data => {
                this.getRemoteEPGList().subscribe(res => {
                  let data: any = res
                  data = data.filter(el=> el !== 'list.json')

                  this.chooseFromRemoteEPGList(data).subscribe( response=>{
                    let url:string = 'https://mazarelo.com/iptv/epg/'+ response
                    
                    this.getEPG(url, country).subscribe(data=>{
                      observer.next(data)
                    })
                  })
                }, err =>{
                  console.log("FAILED TO GET EPG URL")
                  observer.next(false)
                })
              }
            }, {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log(data)
              }
            }, {
              text: 'Ok',
              handler: data => {
                this.getEPG(data.url, country).subscribe(data=>{
                  observer.next(data)
                })
              }
            }
          ]
        })
      alert.present();
    })
  }

  clear() {
    this.storage.listAll().then(data => {
        if (data) {
          data.map(el => {
            if (el.indexOf(this.epgPrefix) > -1) {
              this.storage.remove(el)
            }
          })
        }
      })
  }

  getEPG(url: string, country){
    return new Observable(observer=>{
      let loader = this.loadingProvider.presentLoadingDefault('Generating EPG')
      var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      var regex = new RegExp(expression);

      if (url.match(regex)) {
        this.downloadEPGFile(url).subscribe((res) => {
            if (res) {
              let output = this.convertXmlToJson(res)
              this.storage.set(this.epgPrefix + country.toLowerCase(), output)
                .then(() => {
                  observer.next(output)
                  loader.dismiss()
                })
                .catch(err => {
                  observer.next(false)
                  loader.dismiss()
                })
            } else {
              loader.dismiss()
            }
          }, err=>{
            loader.dismiss()
            observer.next(false)
          })
      } else {
        loader.dismiss()
        observer.next(false)
      }
    })
  }

  chooseFromRemoteEPGList(data) {
    return new Observable(observer =>{
      let alert = this.alertCtrl.create()
      alert.setTitle('Select Site')

      data.forEach(el => {
        alert.addInput({
          type: 'radio', 
          label: el.replace('.xml', ''), 
          value: el
        });
      })

      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {
          alert.dismiss();
          observer.next(data)
          return false;
        }
      });
      alert.present();
    })
  }

  remove(name) {
    return new Promise((resolve, reject) => {
      if (!name) 
        resolve({error: true, message: 'Invalid name provided'})
      let reference = name.toLowerCase()

      this.storage.listAll().then(data => {
          if (data) {
            data.map(el => {
              if (el == this.epgPrefix + reference) {
                this.storage.remove(el)
                resolve(true)
              }
            })
          } else {
            resolve({error: true, message: 'Error accessing store'})
          }
        })
    })
  }

  getRemoteEPGList() {
    return this.http.get('https://mazarelo.com/iptv/epg/list.json')
  }

  addEpg(group){
    return new Observable((observer) => {
      this.promptForEPGFileUrl(group).subscribe(data => {
        if (data) {
          observer.next(data)
        } else {
          observer.next(false)
        }
      })
    })
  }

  getCountryEPG(country) {
    return new Observable((observer) => {
      this.storage.get(this.epgPrefix + country.toLowerCase()).then(data => {
        let epg: any;
        try{
          epg = JSON.parse(data)
        }catch(err){
          console.log('ERROR PARSING JSON')
          observer.next(false)
        }

        if (epg) {
          console.log('From store:', epg)
          return observer.next(epg)
        } else {
          return observer.next(false)
          /*this.promptForEPGFileUrl(country).subscribe(data => {
            if (data) {
              observer.next(data)
            } else {
              observer.next(false)
            }
          })*/
        }
      }).catch(err => {
        observer.next(false)
      })
    })
  }

  refreshEPG(url){
    
  }

  getChannelEPG(channelId, country){
    return new Observable(observer => {
      this.getCountryEPG(country).subscribe(data=>{
        let epgData: any = data
        observer.next( epgData.programme.filter(epg => epg._channel == channelId) )
      })
    })
  }

}