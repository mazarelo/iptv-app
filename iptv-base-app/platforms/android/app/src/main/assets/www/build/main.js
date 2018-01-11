webpackJsonp([0],{

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_m3u8_m3u8__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_favorites_favorites__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_video_video__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_screen_orientation__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_playlist_playlist__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__countries_countries__ = __webpack_require__(216);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import * as m3u from 'm3u8-reader'






var HomePage = (function () {
    function HomePage(navCtrl, m3u8Provider, favoritesProvider, videoProvider, playlistProvider, screenOrientation) {
        this.navCtrl = navCtrl;
        this.m3u8Provider = m3u8Provider;
        this.favoritesProvider = favoritesProvider;
        this.videoProvider = videoProvider;
        this.playlistProvider = playlistProvider;
        this.screenOrientation = screenOrientation;
        this.data = null;
        this.countries = [];
        this.favorites = [];
        this.userPlaylists = [];
        /* detect orientation changes
          this.screenOrientation.onChange().subscribe(() => {
              console.log("Orientation Changed");
              this.slides.update()
          });
        */
    }
    HomePage.prototype.retrievePlaylists = function () {
        var _this = this;
        this.playlistProvider.list().subscribe(function (response) {
            var data = response;
            console.log("Playlist Data", data);
            if (!data.err) {
                _this.userPlaylists = data;
            }
        });
    };
    HomePage.prototype.goToPlaylist = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__countries_countries__["a" /* CountriesPage */], {
            data: item,
        });
    };
    HomePage.prototype.addPlayList = function () {
        var _this = this;
        this.playlistProvider.add().subscribe(function (data) {
            console.log("DATA", data);
            _this.userPlaylists.push(data);
        });
        /*
        this.m3u8Provider.askPlaylistUrlOrFile().subscribe(data=>{
          console.log("data", data)
        })
        */
    };
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        //this.retrieveList()
        this.playlistProvider.list().subscribe(function (data) {
            console.log('NG INIT', data);
            _this.userPlaylists = data;
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */])
    ], HomePage.prototype, "slides", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/mazarelo/Projects/iptv-app/iptv/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title >Playlist</ion-title>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n<ion-content class="card-background-page">\n    <ion-card *ngFor="let playlist of userPlaylists" (click)="goToPlaylist(playlist)">\n        <div class="image-overlay"\n        [style.background]="\'url()\'" \n        [style.backgroundSize]="\'cover\'"\n        [style.backgroundPosition]="\'center\'"></div>\n      <!--<img src="assets/imgs/flags/{{ item.name | lowercase }}.jpg"/>-->\n      <div class="card-title">{{playlist.name}}</div>\n      <div class="card-subtitle"></div>\n    </ion-card>\n    <!-- add new playlist -->\n    <ion-card (click)="addPlayList()">\n        <div class="image-overlay"\n        [style.background]="\'url()\'" \n        [style.backgroundSize]="\'cover\'"\n        [style.backgroundPosition]="\'center\'"></div>\n      <!--<img src="assets/imgs/flags/{{ item.name | lowercase }}.jpg"/>-->\n      <div class="card-title">New</div>\n      <div class="card-subtitle">click here to add a new playlist</div>\n    </ion-card>\n</ion-content>\n\n'/*ion-inline-end:"/home/mazarelo/Projects/iptv-app/iptv/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_m3u8_m3u8__["a" /* M3u8Provider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_favorites_favorites__["a" /* FavoritesProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_video_video__["a" /* VideoProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_playlist_playlist__["a" /* PlayListProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_screen_orientation__["a" /* ScreenOrientation */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_toaster_toaster__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_chooser__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_m3u8_m3u8__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_android_permissions__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SettingsPage = (function () {
    function SettingsPage(navCtrl, storage, toastProvider, fileChooser, m3u8Provider, androidPermissions) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.toastProvider = toastProvider;
        this.fileChooser = fileChooser;
        this.m3u8Provider = m3u8Provider;
        this.androidPermissions = androidPermissions;
        this.settings = {
            offlineUse: false,
        };
    }
    SettingsPage.prototype.refreshPlaylist = function () {
        var _this = this;
        this.storage.remove('playlist').then(function (el) {
            _this.toastProvider.presentToast('Playlist refreshed');
        }).catch(function (err) {
            _this.toastProvider.presentToast('Error refreshing playlist');
        });
    };
    SettingsPage.prototype.uploadPlaylist = function () {
        this.getPlayList();
        //this.uploadPlaylistToApp()
        /*
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
          result => {
            console.log('Has permission?',result)
            if(result.hasPermission){
              
            }else{
              console.log('Before request permission')
              this.androidPermissions.requestPermission( this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE ).then(res =>{
                console.log('SO...permission?', res)
                if(res.hasPermission){
                  this.uploadPlaylistToApp()
                }
              })
            }
          },
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
        );*/
    };
    SettingsPage.prototype.getPlayList = function () {
        var _this = this;
        this.m3u8Provider.getList('').subscribe(function (data) {
            console.log('retrieve list method: ', data);
            if (data.err) {
                _this.m3u8Provider.askPlaylistUrlOrFile().subscribe(function (data) {
                    console.log('Returned to GetPlayList()', data);
                });
            }
        });
    };
    SettingsPage.prototype.uploadPlaylistToApp = function () {
        var _this = this;
        this.fileChooser.open().then(function (url) {
            console.log("URL FILE", url);
            _this.m3u8Provider.buildPlaylist(url).subscribe(function (data) {
                if (data) {
                    _this.toastProvider.presentToast('New Playlist Added');
                }
                else {
                    _this.toastProvider.presentToast('Error adding playlist');
                }
            });
        }).catch(function (e) { return console.log(e); });
    };
    SettingsPage.prototype.cleanFavorites = function () {
        var _this = this;
        this.storage.remove('favorites').then(function (data) {
            _this.toastProvider.presentToast('Favorites removed');
        }).catch(function (err) {
            _this.toastProvider.presentToast('error removing favorites');
        });
    };
    SettingsPage.prototype.cleanPlaylist = function () {
        var _this = this;
        this.storage.remove('playlist').then(function (data) {
            _this.toastProvider.presentToast('Playlist removed');
        }).catch(function (err) {
            _this.toastProvider.presentToast('error removing Playlist');
        });
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"/home/mazarelo/Projects/iptv-app/iptv/src/pages/settings/settings.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Settings\n    </ion-title>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content >\n\n    <ion-list>\n        <ion-item>\n          <ion-label>Offline use</ion-label>\n          <ion-toggle [(ngModel)]="offlineData" checked="false"></ion-toggle>\n        </ion-item>\n      </ion-list>\n\n      <ion-list>\n       \n        <ion-item>\n            Playlist\n            <button ion-button outline item-end  (click)="refreshPlaylist()">Refresh</button>\n        </ion-item>\n        <ion-item>\n            m3u8 Url\n            <button ion-button outline item-end (click)="uploadPlaylist()">Upload</button>\n        </ion-item>\n      </ion-list>\n\n      <ion-list>\n        <ion-item>\n           Favorites\n          <button color="danger" ion-button outline item-end  (click)="cleanFavorites()">Delete</button>\n        </ion-item>\n\n        <ion-item>\n             Cache\n            <button color="danger" ion-button outline item-end  (click)="cleanPlaylist()">Delete</button>\n        </ion-item>\n        \n      </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/mazarelo/Projects/iptv-app/iptv/src/pages/settings/settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_toaster_toaster__["a" /* ToasterProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_chooser__["a" /* FileChooser */],
            __WEBPACK_IMPORTED_MODULE_5__providers_m3u8_m3u8__["a" /* M3u8Provider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_android_permissions__["a" /* AndroidPermissions */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoritesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_favorites_favorites__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_streaming_media__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_toaster_toaster__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FavoritesPage = (function () {
    function FavoritesPage(navCtrl, streamingMedia, actionSheetCtrl, favorites, toastProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.streamingMedia = streamingMedia;
        this.actionSheetCtrl = actionSheetCtrl;
        this.favorites = favorites;
        this.toastProvider = toastProvider;
        this.channels = [];
        this.data = [];
        this.options = {
            successCallback: function () {
                console.log('Video played');
            },
            errorCallback: function (e) {
                _this.toastProvider.presentToast('Error playing Stream');
            },
            orientation: 'landscape'
        };
    }
    FavoritesPage.prototype.presentActionSheet = function (index) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Choose',
            buttons: [
                /*{
                  text: 'Hide',
                  role: 'destructive',
                  handler: () => {
                    console.log('Destructive clicked');
                  }
                },*/
                {
                    text: "Play",
                    handler: function () {
                        _this.playChannel(_this.channels[index].url);
                    }
                },
                {
                    text: 'Remove from Favorites',
                    handler: function () {
                        _this.favorites.remove(_this.channels[index]).subscribe(function (data) {
                            if (!data) {
                                _this.toastProvider.presentToast('Could not remove from Favorites');
                                return false;
                            }
                            _this.channels = data;
                            _this.data = data;
                            _this.toastProvider.presentToast('Removed from Favorites');
                        });
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    FavoritesPage.prototype.initializeItems = function () {
        this.channels = this.data;
    };
    FavoritesPage.prototype.playChannel = function (videoUrl) {
        //this.androidExoPlayer.show({url: videoUrl});
        this.streamingMedia.playVideo(videoUrl, this.options);
    };
    FavoritesPage.prototype.doInfinite = function (infiniteScroll) {
        var count = this.channels.length;
        for (var i = this.channels.length; i < (count + 30); i++) {
            if (this.data[i]) {
                this.channels.push(this.data[i]);
            }
            else {
                return infiniteScroll.complete();
            }
        }
        infiniteScroll.complete();
    };
    FavoritesPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.favorites.list().then(function (data) {
            _this.channels = data;
            _this.data = data;
            refresher.complete();
        });
    };
    FavoritesPage.prototype.ngOnInit = function () {
        var _this = this;
        this.favorites.list().then(function (data) {
            _this.channels = data;
            _this.data = data;
        });
    };
    FavoritesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-favorites',template:/*ion-inline-start:"/home/mazarelo/Projects/iptv-app/iptv/src/pages/favorites/favorites.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Favorites</ion-title>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content\n          pullingText="Pull to refresh"\n          refreshingSpinner="circles"\n          refreshingText="Refreshing...">\n        </ion-refresher-content>\n      </ion-refresher>\n\n   <!-- <ion-searchbar (ionInput)="onInput($event)"></ion-searchbar> -->\n  <ion-list >\n    <ion-item \n      *ngFor="let channel of channels; let i = index" \n      (click)="presentActionSheet(i)"\n      [style.background]="\'url(assets/imgs/fallback.png)\'" \n      [style.backgroundSize]="\'contain\'" \n      [style.backgroundPosition]="\'center center\'" \n      [style.backgroundRepeat]="\'no-repeat\'">\n\n      <ion-thumbnail item-start \n        [style.background]="\'url(\'+ channel.tvLogo +\')\'" \n        [style.backgroundSize]="\'contain\'" \n        [style.backgroundPosition]="\'center center\'" \n        [style.backgroundRepeat]="\'no-repeat\'">\n      </ion-thumbnail>\n      <h2>{{channel.tvName}}</h2>\n      <!--<button ion-button clear item-end (click)="playChannel(channel.url)">View</button>-->\n    </ion-item>\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/home/mazarelo/Projects/iptv-app/iptv/src/pages/favorites/favorites.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_streaming_media__["a" /* StreamingMedia */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_favorites_favorites__["a" /* FavoritesProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_toaster_toaster__["a" /* ToasterProvider */]])
    ], FavoritesPage);
    return FavoritesPage;
}());

//# sourceMappingURL=favorites.js.map

/***/ }),

