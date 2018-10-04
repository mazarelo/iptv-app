import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@Injectable()
export class LoadingProvider {
  private timeout : number = 5000;
  constructor(public loadingCtrl : LoadingController) {}

  presentLoadingDefault(text) {
    const loading : any = this.loadingCtrl.create({ content: text });
    loading.present();
    return loading;
  }

  presentLoadingCustom() {
    const loading = this
            .loadingCtrl
            .create({spinner: 'hide', content: `
            <div class="custom-spinner-container">
              <div class="custom-spinner-box"></div>
            </div>`, duration: this.timeout});

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();
  }

}
