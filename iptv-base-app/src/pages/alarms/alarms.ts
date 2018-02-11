import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToasterProvider } from '../../providers/toaster/toaster';
import { Platform } from 'ionic-angular/platform/platform';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ChannelPage } from '../channel/channel'

@Component({
  selector: 'page-alarms',
  templateUrl: 'alarms.html',
})
export class AlarmsPage {
  public title = 'Alarms'
  public alarms = []

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public toastProvider: ToasterProvider,
    private plt: Platform,
    private localNotifications: LocalNotifications
  ) {
    this.plt.ready().then(data=>{
      if(data){
        this.localNotifications.getScheduledIds().then(data=>{
          if(data.length > 0){
            data.forEach(notId => {
              this.localNotifications.get(notId).then(notification=>{
                let output: any = notification
                output.data = JSON.parse(output.data)
                output.timeLeft = this.minutesLeft(notification)
                this.alarms.push(notification)
              }).catch(err=> console.log(err))
            })
          }
        })
      }
    })
  }

  playChannel(item){
    this.navCtrl.push( ChannelPage, {channel: item, list: []} )
  }

  minutesLeft(item){
    let start = new Date(item.trigger.at).getTime()
    let now = new Date().getTime()
    let diffMs = (start - now); 
    let diffDays = Math.floor(diffMs / 86400000);
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    if(diffMins < 90 && diffHrs == 0){
      return diffMins + ' min'
    }else if(diffHrs < 24){
      return `${diffHrs}h${diffMins}m`
    }else if(diffDays < 31){
      return diffDays + ' days'
    }else if(diffMs < 12){
      return diffMs + ' months'
    }
  }
}