/***/ 128:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 128;

/***/ }),

/***/ 169:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 169;

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Splash; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Splash = (function () {
    function Splash(viewCtrl, splashScreen) {
        this.viewCtrl = viewCtrl;
        this.splashScreen = splashScreen;
    }
    Splash.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.splashScreen.hide();
        setTimeout(function () {
            _this.viewCtrl.dismiss();
        }, 3000);
    };
    Splash = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-splash',template:/*ion-inline-start:"/home/mazarelo/Projects/iptv-app/iptv/src/pages/splash/splash.html"*/'<ion-content>\n \n    <img src="assets/imgs/splash-screen.png"/>\n \n</ion-content>'/*ion-inline-end:"/home/mazarelo/Projects/iptv-app/iptv/src/pages/splash/splash.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], Splash);
    return Splash;
}());

//# sourceMappingURL=splash.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_native_storage__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StorageProvider = (function () {
    function StorageProvider(nativeStorage, storage) {
        this.nativeStorage = nativeStorage;
        this.storage = storage;
    }
    StorageProvider.prototype.set = function (name, data) {
        return this.storage.set(name, JSON.stringify(data));
        /*.then(
       () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
            );
        */
    };
    StorageProvider.prototype.get = function (name) {
        return this.storage.get(name);
    };
    StorageProvider.prototype.remove = function (name) {
        return this.storage.remove(name);
    };
    StorageProvider.prototype.listAll = function () {
        return this.storage.keys();
    };
    StorageProvider.prototype.clear = function () {
        return this.storage.clear();
    };
    StorageProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_native_storage__["a" /* NativeStorage */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], StorageProvider);
    return StorageProvider;
}());

