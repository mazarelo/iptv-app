webpackJsonp([0],{

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_playlist_playlist__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__countries_countries__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_epg_epg__ = __webpack_require__(119);
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
    function HomePage(navCtrl, playlistProvider, actionSheetCtrl, epgProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.playlistProvider = playlistProvider;
        this.actionSheetCtrl = actionSheetCtrl;
        this.epgProvider = epgProvider;
        this.countries = [];
        this.favorites = [];
        this.userPlaylists = [];
        this.playlistProvider.list().subscribe(function (data) {
            console.log('NG INIT', data);
            _this.userPlaylists = data;
        });
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__countries_countries__["a" /* CountriesPage */], {
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
    HomePage.prototype.loadOptions = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: '',
            subTitle: '',
            buttons: [
                /*{
                  text: 'Hide',
                  role: 'destructive',
                  handler: () => {
                    console.log('Destructive clicked');
                  }
                },*/
                {
                    text: "Add Playlist",
                    icon: 'add',
                    handler: function () {
                        _this.addPlayList();
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
    HomePage.prototype.deletePlaylist = function (playlist) {
        var _this = this;
        this.playlistProvider.remove(playlist).then(function (data) {
            _this.userPlaylists = _this.userPlaylists.filter(function (el) { return el.name !== playlist.name; });
        });
    };
    HomePage.prototype.ngOnInit = function () {
        //this.retrieveList()
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */])
    ], HomePage.prototype, "slides", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/home/home.html"*/'<ion-header>\n    <ion-toolbar>\n        <button ion-button menuToggle start>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n        <ion-buttons>\n            <ion-title>Playlists</ion-title>\n        </ion-buttons>\n        <ion-buttons end>\n            <button ion-button icon-only (tap)="loadOptions()">\n              <ion-icon name="more"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content class="card-background-page">\n    <!--\n    <ion-card *ngFor="let playlist of userPlaylists" (click)="goToPlaylist(playlist)">\n        <div class="image-overlay" [style.background]="\'url()\'" [style.backgroundSize]="\'cover\'" [style.backgroundPosition]="\'center\'"></div>\n        <div class="card-title">{{playlist.name}}</div>\n        <div class="card-subtitle"></div>\n    </ion-card>\n    <ion-card (click)="addPlayList()">\n        <div class="image-overlay" [style.background]="\'url()\'" [style.backgroundSize]="\'cover\'" [style.backgroundPosition]="\'center\'"></div>\n        <div class="card-title">New</div>\n        <div class="card-subtitle">click here to add a new playlist</div>\n    </ion-card>\n  -->\n    <ion-list>\n        <ion-item-sliding *ngFor="let playlist of userPlaylists">\n            <ion-item (click)="goToPlaylist(playlist)">\n                <!--<ion-avatar item-start>\n                    <img src="img/slimer.png">\n                </ion-avatar>-->\n                <h2>\n                    <ion-icon name="list-box"></ion-icon> {{playlist.name}}</h2>\n            </ion-item>\n            <ion-item-options side="right">\n                <button ion-button color="danger" (click)="deletePlaylist(playlist)">Delete</button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_playlist_playlist__["a" /* PlayListProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_epg_epg__["a" /* EpgProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(43);
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
    function StorageProvider(storage) {
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], StorageProvider);
    return StorageProvider;
}());

//# sourceMappingURL=storage.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EpgProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__storage_storage__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__download_download__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_zip__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_alert_alert_controller__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__loading_loading__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var EpgProvider = (function () {
    function EpgProvider(http, storage, downloadProvider, zip, file, alertCtrl, loadingProvider) {
        this.http = http;
        this.storage = storage;
        this.downloadProvider = downloadProvider;
        this.zip = zip;
        this.file = file;
        this.alertCtrl = alertCtrl;
        this.loadingProvider = loadingProvider;
    }
    /*
    unzipFile(url){
      return this.zip.unzip(url, this.file.dataDirectory, (progress) => {
        console.log('Unzipping, ' + Math.round((progress.loaded / progress.total) * 100) + '%')
      })
    }
  
    // Doesnt work inside a provider
    getEPG() {
      this.downloadProvider.download('http://epg.iptvservice.iptv.uno/portugal.xml.gz')
      .subscribe(data=>{
        let path: any = data
  
        console.log("DOWNLOAD FINISHED:", path)
        let downloadDir = path.fullPath
  
        this.file.listDir('', this.file.dataDirectory).then( data =>{
          console.log("Directory list:", data)
        }).catch(err=>{
          console.log("Err", err)
        })
  
        this.unzipFile(path.fullPath).then((result) => {
          if(result === 0) console.log('SUCCESS');
          if(result === -1) console.log('FAILED');
        });
  
      })
    }
    */
    EpgProvider.prototype.convertXmlToJson = function (data) {
        var _this = this;
        var jsonData = this.x2jsParser(data);
        if (jsonData) {
            if (jsonData.hasOwnProperty('tv')) {
                jsonData = jsonData.tv;
            }
            // Normalize start and finish times before saving in memory
            jsonData
                .programme
                .map(function (programme) {
                programme._start = _this.convertEPGDateToReadable(programme._start);
                programme._stop = _this.convertEPGDateToReadable(programme._stop);
            });
            jsonData.lastUpdated = new Date();
            console.log(jsonData);
            return jsonData;
        }
    };
    EpgProvider.prototype.isEpdDateValid = function (epg) {
        var current = new Date();
        var targetEnd = new Date(epg._stop).getTime();
        var targetStart = new Date(epg._start).getTime();
        var currentTimestamp = current.getTime();
        return currentTimestamp < targetEnd && currentTimestamp > targetStart;
    };
    EpgProvider.prototype.convertEPGDateToReadable = function (data) {
        var output = {
            year: data
                .toString()
                .slice(0, 4),
            month: data
                .toString()
                .slice(4, 6),
            day: data
                .toString()
                .slice(6, 8),
            hour: data
                .toString()
                .slice(8, 10),
            min: data
                .toString()
                .slice(10, 12)
        };
        var formatedData = new Date(output.year + "-" + output.month + "-" + output.day + " " + output.hour + ":" + output.min);
        return formatedData;
    };
    EpgProvider.prototype.x2jsParser = function (data) {
        var xml = data;
        // let addXmlHeder = '<?xml version="1.0" encoding="UTF-8"?>' xml = addXmlHeder
        // + xml xml = xml.replace(/&/g, "&amp;")
        var x2js = new X2JS();
        //console.log( this.stringToXML(xml) )
        var jsonObj = x2js.xml_str2json(xml);
        return jsonObj;
    };
    EpgProvider.prototype.downloadEPGFile = function (url) {
        // let url =
        // 'https://mazarelo.ddns.net:8443/index.php/s/x9FNZby4dH4PPne/download'
        return this
            .http
            .get(url, { responseType: 'text' });
    };
    EpgProvider.prototype.promptForEPGFileUrl = function (country) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            var alert = _this
                .alertCtrl
                .create({
                title: 'Do you have a EPG url',
                inputs: [
                    {
                        name: 'url',
                        placeholder: 'Url'
                    }
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
                    }, {
                        text: 'Ok',
                        handler: function (data) {
                            var loader = _this.loadingProvider.presentLoadingDefault('Generating EPG');
                            var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
                            var regex = new RegExp(expression);
                            if (data.url.match(regex)) {
                                _this.downloadEPGFile(data.url)
                                    .subscribe(function (res) {
                                    console.log("EPG HTTP RESPONSE", res);
                                    if (res) {
                                        var output_1 = _this.convertXmlToJson(res);
                                        _this.storage.set('epg-list-' + country.toLowerCase(), output_1)
                                            .then(function () {
                                            observer.next(output_1);
                                            loader.dismiss();
                                        }).catch(function (err) {
                                            observer.next(false);
                                            loader.dismiss();
                                        });
                                    }
                                    else {
                                        loader.dismiss();
                                    }
                                });
                            }
                            else {
                                loader.dismiss();
                                observer.next(false);
                            }
                        }
                    }
                ]
            });
            alert.present();
        });
    };
    EpgProvider.prototype.getCountryEPG = function (country) {
        var _this = this;
        console.log('#######################', country);
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            _this
                .storage
                .get('epg-list-' + country.toLowerCase())
                .then(function (data) {
                var epg = JSON.parse(data);
                if (epg) {
                    console.log('From store:', epg);
                    return observer.next(epg);
                }
                else {
                    _this
                        .promptForEPGFileUrl(country)
                        .subscribe(function (data) {
                        if (data) {
                            observer.next(data);
                        }
                        else {
                            observer.next(false);
                        }
                    });
                }
            })
                .catch(function (err) {
                observer.next(false);
            });
        });
    };
    EpgProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_5__download_download__["a" /* DownloadProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_zip__["a" /* Zip */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_8_ionic_angular_components_alert_alert_controller__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_9__loading_loading__["a" /* LoadingProvider */]])
    ], EpgProvider);
    return EpgProvider;
}());

