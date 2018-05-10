import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToasterProvider {

  constructor(
        public toastCtrl: ToastController,
      ) {}
    
  presentToast(message, time = 1000) {
    const toast = this.toastCtrl.create({
      message,
      duration: time,
    });
    toast.present();
  }
     
}
