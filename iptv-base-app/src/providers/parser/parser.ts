import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

/*
  Generated class for the ParserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ParserProvider {
  constructor() {}

  validateFile(){

  }


  parseM3uOptionsFile(text:string){
    let arrDirty = text.split('\n')
    let output:any = {}
    let previous = null
    arrDirty.forEach((el, index) =>{
      if(index == 0 || el.length < 1) return false

      if(el.match(/ tvg-name="([^"]*)"/) == null && el.indexOf("http") > -1){
        let previousGroup =  output[previous]
        output[previous][previousGroup.length -1].url = el.toString().replace("\r", "")
        return false
      }

      // Build object dynamicly
      el = el.replace('#EXTINF:-1 ', '').split(',')[0]
      let attrs = el.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g)
      let options = {}

      attrs.forEach(attr=>{
        let splited = attr.split('=')
        splited[1] = splited[1].replace(/"/g,'')
        options[splited[0]] = splited[1] 
      })

      let elObj = {
        tvId: options['tvg-id'],
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
    })

    output.countries.map(el =>{
      el.channels = output[el.name].length
    })
    
    return output
  }

}