//# sourceMappingURL=storage.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CountriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_m3u8_m3u8__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__channels_channels__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_favorites_favorites__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_video_video__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_playlist_playlist__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import * as m3u from 'm3u8-reader'






var CountriesPage = (function () {
    function CountriesPage(navCtrl, navParams, m3u8Provider, favoritesProvider, videoProvider, playlistProvider, screenOrientation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.m3u8Provider = m3u8Provider;
        this.favoritesProvider = favoritesProvider;
        this.videoProvider = videoProvider;
        this.playlistProvider = playlistProvider;
        this.screenOrientation = screenOrientation;
        this.data = null;
        this.countries = [];
        this.favorites = [];
        this.userPlaylists = [];
        this.playlist = this.navParams.get('data');
        // get playlist url
        this.retrieveList(this.playlist.url);
    }
    CountriesPage.prototype.getFlagUrL = function (country) {
        return 'assets/imgs/flags/' + country.toLowerCase().replace(' ', '-') + '.jpg';
    };
    CountriesPage.prototype.goToCountry = function (country) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__channels_channels__["a" /* ChannelsPage */], {
            channels: this.data[country],
            title: country
        });
    };
    CountriesPage.prototype.retrieveList = function (url) {
        var _this = this;
        this.m3u8Provider.getList(url).subscribe(function (data) {
            console.log('retrieve list method: ', data);
            if (data.err) {
                _this.requestListUrlOrFile();
            }
            else {
                _this.data = data;
                _this.countries = data.countries;
            }
        });
        this.favoritesProvider.list().then(function (data) {
            console.log("FAV DAT:", data);
            if (data) {
                _this.favorites = data;
            }
        });
    };
    CountriesPage.prototype.requestListUrlOrFile = function () {
        var _this = this;
        this.m3u8Provider.askPlaylistUrlOrFile().subscribe(function (result) {
            var playlist = result;
            _this.data = result;
            _this.countries = _this.data.countries;
            return false;
        });
    };
    CountriesPage.prototype.playChannel = function (item) {
        this.videoProvider.start(item);
    };
    CountriesPage.prototype.favoritesInCountry = function (country) {
        return this.favorites.filter(function (item) { return item.groupName == country; });
    };
    CountriesPage.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */])
    ], CountriesPage.prototype, "slides", void 0);
    CountriesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-countries',template:/*ion-inline-start:"/home/mazarelo/Projects/iptv-app/iptv/src/pages/countries/countries.html"*/'<ion-header>\n        <ion-navbar>\n          <ion-title >Playlist</ion-title>\n          <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n        </ion-navbar>\n      </ion-header>\n      <ion-content class="card-background-page">\n        <!--  --> \n        <ion-slides *ngFor="let item of countries">\n            <ion-slide>\n                <ion-card (click)="goToCountry(item.name)">\n                  <div class="image-overlay"\n                  [style.background]="\'url(\'+ getFlagUrL(item.name) +\')\'" \n                  [style.backgroundSize]="\'cover\'"\n                  [style.backgroundPosition]="\'center\'"></div>\n                <!--<img src="assets/imgs/flags/{{ item.name | lowercase }}.jpg"/>-->\n                <div class="card-title">{{ item.name }}</div>\n                <div class="card-subtitle">{{ item.channels }} channels</div>\n              </ion-card>\n            </ion-slide>\n            <ion-slide *ngFor="let fav of favoritesInCountry(item.name)">\n                <ion-card (click)="playChannel(fav)">\n                    <div class="image-overlay"\n                    [style.background]="\'\'" \n                    [style.backgroundSize]="\'cover\'"\n                    [style.backgroundPosition]="\'center\'"></div>\n                  <!--<img src="assets/imgs/flags/{{ item.name | lowercase }}.jpg"/>-->\n                  <div class="card-subtitle"><img class="tv-logo" src="{{fav.tvLogo}}" width="30px"></div>\n                  <div class="card-title">{{ fav.tvName }}</div>\n                </ion-card>\n            </ion-slide>\n          </ion-slides>\n\n      </ion-content>\n      \n      '/*ion-inline-end:"/home/mazarelo/Projects/iptv-app/iptv/src/pages/countries/countries.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_m3u8_m3u8__["a" /* M3u8Provider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_favorites_favorites__["a" /* FavoritesProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_video_video__["a" /* VideoProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_playlist_playlist__["a" /* PlayListProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__["a" /* ScreenOrientation */]])
    ], CountriesPage);
    return CountriesPage;
}());