//# sourceMappingURL=epg.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_toaster_toaster__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_chooser__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_m3u8_m3u8__ = __webpack_require__(54);
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
    function SettingsPage(navCtrl, storage, toastProvider, fileChooser, m3u8Provider) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.toastProvider = toastProvider;
        this.fileChooser = fileChooser;
        this.m3u8Provider = m3u8Provider;
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
    SettingsPage.prototype.wipeAllData = function () {
        var _this = this;
        this.storage.clear().then(function (data) {
            _this.toastProvider.presentToast('All Data wiped');
        });
    };
    SettingsPage.prototype.cleanPlaylists = function () {
        var _this = this;
        this.storage.keys().then(function (keys) {
            keys.forEach(function (item) {
                if (item.indexOf('iptv-playlist-')) {
                    _this.storage.remove('playlist');
                }
            });
            _this.toastProvider.presentToast('Playlists removed');
        });
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/settings/settings.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            Settings\n        </ion-title>\n        <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n    <ion-list>\n        <ion-item>\n            <ion-label>Offline use</ion-label>\n            <ion-toggle [(ngModel)]="offlineData" checked="false"></ion-toggle>\n        </ion-item>\n    </ion-list>\n\n    <ion-list>\n\n        <ion-item>\n            Playlist\n            <button ion-button outline item-end (click)="refreshPlaylist()">Refresh</button>\n        </ion-item>\n        <ion-item>\n            m3u8 Url\n            <button ion-button outline item-end (click)="uploadPlaylist()">Upload</button>\n        </ion-item>\n    </ion-list>\n\n    <ion-list>\n        <ion-item>\n            Favorites\n            <button color="danger" ion-button outline item-end (click)="cleanFavorites()">Delete</button>\n        </ion-item>\n\n        <ion-item>\n            Cache\n            <button color="danger" ion-button outline item-end (click)="cleanPlaylists()">Delete</button>\n        </ion-item>\n\n        <ion-item>\n            Wipe data\n            <button color="danger" ion-button outline item-end (click)="wipeAllData()">wipe</button>\n        </ion-item>\n\n    </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/settings/settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_toaster_toaster__["a" /* ToasterProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_chooser__["a" /* FileChooser */],
            __WEBPACK_IMPORTED_MODULE_5__providers_m3u8_m3u8__["a" /* M3u8Provider */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoritesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_favorites_favorites__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_streaming_media__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_toaster_toaster__ = __webpack_require__(33);
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
                    icon: 'arrow-dropright-circle',
                    handler: function () {
                        _this.playChannel(_this.channels[index].url);
                    }
                },
                {
                    text: 'Remove from Favorites',
                    icon: 'heart-outline',
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
            selector: 'page-favorites',template:/*ion-inline-start:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/favorites/favorites.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Favorites</ion-title>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content\n          pullingText="Pull to refresh"\n          refreshingSpinner="circles"\n          refreshingText="Refreshing...">\n        </ion-refresher-content>\n      </ion-refresher>\n\n   <!-- <ion-searchbar (ionInput)="onInput($event)"></ion-searchbar> -->\n  <ion-list >\n    <ion-item \n      *ngFor="let channel of channels; let i = index" \n      (click)="presentActionSheet(i)"\n      [style.background]="\'url(assets/imgs/fallback.png)\'" \n      [style.backgroundSize]="\'contain\'" \n      [style.backgroundPosition]="\'center center\'" \n      [style.backgroundRepeat]="\'no-repeat\'">\n\n      <ion-thumbnail item-start \n        [style.background]="\'url(\'+ channel.tvLogo +\')\'" \n        [style.backgroundSize]="\'contain\'" \n        [style.backgroundPosition]="\'center center\'" \n        [style.backgroundRepeat]="\'no-repeat\'">\n      </ion-thumbnail>\n      <h2>{{channel.tvName}}</h2>\n      <!--<button ion-button clear item-end (click)="playChannel(channel.url)">View</button>-->\n    </ion-item>\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/favorites/favorites.html"*/
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

/***/ 133:
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
webpackEmptyAsyncContext.id = 133;

/***/ }),

