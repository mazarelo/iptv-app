

import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { EpgProvider } from '../../providers/epg/epg';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Platform } from 'ionic-angular/platform/platform';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { ChannelPage } from '../channel/channel';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Component({
  selector: 'modal-epg',
  templateUrl: 'epg.html',
})
export class EpgModalPage implements OnInit {
  private item;
  public title: string;
  public epgData;
  private current = new Date().getTime();

  constructor(
    private epgProvider: EpgProvider,
    private navParams: NavParams,
    public viewCtrl: ViewController,
    private localNotifications: LocalNotifications,
    private plt: Platform,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
  ) {
    this.init();
  }

  async init() {
    this.item = this.navParams.get('item');
    this.title = this.item.tvName;
    await this.plt.ready();
    this.localNotifications.on('click').subscribe((notification) => {
      const data: any = notification.data; 
      if (data) {
        this.playChannel(data.channel, []);
      }
    });
  }

  playChannel(item, list) {
    this.navCtrl.push(ChannelPage, { channel: item, list: [] });
  }

  dismiss() {
    const data = { foo: 'bar' };
    this.viewCtrl.dismiss(data);
  }

  isNumber(val) { 
    return typeof val === 'number'; 
  }

  convertToPercentage(number) {
    return number.toString() + '%';
  }

  async epgTargetAlertNotification(epg) {
    const notificationPermission =  await this.localNotifications.hasPermission();
    if (notificationPermission) {
      this.sendNotification(this.title, epg, 10);
    }else {
      const requestPermission = await this.localNotifications.requestPermission();
      if (requestPermission) {
        this.sendNotification(this.title, epg, 10);
      }
    }
  }

  sendNotification(channel: string, epg, delay: number) {
    const minToMiliseconds = delay * 60 * 1000;
    
    if (new Date(epg._start).getTime() - minToMiliseconds >= new Date().getTime()) {
      const showOnDate =  new Date(new Date(epg._start).getTime() - minToMiliseconds);
      
      this.localNotifications.schedule({
        id: new Date().getTime(),
        text: `"${epg.title.__text}" starts in ${delay.toString()}min`,
        trigger: { at: showOnDate },
        led: 'FF0000',
        sound: null,
        badge: 1,
        data: { epg , channel: this.item },
      });
    }
  }

  ngOnInit() {
    this.epgProvider.getChannelEPG(this.item.id, this.item.groupName).subscribe((data) => {
      const response: any = data;
      /*
      response.sort( el=>{
        return new Date(el._start).getTime()
      })
      */

      response.forEach((el) => {
        el.current = false;
        el.status = this.getCurrentEPGTimeBar(el);

        if (typeof el.status === 'number') {
          el.current = true;
        }
      });
      
      this.epgData = data;
    });
  }

  getCurrentEPGTimeBar(programme) {
    const stop = new Date(programme._stop).getTime();
    const start = new Date(programme._start).getTime();

    const output = Math.floor(((this.current - start) * 100 / (stop - start)));
      
    if (output >= 100) {
      return 'ENDED';
    }
    if (output < 0) {        
      return 'UP COMMING';
    }

    return output;
  }

  epgOptions(epg) {
    const item = epg;
    const actionSheet = this.actionSheetCtrl.create({
      title: item.title.__text,
      subTitle: null,
      buttons: [
        {
          text: 'Create alert',
          icon: 'alarm',
          handler: () => {
            this.presentConfirm(epg);
          },
        },
        {
          text: 'Cancel',
          icon: 'cross',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    actionSheet.present();
  }

  presentConfirm(epg) {
    const alert = this.alertCtrl.create({
      title: 'Confirm alert',
      message: 'You will be notified 10min before the programme.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            this.epgTargetAlertNotification(epg);
          },
        },
      ],
    });
    alert.present();
  }
}