//# sourceMappingURL=countries.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChannelsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_favorites_favorites__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_toaster_toaster__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_video_video__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ChannelsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ChannelsPage = (function () {
    //private options: StreamingVideoOptions
    function ChannelsPage(
        //private streamingMedia: StreamingMedia,
        navParams, navCtrl, actionSheetCtrl, favorites, toastProvider, videoProvider) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.favorites = favorites;
        this.toastProvider = toastProvider;
        this.videoProvider = videoProvider;
        this.channels = [];
        this.data = this.navParams.get('channels');
        this.title = this.navParams.get('title');
        this.channels = this.data.slice(0, 30);
    }
    ChannelsPage.prototype.initializeItems = function () {
        this.channels = this.data;
    };
    ChannelsPage.prototype.onInput = function (ev) {
        // Reset items back to all of the items
        this.initializeItems();
        // set val to the value of the ev target
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.channels = this.channels.filter(function (item) {
                return (item.tvName.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    ChannelsPage.prototype.presentActionSheet = function (index) {
        var _this = this;
        var item = this.channels[index];
        var actionSheet = this.actionSheetCtrl.create({
            title: item.tvName,
            subTitle: item.tvGroup,
            buttons: [
                /*{
                  text: 'Hide',
                  role: 'destructive',
                  handler: () => {
                    console.log('Destructive clicked');
                  }
                },*/
                {
                    text: "Play",
                    icon: 'arrow-dropright-circle',
                    handler: function () {
                        _this.playChannel(item);
                    }
                },
                {
                    text: 'Add to Favorites',
                    icon: 'heart-outline',
                    handler: function () {
                        _this.favorites.add(item).subscribe(function (data) {
                            if (!data) {
                                _this.toastProvider.presentToast('Could not add to Favorites');
                                return false;
                            }
                            _this.toastProvider.presentToast('Added to Favorites');
                        });
                    }
                },
                {
                    text: "Hide",
                    icon: 'eye-off',
                    handler: function () {
                        // Hide object
                        _this.toastProvider.presentToast('Feature not enabled');
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'cross',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    ChannelsPage.prototype.playChannel = function (item) {
        this.videoProvider.start(item);
    };
    ChannelsPage.prototype.doInfinite = function (infiniteScroll) {
        var count = this.channels.length;
        for (var i = this.channels.length; i < (count + 30); i++) {
            if (this.data[i]) {
                this.channels.push(this.data[i]);
            }
            else {
                return infiniteScroll.complete();
            }
        }
        infiniteScroll.complete();
    };
    ChannelsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'channels',template:/*ion-inline-start:"/home/mazarelo/Projects/iptv-app/iptv/src/pages/channels/channels.html"*/'<ion-header>\n    <ion-navbar>\n      <ion-title>{{title}}</ion-title>\n    </ion-navbar>\n  </ion-header>\n  <ion-content>\n      <ion-searchbar (ionInput)="onInput($event)"></ion-searchbar>\n    <ion-list >\n      <ion-item \n        *ngFor="let channel of channels; let i = index" \n        (click)="presentActionSheet(i)"\n        [style.background]="\'url(assets/imgs/fallback.png)\'" \n        [style.backgroundSize]="\'contain\'" \n        [style.backgroundPosition]="\'center center\'" \n        [style.backgroundRepeat]="\'no-repeat\'">\n\n        <ion-thumbnail item-start \n          [style.background]="\'url(\'+ channel.tvLogo +\')\'" \n          [style.backgroundSize]="\'contain\'" \n          [style.backgroundPosition]="\'center center\'" \n          [style.backgroundRepeat]="\'no-repeat\'">\n        </ion-thumbnail>\n        <h2>{{channel.tvName}}</h2>\n        <!--<button ion-button clear item-end (click)="playChannel(channel.url)">View</button>-->\n      </ion-item>\n    </ion-list>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/home/mazarelo/Projects/iptv-app/iptv/src/pages/channels/channels.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_favorites_favorites__["a" /* FavoritesProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_toaster_toaster__["a" /* ToasterProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_video_video__["a" /* VideoProvider */]])
    ], ChannelsPage);
    return ChannelsPage;
}());

//# sourceMappingURL=channels.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(241);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_settings_settings__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_favorites_favorites__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_channel_channel__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_channels_channels__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common_http__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_streaming_media__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_video_player__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_m3u8_m3u8__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_toaster_toaster__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_favorites_favorites__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_android_exoplayer__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_video_video__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_storage_storage__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_playlist_playlist__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_native_storage__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_file_chooser__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_splash_splash__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_android_permissions__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_file__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_screen_orientation__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_countries_countries__ = __webpack_require__(216);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_favorites_favorites__["a" /* FavoritesPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_channel_channel__["a" /* ChannelPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_channels_channels__["a" /* ChannelsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_splash_splash__["a" /* Splash */],
                __WEBPACK_IMPORTED_MODULE_29__pages_countries_countries__["a" /* CountriesPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_18__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_favorites_favorites__["a" /* FavoritesPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_channel_channel__["a" /* ChannelPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_channels_channels__["a" /* ChannelsPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_splash_splash__["a" /* Splash */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_countries_countries__["a" /* CountriesPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_streaming_media__["a" /* StreamingMedia */],
                __WEBPACK_IMPORTED_MODULE_17__providers_favorites_favorites__["a" /* FavoritesProvider */],
                __WEBPACK_IMPORTED_MODULE_16__providers_toaster_toaster__["a" /* ToasterProvider */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_video_player__["a" /* VideoPlayer */],
                __WEBPACK_IMPORTED_MODULE_12__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_android_exoplayer__["a" /* AndroidExoplayer */],
                __WEBPACK_IMPORTED_MODULE_20__providers_video_video__["a" /* VideoProvider */],
                __WEBPACK_IMPORTED_MODULE_21__providers_storage_storage__["a" /* StorageProvider */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_native_storage__["a" /* NativeStorage */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_file_chooser__["a" /* FileChooser */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_22__providers_playlist_playlist__["a" /* PlayListProvider */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_android_permissions__["a" /* AndroidPermissions */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_15__providers_m3u8_m3u8__["a" /* M3u8Provider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_splash_splash__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_favorites_favorites__ = __webpack_require__(116);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, modalCtrl) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.modalCtrl = modalCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */], icon: 'list' },
            { title: 'Favorites', component: __WEBPACK_IMPORTED_MODULE_7__pages_favorites_favorites__["a" /* FavoritesPage */], icon: 'heart-outline' },
            { title: 'Settings', component: __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__["a" /* SettingsPage */], icon: 'settings' }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            var splash = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_splash_splash__["a" /* Splash */]);
            splash.present();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/mazarelo/Projects/iptv-app/iptv/src/app/app.html"*/'<ion-menu [content]="content">\n    <ion-header>\n      <ion-toolbar>\n        <ion-title>IPTV</ion-title>\n        <button ion-button menuToggle>\n            <ion-icon name="close"></ion-icon>\n        </button>\n      </ion-toolbar>\n    </ion-header>\n  \n    <ion-content>\n      <ion-list>\n          <ion-item menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n            <ion-icon name="{{p.icon}}" item-start></ion-icon>\n            {{p.title}}\n          </ion-item>\n      </ion-list>\n    </ion-content>\n  \n  </ion-menu>\n  \n  <!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/home/mazarelo/Projects/iptv-app/iptv/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChannelPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_video_video__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ChannelComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ChannelPage = (function () {
    function ChannelPage(videoProvider, navParams) {
        this.videoProvider = videoProvider;
        this.navParams = navParams;
        this.item = this.navParams.get('item');
        this.videoProvider.start(this.item);
    }
    ChannelPage.prototype.ngOnInit = function () { };
    ChannelPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'channel',template:/*ion-inline-start:"/home/mazarelo/Projects/iptv-app/iptv/src/pages/channel/channel.html"*/''/*ion-inline-end:"/home/mazarelo/Projects/iptv-app/iptv/src/pages/channel/channel.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_video_video__["a" /* VideoProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ChannelPage);
    return ChannelPage;
}());

//# sourceMappingURL=channel.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_settings__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__favorites_favorites__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__favorites_favorites__["a" /* FavoritesPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_1__settings_settings__["a" /* SettingsPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/mazarelo/Projects/iptv-app/iptv/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Channels" tabIcon="film"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Favorites" tabIcon="star"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Settings" tabIcon="settings"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/home/mazarelo/Projects/iptv-app/iptv/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoritesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the M3u8Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var FavoritesProvider = (function () {
    function FavoritesProvider(http, storage) {
        this.http = http;
        this.storage = storage;
    }
    FavoritesProvider.prototype.add = function (fav) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.list().then(function (data) {
                var favList = [];
                if (data) {
                    favList = data;
                    var filteredArr = favList.filter(function (el) { return el.tvName == fav.tvName; });
                    if (filteredArr.length > 0) {
                        observer.next(false);
                        return false;
                    }
                }
                favList.push(fav);
                _this.storage.set('favorites', JSON.stringify(favList)).then(function (el) {
                    _this.list().then(function (favs) {
                        observer.next(favs);
                    });
                })
                    .catch(function (err) {
                    observer.next(false);
                });
            });
        });
    };
    FavoritesProvider.prototype.getAllFromContry = function (country) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.list().then(function (data) {
                observer.next(data.filter(function (item) { return item.groupName == country; }));
            });
        });
    };
    FavoritesProvider.prototype.remove = function (fav) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.list().then(function (data) {
                var favList = [];
                if (data) {
                    favList = data;
                }
                var filteredArr = favList.filter(function (el) { return el.tvName !== fav.tvName; });
                _this.storage.set('favorites', JSON.stringify(filteredArr)).then(function (el) {
                    observer.next(filteredArr);
                })
                    .catch(function (err) {
                    observer.next(false);
                });
            });
        });
    };
    // this.storage.get('playlist').then((val) => {})
    FavoritesProvider.prototype.list = function () {
        return this.storage.get('favorites').then(function (val) { return JSON.parse(val); });
    };
    FavoritesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], FavoritesProvider);
    return FavoritesProvider;
}());

//# sourceMappingURL=favorites.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_android_exoplayer__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_streaming_media__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { Storage } from '@ionic/storage';




/*
  Generated class for the M3u8Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var VideoProvider = (function () {
    function VideoProvider(androidExoPlayer, platform, streamingMedia) {
        this.androidExoPlayer = androidExoPlayer;
        this.platform = platform;
        this.streamingMedia = streamingMedia;
    }
    VideoProvider.prototype.buildPlayerOptions = function (item) {
        var options = {
            url: item.url,
            aspectRatio: 'FIT_SCREEN',
            connectTimeout: 1000,
            autoPlay: true,
            controller: {
                streamImage: '',
                streamTitle: item.tvName,
                streamDescription: '',
                hideProgress: true,
                hidePosition: false,
                hideDuration: true,
                controlIcons: {}
            }
        };
        return options;
    };
    VideoProvider.prototype.start = function (item) {
        var _this = this;
        // Push a new View
        this.platform.ready().then(function (val) {
            if (val) {
                _this.startNativePlayer(item);
            }
        });
    };
    VideoProvider.prototype.showControlls = function () {
        return this.androidExoPlayer.showController();
    };
    VideoProvider.prototype.close = function () {
        return this.androidExoPlayer.close();
    };
    VideoProvider.prototype.startExoplayer = function (item) {
        var _this = this;
        var options = this.buildPlayerOptions(item);
        console.log('OPTIONS', options);
        this.androidExoPlayer.show(options)
            .subscribe(function (res) {
            if (res) {
                switch (res.eventKeycode) {
                    case "KEYCODE_BACK":
                        _this.close().then(function () {
                            //Navigate back
                        });
                        break;
                }
                switch (res.eventType) {
                    case "TOUCH_EVENT":
                        _this.showControlls().then(function () {
                            // Controlls visible
                        });
                        break;
                }
            }
            console.log(res);
        });
    };
    VideoProvider.prototype.startNativePlayer = function (item) {
        var options = {
            successCallback: function () {
                console.log('Video played');
            },
            errorCallback: function (e) {
            },
            orientation: 'landscape'
        };
        return this.streamingMedia.playVideo(item.url, options);
    };
    VideoProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_native_android_exoplayer__["a" /* AndroidExoplayer */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_streaming_media__["a" /* StreamingMedia */]])
    ], VideoProvider);
    return VideoProvider;
}());

//# sourceMappingURL=video.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return M3u8Provider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__playlist_playlist__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_android_permissions__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/*
  Generated class for the M3u8Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var M3u8Provider = (function () {
    function M3u8Provider(http, playlistProvider, alertCtrl, fileProvider, androidPermissions, storage) {
        this.http = http;
        this.playlistProvider = playlistProvider;
        this.alertCtrl = alertCtrl;
        this.fileProvider = fileProvider;
        this.androidPermissions = androidPermissions;
        this.storage = storage;
        this.playlistUrl = null;
    }
    M3u8Provider.prototype.fetchAndBuildPlayList = function (url) {
        var _this = this;
        if (!url) {
            alert("URL NOT FOUND");
        }
        if (url.indexOf('content://') == -1) {
            console.log("HTTP GET", url);
            return this.http.get(url, { responseType: 'text' }).map(function (data) { return _this.convertM3uToJson(data, url); });
        }
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.getPlaylistFromFileSystem(url).then(function (data) {
                if (data) {
                    observer.next(_this.convertM3uToJson(data, url));
                }
                else {
                    observer.next(false);
                }
            }).catch(function (err) {
                console.log("ERRRRR from file read", err);
            });
        });
    };
    M3u8Provider.prototype.getPlaylistFromFileSystem = function (url) {
        var _this = this;
        var folderPath = url.split('\\').pop().split('/');
        folderPath.pop();
        folderPath = folderPath.join("/");
        var fileName = url.split('\\').pop().split('/').pop();
        console.log("FOLDER:", folderPath, "FILE:", fileName);
        return this.androidPermissions.requestPermissions([
            this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
            this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
        ])
            .then(function (res) {
            console.log('SO...permission?', res);
            if (res.hasPermission) {
                return _this.fileProvider.resolveDirectoryUrl(folderPath).then(function (val) {
                    return _this.fileProvider.getFile(val, fileName, { create: true, exclusive: false });
                });
            }
        });
    };
    // this.storage.get('playlist').then((val) => {})
    M3u8Provider.prototype.getList = function (url) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            // Checks if there is any formated playlist stored
            _this.storage.get('playlist-' + url).then(function (val) {
                if (val) {
                    observer.next(JSON.parse(val));
                }
                else {
                    _this.buildPlaylist(url).subscribe(function (data) {
                        if (data) {
                            observer.next(data);
                        }
                        observer.next({ err: true, message: 'No playlist found' });
                    });
                }
            }).catch(function (err) {
                console.log("Err getting stored playlist", err);
                observer.next({ err: true, message: 'No playlist found' });
            });
        });
    };
    M3u8Provider.prototype.buildPlaylist = function (url) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            console.log("BUILDING PLAYLIST");
            _this.fetchAndBuildPlayList(url).subscribe(function (data) {
                console.log("FETCHING PLAYLIST", data);
                if (data) {
                    observer.next(data);
                }
                else {
                    console.log('ERR in GET:', data);
                    observer.next(false);
                }
            });
        });
    };
    M3u8Provider.prototype.getCountries = function () {
        return this.data.countries;
    };
    M3u8Provider.prototype.convertM3uToJson = function (text, url) {
        console.log("CONVERTING", text);
        var arrDirty = text.split('\n');
        var output = {};
        var previous = null;
        arrDirty.forEach(function (el, index) {
            if (index == 0)
                return false;
            if (el.match(/ group-title="([^"]*)"/) == null && el.indexOf("http") > -1) {
                var previousCountry = output[previous];
                output[previous][previousCountry.length - 1].url = el.toString().replace("\r", "");
                return false;
            }
            // Build object
            var elObj = {
                groupName: el.match(/ group-title="([^"]*)"/) ? el.match(/ group-title="([^"]*)"/)[1] : null,
                tvLogo: el.match(/ tvg-logo="([^"]*)"/) ? el.match(/ tvg-logo="([^"]*)"/)[1] : null,
                tvName: el.match(/ tvg-name="([^"]*)"/) ? el.match(/ tvg-name="([^"]*)"/)[1] : null,
            };
            if (elObj.groupName) {
                var groupName = elObj.groupName;
                previous = groupName;
                if (output[groupName]) {
                    output[groupName].push(elObj);
                }
                else {
                    output[groupName] = [];
                    output[groupName].push(elObj);
                    if (!output.countries) {
                        output.countries = [];
                    }
                    output.countries.push({
                        name: groupName,
                        channels: null,
                        image: null
                    });
                }
            }
        });
        output.countries.map(function (el) {
            el.channels = output[el.name].length;
        });
        this.storage.set('playlist-' + url, JSON.stringify(output));
        return output;
    };
    M3u8Provider.prototype.askPlaylistUrlOrFile = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            var alert = _this.alertCtrl.create({
                title: 'Playlist url',
                inputs: [
                    { name: 'url', placeholder: 'Url' }
                ],
                buttons: [
                    /* {
                      text: 'Local File',
                      handler: data => {
                        observer.next(false)
                      }
                    }, */
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function (data) {
                            console.log(data);
                        }
                    },
                    {
                        text: 'Ok',
                        handler: function (data) {
                            if (data.url.indexOf('.m3u')) {
                                _this.buildPlaylist(data.url).subscribe(function (result) {
                                    if (result) {
                                        console.log(result);
                                        alert.dismiss();
                                        observer.next(result);
                                    }
                                });
                            }
                            observer.next(false);
                        }
                    }
                ]
            });
            alert.present();
        });
    };
    M3u8Provider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_5__playlist_playlist__["a" /* PlayListProvider */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_android_permissions__["a" /* AndroidPermissions */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], M3u8Provider);
    return M3u8Provider;
}());

