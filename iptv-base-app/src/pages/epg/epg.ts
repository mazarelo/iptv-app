

import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { EpgProvider } from '../../providers/epg/epg';
import * as moment from 'moment'
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Platform } from 'ionic-angular/platform/platform';

@Component({
  selector: 'modal-epg',
  templateUrl: 'epg.html'
})
export class EpgModalPage implements OnInit {
  private item
  public title: string
  public epgData
  private current = new Date().getTime()

  constructor(
    private epgProvider: EpgProvider,
    private navParams: NavParams,
    public viewCtrl: ViewController,
    private localNotifications: LocalNotifications,
    private plt: Platform
  ) {
    this.item = this.navParams.get('item')
    this.title = this.item.tvName
    this.plt.ready().then(data=>{
    })
  }
  
  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  isNumber(val) { 
    return typeof val === 'number'; 
  }

  convertToPercentage(number){
    return number.toString() + '%'
  }

  epgTargetAlertNotification(){
    // Schedule delayed notification
    this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      at: new Date(new Date().getTime() + 1000),
      led: 'FF0000',
      sound: null
    });
  }

  ngOnInit(){
    this.epgProvider.getChannelEPG(this.item.id, this.item.groupName).subscribe( data => {
      console.log('CHANNEL EPG:', data)
      let response: any = data;
      /*
      response.sort( el=>{
        return new Date(el._start).getTime()
      })
      */

      response.forEach(el=>{
        el.current = false
        el.status = this.getCurrentEPGTimeBar(el)

        if(typeof el.status == 'number'){
          el.current = true
        }
      })
      
      this.epgData = data
    })
  }

  getCurrentEPGTimeBar(programme){
      let stop = new Date(programme._stop).getTime()
      let start = new Date(programme._start).getTime()

      let output = Math.floor(( (this.current - start) * 100 / (stop - start) ))
      
      if(output >= 100){
        return 'ENDED'
      }else if(output < 0){        
        return 'UP COMMING'
      }else{
        return output
      }
  }
 
  ionViewWillLeave(){
  }
  
  ionViewDidLoad(){
  }

}