/***/ 172:
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
webpackEmptyAsyncContext.id = 172;

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Splash; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(113);
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
            selector: 'page-splash',template:/*ion-inline-start:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/splash/splash.html"*/'<ion-content>\n \n    <img src="assets/imgs/splash-screen.png"/>\n \n</ion-content>'/*ion-inline-end:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/splash/splash.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], Splash);
    return Splash;
}());

//# sourceMappingURL=splash.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayListProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storage_storage__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_android_permissions__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_chooser__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__m3u8_m3u8__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__loading_loading__ = __webpack_require__(57);
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
    function PlayListProvider(storage, toastCtrl, alertCtrl, fileChooser, androidPermissions, m3uProvider, loadingProvider) {
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.fileChooser = fileChooser;
        this.androidPermissions = androidPermissions;
        this.m3uProvider = m3uProvider;
        this.loadingProvider = loadingProvider;
        this.playlistPrefix = "iptv-playlist-";
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
    PlayListProvider.prototype.get = function (name) {
        return this.storage.get('playlist-' + name);
    };
    PlayListProvider.prototype.list = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.storage.listAll().then(function (data) {
                if (!data)
                    return { err: true, message: 'no playlist' };
                var playlists = [];
                var playlistArr = data.filter(function (el) { return el.indexOf(_this.playlistPrefix) > -1; });
                playlistArr.map(function (el, index) {
                    if (el.indexOf(_this.playlistPrefix) > -1) {
                        _this.storage.get(el).then(function (res) {
                            playlists.push(JSON.parse(res));
                        });
                    }
                });
                observer.next(playlists);
            }, function (err) {
                console.log('Error:', err);
                var error = { error: true, message: err };
                observer.next(error);
            });
        });
    };
    PlayListProvider.prototype.use = function () { };
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
                        text: 'Import File',
                        handler: function (data) {
                            _this.uploadFile().then(function (data) {
                                console.log("RETURNED DATA FROM FILE", data);
                            });
                            console.log('file clicked');
                        }
                    },
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
                            var loader = _this.loadingProvider.presentLoadingDefault('Generating M3U list');
                            if (data.playlist.length > 0 && data.url.length > 0) {
                                var newPlaylist_1 = { name: data.playlist, url: data.url, order: 0 };
                                _this.storage.set(_this.playlistPrefix + data.playlist, newPlaylist_1).then(function () {
                                    observer.next(newPlaylist_1);
                                    loader.dismiss();
                                }, function (err) {
                                    console.log('Error Saving:', err);
                                    loader.dismiss();
                                });
                            }
                            else {
                                // invalid data
                                console.log('Invalid data', data);
                                loader.dismiss();
                                return false;
                            }
                        }
                    }
                ]
            });
            alert.present();
        });
    };
    PlayListProvider.prototype.remove = function (playlist) {
        var _this = this;
        console.log('Deleting:', playlist);
        return this.storage.remove(this.playlistPrefix + playlist.name).then(function () {
            return _this.storage.remove('url-' + playlist.url);
        });
    };
    PlayListProvider.prototype.uploadFile = function () {
        var _this = this;
        return this.androidPermissions.requestPermissions([
            this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
            this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
        ])
            .then(function (result) {
            _this.openFilePicker().then(function (uri) {
                console.log('URI FROM FILEPICKER: ', uri);
                _this.m3uProvider.getPlaylistFromFileSystem(uri).then(function (data) {
                    console.log('DATA FROM BUILD PLAYLIST', data);
                });
            })
                .catch(function (e) { return console.log('FILEPICKER ERR: ', e); });
            /*
              if(result.hasPermission){
                //this.uploadPlaylistToApp()
                console.log("HAS PERMISSIONS")
                this.openFilePicker().then(uri => {
                  console.log('URI FROM FILEPICKER: ',uri)
                  this.m3uProvider.getPlaylistFromFileSystem(uri).then(data=>{
                    console.log('DATA FROM BUILD PLAYLIST', data)
                  })
                })
                .catch(e => console.log('FILEPICKER ERR: ',e));
      
              }else{
                console.log('Before request permission')
                this.androidPermissions.requestPermission( this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE ).then(res =>{
                  console.log('SO...permission?', res)
                  if(res.hasPermission){
                    // this.uploadPlaylistToApp()
                    this.openFilePicker().then(uri => {
                      console.log('URI FROM FILEPICKER: ',uri)
                      this.m3uProvider.getPlaylistFromFileSystem(uri).then(data=>{
                        console.log('DATA FROM BUILD PLAYLIST', data)
                      })
                    })
                    .catch(e => console.log('FILEPICKER ERR: ',e));
                  }
                })
              }
            },
            err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
            */
        });
    };
    PlayListProvider.prototype.openFilePicker = function () {
        return this.fileChooser.open();
    };
    PlayListProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__storage_storage__["a" /* StorageProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_chooser__["a" /* FileChooser */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_android_permissions__["a" /* AndroidPermissions */],
            __WEBPACK_IMPORTED_MODULE_6__m3u8_m3u8__["a" /* M3u8Provider */],
            __WEBPACK_IMPORTED_MODULE_7__loading_loading__["a" /* LoadingProvider */]])
    ], PlayListProvider);
    return PlayListProvider;
}());