//# sourceMappingURL=m3u8.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayListProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storage_storage__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PlayListProvider = (function () {
    function PlayListProvider(storage, toastCtrl, alertCtrl) {
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.playlistPrefix = "playlist-";
    }
    PlayListProvider.prototype.add = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.presentPlaylistDataPrompt().subscribe(function (data) {
                console.log("subscribe returning to add()", data);
                observer.next(data);
            });
        });
    };
    PlayListProvider.prototype.current = function () {
        return this.storage.get('playlist-url');
    };
    PlayListProvider.prototype.list = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.storage.listAll().then(function (data) {
                if (!data)
                    return { err: true, message: 'no playlist' };
                var playlists = [];
                data.map(function (el, index) {
                    if (el.indexOf(_this.playlistPrefix) > -1) {
                        _this.storage.get(el).then(function (res) {
                            playlists.push(JSON.parse(res));
                            if (index == data.length - 1) {
                                observer.next(playlists);
                            }
                        });
                    }
                });
            }, function (err) {
                console.log('Error:', err);
                var error = { error: true, message: err };
                observer.next(error);
            });
        });
    };
    PlayListProvider.prototype.use = function () {
    };
    PlayListProvider.prototype.presentPlaylistDataPrompt = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            var alert = _this.alertCtrl.create({
                title: 'New Playlist',
                inputs: [
                    {
                        name: 'playlist',
                        placeholder: 'name'
                    },
                    {
                        name: 'url',
                        placeholder: 'url'
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function (data) {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'Save',
                        handler: function (data) {
                            if (data.playlist && data.url) {
                                // logged in!
                                var newPlaylist_1 = { name: data.playlist, url: data.url, order: 0 };
                                _this.storage.set(_this.playlistPrefix + data.playlist, newPlaylist_1).then(function () {
                                    console.log("Afer storage");
                                    observer.next(newPlaylist_1);
                                }, function (err) {
                                    console.log('Error Saving:', err);
                                });
                            }
                            else {
                                // invalid data
                                console.log('Invalid data', data);
                                return false;
                            }
                        }
                    }
                ]
            });
            alert.present();
        });
    };
    PlayListProvider.prototype.remove = function (name) {
        this.storage.remove(this.playlistPrefix + name);
    };
    PlayListProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__storage_storage__["a" /* StorageProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], PlayListProvider);
    return PlayListProvider;
}());

//# sourceMappingURL=playlist.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToasterProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ToasterProvider = (function () {
    function ToasterProvider(toastCtrl) {
        this.toastCtrl = toastCtrl;
    }
    ToasterProvider.prototype.presentToast = function (message, time) {
        if (time === void 0) { time = 1000; }
        var toast = this.toastCtrl.create({
            message: message,
            duration: time,
        });
        toast.present();
    };
    ToasterProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
    ], ToasterProvider);
    return ToasterProvider;
}());

//# sourceMappingURL=toaster.js.map

/***/ })

},[219]);
//# sourceMappingURL=main.js.map