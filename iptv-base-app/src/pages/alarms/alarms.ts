import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToasterProvider } from '../../providers/toaster/toaster';
import { Platform } from 'ionic-angular/platform/platform';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ChannelPage } from '../channel/channel';

@Component({
  selector: 'page-alarms',
  templateUrl: 'alarms.html',
})
export class AlarmsPage {
  public title = 'Alarms';
  public alarms = [];

  constructor(
    public navCtrl: NavController,
    public toastProvider: ToasterProvider,
    private plt: Platform,
    private localNotifications: LocalNotifications,
  ) {
    this.init();
  }

  async init() {
    const platformReady = await this.plt.ready();
    if (platformReady) {
      const localNotData = await this.localNotifications.getScheduledIds();
      if (localNotData.length > 0) {
        localNotData.map(async (notId) => {
          const notification = await this.localNotifications.get(notId)
            .catch(err => console.log(err));

          const output: any = notification;
          output.data = JSON.parse(output.data);
          output.timeLeft = this.minutesLeft(notification);
          this.alarms.push(notification);
        });
      }
    }
  }

  playChannel(item) {
    this.navCtrl.push(ChannelPage, { channel: item, list: [] });
  }

  minutesLeft(item) {
    const start = new Date(item.trigger.at).getTime();
    const now = new Date().getTime();
    const diffMs = (start - now); 
    const diffDays = Math.floor(diffMs / 86400000);
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    if (diffMins < 90 && diffHrs === 0) {
      return diffMins + ' min';
    }
    if (diffHrs < 24) {
      return `${diffHrs}h${diffMins}m`;
    }
    if (diffDays < 31) {
      return diffDays + ' days';
    } 
    if (diffMs < 12) {
      return diffMs + ' months';
    }
  }
}