//# sourceMappingURL=playlist.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CountriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_m3u8_m3u8__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__channels_channels__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_favorites_favorites__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_video_video__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_toaster_toaster__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_loading_loading__ = __webpack_require__(57);
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
    function CountriesPage(navCtrl, navParams, m3u8Provider, favoritesProvider, videoProvider, toasterProvider, loadingProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.m3u8Provider = m3u8Provider;
        this.favoritesProvider = favoritesProvider;
        this.videoProvider = videoProvider;
        this.toasterProvider = toasterProvider;
        this.loadingProvider = loadingProvider;
        this.data = null;
        this.countries = [];
        this.favorites = [];
        this.userPlaylists = [];
        this.title = '';
        this.playlist = this.navParams.get('data');
        this.title = this.playlist.name;
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
        var loader = this.loadingProvider.presentLoadingDefault('Generating M3U list');
        this.m3u8Provider.getList(url).subscribe(function (data) {
            console.log('retrieve list method: ', data);
            if (data.err) {
                _this.toasterProvider.presentToast('Couldnt load playlist');
                loader.dismiss();
            }
            else {
                _this.data = data;
                _this.countries = data.countries;
                loader.dismiss();
            }
        });
        this.favoritesProvider.list().then(function (data) {
            if (data) {
                _this.favorites = data;
            }
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
            selector: 'page-countries',template:/*ion-inline-start:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/countries/countries.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{title}}</ion-title>\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n    </ion-navbar>\n</ion-header>\n<ion-content class="card-background-page">\n    <!--  -->\n    <ion-slides *ngFor="let item of countries">\n        <ion-slide>\n            <ion-card (click)="goToCountry(item.name)">\n                <div class="image-overlay" [style.background]="\'url(\'+ getFlagUrL(item.name) +\')\'" [style.backgroundSize]="\'cover\'" [style.backgroundPosition]="\'center\'"></div>\n                <!--<img src="assets/imgs/flags/{{ item.name | lowercase }}.jpg"/>-->\n                <div class="card-title">{{ item.name }}</div>\n                <div class="card-subtitle">{{ item.channels }} channels</div>\n            </ion-card>\n        </ion-slide>\n        <ion-slide *ngFor="let fav of favoritesInCountry(item.name)">\n            <ion-card (click)="playChannel(fav)">\n                <div class="image-overlay" [style.background]="\'\'" [style.backgroundSize]="\'cover\'" [style.backgroundPosition]="\'center\'"></div>\n                <!--<img src="assets/imgs/flags/{{ item.name | lowercase }}.jpg"/>-->\n                <div class="card-subtitle"><img class="tv-logo" src="{{fav.tvLogo}}" width="30px"></div>\n                <div class="card-title">{{ fav.tvName }}</div>\n            </ion-card>\n        </ion-slide>\n    </ion-slides>\n\n</ion-content>'/*ion-inline-end:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/countries/countries.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_m3u8_m3u8__["a" /* M3u8Provider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_favorites_favorites__["a" /* FavoritesProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_video_video__["a" /* VideoProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_toaster_toaster__["a" /* ToasterProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_loading_loading__["a" /* LoadingProvider */]])
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_favorites_favorites__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_toaster_toaster__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_video_video__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__channel_channel__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_epg_epg__ = __webpack_require__(119);
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
        navParams, navCtrl, actionSheetCtrl, favorites, toastProvider, videoProvider, epgProvider) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.favorites = favorites;
        this.toastProvider = toastProvider;
        this.videoProvider = videoProvider;
        this.epgProvider = epgProvider;
        this.channels = [];
        this.current = new Date().getTime();
        this.data = this.navParams.get('channels');
        this.title = this.navParams.get('title');
        this.channels = this.data.slice(0, 30);
        this.getCountryEpgList();
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
    ChannelsPage.prototype.getCurrentEPGTimeBar = function (programme) {
        var stop = new Date(programme._stop).getTime();
        var start = new Date(programme._start).getTime();
        var output = Math.floor(((this.current - start) * 100 / (stop - start))).toString() + "%";
        return output;
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
        // Push a new View
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__channel_channel__["a" /* ChannelPage */], { channel: item, list: this.data });
        //this.videoProvider.start(item)
    };
    ChannelsPage.prototype.getCountryEpgList = function () {
        var _this = this;
        this.epgProvider.getCountryEPG(this.title).subscribe(function (data) {
            if (data) {
                var epgList_1 = data;
                _this.data.map(function (el, index) {
                    var channelEpg = epgList_1.channel.filter(function (epg) { return epg._id == el.id; });
                    if (channelEpg) {
                        var programme = epgList_1.programme.filter(function (prog) { return prog._channel == el.id && _this.epgProvider.isEpdDateValid(prog); });
                        _this.data[index].epg = programme;
                    }
                });
                console.log('CHANNELS:', _this.channels);
            }
            else {
                _this.toastProvider.presentToast('Error fetching EPG list');
            }
        });
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
            selector: 'channels',template:/*ion-inline-start:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/channels/channels.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{title}}</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-searchbar (ionInput)="onInput($event)"></ion-searchbar>\n    <ion-list>\n        <ion-item *ngFor="let channel of channels; let i = index" (click)="presentActionSheet(i)" [style.background]="\'url(assets/imgs/fallback.png)\'" [style.backgroundSize]="\'contain\'" [style.backgroundPosition]="\'center center\'" [style.backgroundRepeat]="\'no-repeat\'">\n            <ion-thumbnail item-start [style.background]="\'url(\'+ channel.tvLogo +\')\'" [style.backgroundSize]="\'contain\'" [style.backgroundPosition]="\'center center\'" [style.backgroundColor]="\'rgba(0,0,0,.5)\'" [style.backgroundRepeat]="\'no-repeat\'">\n            </ion-thumbnail>\n            <h2>{{channel.tvName}}</h2>\n            <div *ngIf="channel.epg">\n                <div *ngFor="let programme of channel.epg">\n                    <p>\n                        <ion-icon name="information-circle"></ion-icon> {{programme.title.__text}}\n                    </p>\n                    <div class="timeline" [style.width]="getCurrentEPGTimeBar(programme)"></div>\n                </div>\n            </div>\n            <!--<button ion-button clear item-end (click)="playChannel(channel.url)">View</button>-->\n        </ion-item>\n    </ion-list>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/channels/channels.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_favorites_favorites__["a" /* FavoritesProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_toaster_toaster__["a" /* ToasterProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_video_video__["a" /* VideoProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_epg_epg__["a" /* EpgProvider */]])
    ], ChannelsPage);
    return ChannelsPage;
}());

