import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class ParserProvider {

  parseM3uOptionsFile(text:string) {
    const arrDirty = text.split('\n');
    const output:any = {};
    let previous = null;
    arrDirty.map((el, index) => {
      if (index === 0 || el.length < 1) return false;

      if (el.match(/ tvg-name="([^"]*)"/) == null && el.indexOf('http') > -1) {
        const previousGroup =  output[previous];
        output[previous][previousGroup.length - 1].url = el.toString().replace('\r', '');
        return false;
      }

      // Build object dynamicly
      const newEl = el.replace('#EXTINF:-1 ', '').split(',')[0];
      const attrs = newEl.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g);
      const options = {};

      attrs.forEach((attr) => {
        const splited = attr.split('=');
        splited[1] = splited[1].replace(/"/g,'');
        options[splited[0]] = splited[1]; 
      });

      const elObj = {
        tvId: options['tvg-id'],
        groupName: options['group-title'],
        tvLogo: options['tvg-logo'],
        tvName: options['tvg-name'],
      };

      if (elObj.groupName) {
        const groupName: string = elObj.groupName;
        previous = groupName;
        
        if (output[groupName]) {
          output[groupName].push(elObj);
        } else {
          output[groupName] = [];
          output[groupName].push(elObj);

          if (!output.countries) {
            output.countries = [];
          }
         
          output.countries.push({ 
            name: groupName, 
            channels: null,
            image: null, 
          });
        }
      }
    });

    output.countries.map((el) => {
      el.channels = output[el.name].length;
    });
    
    return output;
  }

}
