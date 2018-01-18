import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SettingsPage } from '../pages/settings/settings';
import { FavoritesPage } from '../pages/favorites/favorites';
import { HomePage } from '../pages/home/home';
import { ChannelPage } from '../pages/channel/channel';
import { ChannelsPage } from '../pages/channels/channels';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { VideoPlayer } from '@ionic-native/video-player';
import { M3u8Provider } from '../providers/m3u8/m3u8';
import { ToasterProvider } from '../providers/toaster/toaster';
import { FavoritesProvider } from '../providers/favorites/favorites';
import { IonicStorageModule } from '@ionic/storage';
import { AndroidExoplayer } from '@ionic-native/android-exoplayer'
import { VideoProvider } from '../providers/video/video'
import { StorageProvider } from '../providers/storage/storage'
import { PlayListProvider } from '../providers/playlist/playlist'
import { NativeStorage } from '@ionic-native/native-storage';
import { FileChooser } from '@ionic-native/file-chooser';
import { Splash } from '../pages/splash/splash'
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { File } from '@ionic-native/file';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { CountriesPage } from '../pages/countries/countries'
import { ParserProvider } from '../providers/parser/parser'

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    FavoritesPage,
    ChannelPage,
    ChannelsPage,
    HomePage,
    TabsPage,
    Splash,
    CountriesPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    FavoritesPage,
    HomePage,
    ChannelPage,
    ChannelsPage,
    Splash,
    TabsPage,
    CountriesPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StreamingMedia,
    FavoritesProvider,
    ToasterProvider,
    VideoPlayer,
    HttpClientModule,
    AndroidExoplayer,
    VideoProvider,
    StorageProvider,
    NativeStorage,
    FileChooser,
    File,
    PlayListProvider,
    AndroidPermissions,
    ScreenOrientation,
    ParserProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    M3u8Provider
  ]
})
export class AppModule {}