//# sourceMappingURL=channels.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChannelPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_video_video__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_platform_platform__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChannelPage = (function () {
    function ChannelPage(videoProvider, navParams, plt) {
        this.videoProvider = videoProvider;
        this.navParams = navParams;
        this.plt = plt;
        this.item = this.navParams.get('channel');
        this.list = this.navParams.get('list');
        // this.videoProvider.start(this.item)
    }
    ChannelPage.prototype.ngOnInit = function () { };
    ChannelPage.prototype.playItem = function (item) {
        /*
        this.item = item
        this.player.src('')
        this.player.src({type: 'application/x-mpegURL', src: item.url})
        this.player.play();
        */
    };
    ChannelPage.prototype.startPlayer = function () {
        var _this = this;
        this.plt.ready().then(function (data) {
            if (_this.plt.is('ios')) {
                _this.startVideoJsPlayer();
            }
            else if (_this.plt.is('android')) {
                _this.videoProvider.startExoplayer(_this.item);
            }
            else {
                _this.startVideoJsPlayer();
            }
        });
    };
    ChannelPage.prototype.startVideoJsPlayer = function () {
        var self = this;
        // ID with which to access the template's video element
        var el = 'stream-video';
        var playerInitTime = Date.now();
        // setup the player via the unique element ID
        // html5 for html hls
        this.player = videojs(document.getElementById(el), {
            html5: {
                nativeAudioTracks: false,
                nativeVideoTracks: false,
                hls: {
                    withCredentials: false,
                    overrideNative: true,
                }
            }
        });
        this.player.ready(function () {
            this.src({
                src: 'http://clientportal.link:8080/live/C0HCVMO3025/JcFT4I6502/3227.m3u8',
                type: 'application/x-mpegURL',
            });
        });
    };
    ChannelPage.prototype.ngAfterViewInit = function () {
        this.startPlayer();
    };
    ChannelPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'channel',template:/*ion-inline-start:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/channel/channel.html"*/'<!--<video *ngIf="item.url" id="stream-video" class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9" controls preload="auto" width="640" height="264" autoplay loop>\n</video>-->\n<ion-content>\n\n    <ion-list>\n        <ion-item *ngFor="let channel of list; let i = index" (click)="playItem(channel)" [style.background]="\'url(assets/imgs/fallback.png)\'" [style.backgroundSize]="\'contain\'" [style.backgroundPosition]="\'center center\'" [style.backgroundRepeat]="\'no-repeat\'">\n            <ion-thumbnail item-start [style.background]="\'url(\'+ channel.tvLogo +\')\'" [style.backgroundSize]="\'contain\'" [style.backgroundPosition]="\'center center\'" [style.backgroundRepeat]="\'no-repeat\'">\n            </ion-thumbnail>\n            <h2>{{channel.tvName}}</h2>\n            <!--<button ion-button clear item-end (click)="playChannel(channel.url)">View</button>-->\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/channel/channel.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_video_video__["a" /* VideoProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_platform_platform__["a" /* Platform */]])
    ], ChannelPage);
    return ChannelPage;
}());

