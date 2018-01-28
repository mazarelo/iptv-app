import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform, ModalController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Splash } from '../pages/splash/splash'
import { HomePage } from '../pages/home/home'
import { SettingsPage } from '../pages/settings/settings'
import { FavoritesPage } from '../pages/favorites/favorites'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any, icon?: string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public modalCtrl: ModalController,
    private app: App,
    private alertCtrl: AlertController) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'list' },
      { title: 'Favorites', component: FavoritesPage, icon: 'heart-outline' },
      { title: 'Settings', component: SettingsPage, icon: 'settings' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.backgroundColorByHexString('#43738d')
      //this.statusBar.show();
      let splash = this.modalCtrl.create(Splash);
      splash.present();
    });
  }

  backButtonInit(){
    this.platform.registerBackButtonAction(() => {
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();                

      if(activeView.name === "FirstPage") {
          if (nav.canGoBack()){ //Can we go back?
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
                      }
                  },{
                      text: 'Close App',
                      handler: () => {
                          this.platform.exitApp(); // Close this application
                      }
                  }]
              });
              alert.present();
          }
      }
  });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


}
