import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform, ModalController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { FavoritesPage } from '../pages/favorites/favorites';
import { AlarmsPage } from '../pages/alarms/alarms';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

interface IPages {title: string; component: any; icon?: string;}

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: IPages[];

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public modalCtrl: ModalController,
    private app: App,
    private alertCtrl: AlertController,
    private admobFree: AdMobFree) {

    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage, icon: 'list' },
      { title: 'Favorites', component: FavoritesPage, icon: 'heart-outline' },
      { title: 'Settings', component: SettingsPage, icon: 'settings' },
      { title: 'Alarms', component: AlarmsPage, icon: 'alarm' },
    ];
  }

  async initializeApp() {
    await this.platform.ready();
    this.statusBar.backgroundColorByHexString('#262626');
  }

  backButtonInit() {
    this.platform.registerBackButtonAction(() => {
      const nav = this.app.getActiveNavs()[0];
      const activeView = nav.getActive();                
      if (nav.canGoBack()) {
        nav.pop();
      } else {
        const alert = this.alertCtrl.create({
          title: 'App termination',
          message: 'Do you want to close the app?',
          buttons: [{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Application exit prevented!');
            },
          },{
            text: 'Close App',
            handler: () => {
              this.platform.exitApp(); 
            },
          }],
        });
        alert.present();
      }
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