//# sourceMappingURL=channel.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DownloadProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_file_transfer__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__toaster_toaster__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DownloadProvider = (function () {
    function DownloadProvider(transfer, file, toasterProvider) {
        this.transfer = transfer;
        this.file = file;
        this.toasterProvider = toasterProvider;
    }
    DownloadProvider.prototype.download = function (url) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            var fileTransfer = _this.transfer.create();
            var fileName = url.split('/');
            fileName = fileName[fileName.length - 1];
            console.log("DOWNLOAD START", fileName, url);
            fileTransfer.download(url, _this.file.dataDirectory + fileName, true).then(function (entry) {
                console.log('download complete: ' + entry.toURL());
                observer.next(entry);
            }, function (error) {
                // handle error
                console.log('Error Download file');
                observer.next(false);
            });
        });
    };
    DownloadProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_4__toaster_toaster__["a" /* ToasterProvider */]])
    ], DownloadProvider);
    return DownloadProvider;
}());

//# sourceMappingURL=download.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(245);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_settings_settings__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_favorites_favorites__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_channel_channel__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_channels_channels__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_streaming_media__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_video_player__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_m3u8_m3u8__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_toaster_toaster__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_favorites_favorites__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_storage__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_android_exoplayer__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_video_video__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_storage_storage__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_playlist_playlist__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_native_storage__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_file_chooser__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_splash_splash__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_android_permissions__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_file__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_screen_orientation__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_countries_countries__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_parser_parser__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_epg_epg__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_download_download__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_file_transfer__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_zip__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__providers_loading_loading__ = __webpack_require__(57);
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
                __WEBPACK_IMPORTED_MODULE_29__pages_countries_countries__["a" /* CountriesPage */],
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
                __WEBPACK_IMPORTED_MODULE_29__pages_countries_countries__["a" /* CountriesPage */],
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
                __WEBPACK_IMPORTED_MODULE_30__providers_parser_parser__["a" /* ParserProvider */],
                __WEBPACK_IMPORTED_MODULE_31__providers_epg_epg__["a" /* EpgProvider */],
                __WEBPACK_IMPORTED_MODULE_32__providers_download_download__["a" /* DownloadProvider */],
                __WEBPACK_IMPORTED_MODULE_33__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_34__ionic_native_zip__["a" /* Zip */],
                __WEBPACK_IMPORTED_MODULE_35__providers_loading_loading__["a" /* LoadingProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_15__providers_m3u8_m3u8__["a" /* M3u8Provider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_splash_splash__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_favorites_favorites__ = __webpack_require__(121);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/app/app.html"*/'<ion-menu [content]="content">\n    <ion-header>\n      <ion-toolbar>\n        <ion-title>IPTV</ion-title>\n        <button ion-button menuToggle>\n            <ion-icon name="close"></ion-icon>\n        </button>\n      </ion-toolbar>\n    </ion-header>\n  \n    <ion-content>\n      <ion-list>\n          <ion-item menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n            <ion-icon name="{{p.icon}}" item-start></ion-icon>\n            {{p.title}}\n          </ion-item>\n      </ion-list>\n    </ion-content>\n  \n  </ion-menu>\n  \n  <!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/app/app.html"*/
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

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_settings__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__favorites_favorites__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(114);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Channels" tabIcon="film"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Favorites" tabIcon="star"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Settings" tabIcon="settings"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
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
  Generated class for the ParserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ParserProvider = (function () {
    function ParserProvider() {
    }
    ParserProvider.prototype.validateFile = function () {
    };
    ParserProvider.prototype.parseM3uOptionsFile = function (text) {
        var arrDirty = text.split('\n');
        var output = {};
        var previous = null;
        arrDirty.forEach(function (el, index) {
            if (index == 0 || el.length < 1)
                return false;
            if (el.match(/ tvg-name="([^"]*)"/) == null && el.indexOf("http") > -1) {
                var previousGroup = output[previous];
                output[previous][previousGroup.length - 1].url = el.toString().replace("\r", "");
                return false;
            }
            // Build object dynamicly
            el = el.replace('#EXTINF:-1 ', '').split(',')[0];
            var attrs = el.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g);
            var options = {};
            attrs.forEach(function (attr) {
                var splited = attr.split('=');
                splited[1] = splited[1].replace(/"/g, '');
                options[splited[0]] = splited[1];
            });
            var elObj = {
                tvId: options['tvg-id'],
                groupName: options['group-title'],
                tvLogo: options['tvg-logo'],
                tvName: options['tvg-name'],
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
        return output;
    };
    ParserProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], ParserProvider);
    return ParserProvider;
}());

//# sourceMappingURL=parser.js.map

/***/ }),

