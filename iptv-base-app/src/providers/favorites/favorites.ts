import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the M3u8Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoritesProvider {
  public data;

  constructor(
    public http: HttpClient,
    private storage: Storage) {}

  add(fav){
    return new Observable(observer => {
        this.list().then((data) => {
            let favList = []
            if(data){
                favList = data
                let filteredArr = favList.filter(el=> el.tvName == fav.tvName)
                if(filteredArr.length > 0){
                    observer.next(false)
                    return false
                }
            }
            
            favList.push(fav)
            this.storage.set('favorites', JSON.stringify(favList)).then(el=>{
                this.list().then(favs=>{
                    observer.next(favs)
                })
            })
            .catch(err =>{
                observer.next(false)
            })
        })
    })
  }

  getAllFromContry(country){
    return new Observable(observer =>{
      this.list().then(data =>{
        observer.next( data.filter(item => item.groupName == country) )
      })      
    })
  }

  remove(fav){
    return new Observable(observer => {
        this.list().then((data) => {
            let favList:any = []
            if(data){
                favList = data
            }

            let filteredArr = favList.filter(el => el.tvName !!== fav.tvName)
            
            this.storage.set('favorites', JSON.stringify(filteredArr)).then(el=>{
                observer.next(filteredArr)
            })
            .catch(err =>{
                observer.next(false)
            })
        })
    })
  }
  
  // this.storage.get('playlist').then((val) => {})
  list(){
    return this.storage.get('favorites').then((val) => JSON.parse(val))
  }

}