/***/ 33:
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

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return M3u8Provider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_android_permissions__ = __webpack_require__(116);
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
    function M3u8Provider(http, alertCtrl, fileProvider, androidPermissions, storage) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.fileProvider = fileProvider;
        this.androidPermissions = androidPermissions;
        this.storage = storage;
        this.urlStorePrefix = 'url';
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
                    console.log("RESOLVIGN PATH:", val);
                    return _this.fileProvider.getFile(val, fileName, { create: true, exclusive: false });
                }).catch(function (err) { return console.log('ERR resolving dir:', err); });
            }
        });
    };
    // this.storage.get('playlist').then((val) => {})
    M3u8Provider.prototype.getList = function (url) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            // Checks if there is any formated playlist stored
            _this.storage.get(_this.urlStorePrefix + '-' + url).then(function (val) {
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
    M3u8Provider.prototype.validateFile = function (dataArr) {
        if (dataArr.length < 1)
            return false;
        var output;
        switch (true) {
            case dataArr[0].indexOf('#EXTM3U') > -1:
                if (dataArr[1].indexOf('#EXTINF:-1,') > -1, dataArr[1].indexOf('#EXTINF:0,') > -1) {
                    output = this.parseM3uSimple(dataArr);
                }
                else {
                    output = this.parseM3uWithOptions(dataArr);
                }
                break;
        }
        return output;
    };
    M3u8Provider.prototype.convertM3uToJson = function (text, url) {
        var dataArr = text.split('\n');
        var output = this.validateFile(dataArr);
        this.storage.set(this.urlStorePrefix + '-' + url, JSON.stringify(output));
        return output;
    };
    M3u8Provider.prototype.parseM3uWithOptions = function (data) {
        var output = {};
        var previous = null;
        data.forEach(function (el, index) {
            if (index == 0)
                return false;
            if (el.match(/ group-title="([^"]*)"/) == null && el.indexOf("http") > -1) {
                var previousCountry = output[previous];
                output[previous][previousCountry.length - 1].url = el.toString().replace("\r", "");
                return false;
            }
            // Build object dynamicly
            el = el.replace('#EXTINF:-1 ', '').replace('#EXTINF:-0 ', '').split(',')[0];
            var attrs = el.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g);
            var options = {};
            if (!attrs)
                return false;
            attrs.forEach(function (attr) {
                var splited = attr.split('=');
                splited[1] = splited[1].replace(/"/g, '');
                options[splited[0]] = splited[1];
            });
            if (!options['tvg-name'])
                return false;
            var elObj = {
                id: options['tvg-id'],
                groupName: options['group-title'],
                tvLogo: options['tvg-logo'],
                tvName: options['tvg-name'],
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
        return output;
    };
    M3u8Provider.prototype.parseM3uSimple = function (data) {
        var output = {};
        var previous = null;
        data.forEach(function (el, index) {
            if (index == 0)
                return false;
            if (el.match(/#EXTINF:-1,/) == null && el.indexOf("http") > -1) {
                var previousEl = output[previous];
                output[previousEl.length - 1]['url'] = el.toString().replace("\r", "");
                return false;
            }
            var name = el.split('#EXTINF:-1,')[1];
            output.push({ tvName: name });
            previous = index;
        });
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
                            var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
                            var regex = new RegExp(expression);
                            if (data.url.match(regex)) {
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
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_android_permissions__["a" /* AndroidPermissions */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], M3u8Provider);
    return M3u8Provider;
}());

//# sourceMappingURL=m3u8.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_loading_loading_controller__ = __webpack_require__(87);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoadingProvider = (function () {
    function LoadingProvider(loadingCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.timeout = 5000;
    }
    LoadingProvider.prototype.presentLoadingDefault = function (text) {
        var loading = this
            .loadingCtrl
            .create({ content: text });
        loading.present();
        return loading;
    };
    LoadingProvider.prototype.presentLoadingCustom = function () {
        var loading = this
            .loadingCtrl
            .create({ spinner: 'hide', content: "\n            <div class=\"custom-spinner-container\">\n              <div class=\"custom-spinner-box\"></div>\n            </div>", duration: this.timeout });
        loading.onDidDismiss(function () {
            console.log('Dismissed loading');
        });
        loading.present();
    };
    LoadingProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */]])
    ], LoadingProvider);
    return LoadingProvider;
}());

//# sourceMappingURL=loading.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoritesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(44);
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

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_android_exoplayer__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_streaming_media__ = __webpack_require__(118);
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
        /*
        let options = {
            url: 'http://clientportal.link:8080/live/zk5DrRr958/w9MaPr386/3214.m3u8',
            aspectRatio: 'FIT_SCREEN',
            connectTimeout: 1000,
            autoPlay: true,
            controller: { // If this object is not present controller will not be visible
                streamTitle: item.tvName,
                hideProgress: true, // Hide entire progress timebar
                hidePosition: false, // If timebar is visible hide current position from it
                hideDuration: true, // If timebar is visible Hide stream duration from it
                controlIcons: {
                }
            }
        }
        */
        var simpleoptions = {
            url: 'http://clientportal.link:8080/live/C0HCVMO3025/JcFT4I6502/3227.m3u8',
            user_agent: "PluginExoPlayer",
            aspectRatio: 'FILL_SCREEN',
            hideTimeout: 5000,
            autoPlay: true,
            audioOnly: true,
            connectTimeout: 1000,
            readTimeout: 1000,
            writeTimeout: 1000,
            pingInterval: 1000,
            retryCount: 5,
            controller: {
                streamImage: 'http://url.to/channel.png',
                streamTitle: 'Cool channel / movie',
                streamDescription: '2nd line you can use to display whatever you want like current program epg or movie description',
                hideProgress: true,
                hidePosition: false,
                hideDuration: false,
                controlIcons: {
                    'exo_rew': 'http://url.to/rew.png',
                    'exo_play': 'http://url.to/play.png',
                    'exo_pause': 'http://url.to/pause.png',
                    'exo_ffwd': 'http://url.to/ffwd.png'
                }
            }
        };
        return simpleoptions;
    };
    VideoProvider.prototype.start = function (item) {
        var _this = this;
        this.platform.ready().then(function (val) {
            if (val) {
                _this.startExoplayer(item);
                // this.startNativePlayer(item)
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
        var options = this.buildPlayerOptions(item);
        var successCallback = function (json) {
            console.log('PLAYER SUCCESS:', json);
        };
        var errorCallback = function (error) {
            console.log("PLAYER ERRORS:", error);
        };
        window.ExoPlayer.show(options, successCallback, errorCallback);
        /*
         this.androidExoPlayer.show( options )
         .subscribe(res=>{
             if(res){
                 switch(res.eventKeycode){
                     case "KEYCODE_BACK":
                     this.close().then( ()=>{
                         //Navigate back
                     })
                     break;
                 }
         
                 switch(res.eventType){
                     case "TOUCH_EVENT":
                     this.showControlls().then(()=>{
                         // Controlls visible
                     })
                     break;
                 }
             }
             console.log(res)
         });
         */
    };
    VideoProvider.prototype.startNativePlayer = function (item) {
        var options = {
            successCallback: function () {
                console.log('Video played');
            },
            errorCallback: function (e) {
            },
            orientation: 'auto'
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

/***/ })

},[223]);
//# sourceMappingURL=main.js.map