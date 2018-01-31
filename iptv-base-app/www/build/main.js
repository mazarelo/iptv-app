webpackJsonp([0],{

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_playlist_playlist__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__countries_countries__ = __webpack_require__(215);
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


//import { EpgProvider } from '../../providers/epg/epg';
var HomePage = (function () {
    function HomePage(navController, playlistProvider, actionSheetCtrl, 
        //private epgProvider: EpgProvider,
        alertCtrl) {
        var _this = this;
        this.navController = navController;
        this.playlistProvider = playlistProvider;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.activeElement = 0;
        this.allowKeyArrows = true;
        this.countries = [];
        this.favorites = [];
        this.userPlaylists = [];
        this.editMode = false;
        this.playlistProvider.list().subscribe(function (data) {
            _this.userPlaylists = data;
        });
        /* detect orientation changes
          this.screenOrientation.onChange().subscribe(() => {
              console.log("Orientation Changed");
              this.slides.update()
          });
        */
    }
    HomePage.prototype.keyEvents = function (event) {
        console.log(event);
        if (this.allowKeyArrows) {
            event.preventDefault();
            switch (event.keyCode) {
                case 40:
                    this.goDownOnList();
                    break;
                case 38:
                    this.goUpOnList();
                    break;
                case 13:
                    // pressed enter
                    if (this.activeElement !== this.userPlaylists.length) {
                        this.goToPlaylist(this.userPlaylists[this.activeElement]);
                    }
                    else {
                        this.addPlayList();
                    }
                    break;
                case 27:
                case 8:
                    // pressed back btn
                    this.navController.pop();
                    break;
            }
        }
    };
    HomePage.prototype.goUpOnList = function () {
        if (this.activeElement == 0)
            return;
        this.activeElement = this.activeElement - 1;
        console.log('GO UP ON LIST', this.activeElement);
        var target = document.querySelector('.home-item-' + this.activeElement);
        if (target) {
            target.focus();
        }
    };
    HomePage.prototype.goDownOnList = function () {
        if (this.activeElement == this.userPlaylists.length - 1)
            return;
        this.activeElement = this.activeElement + 1;
        console.log('GO DOWN ON LIST', this.activeElement);
        var target = document.querySelector('.home-item-' + this.activeElement);
        if (target) {
            target.focus();
        }
    };
    HomePage.prototype.retrievePlaylists = function () {
        var _this = this;
        this.playlistProvider.list().subscribe(function (response) {
            var data = response;
            if (!data.err) {
                _this.userPlaylists = data;
            }
        });
    };
    HomePage.prototype.goToPlaylist = function (item) {
        if (!this.editMode) {
            this.navController.push(__WEBPACK_IMPORTED_MODULE_3__countries_countries__["a" /* CountriesPage */], {
                data: item,
            });
        }
        else {
            this.promptDeleteConfirmation(item);
        }
    };
    HomePage.prototype.addPlayList = function () {
        var _this = this;
        this.allowKeyArrows = false;
        this.playlistProvider.add().subscribe(function (response) {
            var data = response;
            if (!data.err) {
                _this.userPlaylists.push(data);
            }
            _this.allowKeyArrows = true;
        });
        /*
        this.m3u8Provider.askPlaylistUrlOrFile().subscribe(data=>{
          console.log("data", data)
        })
        */
    };
    HomePage.prototype.promptDeleteConfirmation = function (playlist) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Do you want to delete "' + playlist.name + '" playlist?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        _this.editMode = false;
                        _this.deletePlaylist(playlist);
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.loadPlaylistOptions = function (playlist) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: playlist.name + ' options',
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
                    text: 'Delete Playlist',
                    icon: 'trash',
                    handler: function () {
                        _this.promptDeleteConfirmation(playlist);
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
                    text: 'Delete Playlist',
                    icon: 'trash',
                    handler: function () {
                        _this.editMode = true;
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
        this.focused.nativeElement.focus();
    };
    HomePage.prototype.ionViewWillLeave = function () {
    };
    HomePage.prototype.ionViewDidLoad = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('focused'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "focused", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/home/home.html"*/'<ion-header>\n    <ion-toolbar>\n        <button ion-button menuToggle start>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n        <ion-buttons>\n            <ion-title>Playlists</ion-title>\n        </ion-buttons>\n        <ion-buttons end>\n            <!--<button ion-button icon-only (click)="loadOptions()">\n              <ion-icon name="more"></ion-icon>\n            </button>-->\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content class="card-background-page">\n  <ion-grid >\n    <ion-row #focused tabindex="0" (keydown)="keyEvents($event)" autofocus>\n      <ion-col *ngFor="let playlist of userPlaylists;let i=index;" col-12 col-md-4 col-lg-3 col-xl-2 >\n        <ion-card \n          (tap)="goToPlaylist(playlist)"\n          (press)="loadPlaylistOptions(playlist)"\n          aria-checked="true" tabindex="-1"\n          class="home-item-{{i}}"\n          [ngClass]="{\'editable\': editMode}">\n            <div class="image-overlay"></div>\n            <div class="card-title">{{ playlist.name }}</div>\n            <!--<div class="card-subtitle">{{playlist.url}}</div>-->\n        </ion-card>\n      </ion-col>\n      <ion-col *ngIf="!editMode" col-12 col-md-4 col-lg-3 col-xl-2>\n        <ion-card (click)="addPlayList()" class="card card-md item-{{userPlaylists.length}}" tabindex="1">\n          <div class="image-overlay"></div>\n          <div class="card-title">+</div>\n          <div class="card-subtitle">add playlist</div>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <!--\n    <ion-list>\n        <ion-item-sliding *ngFor="let playlist of userPlaylists">\n            <ion-item (click)="goToPlaylist(playlist)">\n                <h2>\n                    <ion-icon name="list-box"></ion-icon> {{playlist.name}}</h2>\n            </ion-item>\n            <ion-item-options side="right">\n                <button ion-button color="danger" (click)="deletePlaylist(playlist)">Delete</button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n  -->\n</ion-content>'/*ion-inline-end:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_playlist_playlist__["a" /* PlayListProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(45);
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

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return M3u8Provider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_android_permissions__ = __webpack_require__(114);
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
                    try {
                        observer.next(JSON.parse(val));
                    }
                    catch (err) {
                        observer.next({ err: true, message: 'Error parsing json' });
                    }
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
            }, function (err) {
                console.log("Error from Fetch");
                observer.next(false);
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

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_toaster_toaster__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_chooser__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_m3u8_m3u8__ = __webpack_require__(116);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3__providers_toaster_toaster__["a" /* ToasterProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_chooser__["a" /* FileChooser */],
            __WEBPACK_IMPORTED_MODULE_5__providers_m3u8_m3u8__["a" /* M3u8Provider */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoritesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_favorites_favorites__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_toaster_toaster__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__channel_channel__ = __webpack_require__(46);
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
    function FavoritesPage(navCtrl, actionSheetCtrl, favorites, toastProvider) {
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.favorites = favorites;
        this.toastProvider = toastProvider;
        this.channels = [];
        this.data = [];
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
    FavoritesPage.prototype.playChannel = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__channel_channel__["a" /* ChannelPage */], { channel: item, list: this.data });
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
            selector: 'page-favorites',template:/*ion-inline-start:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/favorites/favorites.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Favorites</ion-title>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content\n          pullingText="Pull to refresh"\n          refreshingSpinner="circles"\n          refreshingText="Refreshing...">\n        </ion-refresher-content>\n      </ion-refresher>\n\n   <!-- <ion-searchbar (ionInput)="onInput($event)"></ion-searchbar> -->\n  <ion-list >\n    <feed-item \n          *ngFor="let channel of channels; let i = index;" \n          [obj]="channel" [index]="i"\n          (goToPlayChannel)="playItem($event)"></feed-item>\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/favorites/favorites.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_favorites_favorites__["a" /* FavoritesProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_toaster_toaster__["a" /* ToasterProvider */]])
    ], FavoritesPage);
    return FavoritesPage;
}());

//# sourceMappingURL=favorites.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoritesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(34);
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

/***/ 132:
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
webpackEmptyAsyncContext.id = 132;

/***/ }),

/***/ 171:
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
webpackEmptyAsyncContext.id = 171;

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Splash; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(111);
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
        }, 1000);
    };
    Splash = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-splash',template:/*ion-inline-start:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/splash/splash.html"*/'<ion-content>\n \n    <img src="assets/imgs/splash-screen.png"/>\n \n</ion-content>'/*ion-inline-end:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/splash/splash.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], Splash);
    return Splash;
}());

//# sourceMappingURL=splash.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayListProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storage_storage__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_android_permissions__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_chooser__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__m3u8_m3u8__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__toaster_toaster__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








// import { LoadingProvider } from '../loading/loading';

var PlayListProvider = (function () {
    function PlayListProvider(storage, toastCtrl, alertCtrl, fileChooser, androidPermissions, m3uProvider, 
        // private loadingProvider: LoadingProvider,
        m3u8Provider, toasterProvider) {
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.fileChooser = fileChooser;
        this.androidPermissions = androidPermissions;
        this.m3uProvider = m3uProvider;
        this.m3u8Provider = m3u8Provider;
        this.toasterProvider = toasterProvider;
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
                    /*{
                      text: 'Import File',
                      handler: data => {
                        this.uploadFile().then(data=>{
                          console.log("RETURNED DATA FROM FILE", data)
                        })
                        console.log('file clicked');
                      }
                    },*/
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function (data) {
                            console.log('Cancel clicked');
                            observer.next({ err: true, message: 'canceled' });
                        }
                    },
                    {
                        text: 'Save',
                        handler: function (data) {
                            //let loader = this.loadingProvider.presentLoadingDefault('Downloading M3U list')
                            if (data.playlist.length > 0 && data.url.length > 0) {
                                // Defines playlist structure
                                var newPlaylist_1 = { name: data.playlist, url: data.url, order: 0, type: null, data: null };
                                console.log("PRE-RETRIEVE:", newPlaylist_1);
                                _this.retrieveList(data.url).then(function (response) {
                                    // Stores json response to playlist obj
                                    newPlaylist_1.data = response;
                                    console.log("RETRIEVE DATA:", newPlaylist_1);
                                    return _this.storage.set(_this.playlistPrefix + data.playlist, newPlaylist_1);
                                }).then(function (data) {
                                    console.log("SAVED IN STORAGE:", data);
                                    //loader.dismiss()
                                    observer.next(newPlaylist_1);
                                }).catch(function (err) {
                                    //loader.dismiss()
                                    console.log('Err getting playlist', err);
                                });
                            }
                            else {
                                // invalid data
                                console.log('Invalid data', data);
                                //loader.dismiss()
                                return false;
                            }
                        }
                    }
                ]
            });
            alert.present();
        });
    };
    PlayListProvider.prototype.retrieveList = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //let loader = this.loadingProvider.presentLoadingDefault('Generating M3U list')
            _this.m3u8Provider.getList(url).subscribe(function (data) {
                console.log('retrieve list method: ', data);
                if (data.err) {
                    _this.toasterProvider.presentToast('Couldnt load playlist');
                    //loader.dismiss()
                    resolve(null);
                }
                else {
                    _this.toasterProvider.presentToast('Playlist saved');
                    //loader.dismiss()
                    resolve(data);
                }
            });
            /*
                this.favoritesProvider.list().then(data =>{
                  if(data){
                    this.favorites = data
                  }
                })
            */
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
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_chooser__["a" /* FileChooser */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_android_permissions__["a" /* AndroidPermissions */],
            __WEBPACK_IMPORTED_MODULE_6__m3u8_m3u8__["a" /* M3u8Provider */],
            __WEBPACK_IMPORTED_MODULE_6__m3u8_m3u8__["a" /* M3u8Provider */],
            __WEBPACK_IMPORTED_MODULE_7__toaster_toaster__["a" /* ToasterProvider */]])
    ], PlayListProvider);
    return PlayListProvider;
}());

//# sourceMappingURL=playlist.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CountriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__channels_channels__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_video_video__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_toaster_toaster__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_epg_epg__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import * as m3u from 'm3u8-reader'
// import { M3u8Provider } from '../../providers/m3u8/m3u8'



// import { LoadingProvider } from '../../providers/loading/loading';


var CountriesPage = (function () {
    function CountriesPage(navCtrl, navParams, 
        //  private m3u8Provider: M3u8Provider,
        videoProvider, toasterProvider, 
        //  private loadingProvider: LoadingProvider,
        actionSheetCtrl, epgProvider, navController) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.videoProvider = videoProvider;
        this.toasterProvider = toasterProvider;
        this.actionSheetCtrl = actionSheetCtrl;
        this.epgProvider = epgProvider;
        this.navController = navController;
        this.countries = [];
        this.favorites = [];
        this.userPlaylists = [];
        this.title = '';
        this.activeElement = 0;
        this.playlist = this.navParams.get('data');
        // get playlist url
        this.getDataFromPlaylist(this.playlist);
    }
    CountriesPage.prototype.keyEvents = function (event) {
        event.preventDefault();
        switch (event.keyCode) {
            case 40:
                this.goDownOnList();
                break;
            case 38:
                this.goUpOnList();
                break;
            case 13:
                // pressed enter
                this.goToCountry(this.countries[this.activeElement]);
                break;
            case 27:
            case 8:
                // pressed back btn
                this.navController.pop();
                break;
        }
    };
    CountriesPage.prototype.goUpOnList = function () {
        if (this.activeElement <= 0)
            return;
        this.activeElement = this.activeElement - 1;
        console.log('GO UP ON LIST', this.activeElement);
        var target = document.querySelector('.groups-item-' + this.activeElement);
        if (target) {
            target.focus();
        }
    };
    CountriesPage.prototype.goDownOnList = function () {
        if (this.activeElement == this.userPlaylists.length)
            return;
        this.activeElement = this.activeElement + 1;
        console.log('GO DOWN ON LIST', this.activeElement);
        var target = document.querySelector('.groups-item-' + this.activeElement);
        if (target) {
            target.focus();
        }
    };
    CountriesPage.prototype.getFlagUrL = function (country) {
        return 'assets/imgs/flags/' + country.toLowerCase().replace(' ', '-') + '.jpg';
    };
    CountriesPage.prototype.goToCountry = function (country) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__channels_channels__["a" /* ChannelsPage */], {
            channels: this.playlist.data[country],
            playlist: this.playlist.name,
            title: country
        });
    };
    CountriesPage.prototype.getDataFromPlaylist = function (playlist) {
        this.title = playlist.name;
        if (playlist.data.countries) {
            this.countries = playlist.data.countries;
        }
    };
    /*
    retrieveList(url){
      //let loader = this.loadingProvider.presentLoadingDefault('Generating M3U list')
      this.m3u8Provider.getList(url).subscribe(data =>{
        console.log('retrieve list method: ', data)
        if(data.err){
          this.toasterProvider.presentToast('Couldnt load playlist')
          //loader.dismiss()
        }else{
          this.data = data
          this.countries = data.countries
          //loader.dismiss()
        }
      })
  
      this.favoritesProvider.list().then(data =>{
        if(data){
          this.favorites = data
        }
      })
    }
    */
    CountriesPage.prototype.loadOptions = function (item) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: item.name + ' options',
            subTitle: '',
            buttons: [
                {
                    text: "Add EPG",
                    icon: 'add',
                    handler: function () {
                        _this.epgProvider.addEpg(item.name).subscribe(function (data) {
                            if (data) {
                                _this.toasterProvider.presentToast('EPG added successfully');
                            }
                            else {
                                _this.toasterProvider.presentToast('Failed to add EPG');
                            }
                        });
                    }
                },
                {
                    text: "Clear EPG data",
                    icon: 'trash',
                    handler: function () {
                        _this.epgProvider.remove(item.name).then(function (data) {
                            if (data) {
                                _this.toasterProvider.presentToast('EPG removed successfully');
                            }
                            else {
                                _this.toasterProvider.presentToast('Failed to remove EPG');
                            }
                        });
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
    CountriesPage.prototype.playChannel = function (item) {
        this.videoProvider.start(item);
    };
    CountriesPage.prototype.favoritesInCountry = function (country) {
        return this.favorites.filter(function (item) { return item.groupName == country; });
    };
    CountriesPage.prototype.ngOnInit = function () { };
    CountriesPage.prototype.ionViewWillLeave = function () {
    };
    CountriesPage.prototype.ionViewDidLoad = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */])
    ], CountriesPage.prototype, "slides", void 0);
    CountriesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-countries',template:/*ion-inline-start:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/countries/countries.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-toolbar>\n      <button ion-button menuToggle start>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n      <ion-buttons>\n          <ion-title>{{title}}</ion-title>\n      </ion-buttons>\n      <ion-buttons end>\n      </ion-buttons>\n    </ion-toolbar>\n  </ion-navbar>\n</ion-header>\n<ion-content class="card-background-page">\n    <ion-grid>\n      <ion-row tabindex="0" (keypress)="keyEvents($event)" *ngIf="countries">\n        <ion-col *ngFor="let item of countries; let i=index;" col-12 col-md-4 col-lg-3 col-xl-2 >\n          <ion-card\n            tappable \n            (press)="loadOptions(item)"\n            (tap)="goToCountry(item.name)"\n            class="groups-item-{{i}}"\n            aria-checked="true" tabindex="{{i+1}}">\n              <div class="image-overlay"></div>\n              <div class="card-title">{{ item.name }}</div>\n              <div class="card-subtitle">{{ item.channels }} channels</div>\n          </ion-card>\n      <!--<ion-slide *ngFor="let fav of favoritesInCountry(item.name)">\n          <ion-card\n            tappable\n            (tap)="playChannel(fav)">\n              <div class="image-overlay" [style.background]="\'\'" [style.backgroundSize]="\'cover\'" [style.backgroundPosition]="\'center\'"></div>\n              <div class="card-subtitle"><img class="tv-logo" src="{{fav.tvLogo}}" width="30px"></div>\n              <div class="card-title">{{ fav.tvName }}</div>\n          </ion-card>\n      </ion-slide>-->\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/countries/countries.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_video_video__["a" /* VideoProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_toaster_toaster__["a" /* ToasterProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_epg_epg__["a" /* EpgProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
    ], CountriesPage);
    return CountriesPage;
}());

//# sourceMappingURL=countries.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChannelsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_toaster_toaster__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__channel_channel__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_epg_epg__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_search__ = __webpack_require__(220);
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
        navParams, navCtrl, actionSheetCtrl, toastProvider, epgProvider, navController) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastProvider = toastProvider;
        this.epgProvider = epgProvider;
        this.navController = navController;
        this.activeElement = 0;
        this.channels = [];
        this.amount = 30;
        this.data = this.navParams.get('channels');
        this.title = this.navParams.get('title');
        this.channels = this.data;
        this.getCountryEpgList();
    }
    ChannelsPage.prototype.onKeydownHandler = function (event) {
        event.preventDefault();
        switch (event.keyCode) {
            case 40:
                this.goDownOnList();
                break;
            case 38:
                this.goUpOnList();
                break;
            case 13:
                // pressed enter
                this.playChannel(this.channels[this.activeElement]);
                break;
            case 27:
            case 8:
                // pressed back btn
                this.navController.pop();
                break;
        }
    };
    ChannelsPage.prototype.ionViewDidEnter = function () {
    };
    ChannelsPage.prototype.goUpOnList = function () {
        if (this.activeElement == 0)
            return;
        this.activeElement = this.activeElement - 1;
        var target = document.querySelector('.item-' + this.activeElement);
        target.focus();
    };
    ChannelsPage.prototype.goDownOnList = function () {
        if (this.activeElement == this.channels.length + 1)
            return;
        this.activeElement = this.activeElement + 1;
        var target = document.querySelector('.item-' + this.activeElement);
        target.focus();
    };
    ChannelsPage.prototype.focusFirstElement = function () {
        var target = document.querySelector('.item-0');
        target.focus();
    };
    ChannelsPage.prototype.playChannel = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__channel_channel__["a" /* ChannelPage */], { channel: item, list: this.data });
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
            }
            else {
                _this.toastProvider.presentToast('Error fetching EPG list');
            }
        });
    };
    ChannelsPage.prototype.doInfinite = function (infiniteScroll) {
        this.amount = this.amount + 30;
        infiniteScroll.complete();
    };
    ChannelsPage.prototype.goToSearch = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__search_search__["a" /* SearchPage */], { channels: this.data });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["y" /* HostListener */])('document:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], ChannelsPage.prototype, "onKeydownHandler", null);
    ChannelsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'channels',template:/*ion-inline-start:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/channels/channels.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-toolbar>\n      <button ion-button menuToggle start>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n      <ion-buttons>\n          <ion-title>{{title}}</ion-title>\n      </ion-buttons>\n      <ion-buttons end>\n         <!-- Existing bug caused by data gets weird on player\n          <button ion-button icon-only (tap)="goToSearch()">\n            <ion-icon name="search"></ion-icon>\n          </button> -->\n      </ion-buttons>\n    </ion-toolbar>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-list *ngIf="channels">\n      <div *ngFor="let channel of channels; let i = index;" class="item-wrapper">\n          <feed-item \n            *ngIf="i < amount"\n            [obj]="channel" [index]="i"\n            (goToPlayChannel)="playChannel($event)"\n            ></feed-item>\n            </div>\n    </ion-list>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n   \n</ion-content>'/*ion-inline-end:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/channels/channels.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_toaster_toaster__["a" /* ToasterProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_epg_epg__["a" /* EpgProvider */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["l" /* NavController */]])
    ], ChannelsPage);
    return ChannelsPage;
}());

//# sourceMappingURL=channels.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_components_loading_loading_controller__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import {Observable} from 'rxjs/Observable';
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

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__channel_channel__ = __webpack_require__(46);
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
var SearchPage = (function () {
    //private options: StreamingVideoOptions
    function SearchPage(
        //private streamingMedia: StreamingMedia,
        navParams, navCtrl) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.channels = [];
        this.current = new Date().getTime();
        this.data = this.navParams.get('channels');
        this.channels = this.data.slice(0, 30);
    }
    SearchPage.prototype.initializeItems = function () {
        this.channels = this.data;
    };
    SearchPage.prototype.onInput = function (ev) {
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
    SearchPage.prototype.getCurrentEPGTimeBar = function (programme) {
        var stop = new Date(programme._stop).getTime();
        var start = new Date(programme._start).getTime();
        var output = Math.floor(((this.current - start) * 100 / (stop - start))).toString() + "%";
        return output;
    };
    SearchPage.prototype.playChannel = function (item) {
        // Push a new View
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__channel_channel__["a" /* ChannelPage */], { channel: item, list: this.data });
        //this.videoProvider.start(item)
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'search',template:/*ion-inline-start:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/search/search.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-toolbar>\n      <button ion-button menuToggle start>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n      <ion-buttons>\n          <ion-searchbar (ionInput)="onInput($event)"></ion-searchbar>\n      <!--<ion-buttons end>\n          <button ion-button icon-only (tap)="groupOptions()">\n            <ion-icon name="more"></ion-icon>\n          </button>-->\n      </ion-buttons>\n    </ion-toolbar>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n    <ion-list>\n      <feed-item \n          *ngFor="let channel of channels; let i = index;" \n          [obj]="channel" [index]="i"\n          (goToPlayChannel)="playChannel($event)"\n          ></feed-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/search/search.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
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


var VideoProvider = (function () {
    function VideoProvider(platform) {
        this.platform = platform;
    }
    VideoProvider.prototype.start = function (item) {
        var _this = this;
        this.platform.ready().then(function (val) {
            if (val) {
                _this.playVideoJsHLS(item);
            }
        });
    };
    VideoProvider.prototype.showControlls = function () {
    };
    VideoProvider.prototype.close = function () {
    };
    VideoProvider.prototype.playVideoJsHLS = function (item) {
        // https://github.com/streamroot/videojs5-hlsjs-source-handler
        var options = {
            html5: {
                hlsjsConfig: {
                    debug: false
                }
            }
        };
        var player = videojs('stream-video', options);
        player.qualityPickerPlugin();
        player.ready(function () {
            this.src({
                src: item.url,
                type: "application/x-mpegURL",
            });
        });
    };
    VideoProvider.prototype.startUsingHlsNative = function () {
        if (Hls.isSupported()) {
            var video = document.getElementById('stream-video');
            var hls = new Hls();
            hls.loadSource('http://clientportal.link:8080/live/zk5DrRr958/w9MaPr386/3214.m3u8');
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play();
            });
        }
        else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = 'http://clientportal.link:8080/live/zk5DrRr958/w9MaPr386/3214.m3u8';
            video.addEventListener('canplay', function () {
                video.play();
            });
        }
    };
    VideoProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* Platform */]])
    ], VideoProvider);
    return VideoProvider;
}());

//# sourceMappingURL=video.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EpgModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epg_epg__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_platform_platform__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_controller__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__channel_channel__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_alert_alert_controller__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var EpgModalPage = (function () {
    function EpgModalPage(epgProvider, navParams, viewCtrl, localNotifications, plt, navCtrl, actionSheetCtrl, alertCtrl) {
        var _this = this;
        this.epgProvider = epgProvider;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.localNotifications = localNotifications;
        this.plt = plt;
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.current = new Date().getTime();
        this.item = this.navParams.get('item');
        this.title = this.item.tvName;
        this.plt.ready().then(function (data) {
            _this.localNotifications.on('click', function (notification, state) {
                var data = notification.data;
                if (data) {
                    _this.playChannel(data.channel, []);
                }
            });
        });
    }
    EpgModalPage.prototype.playChannel = function (item, list) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__channel_channel__["a" /* ChannelPage */], { channel: item, list: [] });
    };
    EpgModalPage.prototype.dismiss = function () {
        var data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    };
    EpgModalPage.prototype.isNumber = function (val) {
        return typeof val === 'number';
    };
    EpgModalPage.prototype.convertToPercentage = function (number) {
        return number.toString() + '%';
    };
    EpgModalPage.prototype.epgTargetAlertNotification = function (epg) {
        var _this = this;
        this.localNotifications.hasPermission().then(function (data) {
            if (data) {
                _this.sendNotification(_this.title, epg, 10);
            }
            else {
                _this.localNotifications.registerPermission().then(function (data) {
                    if (data) {
                        _this.sendNotification(_this.title, epg, 10);
                    }
                });
            }
        });
    };
    EpgModalPage.prototype.sendNotification = function (channel, epg, delay) {
        var minToMiliseconds = delay * 60 * 1000;
        var showOnDate = new Date(new Date(epg._start).getTime() - minToMiliseconds);
        showOnDate = new Date(new Date().getTime());
        if (new Date(epg._start).getTime() + minToMiliseconds >= new Date().getTime()) {
            this.localNotifications.schedule({
                id: 0,
                text: "\"" + epg.title.__text + "\" starts in " + delay.toString() + "min",
                at: showOnDate,
                led: 'FF0000',
                sound: null,
                badge: 1,
                data: { channel: this.item }
            });
        }
    };
    EpgModalPage.prototype.ngOnInit = function () {
        var _this = this;
        this.epgProvider.getChannelEPG(this.item.id, this.item.groupName).subscribe(function (data) {
            var response = data;
            /*
            response.sort( el=>{
              return new Date(el._start).getTime()
            })
            */
            response.forEach(function (el) {
                el.current = false;
                el.status = _this.getCurrentEPGTimeBar(el);
                if (typeof el.status == 'number') {
                    el.current = true;
                }
            });
            _this.epgData = data;
        });
    };
    EpgModalPage.prototype.getCurrentEPGTimeBar = function (programme) {
        var stop = new Date(programme._stop).getTime();
        var start = new Date(programme._start).getTime();
        var output = Math.floor(((this.current - start) * 100 / (stop - start)));
        if (output >= 100) {
            return 'ENDED';
        }
        else if (output < 0) {
            return 'UP COMMING';
        }
        else {
            return output;
        }
    };
    EpgModalPage.prototype.epgOptions = function (epg) {
        var _this = this;
        var item = epg;
        var actionSheet = this.actionSheetCtrl.create({
            title: item.title.__text,
            subTitle: null,
            buttons: [
                {
                    text: "Create alert",
                    icon: 'alarm',
                    handler: function () {
                        _this.presentConfirm(epg);
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
    EpgModalPage.prototype.presentConfirm = function (epg) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm alert',
            message: 'You will be notified 10min before the programme.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: function () {
                        _this.epgTargetAlertNotification(epg);
                    }
                }
            ]
        });
        alert.present();
    };
    EpgModalPage.prototype.presentOptions = function () {
    };
    EpgModalPage.prototype.ionViewWillLeave = function () {
    };
    EpgModalPage.prototype.ionViewDidLoad = function () {
    };
    EpgModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'modal-epg',template:/*ion-inline-start:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/epg/epg.html"*/'\n<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      {{title}} - Programme\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n      <div *ngFor="let epg of epgData" class="epg-item-wrapper">\n          <ion-item *ngIf="epg.status !==\'ENDED\'" [ngClass]="{\'innactive\': epg.status == \'UP COMMING\'}" (tap)="epgOptions(epg)">\n            <h2>{{epg.title.__text}}</h2>\n            <p>\n              <ion-icon name="information-circle" *ngIf="epg.desc"> {{epg.desc.__text}}</ion-icon> \n            </p>\n            <div *ngIf="epg.current" class="timeline">\n              <div class="progress" [style.width]="convertToPercentage(epg.status)"></div>\n            </div>\n              \n            <div class="epg-status" *ngIf="!epg.current">{{epg.status}}</div>\n            <p class="epg-hours">\n              <span>{{epg._start  | date : \'shortTime\'}}</span>\n              -\n              <span>{{epg._stop  | date : \'shortTime\'}}</span>\n            </p>\n        </ion-item>\n      </div>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/epg/epg.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_epg_epg__["a" /* EpgProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular_platform_platform__["a" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_controller__["a" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], EpgModalPage);
    return EpgModalPage;
}());

//# sourceMappingURL=epg.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(246);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_settings_settings__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_favorites_favorites__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_channel_channel__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_channels_channels__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_search_search__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_common_http__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_streaming_media__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_video_player__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_m3u8_m3u8__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_toaster_toaster__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_favorites_favorites__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_storage__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_android_exoplayer__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_video_video__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_storage_storage__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_playlist_playlist__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_native_storage__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_file_chooser__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_splash_splash__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_android_permissions__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_file__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_screen_orientation__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_countries_countries__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_parser_parser__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_epg_epg__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__providers_download_download__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_loading_loading__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__directives_longpress_longpress__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__directives_feed_item_feed_item__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__directives_virtual_list_image_virtual_list_image__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_insomnia__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_epg_epg__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_native_local_notifications__ = __webpack_require__(223);
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
                __WEBPACK_IMPORTED_MODULE_10__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_splash_splash__["a" /* Splash */],
                __WEBPACK_IMPORTED_MODULE_30__pages_countries_countries__["a" /* CountriesPage */],
                __WEBPACK_IMPORTED_MODULE_35__directives_longpress_longpress__["a" /* PressDirective */],
                __WEBPACK_IMPORTED_MODULE_36__directives_feed_item_feed_item__["a" /* FeedItemComponent */],
                __WEBPACK_IMPORTED_MODULE_37__directives_virtual_list_image_virtual_list_image__["a" /* VirtualIonImg */],
                __WEBPACK_IMPORTED_MODULE_39__pages_epg_epg__["a" /* EpgModalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_13__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_19__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_favorites_favorites__["a" /* FavoritesPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_channel_channel__["a" /* ChannelPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_channels_channels__["a" /* ChannelsPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_splash_splash__["a" /* Splash */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_countries_countries__["a" /* CountriesPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_epg_epg__["a" /* EpgModalPage */],
                __WEBPACK_IMPORTED_MODULE_36__directives_feed_item_feed_item__["a" /* FeedItemComponent */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_streaming_media__["a" /* StreamingMedia */],
                __WEBPACK_IMPORTED_MODULE_18__providers_favorites_favorites__["a" /* FavoritesProvider */],
                __WEBPACK_IMPORTED_MODULE_17__providers_toaster_toaster__["a" /* ToasterProvider */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_video_player__["a" /* VideoPlayer */],
                __WEBPACK_IMPORTED_MODULE_13__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_android_exoplayer__["a" /* AndroidExoplayer */],
                __WEBPACK_IMPORTED_MODULE_21__providers_video_video__["a" /* VideoProvider */],
                __WEBPACK_IMPORTED_MODULE_22__providers_storage_storage__["a" /* StorageProvider */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_native_storage__["a" /* NativeStorage */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_file_chooser__["a" /* FileChooser */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_23__providers_playlist_playlist__["a" /* PlayListProvider */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_android_permissions__["a" /* AndroidPermissions */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
                __WEBPACK_IMPORTED_MODULE_31__providers_parser_parser__["a" /* ParserProvider */],
                __WEBPACK_IMPORTED_MODULE_32__providers_epg_epg__["a" /* EpgProvider */],
                __WEBPACK_IMPORTED_MODULE_33__providers_download_download__["a" /* DownloadProvider */],
                __WEBPACK_IMPORTED_MODULE_34__providers_loading_loading__["a" /* LoadingProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_16__providers_m3u8_m3u8__["a" /* M3u8Provider */],
                __WEBPACK_IMPORTED_MODULE_38__ionic_native_insomnia__["a" /* Insomnia */],
                __WEBPACK_IMPORTED_MODULE_40__ionic_native_local_notifications__["a" /* LocalNotifications */],
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_splash_splash__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_favorites_favorites__ = __webpack_require__(119);
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
    function MyApp(platform, statusBar, splashScreen, modalCtrl, app, alertCtrl) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.modalCtrl = modalCtrl;
        this.app = app;
        this.alertCtrl = alertCtrl;
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
            _this.statusBar.backgroundColorByHexString('#43738d');
            //this.statusBar.show();
            var splash = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_splash_splash__["a" /* Splash */]);
            splash.present();
        });
    };
    MyApp.prototype.backButtonInit = function () {
        var _this = this;
        this.platform.registerBackButtonAction(function () {
            var nav = _this.app.getActiveNavs()[0];
            var activeView = nav.getActive();
            if (activeView.name === "FirstPage") {
                if (nav.canGoBack()) {
                    nav.pop();
                }
                else {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'App termination',
                        message: 'Do you want to close the app?',
                        buttons: [{
                                text: 'Cancel',
                                role: 'cancel',
                                handler: function () {
                                    console.log('Application exit prevented!');
                                }
                            }, {
                                text: 'Close App',
                                handler: function () {
                                    _this.platform.exitApp(); // Close this application
                                }
                            }]
                    });
                    alert_1.present();
                }
            }
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/app/app.html"*/'<ion-menu [content]="content">\n    <ion-header>\n      <ion-toolbar>\n        <ion-title>IPTV</ion-title>\n        <button ion-button menuToggle>\n            <ion-icon name="close"></ion-icon>\n        </button>\n      </ion-toolbar>\n    </ion-header>\n  \n    <ion-content>\n      <ion-list>\n          <ion-item menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n            <ion-icon name="{{p.icon}}" item-start></ion-icon>\n            {{p.title}}\n          </ion-item>\n      </ion-list>\n    </ion-content>\n  \n  </ion-menu>\n  \n  <!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToasterProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]])
    ], ToasterProvider);
    return ToasterProvider;
}());

//# sourceMappingURL=toaster.js.map

/***/ }),

/***/ 304:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/**
 * @license
 * Video.js 5.0.2 <http://videojs.com/>
 * Copyright Brightcove, Inc. <https://www.brightcove.com/>
 * Available under Apache License Version 2.0
 * <https://github.com/videojs/video.js/blob/master/LICENSE>
 *
 * Includes vtt.js <https://github.com/mozilla/vtt.js>
 * Available under Apache License Version 2.0
 * <https://github.com/mozilla/vtt.js/blob/master/LICENSE>
 */
!function(a){if(true)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.videojs=a()}}(function(){var a;return function b(a,c,d){function e(g,h){if(!c[g]){if(!a[g]){var i="function"==typeof require&&require;if(!h&&i)return require(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};a[g][0].call(k.exports,function(b){var c=a[g][1][b];return e(c?c:b)},k,k.exports,b,a,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){(function(c){var d="undefined"!=typeof c?c:"undefined"!=typeof window?window:{},e=a("min-document");if("undefined"!=typeof document)b.exports=document;else{var f=d["__GLOBAL_DOCUMENT_CACHE@4"];f||(f=d["__GLOBAL_DOCUMENT_CACHE@4"]=e),b.exports=f}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"min-document":3}],2:[function(a,b){(function(a){b.exports="undefined"!=typeof window?window:"undefined"!=typeof a?a:"undefined"!=typeof self?self:{}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],3:[function(){},{}],4:[function(a,b){var c=a("../internal/getNative"),d=c(Date,"now"),e=d||function(){return(new Date).getTime()};b.exports=e},{"../internal/getNative":20}],5:[function(a,b){function c(a,b,c){function h(){r&&clearTimeout(r),n&&clearTimeout(n),t=0,n=r=s=void 0}function i(b,c){c&&clearTimeout(c),n=r=s=void 0,b&&(t=e(),o=a.apply(q,m),r||n||(m=q=void 0))}function j(){var a=b-(e()-p);0>=a||a>b?i(s,n):r=setTimeout(j,a)}function k(){i(v,r)}function l(){if(m=arguments,p=e(),q=this,s=v&&(r||!w),u===!1)var c=w&&!r;else{n||w||(t=p);var d=u-(p-t),f=0>=d||d>u;f?(n&&(n=clearTimeout(n)),t=p,o=a.apply(q,m)):n||(n=setTimeout(k,d))}return f&&r?r=clearTimeout(r):r||b===u||(r=setTimeout(j,b)),c&&(f=!0,o=a.apply(q,m)),!f||r||n||(m=q=void 0),o}var m,n,o,p,q,r,s,t=0,u=!1,v=!0;if("function"!=typeof a)throw new TypeError(f);if(b=0>b?0:+b||0,c===!0){var w=!0;v=!1}else d(c)&&(w=!!c.leading,u="maxWait"in c&&g(+c.maxWait||0,b),v="trailing"in c?!!c.trailing:v);return l.cancel=h,l}var d=a("../lang/isObject"),e=a("../date/now"),f="Expected a function",g=Math.max;b.exports=c},{"../date/now":4,"../lang/isObject":33}],6:[function(a,b){function c(a,b){if("function"!=typeof a)throw new TypeError(d);return b=e(void 0===b?a.length-1:+b||0,0),function(){for(var c=arguments,d=-1,f=e(c.length-b,0),g=Array(f);++d<f;)g[d]=c[b+d];switch(b){case 0:return a.call(this,g);case 1:return a.call(this,c[0],g);case 2:return a.call(this,c[0],c[1],g)}var h=Array(b+1);for(d=-1;++d<b;)h[d]=c[d];return h[b]=g,a.apply(this,h)}}var d="Expected a function",e=Math.max;b.exports=c},{}],7:[function(a,b){function c(a,b,c){var g=!0,h=!0;if("function"!=typeof a)throw new TypeError(f);return c===!1?g=!1:e(c)&&(g="leading"in c?!!c.leading:g,h="trailing"in c?!!c.trailing:h),d(a,b,{leading:g,maxWait:+b,trailing:h})}var d=a("./debounce"),e=a("../lang/isObject"),f="Expected a function";b.exports=c},{"../lang/isObject":33,"./debounce":5}],8:[function(a,b){function c(a,b){var c=-1,d=a.length;for(b||(b=Array(d));++c<d;)b[c]=a[c];return b}b.exports=c},{}],9:[function(a,b){function c(a,b){for(var c=-1,d=a.length;++c<d&&b(a[c],c,a)!==!1;);return a}b.exports=c},{}],10:[function(a,b){function c(a,b,c){c||(c={});for(var d=-1,e=b.length;++d<e;){var f=b[d];c[f]=a[f]}return c}b.exports=c},{}],11:[function(a,b){var c=a("./createBaseFor"),d=c();b.exports=d},{"./createBaseFor":18}],12:[function(a,b){function c(a,b){return d(a,b,e)}var d=a("./baseFor"),e=a("../object/keysIn");b.exports=c},{"../object/keysIn":39,"./baseFor":11}],13:[function(a,b){function c(a,b,l,m,n){if(!h(a))return a;var o=g(b)&&(f(b)||j(b)),p=o?void 0:k(b);return d(p||b,function(d,f){if(p&&(f=d,d=b[f]),i(d))m||(m=[]),n||(n=[]),e(a,b,f,c,l,m,n);else{var g=a[f],h=l?l(g,d,f,a,b):void 0,j=void 0===h;j&&(h=d),void 0===h&&(!o||f in a)||!j&&(h===h?h===g:g!==g)||(a[f]=h)}}),a}var d=a("./arrayEach"),e=a("./baseMergeDeep"),f=a("../lang/isArray"),g=a("./isArrayLike"),h=a("../lang/isObject"),i=a("./isObjectLike"),j=a("../lang/isTypedArray"),k=a("../object/keys");b.exports=c},{"../lang/isArray":30,"../lang/isObject":33,"../lang/isTypedArray":36,"../object/keys":38,"./arrayEach":9,"./baseMergeDeep":14,"./isArrayLike":21,"./isObjectLike":26}],14:[function(a,b){function c(a,b,c,k,l,m,n){for(var o=m.length,p=b[c];o--;)if(m[o]==p)return void(a[c]=n[o]);var q=a[c],r=l?l(q,p,c,a,b):void 0,s=void 0===r;s&&(r=p,g(p)&&(f(p)||i(p))?r=f(q)?q:g(q)?d(q):[]:h(p)||e(p)?r=e(q)?j(q):h(q)?q:{}:s=!1),m.push(p),n.push(r),s?a[c]=k(r,p,l,m,n):(r===r?r!==q:q===q)&&(a[c]=r)}var d=a("./arrayCopy"),e=a("../lang/isArguments"),f=a("../lang/isArray"),g=a("./isArrayLike"),h=a("../lang/isPlainObject"),i=a("../lang/isTypedArray"),j=a("../lang/toPlainObject");b.exports=c},{"../lang/isArguments":29,"../lang/isArray":30,"../lang/isPlainObject":34,"../lang/isTypedArray":36,"../lang/toPlainObject":37,"./arrayCopy":8,"./isArrayLike":21}],15:[function(a,b){function c(a){return function(b){return null==b?void 0:d(b)[a]}}var d=a("./toObject");b.exports=c},{"./toObject":28}],16:[function(a,b){function c(a,b,c){if("function"!=typeof a)return d;if(void 0===b)return a;switch(c){case 1:return function(c){return a.call(b,c)};case 3:return function(c,d,e){return a.call(b,c,d,e)};case 4:return function(c,d,e,f){return a.call(b,c,d,e,f)};case 5:return function(c,d,e,f,g){return a.call(b,c,d,e,f,g)}}return function(){return a.apply(b,arguments)}}var d=a("../utility/identity");b.exports=c},{"../utility/identity":42}],17:[function(a,b){function c(a){return f(function(b,c){var f=-1,g=null==b?0:c.length,h=g>2?c[g-2]:void 0,i=g>2?c[2]:void 0,j=g>1?c[g-1]:void 0;for("function"==typeof h?(h=d(h,j,5),g-=2):(h="function"==typeof j?j:void 0,g-=h?1:0),i&&e(c[0],c[1],i)&&(h=3>g?void 0:h,g=1);++f<g;){var k=c[f];k&&a(b,k,h)}return b})}var d=a("./bindCallback"),e=a("./isIterateeCall"),f=a("../function/restParam");b.exports=c},{"../function/restParam":6,"./bindCallback":16,"./isIterateeCall":24}],18:[function(a,b){function c(a){return function(b,c,e){for(var f=d(b),g=e(b),h=g.length,i=a?h:-1;a?i--:++i<h;){var j=g[i];if(c(f[j],j,f)===!1)break}return b}}var d=a("./toObject");b.exports=c},{"./toObject":28}],19:[function(a,b){var c=a("./baseProperty"),d=c("length");b.exports=d},{"./baseProperty":15}],20:[function(a,b){function c(a,b){var c=null==a?void 0:a[b];return d(c)?c:void 0}var d=a("../lang/isNative");b.exports=c},{"../lang/isNative":32}],21:[function(a,b){function c(a){return null!=a&&e(d(a))}var d=a("./getLength"),e=a("./isLength");b.exports=c},{"./getLength":19,"./isLength":25}],22:[function(a,b){var c=function(){try{Object({toString:0}+"")}catch(a){return function(){return!1}}return function(a){return"function"!=typeof a.toString&&"string"==typeof(a+"")}}();b.exports=c},{}],23:[function(a,b){function c(a,b){return a="number"==typeof a||d.test(a)?+a:-1,b=null==b?e:b,a>-1&&a%1==0&&b>a}var d=/^\d+$/,e=9007199254740991;b.exports=c},{}],24:[function(a,b){function c(a,b,c){if(!f(c))return!1;var g=typeof b;if("number"==g?d(c)&&e(b,c.length):"string"==g&&b in c){var h=c[b];return a===a?a===h:h!==h}return!1}var d=a("./isArrayLike"),e=a("./isIndex"),f=a("../lang/isObject");b.exports=c},{"../lang/isObject":33,"./isArrayLike":21,"./isIndex":23}],25:[function(a,b){function c(a){return"number"==typeof a&&a>-1&&a%1==0&&d>=a}var d=9007199254740991;b.exports=c},{}],26:[function(a,b){function c(a){return!!a&&"object"==typeof a}b.exports=c},{}],27:[function(a,b){function c(a){for(var b=i(a),c=b.length,j=c&&a.length,l=!!j&&g(j)&&(e(a)||d(a)||h(a)),m=-1,n=[];++m<c;){var o=b[m];(l&&f(o,j)||k.call(a,o))&&n.push(o)}return n}var d=a("../lang/isArguments"),e=a("../lang/isArray"),f=a("./isIndex"),g=a("./isLength"),h=a("../lang/isString"),i=a("../object/keysIn"),j=Object.prototype,k=j.hasOwnProperty;b.exports=c},{"../lang/isArguments":29,"../lang/isArray":30,"../lang/isString":35,"../object/keysIn":39,"./isIndex":23,"./isLength":25}],28:[function(a,b){function c(a){if(f.unindexedChars&&e(a)){for(var b=-1,c=a.length,g=Object(a);++b<c;)g[b]=a.charAt(b);return g}return d(a)?a:Object(a)}var d=a("../lang/isObject"),e=a("../lang/isString"),f=a("../support");b.exports=c},{"../lang/isObject":33,"../lang/isString":35,"../support":41}],29:[function(a,b){function c(a){return e(a)&&d(a)&&g.call(a,"callee")&&!h.call(a,"callee")}var d=a("../internal/isArrayLike"),e=a("../internal/isObjectLike"),f=Object.prototype,g=f.hasOwnProperty,h=f.propertyIsEnumerable;b.exports=c},{"../internal/isArrayLike":21,"../internal/isObjectLike":26}],30:[function(a,b){var c=a("../internal/getNative"),d=a("../internal/isLength"),e=a("../internal/isObjectLike"),f="[object Array]",g=Object.prototype,h=g.toString,i=c(Array,"isArray"),j=i||function(a){return e(a)&&d(a.length)&&h.call(a)==f};b.exports=j},{"../internal/getNative":20,"../internal/isLength":25,"../internal/isObjectLike":26}],31:[function(a,b){function c(a){return d(a)&&g.call(a)==e}var d=a("./isObject"),e="[object Function]",f=Object.prototype,g=f.toString;b.exports=c},{"./isObject":33}],32:[function(a,b){function c(a){return null==a?!1:d(a)?k.test(i.call(a)):f(a)&&(e(a)?k:g).test(a)}var d=a("./isFunction"),e=a("../internal/isHostObject"),f=a("../internal/isObjectLike"),g=/^\[object .+?Constructor\]$/,h=Object.prototype,i=Function.prototype.toString,j=h.hasOwnProperty,k=RegExp("^"+i.call(j).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");b.exports=c},{"../internal/isHostObject":22,"../internal/isObjectLike":26,"./isFunction":31}],33:[function(a,b){function c(a){var b=typeof a;return!!a&&("object"==b||"function"==b)}b.exports=c},{}],34:[function(a,b){function c(a){var b;if(!g(a)||l.call(a)!=i||f(a)||e(a)||!k.call(a,"constructor")&&(b=a.constructor,"function"==typeof b&&!(b instanceof b)))return!1;var c;return h.ownLast?(d(a,function(a,b,d){return c=k.call(d,b),!1}),c!==!1):(d(a,function(a,b){c=b}),void 0===c||k.call(a,c))}var d=a("../internal/baseForIn"),e=a("./isArguments"),f=a("../internal/isHostObject"),g=a("../internal/isObjectLike"),h=a("../support"),i="[object Object]",j=Object.prototype,k=j.hasOwnProperty,l=j.toString;b.exports=c},{"../internal/baseForIn":12,"../internal/isHostObject":22,"../internal/isObjectLike":26,"../support":41,"./isArguments":29}],35:[function(a,b){function c(a){return"string"==typeof a||d(a)&&g.call(a)==e}var d=a("../internal/isObjectLike"),e="[object String]",f=Object.prototype,g=f.toString;b.exports=c},{"../internal/isObjectLike":26}],36:[function(a,b){function c(a){return e(a)&&d(a.length)&&!!C[E.call(a)]}var d=a("../internal/isLength"),e=a("../internal/isObjectLike"),f="[object Arguments]",g="[object Array]",h="[object Boolean]",i="[object Date]",j="[object Error]",k="[object Function]",l="[object Map]",m="[object Number]",n="[object Object]",o="[object RegExp]",p="[object Set]",q="[object String]",r="[object WeakMap]",s="[object ArrayBuffer]",t="[object Float32Array]",u="[object Float64Array]",v="[object Int8Array]",w="[object Int16Array]",x="[object Int32Array]",y="[object Uint8Array]",z="[object Uint8ClampedArray]",A="[object Uint16Array]",B="[object Uint32Array]",C={};C[t]=C[u]=C[v]=C[w]=C[x]=C[y]=C[z]=C[A]=C[B]=!0,C[f]=C[g]=C[s]=C[h]=C[i]=C[j]=C[k]=C[l]=C[m]=C[n]=C[o]=C[p]=C[q]=C[r]=!1;var D=Object.prototype,E=D.toString;b.exports=c},{"../internal/isLength":25,"../internal/isObjectLike":26}],37:[function(a,b){function c(a){return d(a,e(a))}var d=a("../internal/baseCopy"),e=a("../object/keysIn");b.exports=c},{"../internal/baseCopy":10,"../object/keysIn":39}],38:[function(a,b){var c=a("../internal/getNative"),d=a("../internal/isArrayLike"),e=a("../lang/isObject"),f=a("../internal/shimKeys"),g=a("../support"),h=c(Object,"keys"),i=h?function(a){var b=null==a?void 0:a.constructor;return"function"==typeof b&&b.prototype===a||("function"==typeof a?g.enumPrototypes:d(a))?f(a):e(a)?h(a):[]}:f;b.exports=i},{"../internal/getNative":20,"../internal/isArrayLike":21,"../internal/shimKeys":27,"../lang/isObject":33,"../support":41}],39:[function(a,b){function c(a){if(null==a)return[];j(a)||(a=Object(a));var b=a.length;b=b&&i(b)&&(f(a)||e(a)||k(a))&&b||0;for(var c=a.constructor,d=-1,m=g(c)&&c.prototype||x,n=m===a,o=Array(b),q=b>0,r=l.enumErrorProps&&(a===w||a instanceof Error),t=l.enumPrototypes&&g(a);++d<b;)o[d]=d+"";for(var C in a)t&&"prototype"==C||r&&("message"==C||"name"==C)||q&&h(C,b)||"constructor"==C&&(n||!z.call(a,C))||o.push(C);if(l.nonEnumShadows&&a!==x){var D=a===y?u:a===w?p:A.call(a),E=B[D]||B[s];for(D==s&&(m=x),b=v.length;b--;){C=v[b];var F=E[C];n&&F||(F?!z.call(a,C):a[C]===m[C])||o.push(C)}}return o}var d=a("../internal/arrayEach"),e=a("../lang/isArguments"),f=a("../lang/isArray"),g=a("../lang/isFunction"),h=a("../internal/isIndex"),i=a("../internal/isLength"),j=a("../lang/isObject"),k=a("../lang/isString"),l=a("../support"),m="[object Array]",n="[object Boolean]",o="[object Date]",p="[object Error]",q="[object Function]",r="[object Number]",s="[object Object]",t="[object RegExp]",u="[object String]",v=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],w=Error.prototype,x=Object.prototype,y=String.prototype,z=x.hasOwnProperty,A=x.toString,B={};B[m]=B[o]=B[r]={constructor:!0,toLocaleString:!0,toString:!0,valueOf:!0},B[n]=B[u]={constructor:!0,toString:!0,valueOf:!0},B[p]=B[q]=B[t]={constructor:!0,toString:!0},B[s]={constructor:!0},d(v,function(a){for(var b in B)if(z.call(B,b)){var c=B[b];c[a]=z.call(c,a)}}),b.exports=c},{"../internal/arrayEach":9,"../internal/isIndex":23,"../internal/isLength":25,"../lang/isArguments":29,"../lang/isArray":30,"../lang/isFunction":31,"../lang/isObject":33,"../lang/isString":35,"../support":41}],40:[function(a,b){var c=a("../internal/baseMerge"),d=a("../internal/createAssigner"),e=d(c);b.exports=e},{"../internal/baseMerge":13,"../internal/createAssigner":17}],41:[function(a,b){var c=Array.prototype,d=Error.prototype,e=Object.prototype,f=e.propertyIsEnumerable,g=c.splice,h={};!function(a){var b=function(){this.x=a},c={0:a,length:a},e=[];b.prototype={valueOf:a,y:a};for(var i in new b)e.push(i);h.enumErrorProps=f.call(d,"message")||f.call(d,"name"),h.enumPrototypes=f.call(b,"prototype"),h.nonEnumShadows=!/valueOf/.test(e),h.ownLast="x"!=e[0],h.spliceObjects=(g.call(c,0,1),!c[0]),h.unindexedChars="x"[0]+Object("x")[0]!="xx"}(1,0),b.exports=h},{}],42:[function(a,b){function c(a){return a}b.exports=c},{}],43:[function(a,b){"use strict";var c=a("object-keys");b.exports=function(){if("function"!=typeof Symbol||"function"!=typeof Object.getOwnPropertySymbols)return!1;if("symbol"==typeof Symbol.iterator)return!0;var a={},b=Symbol("test");if("string"==typeof b)return!1;if(b instanceof Symbol)return!1;a[b]=42;for(b in a)return!1;if(0!==c(a).length)return!1;if("function"==typeof Object.keys&&0!==Object.keys(a).length)return!1;if("function"==typeof Object.getOwnPropertyNames&&0!==Object.getOwnPropertyNames(a).length)return!1;var d=Object.getOwnPropertySymbols(a);if(1!==d.length||d[0]!==b)return!1;if(!Object.prototype.propertyIsEnumerable.call(a,b))return!1;if("function"==typeof Object.getOwnPropertyDescriptor){var e=Object.getOwnPropertyDescriptor(a,b);if(42!==e.value||e.enumerable!==!0)return!1}return!0}},{"object-keys":49}],44:[function(a,b){"use strict";var c=a("object-keys"),d=a("function-bind"),e=function(a){return"undefined"!=typeof a&&null!==a},f=a("./hasSymbols")(),g=Object,h=d.call(Function.call,Array.prototype.push),i=d.call(Function.call,Object.prototype.propertyIsEnumerable);b.exports=function(a){if(!e(a))throw new TypeError("target must be an object");var b,d,j,k,l,m=g(a);for(b=1;b<arguments.length;++b){if(d=g(arguments[b]),k=c(d),f&&Object.getOwnPropertySymbols)for(l=Object.getOwnPropertySymbols(d),j=0;j<l.length;++j)i(d,l[j])&&h(k,l[j]);for(j=0;j<k.length;++j)m[k[j]]=d[k[j]]}return m}},{"./hasSymbols":43,"function-bind":48,"object-keys":49}],45:[function(a,b){"use strict";var c=a("define-properties"),d=a("./implementation"),e=a("./polyfill"),f=a("./shim");c(d,{implementation:d,getPolyfill:e,shim:f}),b.exports=d},{"./implementation":44,"./polyfill":51,"./shim":52,"define-properties":46}],46:[function(a,b){"use strict";var c=a("object-keys"),d=a("foreach"),e="function"==typeof Symbol&&"symbol"==typeof Symbol(),f=Object.prototype.toString,g=function(a){return"function"==typeof a&&"[object Function]"===f.call(a)},h=function(){var a={};try{Object.defineProperty(a,"x",{enumerable:!1,value:a});for(var b in a)return!1;return a.x===a}catch(c){return!1}},i=Object.defineProperty&&h(),j=function(a,b,c,d){(!(b in a)||g(d)&&d())&&(i?Object.defineProperty(a,b,{configurable:!0,enumerable:!1,value:c,writable:!0}):a[b]=c)},k=function(a,b){var f=arguments.length>2?arguments[2]:{},g=c(b);e&&(g=g.concat(Object.getOwnPropertySymbols(b))),d(g,function(c){j(a,c,b[c],f[c])})};k.supportsDescriptors=!!i,b.exports=k},{foreach:47,"object-keys":49}],47:[function(a,b){var c=Object.prototype.hasOwnProperty,d=Object.prototype.toString;b.exports=function(a,b,e){if("[object Function]"!==d.call(b))throw new TypeError("iterator must be a function");var f=a.length;if(f===+f)for(var g=0;f>g;g++)b.call(e,a[g],g,a);else for(var h in a)c.call(a,h)&&b.call(e,a[h],h,a)}},{}],48:[function(a,b){var c="Function.prototype.bind called on incompatible ",d=Array.prototype.slice,e=Object.prototype.toString,f="[object Function]";b.exports=function(a){var b=this;if("function"!=typeof b||e.call(b)!==f)throw new TypeError(c+b);for(var g=d.call(arguments,1),h=function(){if(this instanceof l){var c=b.apply(this,g.concat(d.call(arguments)));return Object(c)===c?c:this}return b.apply(a,g.concat(d.call(arguments)))},i=Math.max(0,b.length-g.length),j=[],k=0;i>k;k++)j.push("$"+k);var l=Function("binder","return function ("+j.join(",")+"){ return binder.apply(this,arguments); }")(h);if(b.prototype){var m=function(){};m.prototype=b.prototype,l.prototype=new m,m.prototype=null}return l}},{}],49:[function(a,b){"use strict";var c=Object.prototype.hasOwnProperty,d=Object.prototype.toString,e=Array.prototype.slice,f=a("./isArguments"),g=!{toString:null}.propertyIsEnumerable("toString"),h=function(){}.propertyIsEnumerable("prototype"),i=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],j=function(a){var b=a.constructor;return b&&b.prototype===a},k={$console:!0,$frame:!0,$frameElement:!0,$frames:!0,$parent:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0},l=function(){if("undefined"==typeof window)return!1;for(var a in window)try{if(!k["$"+a]&&c.call(window,a)&&null!==window[a]&&"object"==typeof window[a])try{j(window[a])}catch(b){return!0}}catch(b){return!0}return!1}(),m=function(a){if("undefined"==typeof window||!l)return j(a);try{return j(a)}catch(b){return!1}},n=function(a){var b=null!==a&&"object"==typeof a,e="[object Function]"===d.call(a),j=f(a),k=b&&"[object String]"===d.call(a),l=[];if(!b&&!e&&!j)throw new TypeError("Object.keys called on a non-object");var n=h&&e;if(k&&a.length>0&&!c.call(a,0))for(var o=0;o<a.length;++o)l.push(String(o));if(j&&a.length>0)for(var p=0;p<a.length;++p)l.push(String(p));else for(var q in a)n&&"prototype"===q||!c.call(a,q)||l.push(String(q));if(g)for(var r=m(a),s=0;s<i.length;++s)r&&"constructor"===i[s]||!c.call(a,i[s])||l.push(i[s]);return l};n.shim=function(){if(Object.keys){var a=function(){return 2===(Object.keys(arguments)||"").length}(1,2);if(!a){var b=Object.keys;Object.keys=function(a){return b(f(a)?e.call(a):a)}}}else Object.keys=n;return Object.keys||n},b.exports=n},{"./isArguments":50}],50:[function(a,b){"use strict";var c=Object.prototype.toString;b.exports=function(a){var b=c.call(a),d="[object Arguments]"===b;return d||(d="[object Array]"!==b&&null!==a&&"object"==typeof a&&"number"==typeof a.length&&a.length>=0&&"[object Function]"===c.call(a.callee)),d}},{}],51:[function(a,b){"use strict";var c=a("./implementation"),d=function(){if(!Object.assign||!Object.preventExtensions)return!1;var a=Object.preventExtensions({1:2});try{Object.assign(a,"xy")}catch(b){return"y"===a[1]}};b.exports=function(){return!Object.assign||d()?c:Object.assign}},{"./implementation":44}],52:[function(a,b){"use strict";var c=a("define-properties"),d=a("./polyfill");b.exports=function(){var a=d();return Object.assign!==a&&c(Object,{assign:a}),a}},{"./polyfill":51,"define-properties":46}],53:[function(a,b){function c(a,b){var c,d=null;try{c=JSON.parse(a,b)}catch(e){d=e}return[d,c]}b.exports=c},{}],54:[function(a,b){function c(a){return a.replace(/\n\r?\s*/g,"")}b.exports=function(a){for(var b="",d=0;d<arguments.length;d++)b+=c(a[d])+(arguments[d+1]||"");return b}},{}],55:[function(a,b){"use strict";function c(a){for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}function d(a,b){function e(){4===l.readyState&&j()}function f(){var a=void 0;if(l.response?a=l.response:"text"!==l.responseType&&l.responseType||(a=l.responseText||l.responseXML),u)try{a=JSON.parse(a)}catch(b){}return a}function i(a){clearTimeout(o),a instanceof Error||(a=new Error(""+(a||"Unknown XMLHttpRequest Error"))),a.statusCode=0,b(a,k)}function j(){if(!n){var c;clearTimeout(o),c=a.useXDR&&void 0===l.status?200:1223===l.status?204:l.status;var d=k,e=null;0!==c?(d={body:f(),statusCode:c,method:q,headers:{},url:p,rawRequest:l},l.getAllResponseHeaders&&(d.headers=h(l.getAllResponseHeaders()))):e=new Error("Internal XMLHttpRequest Error"),b(e,d,d.body)}}var k={body:void 0,headers:{},statusCode:0,method:q,url:p,rawRequest:l};if("string"==typeof a&&(a={uri:a}),a=a||{},"undefined"==typeof b)throw new Error("callback argument missing");b=g(b);var l=a.xhr||null;l||(l=a.cors||a.useXDR?new d.XDomainRequest:new d.XMLHttpRequest);var m,n,o,p=l.url=a.uri||a.url,q=l.method=a.method||"GET",r=a.body||a.data,s=l.headers=a.headers||{},t=!!a.sync,u=!1;if("json"in a&&(u=!0,s.accept||s.Accept||(s.Accept="application/json"),"GET"!==q&&"HEAD"!==q&&(s["content-type"]||s["Content-Type"]||(s["Content-Type"]="application/json"),r=JSON.stringify(a.json))),l.onreadystatechange=e,l.onload=j,l.onerror=i,l.onprogress=function(){},l.ontimeout=i,l.open(q,p,!t,a.username,a.password),t||(l.withCredentials=!!a.withCredentials),!t&&a.timeout>0&&(o=setTimeout(function(){n=!0,l.abort("timeout");var a=new Error("XMLHttpRequest timeout");a.code="ETIMEDOUT",i(a)},a.timeout)),l.setRequestHeader)for(m in s)s.hasOwnProperty(m)&&l.setRequestHeader(m,s[m]);else if(a.headers&&!c(a.headers))throw new Error("Headers cannot be set on an XDomainRequest object");return"responseType"in a&&(l.responseType=a.responseType),"beforeSend"in a&&"function"==typeof a.beforeSend&&a.beforeSend(l),l.send(r),l}function e(){}var f=a("global/window"),g=a("once"),h=a("parse-headers");b.exports=d,d.XMLHttpRequest=f.XMLHttpRequest||e,d.XDomainRequest="withCredentials"in new d.XMLHttpRequest?d.XMLHttpRequest:f.XDomainRequest},{"global/window":2,once:56,"parse-headers":60}],56:[function(a,b){function c(a){var b=!1;return function(){return b?void 0:(b=!0,a.apply(this,arguments))}}b.exports=c,c.proto=c(function(){Object.defineProperty(Function.prototype,"once",{value:function(){return c(this)},configurable:!0})})},{}],57:[function(a,b){function c(a,b,c){if(!g(b))throw new TypeError("iterator must be a function");arguments.length<3&&(c=this),"[object Array]"===h.call(a)?d(a,b,c):"string"==typeof a?e(a,b,c):f(a,b,c)}function d(a,b,c){for(var d=0,e=a.length;e>d;d++)i.call(a,d)&&b.call(c,a[d],d,a)}function e(a,b,c){for(var d=0,e=a.length;e>d;d++)b.call(c,a.charAt(d),d,a)}function f(a,b,c){for(var d in a)i.call(a,d)&&b.call(c,a[d],d,a)}var g=a("is-function");b.exports=c;var h=Object.prototype.toString,i=Object.prototype.hasOwnProperty},{"is-function":58}],58:[function(a,b){function c(a){var b=d.call(a);return"[object Function]"===b||"function"==typeof a&&"[object RegExp]"!==b||"undefined"!=typeof window&&(a===window.setTimeout||a===window.alert||a===window.confirm||a===window.prompt)}b.exports=c;var d=Object.prototype.toString},{}],59:[function(a,b,c){function d(a){return a.replace(/^\s*|\s*$/g,"")}c=b.exports=d,c.left=function(a){return a.replace(/^\s*/,"")},c.right=function(a){return a.replace(/\s*$/,"")}},{}],60:[function(a,b){var c=a("trim"),d=a("for-each"),e=function(a){return"[object Array]"===Object.prototype.toString.call(a)};b.exports=function(a){if(!a)return{};var b={};return d(c(a).split("\n"),function(a){var d=a.indexOf(":"),f=c(a.slice(0,d)).toLowerCase(),g=c(a.slice(d+1));"undefined"==typeof b[f]?b[f]=g:e(b[f])?b[f].push(g):b[f]=[b[f],g]}),b}},{"for-each":57,trim:59}],61:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var g=a("./button.js"),h=d(g),i=a("./component.js"),j=d(i),k=function(a){function b(c,d){e(this,b),a.call(this,c,d)}return f(b,a),b.prototype.buildCSSClass=function(){return"vjs-big-play-button"},b.prototype.handleClick=function(){this.player_.play()},b}(h["default"]);k.prototype.controlText_="Play Video",j["default"].registerComponent("BigPlayButton",k),c["default"]=k,b.exports=c["default"]},{"./button.js":62,"./component.js":63}],62:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("./component"),i=e(h),j=a("./utils/dom.js"),k=d(j),l=a("./utils/events.js"),m=d(l),n=a("./utils/fn.js"),o=d(n),p=a("global/document"),q=e(p),r=a("object.assign"),s=e(r),t=function(a){function b(c,d){f(this,b),a.call(this,c,d),this.emitTapEvents(),this.on("tap",this.handleClick),this.on("click",this.handleClick),this.on("focus",this.handleFocus),this.on("blur",this.handleBlur)}return g(b,a),b.prototype.createEl=function(){var b=arguments.length<=0||void 0===arguments[0]?"button":arguments[0],c=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],d=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];c=s["default"]({className:this.buildCSSClass(),tabIndex:0},c),d=s["default"]({role:"button",type:"button","aria-live":"polite"},d);var e=a.prototype.createEl.call(this,b,c,d);return this.controlTextEl_=k.createEl("span",{className:"vjs-control-text"}),e.appendChild(this.controlTextEl_),this.controlText(this.controlText_),e},b.prototype.controlText=function(a){return a?(this.controlText_=a,this.controlTextEl_.innerHTML=this.localize(this.controlText_),this):this.controlText_||"Need Text"},b.prototype.buildCSSClass=function(){return"vjs-control vjs-button "+a.prototype.buildCSSClass.call(this)},b.prototype.handleClick=function(){},b.prototype.handleFocus=function(){m.on(q["default"],"keydown",o.bind(this,this.handleKeyPress))},b.prototype.handleKeyPress=function(a){(32===a.which||13===a.which)&&(a.preventDefault(),this.handleClick(a))},b.prototype.handleBlur=function(){m.off(q["default"],"keydown",o.bind(this,this.handleKeyPress))},b}(i["default"]);i["default"].registerComponent("Button",t),c["default"]=t,b.exports=c["default"]},{"./component":63,"./utils/dom.js":123,"./utils/events.js":124,"./utils/fn.js":125,"global/document":1,"object.assign":45}],63:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}c.__esModule=!0;var g=a("global/window"),h=e(g),i=a("./utils/dom.js"),j=d(i),k=a("./utils/fn.js"),l=d(k),m=a("./utils/guid.js"),n=d(m),o=a("./utils/events.js"),p=d(o),q=a("./utils/log.js"),r=e(q),s=a("./utils/to-title-case.js"),t=e(s),u=a("object.assign"),v=e(u),w=a("./utils/merge-options.js"),x=e(w),y=function(){function a(b,c,d){if(f(this,a),this.player_=!b&&this.play?b=this:b,this.options_=x["default"]({},this.options_),c=this.options_=x["default"](this.options_,c),this.id_=c.id||c.el&&c.el.id,!this.id_){var e=b&&b.id&&b.id()||"no_player";this.id_=e+"_component_"+n.newGUID()}this.name_=c.name||null,c.el?this.el_=c.el:c.createEl!==!1&&(this.el_=this.createEl()),this.children_=[],this.childIndex_={},this.childNameIndex_={},c.initChildren!==!1&&this.initChildren(),this.ready(d),c.reportTouchActivity!==!1&&this.enableTouchActivity()}return a.prototype.dispose=function(){if(this.trigger({type:"dispose",bubbles:!1}),this.children_)for(var a=this.children_.length-1;a>=0;a--)this.children_[a].dispose&&this.children_[a].dispose();this.children_=null,this.childIndex_=null,this.childNameIndex_=null,this.off(),this.el_.parentNode&&this.el_.parentNode.removeChild(this.el_),j.removeElData(this.el_),this.el_=null},a.prototype.player=function(){return this.player_},a.prototype.options=function(a){return r["default"].warn("this.options() has been deprecated and will be moved to the constructor in 6.0"),a?(this.options_=x["default"](this.options_,a),this.options_):this.options_},a.prototype.el=function(){return this.el_},a.prototype.createEl=function(a,b,c){return j.createEl(a,b,c)},a.prototype.localize=function(a){var b=this.player_.language&&this.player_.language(),c=this.player_.languages&&this.player_.languages();if(!b||!c)return a;var d=c[b];if(d&&d[a])return d[a];var e=b.split("-")[0],f=c[e];return f&&f[a]?f[a]:a},a.prototype.contentEl=function(){return this.contentEl_||this.el_},a.prototype.id=function(){return this.id_},a.prototype.name=function(){return this.name_},a.prototype.children=function(){return this.children_},a.prototype.getChildById=function(a){return this.childIndex_[a]},a.prototype.getChild=function(a){return this.childNameIndex_[a]},a.prototype.addChild=function(b){var c=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],d=void 0,e=void 0;if("string"==typeof b){e=b,c||(c={}),c===!0&&(r["default"].warn("Initializing a child component with `true` is deprecated. Children should be defined in an array when possible, but if necessary use an object instead of `true`."),c={});var f=c.componentClass||t["default"](e);c.name=e;var g=a.getComponent(f);d=new g(this.player_||this,c)}else d=b;return this.children_.push(d),"function"==typeof d.id&&(this.childIndex_[d.id()]=d),e=e||d.name&&d.name(),e&&(this.childNameIndex_[e]=d),"function"==typeof d.el&&d.el()&&this.contentEl().appendChild(d.el()),d},a.prototype.removeChild=function(a){if("string"==typeof a&&(a=this.getChild(a)),a&&this.children_){for(var b=!1,c=this.children_.length-1;c>=0;c--)if(this.children_[c]===a){b=!0,this.children_.splice(c,1);break}if(b){this.childIndex_[a.id()]=null,this.childNameIndex_[a.name()]=null;var d=a.el();d&&d.parentNode===this.contentEl()&&this.contentEl().removeChild(a.el())}}},a.prototype.initChildren=function(){var a=this,b=this.options_.children;b&&!function(){var c=a.options_,d=function(b,d){void 0!==c[b]&&(d=c[b]),d!==!1&&(d===!0&&(d={}),d.playerOptions=a.options_.playerOptions,
a[b]=a.addChild(b,d))};if(Array.isArray(b))for(var e=0;e<b.length;e++){var f=b[e],g=void 0,h=void 0;"string"==typeof f?(g=f,h={}):(g=f.name,h=f),d(g,h)}else Object.getOwnPropertyNames(b).forEach(function(a){d(a,b[a])})}()},a.prototype.buildCSSClass=function(){return""},a.prototype.on=function(a,b,c){var d=this;return"string"==typeof a||Array.isArray(a)?p.on(this.el_,a,l.bind(this,b)):!function(){var e=a,f=b,g=l.bind(d,c),h=function(){return d.off(e,f,g)};h.guid=g.guid,d.on("dispose",h);var i=function(){return d.off("dispose",h)};i.guid=g.guid,a.nodeName?(p.on(e,f,g),p.on(e,"dispose",i)):"function"==typeof a.on&&(e.on(f,g),e.on("dispose",i))}(),this},a.prototype.off=function(a,b,c){if(!a||"string"==typeof a||Array.isArray(a))p.off(this.el_,a,b);else{var d=a,e=b,f=l.bind(this,c);this.off("dispose",f),a.nodeName?(p.off(d,e,f),p.off(d,"dispose",f)):(d.off(e,f),d.off("dispose",f))}return this},a.prototype.one=function(a,b,c){var d=this,e=arguments;return"string"==typeof a||Array.isArray(a)?p.one(this.el_,a,l.bind(this,b)):!function(){var f=a,g=b,h=l.bind(d,c),i=function j(){d.off(f,g,j),h.apply(null,e)};i.guid=h.guid,d.on(f,g,i)}(),this},a.prototype.trigger=function(a,b){return p.trigger(this.el_,a,b),this},a.prototype.ready=function(a){var b=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];return a&&(this.isReady_?b?a.call(this):this.setTimeout(a,1):(this.readyQueue_=this.readyQueue_||[],this.readyQueue_.push(a))),this},a.prototype.triggerReady=function(){this.isReady_=!0,this.setTimeout(function(){var a=this.readyQueue_;this.readyQueue_=[],a&&a.length>0&&a.forEach(function(a){a.call(this)},this),this.trigger("ready")},1)},a.prototype.hasClass=function(a){return j.hasElClass(this.el_,a)},a.prototype.addClass=function(a){return j.addElClass(this.el_,a),this},a.prototype.removeClass=function(a){return j.removeElClass(this.el_,a),this},a.prototype.show=function(){return this.removeClass("vjs-hidden"),this},a.prototype.hide=function(){return this.addClass("vjs-hidden"),this},a.prototype.lockShowing=function(){return this.addClass("vjs-lock-showing"),this},a.prototype.unlockShowing=function(){return this.removeClass("vjs-lock-showing"),this},a.prototype.width=function(a,b){return this.dimension("width",a,b)},a.prototype.height=function(a,b){return this.dimension("height",a,b)},a.prototype.dimensions=function(a,b){return this.width(a,!0).height(b)},a.prototype.dimension=function(a,b,c){if(void 0!==b)return(null===b||b!==b)&&(b=0),this.el_.style[a]=-1!==(""+b).indexOf("%")||-1!==(""+b).indexOf("px")?b:"auto"===b?"":b+"px",c||this.trigger("resize"),this;if(!this.el_)return 0;var d=this.el_.style[a],e=d.indexOf("px");return-1!==e?parseInt(d.slice(0,e),10):parseInt(this.el_["offset"+t["default"](a)],10)},a.prototype.emitTapEvents=function(){var a=0,b=null,c=10,d=200,e=void 0;this.on("touchstart",function(c){1===c.touches.length&&(b=v["default"]({},c.touches[0]),a=(new Date).getTime(),e=!0)}),this.on("touchmove",function(a){if(a.touches.length>1)e=!1;else if(b){var d=a.touches[0].pageX-b.pageX,f=a.touches[0].pageY-b.pageY,g=Math.sqrt(d*d+f*f);g>c&&(e=!1)}});var f=function(){e=!1};this.on("touchleave",f),this.on("touchcancel",f),this.on("touchend",function(c){if(b=null,e===!0){var f=(new Date).getTime()-a;d>f&&(c.preventDefault(),this.trigger("tap"))}})},a.prototype.enableTouchActivity=function(){if(this.player()&&this.player().reportUserActivity){var a=l.bind(this.player(),this.player().reportUserActivity),b=void 0;this.on("touchstart",function(){a(),this.clearInterval(b),b=this.setInterval(a,250)});var c=function(){a(),this.clearInterval(b)};this.on("touchmove",a),this.on("touchend",c),this.on("touchcancel",c)}},a.prototype.setTimeout=function(a,b){a=l.bind(this,a);var c=h["default"].setTimeout(a,b),d=function(){this.clearTimeout(c)};return d.guid="vjs-timeout-"+c,this.on("dispose",d),c},a.prototype.clearTimeout=function(a){h["default"].clearTimeout(a);var b=function(){};return b.guid="vjs-timeout-"+a,this.off("dispose",b),a},a.prototype.setInterval=function(a,b){a=l.bind(this,a);var c=h["default"].setInterval(a,b),d=function(){this.clearInterval(c)};return d.guid="vjs-interval-"+c,this.on("dispose",d),c},a.prototype.clearInterval=function(a){h["default"].clearInterval(a);var b=function(){};return b.guid="vjs-interval-"+a,this.off("dispose",b),a},a.registerComponent=function(b,c){return a.components_||(a.components_={}),a.components_[b]=c,c},a.getComponent=function(b){return a.components_&&a.components_[b]?a.components_[b]:h["default"]&&h["default"].videojs&&h["default"].videojs[b]?(r["default"].warn("The "+b+" component was added to the videojs object when it should be registered using videojs.registerComponent(name, component)"),h["default"].videojs[b]):void 0},a.extend=function(b){b=b||{},r["default"].warn("Component.extend({}) has been deprecated, use videojs.extend(Component, {}) instead");var c=b.init||b.init||this.prototype.init||this.prototype.init||function(){},d=function(){c.apply(this,arguments)};d.prototype=Object.create(this.prototype),d.prototype.constructor=d,d.extend=a.extend;for(var e in b)b.hasOwnProperty(e)&&(d.prototype[e]=b[e]);return d},a}();y.registerComponent("Component",y),c["default"]=y,b.exports=c["default"]},{"./utils/dom.js":123,"./utils/events.js":124,"./utils/fn.js":125,"./utils/guid.js":127,"./utils/log.js":128,"./utils/merge-options.js":129,"./utils/to-title-case.js":132,"global/window":2,"object.assign":45}],64:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var g=a("../component.js"),h=d(g),i=a("./play-toggle.js"),j=(d(i),a("./time-controls/current-time-display.js")),k=(d(j),a("./time-controls/duration-display.js")),l=(d(k),a("./time-controls/time-divider.js")),m=(d(l),a("./time-controls/remaining-time-display.js")),n=(d(m),a("./live-display.js")),o=(d(n),a("./progress-control/progress-control.js")),p=(d(o),a("./fullscreen-toggle.js")),q=(d(p),a("./volume-control/volume-control.js")),r=(d(q),a("./volume-menu-button.js")),s=(d(r),a("./mute-toggle.js")),t=(d(s),a("./text-track-controls/chapters-button.js")),u=(d(t),a("./text-track-controls/subtitles-button.js")),v=(d(u),a("./text-track-controls/captions-button.js")),w=(d(v),a("./playback-rate-menu/playback-rate-menu-button.js")),x=(d(w),a("./spacer-controls/custom-control-spacer.js")),y=(d(x),function(a){function b(){e(this,b),a.apply(this,arguments)}return f(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-control-bar"})},b}(h["default"]));y.prototype.options_={loadEvent:"play",children:["playToggle","volumeMenuButton","currentTimeDisplay","timeDivider","durationDisplay","progressControl","liveDisplay","remainingTimeDisplay","customControlSpacer","playbackRateMenuButton","chaptersButton","subtitlesButton","captionsButton","fullscreenToggle"]},h["default"].registerComponent("ControlBar",y),c["default"]=y,b.exports=c["default"]},{"../component.js":63,"./fullscreen-toggle.js":65,"./live-display.js":66,"./mute-toggle.js":67,"./play-toggle.js":68,"./playback-rate-menu/playback-rate-menu-button.js":69,"./progress-control/progress-control.js":74,"./spacer-controls/custom-control-spacer.js":76,"./text-track-controls/captions-button.js":79,"./text-track-controls/chapters-button.js":80,"./text-track-controls/subtitles-button.js":83,"./time-controls/current-time-display.js":86,"./time-controls/duration-display.js":87,"./time-controls/remaining-time-display.js":88,"./time-controls/time-divider.js":89,"./volume-control/volume-control.js":91,"./volume-menu-button.js":93}],65:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var g=a("../button.js"),h=d(g),i=a("../component.js"),j=d(i),k=function(a){function b(){e(this,b),a.apply(this,arguments)}return f(b,a),b.prototype.buildCSSClass=function(){return"vjs-fullscreen-control "+a.prototype.buildCSSClass.call(this)},b.prototype.handleClick=function(){this.player_.isFullscreen()?(this.player_.exitFullscreen(),this.controlText("Fullscreen")):(this.player_.requestFullscreen(),this.controlText("Non-Fullscreen"))},b}(h["default"]);k.prototype.controlText_="Fullscreen",j["default"].registerComponent("FullscreenToggle",k),c["default"]=k,b.exports=c["default"]},{"../button.js":62,"../component.js":63}],66:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("../component"),i=e(h),j=a("../utils/dom.js"),k=d(j),l=function(a){function b(c,d){f(this,b),a.call(this,c,d),this.updateShowing(),this.on(this.player(),"durationchange",this.updateShowing)}return g(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-live-control vjs-control"});return this.contentEl_=k.createEl("div",{className:"vjs-live-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Stream Type")+"</span>"+this.localize("LIVE")},{"aria-live":"off"}),b.appendChild(this.contentEl_),b},b.prototype.updateShowing=function(){this.player().duration()===1/0?this.show():this.hide()},b}(i["default"]);i["default"].registerComponent("LiveDisplay",l),c["default"]=l,b.exports=c["default"]},{"../component":63,"../utils/dom.js":123}],67:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("../button"),i=e(h),j=a("../component"),k=e(j),l=a("../utils/dom.js"),m=d(l),n=function(a){function b(c,d){f(this,b),a.call(this,c,d),this.on(c,"volumechange",this.update),c.tech_&&c.tech_.featuresVolumeControl===!1&&this.addClass("vjs-hidden"),this.on(c,"loadstart",function(){this.update(),c.tech_.featuresVolumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden")})}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-mute-control "+a.prototype.buildCSSClass.call(this)},b.prototype.handleClick=function(){this.player_.muted(this.player_.muted()?!1:!0)},b.prototype.update=function(){var a=this.player_.volume(),b=3;0===a||this.player_.muted()?b=0:.33>a?b=1:.67>a&&(b=2);var c=this.player_.muted()?"Unmute":"Mute",d=this.localize(c);this.controlText()!==d&&this.controlText(d);for(var e=0;4>e;e++)m.removeElClass(this.el_,"vjs-vol-"+e);m.addElClass(this.el_,"vjs-vol-"+b)},b}(i["default"]);n.prototype.controlText_="Mute",k["default"].registerComponent("MuteToggle",n),c["default"]=n,b.exports=c["default"]},{"../button":62,"../component":63,"../utils/dom.js":123}],68:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var g=a("../button.js"),h=d(g),i=a("../component.js"),j=d(i),k=function(a){function b(c,d){e(this,b),a.call(this,c,d),this.on(c,"play",this.handlePlay),this.on(c,"pause",this.handlePause)}return f(b,a),b.prototype.buildCSSClass=function(){return"vjs-play-control "+a.prototype.buildCSSClass.call(this)},b.prototype.handleClick=function(){this.player_.paused()?this.player_.play():this.player_.pause()},b.prototype.handlePlay=function(){this.removeClass("vjs-paused"),this.addClass("vjs-playing"),this.controlText("Pause")},b.prototype.handlePause=function(){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.controlText("Play")},b}(h["default"]);k.prototype.controlText_="Play",j["default"].registerComponent("PlayToggle",k),c["default"]=k,b.exports=c["default"]},{"../button.js":62,"../component.js":63}],69:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("../../menu/menu-button.js"),i=e(h),j=a("../../menu/menu.js"),k=e(j),l=a("./playback-rate-menu-item.js"),m=e(l),n=a("../../component.js"),o=e(n),p=a("../../utils/dom.js"),q=d(p),r=function(a){function b(c,d){f(this,b),a.call(this,c,d),this.updateVisibility(),this.updateLabel(),this.on(c,"loadstart",this.updateVisibility),this.on(c,"ratechange",this.updateLabel)}return g(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this);return this.labelEl_=q.createEl("div",{className:"vjs-playback-rate-value",innerHTML:1}),b.appendChild(this.labelEl_),b},b.prototype.buildCSSClass=function(){return"vjs-playback-rate "+a.prototype.buildCSSClass.call(this)},b.prototype.createMenu=function(){var a=new k["default"](this.player()),b=this.playbackRates();if(b)for(var c=b.length-1;c>=0;c--)a.addChild(new m["default"](this.player(),{rate:b[c]+"x"}));return a},b.prototype.updateARIAAttributes=function(){this.el().setAttribute("aria-valuenow",this.player().playbackRate())},b.prototype.handleClick=function(){for(var a=this.player().playbackRate(),b=this.playbackRates(),c=b[0],d=0;d<b.length;d++)if(b[d]>a){c=b[d];break}this.player().playbackRate(c)},b.prototype.playbackRates=function(){return this.options_.playbackRates||this.options_.playerOptions&&this.options_.playerOptions.playbackRates},b.prototype.playbackRateSupported=function(){return this.player().tech_&&this.player().tech_.featuresPlaybackRate&&this.playbackRates()&&this.playbackRates().length>0},b.prototype.updateVisibility=function(){this.playbackRateSupported()?this.removeClass("vjs-hidden"):this.addClass("vjs-hidden")},b.prototype.updateLabel=function(){this.playbackRateSupported()&&(this.labelEl_.innerHTML=this.player().playbackRate()+"x")},b}(i["default"]);r.prototype.controlText_="Playback Rate",o["default"].registerComponent("PlaybackRateMenuButton",r),c["default"]=r,b.exports=c["default"]},{"../../component.js":63,"../../menu/menu-button.js":100,"../../menu/menu.js":102,"../../utils/dom.js":123,"./playback-rate-menu-item.js":70}],70:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var g=a("../../menu/menu-item.js"),h=d(g),i=a("../../component.js"),j=d(i),k=function(a){function b(c,d){e(this,b);var f=d.rate,g=parseFloat(f,10);d.label=f,d.selected=1===g,a.call(this,c,d),this.label=f,this.rate=g,this.on(c,"ratechange",this.update)}return f(b,a),b.prototype.handleClick=function(){a.prototype.handleClick.call(this),this.player().playbackRate(this.rate)},b.prototype.update=function(){this.selected(this.player().playbackRate()===this.rate)},b}(h["default"]);k.prototype.contentElType="button",j["default"].registerComponent("PlaybackRateMenuItem",k),c["default"]=k,b.exports=c["default"]},{"../../component.js":63,"../../menu/menu-item.js":101}],71:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("../../component.js"),i=e(h),j=a("../../utils/dom.js"),k=d(j),l=function(a){function b(c,d){f(this,b),a.call(this,c,d),this.on(c,"progress",this.update)}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-load-progress",innerHTML:'<span class="vjs-control-text"><span>'+this.localize("Loaded")+"</span>: 0%</span>"})},b.prototype.update=function(){var a=this.player_.buffered(),b=this.player_.duration(),c=this.player_.bufferedEnd(),d=this.el_.children,e=function(a,b){var c=a/b||0;return 100*(c>=1?1:c)+"%"};this.el_.style.width=e(c,b);for(var f=0;f<a.length;f++){var g=a.start(f),h=a.end(f),i=d[f];i||(i=this.el_.appendChild(k.createEl())),i.style.left=e(g,c),i.style.width=e(h-g,c)}for(var f=d.length;f>a.length;f--)this.el_.removeChild(d[f-1])},b}(i["default"]);i["default"].registerComponent("LoadProgressBar",l),c["default"]=l,b.exports=c["default"]},{"../../component.js":63,"../../utils/dom.js":123}],72:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("../../component.js"),i=e(h),j=a("../../utils/dom.js"),k=d(j),l=a("../../utils/fn.js"),m=d(l),n=a("../../utils/format-time.js"),o=e(n),p=a("lodash-compat/function/throttle"),q=e(p),r=function(a){function b(c,d){var e=this;f(this,b),a.call(this,c,d),this.update(0,0),c.on("ready",function(){e.on(c.controlBar.progressControl.el(),"mousemove",q["default"](m.bind(e,e.handleMouseMove),25))})}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-mouse-display"})},b.prototype.handleMouseMove=function(a){var b=this.player_.duration(),c=this.calculateDistance(a)*b,d=a.pageX-k.findElPosition(this.el().parentNode).left;this.update(c,d)},b.prototype.update=function(a,b){var c=o["default"](a,this.player_.duration());this.el().style.left=b+"px",this.el().setAttribute("data-current-time",c)},b.prototype.calculateDistance=function(a){return k.getPointerPosition(this.el().parentNode,a).x},b}(i["default"]);i["default"].registerComponent("MouseTimeDisplay",r),c["default"]=r,b.exports=c["default"]},{"../../component.js":63,"../../utils/dom.js":123,"../../utils/fn.js":125,"../../utils/format-time.js":126,"lodash-compat/function/throttle":7}],73:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("../../component.js"),i=e(h),j=a("../../utils/fn.js"),k=d(j),l=a("../../utils/format-time.js"),m=e(l),n=function(a){function b(c,d){f(this,b),a.call(this,c,d),this.updateDataAttr(),this.on(c,"timeupdate",this.updateDataAttr),c.ready(k.bind(this,this.updateDataAttr))}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-play-progress vjs-slider-bar",innerHTML:'<span class="vjs-control-text"><span>'+this.localize("Progress")+"</span>: 0%</span>"})},b.prototype.updateDataAttr=function(){var a=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime();this.el_.setAttribute("data-current-time",m["default"](a,this.player_.duration()))},b}(i["default"]);i["default"].registerComponent("PlayProgressBar",n),c["default"]=n,b.exports=c["default"]},{"../../component.js":63,"../../utils/fn.js":125,"../../utils/format-time.js":126}],74:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var g=a("../../component.js"),h=d(g),i=a("./seek-bar.js"),j=(d(i),a("./mouse-time-display.js")),k=(d(j),function(a){function b(){e(this,b),a.apply(this,arguments)}return f(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-progress-control vjs-control"})},b}(h["default"]));k.prototype.options_={children:["seekBar"]},h["default"].registerComponent("ProgressControl",k),c["default"]=k,b.exports=c["default"]},{"../../component.js":63,"./mouse-time-display.js":72,"./seek-bar.js":75}],75:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("../../slider/slider.js"),i=e(h),j=a("../../component.js"),k=e(j),l=a("./load-progress-bar.js"),m=(e(l),a("./play-progress-bar.js")),n=(e(m),a("../../utils/fn.js")),o=d(n),p=a("../../utils/format-time.js"),q=e(p),r=a("object.assign"),s=(e(r),function(a){function b(c,d){f(this,b),a.call(this,c,d),this.on(c,"timeupdate",this.updateARIAAttributes),c.ready(o.bind(this,this.updateARIAAttributes))}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-progress-holder"},{"aria-label":"video progress bar"})},b.prototype.updateARIAAttributes=function(){var a=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime();this.el_.setAttribute("aria-valuenow",(100*this.getPercent()).toFixed(2)),this.el_.setAttribute("aria-valuetext",q["default"](a,this.player_.duration()))},b.prototype.getPercent=function(){var a=this.player_.currentTime()/this.player_.duration();return a>=1?1:a},b.prototype.handleMouseDown=function(b){a.prototype.handleMouseDown.call(this,b),this.player_.scrubbing(!0),this.videoWasPlaying=!this.player_.paused(),this.player_.pause()},b.prototype.handleMouseMove=function(a){var b=this.calculateDistance(a)*this.player_.duration();b===this.player_.duration()&&(b-=.1),this.player_.currentTime(b)},b.prototype.handleMouseUp=function(b){a.prototype.handleMouseUp.call(this,b),this.player_.scrubbing(!1),this.videoWasPlaying&&this.player_.play()},b.prototype.stepForward=function(){this.player_.currentTime(this.player_.currentTime()+5)},b.prototype.stepBack=function(){this.player_.currentTime(this.player_.currentTime()-5)},b}(i["default"]));s.prototype.options_={children:["loadProgressBar","mouseTimeDisplay","playProgressBar"],barName:"playProgressBar"},s.prototype.playerEvent="timeupdate",k["default"].registerComponent("SeekBar",s),c["default"]=s,b.exports=c["default"]},{"../../component.js":63,"../../slider/slider.js":107,"../../utils/fn.js":125,"../../utils/format-time.js":126,"./load-progress-bar.js":71,"./play-progress-bar.js":73,"object.assign":45}],76:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var g=a("./spacer.js"),h=d(g),i=a("../../component.js"),j=d(i),k=function(a){function b(){e(this,b),a.apply(this,arguments)}return f(b,a),b.prototype.buildCSSClass=function(){return"vjs-custom-control-spacer "+a.prototype.buildCSSClass.call(this)},b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,{className:this.buildCSSClass()});return b.innerHTML="&nbsp;",b},b}(h["default"]);j["default"].registerComponent("CustomControlSpacer",k),c["default"]=k,b.exports=c["default"]},{"../../component.js":63,"./spacer.js":77}],77:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var g=a("../../component.js"),h=d(g),i=function(a){function b(){e(this,b),a.apply(this,arguments)}return f(b,a),b.prototype.buildCSSClass=function(){return"vjs-spacer "+a.prototype.buildCSSClass.call(this)},b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:this.buildCSSClass()})},b}(h["default"]);h["default"].registerComponent("Spacer",i),c["default"]=i,b.exports=c["default"]},{"../../component.js":63}],78:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var g=a("./text-track-menu-item.js"),h=d(g),i=a("../../component.js"),j=d(i),k=function(a){function b(c,d){e(this,b),d.track={kind:d.kind,player:c,label:d.kind+" settings","default":!1,mode:"disabled"},a.call(this,c,d),this.addClass("vjs-texttrack-settings")}return f(b,a),b.prototype.handleClick=function(){this.player().getChild("textTrackSettings").show()},b}(h["default"]);j["default"].registerComponent("CaptionSettingsMenuItem",k),c["default"]=k,b.exports=c["default"]},{"../../component.js":63,"./text-track-menu-item.js":85}],79:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var g=a("./text-track-button.js"),h=d(g),i=a("../../component.js"),j=d(i),k=a("./caption-settings-menu-item.js"),l=d(k),m=function(a){function b(c,d,f){e(this,b),a.call(this,c,d,f),this.el_.setAttribute("aria-label","Captions Menu")}return f(b,a),b.prototype.buildCSSClass=function(){return"vjs-captions-button "+a.prototype.buildCSSClass.call(this)},b.prototype.update=function(){var b=2;a.prototype.update.call(this),this.player().tech_&&this.player().tech_.featuresNativeTextTracks&&(b=1),this.items&&this.items.length>b?this.show():this.hide()},b.prototype.createItems=function(){var b=[];return this.player().tech_&&this.player().tech_.featuresNativeTextTracks||b.push(new l["default"](this.player_,{kind:this.kind_})),a.prototype.createItems.call(this,b)},b}(h["default"]);m.prototype.kind_="captions",m.prototype.controlText_="Captions",j["default"].registerComponent("CaptionsButton",m),c["default"]=m,b.exports=c["default"]},{"../../component.js":63,"./caption-settings-menu-item.js":78,"./text-track-button.js":84}],80:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("./text-track-button.js"),i=e(h),j=a("../../component.js"),k=e(j),l=a("./text-track-menu-item.js"),m=e(l),n=a("./chapters-track-menu-item.js"),o=e(n),p=a("../../menu/menu.js"),q=e(p),r=a("../../utils/dom.js"),s=d(r),t=a("../../utils/fn.js"),u=d(t),v=a("../../utils/to-title-case.js"),w=e(v),x=a("global/window"),y=e(x),z=function(a){
function b(c,d,e){f(this,b),a.call(this,c,d,e),this.el_.setAttribute("aria-label","Chapters Menu")}return g(b,a),b.prototype.buildCSSClass=function(){return"vjs-chapters-button "+a.prototype.buildCSSClass.call(this)},b.prototype.createItems=function(){var a=[],b=this.player_.textTracks();if(!b)return a;for(var c=0;c<b.length;c++){var d=b[c];d.kind===this.kind_&&a.push(new m["default"](this.player_,{track:d}))}return a},b.prototype.createMenu=function(){for(var a=this.player_.textTracks()||[],b=void 0,c=this.items=[],d=0,e=a.length;e>d;d++){var f=a[d];if(f.kind===this.kind_){if(f.cues){b=f;break}f.mode="hidden",y["default"].setTimeout(u.bind(this,function(){this.createMenu()}),100)}}var g=this.menu;if(void 0===g&&(g=new q["default"](this.player_),g.contentEl().appendChild(s.createEl("li",{className:"vjs-menu-title",innerHTML:w["default"](this.kind_),tabIndex:-1}))),b){for(var h=b.cues,i=void 0,d=0,e=h.length;e>d;d++){i=h[d];var j=new o["default"](this.player_,{track:b,cue:i});c.push(j),g.addChild(j)}this.addChild(g)}return this.items.length>0&&this.show(),g},b}(i["default"]);z.prototype.kind_="chapters",z.prototype.controlText_="Chapters",k["default"].registerComponent("ChaptersButton",z),c["default"]=z,b.exports=c["default"]},{"../../component.js":63,"../../menu/menu.js":102,"../../utils/dom.js":123,"../../utils/fn.js":125,"../../utils/to-title-case.js":132,"./chapters-track-menu-item.js":81,"./text-track-button.js":84,"./text-track-menu-item.js":85,"global/window":2}],81:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("../../menu/menu-item.js"),i=e(h),j=a("../../component.js"),k=e(j),l=a("../../utils/fn.js"),m=d(l),n=function(a){function b(c,d){f(this,b);var e=d.track,g=d.cue,h=c.currentTime();d.label=g.text,d.selected=g.startTime<=h&&h<g.endTime,a.call(this,c,d),this.track=e,this.cue=g,e.addEventListener("cuechange",m.bind(this,this.update))}return g(b,a),b.prototype.handleClick=function(){a.prototype.handleClick.call(this),this.player_.currentTime(this.cue.startTime),this.update(this.cue.startTime)},b.prototype.update=function(){var a=this.cue,b=this.player_.currentTime();this.selected(a.startTime<=b&&b<a.endTime)},b}(i["default"]);k["default"].registerComponent("ChaptersTrackMenuItem",n),c["default"]=n,b.exports=c["default"]},{"../../component.js":63,"../../menu/menu-item.js":101,"../../utils/fn.js":125}],82:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var g=a("./text-track-menu-item.js"),h=d(g),i=a("../../component.js"),j=d(i),k=function(a){function b(c,d){e(this,b),d.track={kind:d.kind,player:c,label:d.kind+" off","default":!1,mode:"disabled"},a.call(this,c,d),this.selected(!0)}return f(b,a),b.prototype.handleTracksChange=function(){for(var a=this.player().textTracks(),b=!0,c=0,d=a.length;d>c;c++){var e=a[c];if(e.kind===this.track.kind&&"showing"===e.mode){b=!1;break}}this.selected(b)},b}(h["default"]);j["default"].registerComponent("OffTextTrackMenuItem",k),c["default"]=k,b.exports=c["default"]},{"../../component.js":63,"./text-track-menu-item.js":85}],83:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var g=a("./text-track-button.js"),h=d(g),i=a("../../component.js"),j=d(i),k=function(a){function b(c,d,f){e(this,b),a.call(this,c,d,f),this.el_.setAttribute("aria-label","Subtitles Menu")}return f(b,a),b.prototype.buildCSSClass=function(){return"vjs-subtitles-button "+a.prototype.buildCSSClass.call(this)},b}(h["default"]);k.prototype.kind_="subtitles",k.prototype.controlText_="Subtitles",j["default"].registerComponent("SubtitlesButton",k),c["default"]=k,b.exports=c["default"]},{"../../component.js":63,"./text-track-button.js":84}],84:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("../../menu/menu-button.js"),i=e(h),j=a("../../component.js"),k=e(j),l=a("../../utils/fn.js"),m=d(l),n=a("./text-track-menu-item.js"),o=e(n),p=a("./off-text-track-menu-item.js"),q=e(p),r=function(a){function b(c,d){f(this,b),a.call(this,c,d);var e=this.player_.textTracks();if(this.items.length<=1&&this.hide(),e){var g=m.bind(this,this.update);e.addEventListener("removetrack",g),e.addEventListener("addtrack",g),this.player_.on("dispose",function(){e.removeEventListener("removetrack",g),e.removeEventListener("addtrack",g)})}}return g(b,a),b.prototype.createItems=function(){var a=arguments.length<=0||void 0===arguments[0]?[]:arguments[0];a.push(new q["default"](this.player_,{kind:this.kind_}));var b=this.player_.textTracks();if(!b)return a;for(var c=0;c<b.length;c++){var d=b[c];d.kind===this.kind_&&a.push(new o["default"](this.player_,{track:d}))}return a},b}(i["default"]);k["default"].registerComponent("TextTrackButton",r),c["default"]=r,b.exports=c["default"]},{"../../component.js":63,"../../menu/menu-button.js":100,"../../utils/fn.js":125,"./off-text-track-menu-item.js":82,"./text-track-menu-item.js":85}],85:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("../../menu/menu-item.js"),i=e(h),j=a("../../component.js"),k=e(j),l=a("../../utils/fn.js"),m=d(l),n=a("global/window"),o=e(n),p=a("global/document"),q=e(p),r=function(a){function b(c,d){var e=this;f(this,b);var g=d.track,h=c.textTracks();d.label=g.label||g.language||"Unknown",d.selected=g["default"]||"showing"===g.mode,a.call(this,c,d),this.track=g,h&&!function(){var a=m.bind(e,e.handleTracksChange);h.addEventListener("change",a),e.on("dispose",function(){h.removeEventListener("change",a)})}(),h&&void 0===h.onchange&&!function(){var a=void 0;e.on(["tap","click"],function(){if("object"!=typeof o["default"].Event)try{a=new o["default"].Event("change")}catch(b){}a||(a=q["default"].createEvent("Event"),a.initEvent("change",!0,!0)),h.dispatchEvent(a)})}()}return g(b,a),b.prototype.handleClick=function(b){var c=this.track.kind,d=this.player_.textTracks();if(a.prototype.handleClick.call(this,b),d)for(var e=0;e<d.length;e++){var f=d[e];f.kind===c&&(f.mode=f===this.track?"showing":"disabled")}},b.prototype.handleTracksChange=function(){this.selected("showing"===this.track.mode)},b}(i["default"]);k["default"].registerComponent("TextTrackMenuItem",r),c["default"]=r,b.exports=c["default"]},{"../../component.js":63,"../../menu/menu-item.js":101,"../../utils/fn.js":125,"global/document":1,"global/window":2}],86:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("../../component.js"),i=e(h),j=a("../../utils/dom.js"),k=d(j),l=a("../../utils/format-time.js"),m=e(l),n=function(a){function b(c,d){f(this,b),a.call(this,c,d),this.on(c,"timeupdate",this.updateContent)}return g(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-current-time vjs-time-control vjs-control"});return this.contentEl_=k.createEl("div",{className:"vjs-current-time-display",innerHTML:'<span class="vjs-control-text">Current Time </span>0:00'},{"aria-live":"off"}),b.appendChild(this.contentEl_),b},b.prototype.updateContent=function(){var a=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime(),b=this.localize("Current Time"),c=m["default"](a,this.player_.duration());this.contentEl_.innerHTML='<span class="vjs-control-text">'+b+"</span> "+c},b}(i["default"]);i["default"].registerComponent("CurrentTimeDisplay",n),c["default"]=n,b.exports=c["default"]},{"../../component.js":63,"../../utils/dom.js":123,"../../utils/format-time.js":126}],87:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("../../component.js"),i=e(h),j=a("../../utils/dom.js"),k=d(j),l=a("../../utils/format-time.js"),m=e(l),n=function(a){function b(c,d){f(this,b),a.call(this,c,d),this.on(c,"timeupdate",this.updateContent),this.on(c,"loadedmetadata",this.updateContent)}return g(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-duration vjs-time-control vjs-control"});return this.contentEl_=k.createEl("div",{className:"vjs-duration-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Duration Time")+"</span> 0:00"},{"aria-live":"off"}),b.appendChild(this.contentEl_),b},b.prototype.updateContent=function(){var a=this.player_.duration();if(a){var b=this.localize("Duration Time"),c=m["default"](a);this.contentEl_.innerHTML='<span class="vjs-control-text">'+b+"</span> "+c}},b}(i["default"]);i["default"].registerComponent("DurationDisplay",n),c["default"]=n,b.exports=c["default"]},{"../../component.js":63,"../../utils/dom.js":123,"../../utils/format-time.js":126}],88:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("../../component.js"),i=e(h),j=a("../../utils/dom.js"),k=d(j),l=a("../../utils/format-time.js"),m=e(l),n=function(a){function b(c,d){f(this,b),a.call(this,c,d),this.on(c,"timeupdate",this.updateContent)}return g(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-remaining-time vjs-time-control vjs-control"});return this.contentEl_=k.createEl("div",{className:"vjs-remaining-time-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Remaining Time")+"</span> -0:00"},{"aria-live":"off"}),b.appendChild(this.contentEl_),b},b.prototype.updateContent=function(){if(this.player_.duration()){var a=this.localize("Remaining Time"),b=m["default"](this.player_.remainingTime());this.contentEl_.innerHTML='<span class="vjs-control-text">'+a+"</span> -"+b}},b}(i["default"]);i["default"].registerComponent("RemainingTimeDisplay",n),c["default"]=n,b.exports=c["default"]},{"../../component.js":63,"../../utils/dom.js":123,"../../utils/format-time.js":126}],89:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var g=a("../../component.js"),h=d(g),i=function(a){function b(){e(this,b),a.apply(this,arguments)}return f(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-time-control vjs-time-divider",innerHTML:"<div><span>/</span></div>"})},b}(h["default"]);h["default"].registerComponent("TimeDivider",i),c["default"]=i,b.exports=c["default"]},{"../../component.js":63}],90:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("../../slider/slider.js"),i=e(h),j=a("../../component.js"),k=e(j),l=a("../../utils/fn.js"),m=d(l),n=a("./volume-level.js"),o=(e(n),function(a){function b(c,d){f(this,b),a.call(this,c,d),this.on(c,"volumechange",this.updateARIAAttributes),c.ready(m.bind(this,this.updateARIAAttributes))}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-volume-bar vjs-slider-bar"},{"aria-label":"volume level"})},b.prototype.handleMouseMove=function(a){this.player_.muted()&&this.player_.muted(!1),this.player_.volume(this.calculateDistance(a))},b.prototype.getPercent=function(){return this.player_.muted()?0:this.player_.volume()},b.prototype.stepForward=function(){this.player_.volume(this.player_.volume()+.1)},b.prototype.stepBack=function(){this.player_.volume(this.player_.volume()-.1)},b.prototype.updateARIAAttributes=function(){var a=(100*this.player_.volume()).toFixed(2);this.el_.setAttribute("aria-valuenow",a),this.el_.setAttribute("aria-valuetext",a+"%")},b}(i["default"]));o.prototype.options_={children:["volumeLevel"],barName:"volumeLevel"},o.prototype.playerEvent="volumechange",k["default"].registerComponent("VolumeBar",o),c["default"]=o,b.exports=c["default"]},{"../../component.js":63,"../../slider/slider.js":107,"../../utils/fn.js":125,"./volume-level.js":92}],91:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var g=a("../../component.js"),h=d(g),i=a("./volume-bar.js"),j=(d(i),function(a){function b(c,d){e(this,b),a.call(this,c,d),c.tech_&&c.tech_.featuresVolumeControl===!1&&this.addClass("vjs-hidden"),this.on(c,"loadstart",function(){c.tech_.featuresVolumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden")})}return f(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-volume-control vjs-control"})},b}(h["default"]));j.prototype.options_={children:["volumeBar"]},h["default"].registerComponent("VolumeControl",j),c["default"]=j,b.exports=c["default"]},{"../../component.js":63,"./volume-bar.js":90}],92:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var g=a("../../component.js"),h=d(g),i=function(a){function b(){e(this,b),a.apply(this,arguments)}return f(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-volume-level",innerHTML:'<span class="vjs-control-text"></span>'})},b}(h["default"]);h["default"].registerComponent("VolumeLevel",i),c["default"]=i,b.exports=c["default"]},{"../../component.js":63}],93:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var g=a("../button.js"),h=(d(g),a("../component.js")),i=d(h),j=a("../menu/menu.js"),k=d(j),l=a("../menu/menu-button.js"),m=d(l),n=a("./mute-toggle.js"),o=d(n),p=a("./volume-control/volume-bar.js"),q=d(p),r=function(a){function b(c){function d(){c.tech_&&c.tech_.featuresVolumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden")}var f=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];e(this,b),void 0===f.inline&&(f.inline=!0),void 0===f.vertical&&(f.vertical=f.inline?!1:!0),f.volumeBar=f.volumeBar||{},f.volumeBar.vertical=!!f.vertical,a.call(this,c,f),this.on(c,"volumechange",this.volumeUpdate),this.on(c,"loadstart",this.volumeUpdate),d.call(this),this.on(c,"loadstart",d),this.on(this.volumeBar,["slideractive","focus"],function(){this.addClass("vjs-slider-active")}),this.on(this.volumeBar,["sliderinactive","blur"],function(){this.removeClass("vjs-slider-active")})}return f(b,a),b.prototype.buildCSSClass=function(){var b="";return b=this.options_.vertical?"vjs-volume-menu-button-vertical":"vjs-volume-menu-button-horizontal","vjs-volume-menu-button "+a.prototype.buildCSSClass.call(this)+" "+b},b.prototype.createMenu=function(){var a=new k["default"](this.player_,{contentElType:"div"}),b=new q["default"](this.player_,this.options_.volumeBar);return a.addChild(b),this.volumeBar=b,a},b.prototype.handleClick=function(){o["default"].prototype.handleClick.call(this),a.prototype.handleClick.call(this)},b}(m["default"]);r.prototype.volumeUpdate=o["default"].prototype.update,r.prototype.controlText_="Mute",i["default"].registerComponent("VolumeMenuButton",r),c["default"]=r,b.exports=c["default"]},{"../button.js":62,"../component.js":63,"../menu/menu-button.js":100,"../menu/menu.js":102,"./mute-toggle.js":67,"./volume-control/volume-bar.js":90}],94:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("./component"),i=e(h),j=a("./utils/dom.js"),k=d(j),l=function(a){function b(c,d){f(this,b),a.call(this,c,d),this.update(),this.on(c,"error",this.update)}return g(b,a),b.prototype.createEl=function(){var b=a.prototype.createEl.call(this,"div",{className:"vjs-error-display"});return this.contentEl_=k.createEl("div"),b.appendChild(this.contentEl_),b},b.prototype.update=function(){this.player().error()&&(this.contentEl_.innerHTML=this.localize(this.player().error().message))},b}(i["default"]);i["default"].registerComponent("ErrorDisplay",l),c["default"]=l,b.exports=c["default"]},{"./component":63,"./utils/dom.js":123}],95:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}c.__esModule=!0;var e=a("./utils/events.js"),f=d(e),g=function(){};g.prototype.allowedEvents_={},g.prototype.on=function(a,b){var c=this.addEventListener;this.addEventListener=Function.prototype,f.on(this,a,b),this.addEventListener=c},g.prototype.addEventListener=g.prototype.on,g.prototype.off=function(a,b){f.off(this,a,b)},g.prototype.removeEventListener=g.prototype.off,g.prototype.one=function(a,b){f.one(this,a,b)},g.prototype.trigger=function(a){var b=a.type||a;"string"==typeof a&&(a={type:b}),a=f.fixEvent(a),this.allowedEvents_[b]&&this["on"+b]&&this["on"+b](a),f.trigger(this,a)},g.prototype.dispatchEvent=g.prototype.trigger,c["default"]=g,b.exports=c["default"]},{"./utils/events.js":124}],96:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0;var e=a("./utils/log"),f=d(e),g=function(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(a.super_=b)},h=function(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],c=function(){a.apply(this,arguments)},d={};"object"==typeof b?("function"==typeof b.init&&(f["default"].warn("Constructor logic via init() is deprecated; please use constructor() instead."),b.constructor=b.init),b.constructor!==Object.prototype.constructor&&(c=b.constructor),d=b):"function"==typeof b&&(c=b),g(c,a);for(var e in d)d.hasOwnProperty(e)&&(c.prototype[e]=d[e]);return c};c["default"]=h,b.exports=c["default"]},{"./utils/log":128}],97:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0;for(var e=a("global/document"),f=d(e),g={},h=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],i=h[0],j=void 0,k=0;k<h.length;k++)if(h[k][1]in f["default"]){j=h[k];break}if(j)for(var k=0;k<j.length;k++)g[i[k]]=j[k];c["default"]=g,b.exports=c["default"]},{"global/document":1}],98:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var g=a("./component"),h=d(g),i=function(a){function b(){e(this,b),a.apply(this,arguments)}return f(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-loading-spinner"})},b}(h["default"]);h["default"].registerComponent("LoadingSpinner",i),c["default"]=i,b.exports=c["default"]},{"./component":63}],99:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0;var e=a("object.assign"),f=d(e),g=function i(a){"number"==typeof a?this.code=a:"string"==typeof a?this.message=a:"object"==typeof a&&f["default"](this,a),this.message||(this.message=i.defaultMessages[this.code]||"")};g.prototype.code=0,g.prototype.message="",g.prototype.status=null,g.errorTypes=["MEDIA_ERR_CUSTOM","MEDIA_ERR_ABORTED","MEDIA_ERR_NETWORK","MEDIA_ERR_DECODE","MEDIA_ERR_SRC_NOT_SUPPORTED","MEDIA_ERR_ENCRYPTED"],g.defaultMessages={1:"You aborted the media playback",2:"A network error caused the media download to fail part-way.",3:"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.",4:"The media could not be loaded, either because the server or network failed or because the format is not supported.",5:"The media is encrypted and we do not have the keys to decrypt it."};for(var h=0;h<g.errorTypes.length;h++)g[g.errorTypes[h]]=h,g.prototype[g.errorTypes[h]]=h;c["default"]=g,b.exports=c["default"]},{"object.assign":45}],100:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("../button.js"),i=e(h),j=a("../component.js"),k=e(j),l=a("./menu.js"),m=e(l),n=a("../utils/dom.js"),o=d(n),p=a("../utils/fn.js"),q=d(p),r=a("../utils/to-title-case.js"),s=e(r),t=function(a){function b(c){var d=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];f(this,b),a.call(this,c,d),this.update(),this.on("keydown",this.handleKeyPress),this.el_.setAttribute("aria-haspopup",!0),this.el_.setAttribute("role","button")}return g(b,a),b.prototype.update=function(){var a=this.createMenu();this.menu&&this.removeChild(this.menu),this.menu=a,this.addChild(a),this.buttonPressed_=!1,this.items&&0===this.items.length?this.hide():this.items&&this.items.length>1&&this.show()},b.prototype.createMenu=function(){var a=new m["default"](this.player_);if(this.options_.title&&a.contentEl().appendChild(o.createEl("li",{className:"vjs-menu-title",innerHTML:s["default"](this.options_.title),tabIndex:-1})),this.items=this.createItems(),this.items)for(var b=0;b<this.items.length;b++)a.addItem(this.items[b]);return a},b.prototype.createItems=function(){},b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:this.buildCSSClass()})},b.prototype.buildCSSClass=function(){var b="vjs-menu-button";return b+=this.options_.inline===!0?"-inline":"-popup","vjs-menu-button "+b+" "+a.prototype.buildCSSClass.call(this)},b.prototype.handleFocus=function(){},b.prototype.handleBlur=function(){},b.prototype.handleClick=function(){this.one("mouseout",q.bind(this,function(){this.menu.unlockShowing(),this.el_.blur()})),this.buttonPressed_?this.unpressButton():this.pressButton()},b.prototype.handleKeyPress=function(a){32===a.which||13===a.which?(this.buttonPressed_?this.unpressButton():this.pressButton(),a.preventDefault()):27===a.which&&(this.buttonPressed_&&this.unpressButton(),a.preventDefault())},b.prototype.pressButton=function(){this.buttonPressed_=!0,this.menu.lockShowing(),this.el_.setAttribute("aria-pressed",!0),this.items&&this.items.length>0&&this.items[0].el().focus()},b.prototype.unpressButton=function(){this.buttonPressed_=!1,this.menu.unlockShowing(),this.el_.setAttribute("aria-pressed",!1)},b}(i["default"]);k["default"].registerComponent("MenuButton",t),c["default"]=t,b.exports=c["default"]},{"../button.js":62,"../component.js":63,"../utils/dom.js":123,"../utils/fn.js":125,"../utils/to-title-case.js":132,"./menu.js":102}],101:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var g=a("../button.js"),h=d(g),i=a("../component.js"),j=d(i),k=a("object.assign"),l=d(k),m=function(a){function b(c,d){e(this,b),a.call(this,c,d),this.selected(d.selected)}return f(b,a),b.prototype.createEl=function(b,c,d){return a.prototype.createEl.call(this,"li",l["default"]({className:"vjs-menu-item",innerHTML:this.localize(this.options_.label)},c),d)},b.prototype.handleClick=function(){this.selected(!0)},b.prototype.selected=function(a){a?(this.addClass("vjs-selected"),this.el_.setAttribute("aria-selected",!0)):(this.removeClass("vjs-selected"),this.el_.setAttribute("aria-selected",!1))},b}(h["default"]);j["default"].registerComponent("MenuItem",m),c["default"]=m,b.exports=c["default"]},{"../button.js":62,"../component.js":63,"object.assign":45}],102:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){
if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("../component.js"),i=e(h),j=a("../utils/dom.js"),k=d(j),l=a("../utils/fn.js"),m=d(l),n=a("../utils/events.js"),o=d(n),p=function(a){function b(){f(this,b),a.apply(this,arguments)}return g(b,a),b.prototype.addItem=function(a){this.addChild(a),a.on("click",m.bind(this,function(){this.unlockShowing()}))},b.prototype.createEl=function(){var b=this.options_.contentElType||"ul";this.contentEl_=k.createEl(b,{className:"vjs-menu-content"});var c=a.prototype.createEl.call(this,"div",{append:this.contentEl_,className:"vjs-menu"});return c.appendChild(this.contentEl_),o.on(c,"click",function(a){a.preventDefault(),a.stopImmediatePropagation()}),c},b}(i["default"]);i["default"].registerComponent("Menu",p),c["default"]=p,b.exports=c["default"]},{"../component.js":63,"../utils/dom.js":123,"../utils/events.js":124,"../utils/fn.js":125}],103:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("./component.js"),i=e(h),j=a("global/document"),k=e(j),l=a("global/window"),m=e(l),n=a("./utils/events.js"),o=d(n),p=a("./utils/dom.js"),q=d(p),r=a("./utils/fn.js"),s=d(r),t=a("./utils/guid.js"),u=d(t),v=a("./utils/browser.js"),w=(d(v),a("./utils/log.js")),x=e(w),y=a("./utils/to-title-case.js"),z=e(y),A=a("./utils/time-ranges.js"),B=a("./utils/buffer.js"),C=a("./utils/stylesheet.js"),D=d(C),E=a("./fullscreen-api.js"),F=e(E),G=a("./media-error.js"),H=e(G),I=a("safe-json-parse/tuple"),J=e(I),K=a("object.assign"),L=e(K),M=a("./utils/merge-options.js"),N=e(M),O=a("./tracks/text-track-list-converter.js"),P=e(O),Q=a("./tech/loader.js"),R=(e(Q),a("./poster-image.js")),S=(e(R),a("./tracks/text-track-display.js")),T=(e(S),a("./loading-spinner.js")),U=(e(T),a("./big-play-button.js")),V=(e(U),a("./control-bar/control-bar.js")),W=(e(V),a("./error-display.js")),X=(e(W),a("./tracks/text-track-settings.js")),Y=(e(X),a("./tech/html5.js")),Z=(e(Y),function(a){function b(c,d,e){var g=this;if(f(this,b),c.id=c.id||"vjs_video_"+u.newGUID(),d=L["default"](b.getTagSettings(c),d),d.initChildren=!1,d.createEl=!1,d.reportTouchActivity=!1,a.call(this,null,d,e),!this.options_||!this.options_.techOrder||!this.options_.techOrder.length)throw new Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");this.tag=c,this.tagAttributes=c&&q.getElAttributes(c),this.language(this.options_.language),d.languages?!function(){var a={};Object.getOwnPropertyNames(d.languages).forEach(function(b){a[b.toLowerCase()]=d.languages[b]}),g.languages_=a}():this.languages_=b.prototype.options_.languages,this.cache_={},this.poster_=d.poster||"",this.controls_=!!d.controls,c.controls=!1,this.scrubbing_=!1,this.el_=this.createEl();var h=N["default"](this.options_);d.plugins&&!function(){var a=d.plugins;Object.getOwnPropertyNames(a).forEach(function(b){"function"==typeof this[b]?this[b](a[b]):x["default"].error("Unable to find plugin:",b)},g)}(),this.options_.playerOptions=h,this.initChildren(),this.isAudio("audio"===c.nodeName.toLowerCase()),this.addClass(this.controls()?"vjs-controls-enabled":"vjs-controls-disabled"),this.isAudio()&&this.addClass("vjs-audio"),this.flexNotSupported_()&&this.addClass("vjs-no-flex"),b.players[this.id_]=this,this.userActive(!0),this.reportUserActivity(),this.listenForUserActivity_(),this.on("fullscreenchange",this.handleFullscreenChange_),this.on("stageclick",this.handleStageClick_)}return g(b,a),b.prototype.dispose=function(){this.trigger("dispose"),this.off("dispose"),this.styleEl_&&this.styleEl_.parentNode.removeChild(this.styleEl_),b.players[this.id_]=null,this.tag&&this.tag.player&&(this.tag.player=null),this.el_&&this.el_.player&&(this.el_.player=null),this.tech_&&this.tech_.dispose(),a.prototype.dispose.call(this)},b.prototype.createEl=function(){var b=this.el_=a.prototype.createEl.call(this,"div"),c=this.tag;c.removeAttribute("width"),c.removeAttribute("height");var d=q.getElAttributes(c);Object.getOwnPropertyNames(d).forEach(function(a){"class"===a?b.className=d[a]:b.setAttribute(a,d[a])}),c.id+="_html5_api",c.className="vjs-tech",c.player=b.player=this,this.addClass("vjs-paused"),this.styleEl_=D.createStyleElement("vjs-styles-dimensions");var e=k["default"].querySelector(".vjs-styles-defaults"),f=k["default"].querySelector("head");return f.insertBefore(this.styleEl_,e?e.nextSibling:f.firstChild),this.width(this.options_.width),this.height(this.options_.height),this.fluid(this.options_.fluid),this.aspectRatio(this.options_.aspectRatio),c.initNetworkState_=c.networkState,c.parentNode&&c.parentNode.insertBefore(b,c),q.insertElFirst(c,b),this.el_=b,b},b.prototype.width=function(a){return this.dimension("width",a)},b.prototype.height=function(a){return this.dimension("height",a)},b.prototype.dimension=function(a,b){var c=a+"_";if(void 0===b)return this[c]||0;if(""===b)this[c]=void 0;else{var d=parseFloat(b);if(isNaN(d))return x["default"].error('Improper value "'+b+'" supplied for for '+a),this;this[c]=d}return this.updateStyleEl_(),this},b.prototype.fluid=function(a){return void 0===a?!!this.fluid_:(this.fluid_=!!a,void(a?this.addClass("vjs-fluid"):this.removeClass("vjs-fluid")))},b.prototype.aspectRatio=function(a){if(void 0===a)return this.aspectRatio_;if(!/^\d+\:\d+$/.test(a))throw new Error("Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.");this.aspectRatio_=a,this.fluid(!0),this.updateStyleEl_()},b.prototype.updateStyleEl_=function(){var a=void 0,b=void 0,c=void 0;c=void 0!==this.aspectRatio_&&"auto"!==this.aspectRatio_?this.aspectRatio_:this.videoWidth()?this.videoWidth()+":"+this.videoHeight():"16:9";var d=c.split(":"),e=d[1]/d[0];a=void 0!==this.width_?this.width_:void 0!==this.height_?this.height_/e:this.videoWidth()||300,b=void 0!==this.height_?this.height_:a*e;var f=this.id()+"-dimensions";this.addClass(f),D.setTextContent(this.styleEl_,"\n      ."+f+" {\n        width: "+a+"px;\n        height: "+b+"px;\n      }\n\n      ."+f+".vjs-fluid {\n        padding-top: "+100*e+"%;\n      }\n    ")},b.prototype.loadTech_=function(a,b){this.tech_&&this.unloadTech_(),"Html5"!==a&&this.tag&&(i["default"].getComponent("Html5").disposeMediaElement(this.tag),this.tag.player=null,this.tag=null),this.techName_=a,this.isReady_=!1;var c=L["default"]({nativeControlsForTouch:this.options_.nativeControlsForTouch,source:b,playerId:this.id(),techId:this.id()+"_"+a+"_api",textTracks:this.textTracks_,autoplay:this.options_.autoplay,preload:this.options_.preload,loop:this.options_.loop,muted:this.options_.muted,poster:this.poster(),language:this.language(),"vtt.js":this.options_["vtt.js"]},this.options_[a.toLowerCase()]);this.tag&&(c.tag=this.tag),b&&(this.currentType_=b.type,b.src===this.cache_.src&&this.cache_.currentTime>0&&(c.startTime=this.cache_.currentTime),this.cache_.src=b.src);var d=i["default"].getComponent(a);this.tech_=new d(c),this.tech_.ready(s.bind(this,this.handleTechReady_),!0),P["default"].jsonToTextTracks(this.textTracksJson_||[],this.tech_),this.on(this.tech_,"loadstart",this.handleTechLoadStart_),this.on(this.tech_,"waiting",this.handleTechWaiting_),this.on(this.tech_,"canplay",this.handleTechCanPlay_),this.on(this.tech_,"canplaythrough",this.handleTechCanPlayThrough_),this.on(this.tech_,"playing",this.handleTechPlaying_),this.on(this.tech_,"ended",this.handleTechEnded_),this.on(this.tech_,"seeking",this.handleTechSeeking_),this.on(this.tech_,"seeked",this.handleTechSeeked_),this.on(this.tech_,"play",this.handleTechPlay_),this.on(this.tech_,"firstplay",this.handleTechFirstPlay_),this.on(this.tech_,"pause",this.handleTechPause_),this.on(this.tech_,"progress",this.handleTechProgress_),this.on(this.tech_,"durationchange",this.handleTechDurationChange_),this.on(this.tech_,"fullscreenchange",this.handleTechFullscreenChange_),this.on(this.tech_,"error",this.handleTechError_),this.on(this.tech_,"suspend",this.handleTechSuspend_),this.on(this.tech_,"abort",this.handleTechAbort_),this.on(this.tech_,"emptied",this.handleTechEmptied_),this.on(this.tech_,"stalled",this.handleTechStalled_),this.on(this.tech_,"loadedmetadata",this.handleTechLoadedMetaData_),this.on(this.tech_,"loadeddata",this.handleTechLoadedData_),this.on(this.tech_,"timeupdate",this.handleTechTimeUpdate_),this.on(this.tech_,"ratechange",this.handleTechRateChange_),this.on(this.tech_,"volumechange",this.handleTechVolumeChange_),this.on(this.tech_,"texttrackchange",this.handleTechTextTrackChange_),this.on(this.tech_,"loadedmetadata",this.updateStyleEl_),this.on(this.tech_,"posterchange",this.handleTechPosterChange_),this.usingNativeControls(this.techGet_("controls")),this.controls()&&!this.usingNativeControls()&&this.addTechControlsListeners_(),this.tech_.el().parentNode===this.el()||"Html5"===a&&this.tag||q.insertElFirst(this.tech_.el(),this.el()),this.tag&&(this.tag.player=null,this.tag=null)},b.prototype.unloadTech_=function(){this.textTracks_=this.textTracks(),this.textTracksJson_=P["default"].textTracksToJson(this),this.isReady_=!1,this.tech_.dispose(),this.tech_=!1},b.prototype.addTechControlsListeners_=function(){this.removeTechControlsListeners_(),this.on(this.tech_,"mousedown",this.handleTechClick_),this.on(this.tech_,"touchstart",this.handleTechTouchStart_),this.on(this.tech_,"touchmove",this.handleTechTouchMove_),this.on(this.tech_,"touchend",this.handleTechTouchEnd_),this.on(this.tech_,"tap",this.handleTechTap_)},b.prototype.removeTechControlsListeners_=function(){this.off(this.tech_,"tap",this.handleTechTap_),this.off(this.tech_,"touchstart",this.handleTechTouchStart_),this.off(this.tech_,"touchmove",this.handleTechTouchMove_),this.off(this.tech_,"touchend",this.handleTechTouchEnd_),this.off(this.tech_,"mousedown",this.handleTechClick_)},b.prototype.handleTechReady_=function(){this.triggerReady(),this.cache_.volume&&this.techCall_("setVolume",this.cache_.volume),this.handleTechPosterChange_(),this.handleTechDurationChange_(),this.tag&&this.options_.autoplay&&this.paused()&&(delete this.tag.poster,this.play())},b.prototype.handleTechLoadStart_=function(){this.removeClass("vjs-ended"),this.error(null),this.paused()?(this.hasStarted(!1),this.trigger("loadstart")):(this.trigger("loadstart"),this.trigger("firstplay"))},b.prototype.hasStarted=function(a){return void 0!==a?(this.hasStarted_!==a&&(this.hasStarted_=a,a?(this.addClass("vjs-has-started"),this.trigger("firstplay")):this.removeClass("vjs-has-started")),this):!!this.hasStarted_},b.prototype.handleTechPlay_=function(){this.removeClass("vjs-ended"),this.removeClass("vjs-paused"),this.addClass("vjs-playing"),this.hasStarted(!0),this.trigger("play")},b.prototype.handleTechWaiting_=function(){this.addClass("vjs-waiting"),this.trigger("waiting")},b.prototype.handleTechCanPlay_=function(){this.removeClass("vjs-waiting"),this.trigger("canplay")},b.prototype.handleTechCanPlayThrough_=function(){this.removeClass("vjs-waiting"),this.trigger("canplaythrough")},b.prototype.handleTechPlaying_=function(){this.removeClass("vjs-waiting"),this.trigger("playing")},b.prototype.handleTechSeeking_=function(){this.addClass("vjs-seeking"),this.trigger("seeking")},b.prototype.handleTechSeeked_=function(){this.removeClass("vjs-seeking"),this.trigger("seeked")},b.prototype.handleTechFirstPlay_=function(){this.options_.starttime&&this.currentTime(this.options_.starttime),this.addClass("vjs-has-started"),this.trigger("firstplay")},b.prototype.handleTechPause_=function(){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.trigger("pause")},b.prototype.handleTechProgress_=function(){this.trigger("progress")},b.prototype.handleTechEnded_=function(){this.addClass("vjs-ended"),this.options_.loop?(this.currentTime(0),this.play()):this.paused()||this.pause(),this.trigger("ended")},b.prototype.handleTechDurationChange_=function(){this.duration(this.techGet_("duration"))},b.prototype.handleTechClick_=function(a){0===a.button&&this.controls()&&(this.paused()?this.play():this.pause())},b.prototype.handleTechTap_=function(){this.userActive(!this.userActive())},b.prototype.handleTechTouchStart_=function(){this.userWasActive=this.userActive()},b.prototype.handleTechTouchMove_=function(){this.userWasActive&&this.reportUserActivity()},b.prototype.handleTechTouchEnd_=function(a){a.preventDefault()},b.prototype.handleFullscreenChange_=function(){this.isFullscreen()?this.addClass("vjs-fullscreen"):this.removeClass("vjs-fullscreen")},b.prototype.handleStageClick_=function(){this.reportUserActivity()},b.prototype.handleTechFullscreenChange_=function(a,b){b&&this.isFullscreen(b.isFullscreen),this.trigger("fullscreenchange")},b.prototype.handleTechError_=function(){var a=this.tech_.error();this.error(a&&a.code)},b.prototype.handleTechSuspend_=function(){this.trigger("suspend")},b.prototype.handleTechAbort_=function(){this.trigger("abort")},b.prototype.handleTechEmptied_=function(){this.trigger("emptied")},b.prototype.handleTechStalled_=function(){this.trigger("stalled")},b.prototype.handleTechLoadedMetaData_=function(){this.trigger("loadedmetadata")},b.prototype.handleTechLoadedData_=function(){this.trigger("loadeddata")},b.prototype.handleTechTimeUpdate_=function(){this.trigger("timeupdate")},b.prototype.handleTechRateChange_=function(){this.trigger("ratechange")},b.prototype.handleTechVolumeChange_=function(){this.trigger("volumechange")},b.prototype.handleTechTextTrackChange_=function(){this.trigger("texttrackchange")},b.prototype.getCache=function(){return this.cache_},b.prototype.techCall_=function(a,b){if(this.tech_&&!this.tech_.isReady_)this.tech_.ready(function(){this[a](b)},!0);else try{this.tech_[a](b)}catch(c){throw x["default"](c),c}},b.prototype.techGet_=function(a){if(this.tech_&&this.tech_.isReady_)try{return this.tech_[a]()}catch(b){throw void 0===this.tech_[a]?x["default"]("Video.js: "+a+" method not defined for "+this.techName_+" playback technology.",b):"TypeError"===b.name?(x["default"]("Video.js: "+a+" unavailable on "+this.techName_+" playback technology element.",b),this.tech_.isReady_=!1):x["default"](b),b}},b.prototype.play=function(){return this.techCall_("play"),this},b.prototype.pause=function(){return this.techCall_("pause"),this},b.prototype.paused=function(){return this.techGet_("paused")===!1?!1:!0},b.prototype.scrubbing=function(a){return void 0!==a?(this.scrubbing_=!!a,a?this.addClass("vjs-scrubbing"):this.removeClass("vjs-scrubbing"),this):this.scrubbing_},b.prototype.currentTime=function(a){return void 0!==a?(this.techCall_("setCurrentTime",a),this):this.cache_.currentTime=this.techGet_("currentTime")||0},b.prototype.duration=function(a){return void 0===a?this.cache_.duration||0:(a=parseFloat(a)||0,0>a&&(a=1/0),a!==this.cache_.duration&&(this.cache_.duration=a,a===1/0?this.addClass("vjs-live"):this.removeClass("vjs-live"),this.trigger("durationchange")),this)},b.prototype.remainingTime=function(){return this.duration()-this.currentTime()},b.prototype.buffered=function c(){var c=this.techGet_("buffered");return c&&c.length||(c=A.createTimeRange(0,0)),c},b.prototype.bufferedPercent=function(){return B.bufferedPercent(this.buffered(),this.duration())},b.prototype.bufferedEnd=function(){var a=this.buffered(),b=this.duration(),c=a.end(a.length-1);return c>b&&(c=b),c},b.prototype.volume=function(a){var b=void 0;return void 0!==a?(b=Math.max(0,Math.min(1,parseFloat(a))),this.cache_.volume=b,this.techCall_("setVolume",b),this):(b=parseFloat(this.techGet_("volume")),isNaN(b)?1:b)},b.prototype.muted=function(a){return void 0!==a?(this.techCall_("setMuted",a),this):this.techGet_("muted")||!1},b.prototype.supportsFullScreen=function(){return this.techGet_("supportsFullScreen")||!1},b.prototype.isFullscreen=function(a){return void 0!==a?(this.isFullscreen_=!!a,this):!!this.isFullscreen_},b.prototype.requestFullscreen=function(){var a=F["default"];return this.isFullscreen(!0),a.requestFullscreen?(o.on(k["default"],a.fullscreenchange,s.bind(this,function b(){this.isFullscreen(k["default"][a.fullscreenElement]),this.isFullscreen()===!1&&o.off(k["default"],a.fullscreenchange,b),this.trigger("fullscreenchange")})),this.el_[a.requestFullscreen]()):this.tech_.supportsFullScreen()?this.techCall_("enterFullScreen"):(this.enterFullWindow(),this.trigger("fullscreenchange")),this},b.prototype.exitFullscreen=function(){var a=F["default"];return this.isFullscreen(!1),a.requestFullscreen?k["default"][a.exitFullscreen]():this.tech_.supportsFullScreen()?this.techCall_("exitFullScreen"):(this.exitFullWindow(),this.trigger("fullscreenchange")),this},b.prototype.enterFullWindow=function(){this.isFullWindow=!0,this.docOrigOverflow=k["default"].documentElement.style.overflow,o.on(k["default"],"keydown",s.bind(this,this.fullWindowOnEscKey)),k["default"].documentElement.style.overflow="hidden",q.addElClass(k["default"].body,"vjs-full-window"),this.trigger("enterFullWindow")},b.prototype.fullWindowOnEscKey=function(a){27===a.keyCode&&(this.isFullscreen()===!0?this.exitFullscreen():this.exitFullWindow())},b.prototype.exitFullWindow=function(){this.isFullWindow=!1,o.off(k["default"],"keydown",this.fullWindowOnEscKey),k["default"].documentElement.style.overflow=this.docOrigOverflow,q.removeElClass(k["default"].body,"vjs-full-window"),this.trigger("exitFullWindow")},b.prototype.selectSource=function(a){for(var b=0,c=this.options_.techOrder;b<c.length;b++){var d=z["default"](c[b]),e=i["default"].getComponent(d);if(e){if(e.isSupported())for(var f=0,g=a;f<g.length;f++){var h=g[f];if(e.canPlaySource(h))return{source:h,tech:d}}}else x["default"].error('The "'+d+'" tech is undefined. Skipped browser support check for that tech.')}return!1},b.prototype.src=function(a){if(void 0===a)return this.techGet_("src");var b=i["default"].getComponent(this.techName_);return Array.isArray(a)?this.sourceList_(a):"string"==typeof a?this.src({src:a}):a instanceof Object&&(a.type&&!b.canPlaySource(a)?this.sourceList_([a]):(this.cache_.src=a.src,this.currentType_=a.type||"",this.ready(function(){b.prototype.hasOwnProperty("setSource")?this.techCall_("setSource",a):this.techCall_("src",a.src),"auto"===this.options_.preload&&this.load(),this.options_.autoplay&&this.play()},!0))),this},b.prototype.sourceList_=function(a){var b=this.selectSource(a);b?b.tech===this.techName_?this.src(b.source):this.loadTech_(b.tech,b.source):(this.setTimeout(function(){this.error({code:4,message:this.localize(this.options_.notSupportedMessage)})},0),this.triggerReady())},b.prototype.load=function(){return this.techCall_("load"),this},b.prototype.currentSrc=function(){return this.techGet_("currentSrc")||this.cache_.src||""},b.prototype.currentType=function(){return this.currentType_||""},b.prototype.preload=function(a){return void 0!==a?(this.techCall_("setPreload",a),this.options_.preload=a,this):this.techGet_("preload")},b.prototype.autoplay=function(a){return void 0!==a?(this.techCall_("setAutoplay",a),this.options_.autoplay=a,this):this.techGet_("autoplay",a)},b.prototype.loop=function(a){return void 0!==a?(this.techCall_("setLoop",a),this.options_.loop=a,this):this.techGet_("loop")},b.prototype.poster=function(a){return void 0===a?this.poster_:(a||(a=""),this.poster_=a,this.techCall_("setPoster",a),this.trigger("posterchange"),this)},b.prototype.handleTechPosterChange_=function(){!this.poster_&&this.tech_&&this.tech_.poster&&(this.poster_=this.tech_.poster()||"",this.trigger("posterchange"))},b.prototype.controls=function(a){return void 0!==a?(a=!!a,this.controls_!==a&&(this.controls_=a,this.usingNativeControls()&&this.techCall_("setControls",a),a?(this.removeClass("vjs-controls-disabled"),this.addClass("vjs-controls-enabled"),this.trigger("controlsenabled"),this.usingNativeControls()||this.addTechControlsListeners_()):(this.removeClass("vjs-controls-enabled"),this.addClass("vjs-controls-disabled"),this.trigger("controlsdisabled"),this.usingNativeControls()||this.removeTechControlsListeners_())),this):!!this.controls_},b.prototype.usingNativeControls=function(a){return void 0!==a?(a=!!a,this.usingNativeControls_!==a&&(this.usingNativeControls_=a,a?(this.addClass("vjs-using-native-controls"),this.trigger("usingnativecontrols")):(this.removeClass("vjs-using-native-controls"),this.trigger("usingcustomcontrols"))),this):!!this.usingNativeControls_},b.prototype.error=function(a){return void 0===a?this.error_||null:null===a?(this.error_=a,this.removeClass("vjs-error"),this):(this.error_=a instanceof H["default"]?a:new H["default"](a),this.trigger("error"),this.addClass("vjs-error"),x["default"].error("(CODE:"+this.error_.code+" "+H["default"].errorTypes[this.error_.code]+")",this.error_.message,this.error_),this)},b.prototype.ended=function(){return this.techGet_("ended")},b.prototype.seeking=function(){return this.techGet_("seeking")},b.prototype.seekable=function(){return this.techGet_("seekable")},b.prototype.reportUserActivity=function(){this.userActivity_=!0},b.prototype.userActive=function(a){return void 0!==a?(a=!!a,a!==this.userActive_&&(this.userActive_=a,a?(this.userActivity_=!0,this.removeClass("vjs-user-inactive"),this.addClass("vjs-user-active"),this.trigger("useractive")):(this.userActivity_=!1,this.tech_&&this.tech_.one("mousemove",function(a){a.stopPropagation(),a.preventDefault()}),this.removeClass("vjs-user-active"),this.addClass("vjs-user-inactive"),this.trigger("userinactive"))),this):this.userActive_},b.prototype.listenForUserActivity_=function(){var a=void 0,b=void 0,c=void 0,d=s.bind(this,this.reportUserActivity),e=function(a){(a.screenX!==b||a.screenY!==c)&&(b=a.screenX,c=a.screenY,d())},f=function(){d(),this.clearInterval(a),a=this.setInterval(d,250)},g=function(){d(),this.clearInterval(a)};this.on("mousedown",f),this.on("mousemove",e),this.on("mouseup",g),this.on("keydown",d),this.on("keyup",d);{var h=void 0;this.setInterval(function(){if(this.userActivity_){this.userActivity_=!1,this.userActive(!0),this.clearTimeout(h);var a=this.options_.inactivityTimeout;a>0&&(h=this.setTimeout(function(){this.userActivity_||this.userActive(!1)},a))}},250)}},b.prototype.playbackRate=function(a){return void 0!==a?(this.techCall_("setPlaybackRate",a),this):this.tech_&&this.tech_.featuresPlaybackRate?this.techGet_("playbackRate"):1},b.prototype.isAudio=function(a){return void 0!==a?(this.isAudio_=!!a,this):!!this.isAudio_},b.prototype.networkState=function(){return this.techGet_("networkState")},b.prototype.readyState=function(){return this.techGet_("readyState")},b.prototype.textTracks=function(){return this.tech_&&this.tech_.textTracks()},b.prototype.remoteTextTracks=function(){return this.tech_&&this.tech_.remoteTextTracks()},b.prototype.addTextTrack=function(a,b,c){return this.tech_&&this.tech_.addTextTrack(a,b,c)},b.prototype.addRemoteTextTrack=function(a){return this.tech_&&this.tech_.addRemoteTextTrack(a)},b.prototype.removeRemoteTextTrack=function(a){this.tech_&&this.tech_.removeRemoteTextTrack(a)},b.prototype.videoWidth=function(){return this.tech_&&this.tech_.videoWidth&&this.tech_.videoWidth()||0},b.prototype.videoHeight=function(){return this.tech_&&this.tech_.videoHeight&&this.tech_.videoHeight()||0},b.prototype.language=function(a){return void 0===a?this.language_:(this.language_=(""+a).toLowerCase(),this)},b.prototype.languages=function(){return N["default"](b.prototype.options_.languages,this.languages_)},b.prototype.toJSON=function(){var a=N["default"](this.options_),b=a.tracks;a.tracks=[];for(var c=0;c<b.length;c++){var d=b[c];d=N["default"](d),d.player=void 0,a.tracks[c]=d}return a},b.getTagSettings=function(a){var b={sources:[],tracks:[]},c=q.getElAttributes(a),d=c["data-setup"];if(null!==d){var e=J["default"](d||"{}"),f=e[0],g=e[1];f&&x["default"].error(f),L["default"](c,g)}if(L["default"](b,c),a.hasChildNodes())for(var h=a.childNodes,i=0,j=h.length;j>i;i++){var k=h[i],l=k.nodeName.toLowerCase();"source"===l?b.sources.push(q.getElAttributes(k)):"track"===l&&b.tracks.push(q.getElAttributes(k))}return b},b}(i["default"]));Z.players={};var $=m["default"].navigator;Z.prototype.options_={techOrder:["html5","flash"],html5:{},flash:{},defaultVolume:0,inactivityTimeout:2e3,playbackRates:[],children:["mediaLoader","posterImage","textTrackDisplay","loadingSpinner","bigPlayButton","controlBar","errorDisplay","textTrackSettings"],language:k["default"].getElementsByTagName("html")[0].getAttribute("lang")||$.languages&&$.languages[0]||$.userLanguage||$.language||"en",languages:{},notSupportedMessage:"No compatible source was found for this video."},Z.prototype.handleLoadedMetaData_,Z.prototype.handleLoadedData_,Z.prototype.handleUserActive_,Z.prototype.handleUserInactive_,Z.prototype.handleTimeUpdate_,Z.prototype.handleVolumeChange_,Z.prototype.handleError_,Z.prototype.flexNotSupported_=function(){var a=k["default"].createElement("i");return!("flexBasis"in a.style||"webkitFlexBasis"in a.style||"mozFlexBasis"in a.style||"msFlexBasis"in a.style||"msFlexOrder"in a.style)},i["default"].registerComponent("Player",Z),c["default"]=Z,b.exports=c["default"]},{"./big-play-button.js":61,"./component.js":63,"./control-bar/control-bar.js":64,"./error-display.js":94,"./fullscreen-api.js":97,"./loading-spinner.js":98,"./media-error.js":99,"./poster-image.js":105,"./tech/html5.js":110,"./tech/loader.js":111,"./tracks/text-track-display.js":114,"./tracks/text-track-list-converter.js":116,"./tracks/text-track-settings.js":118,"./utils/browser.js":120,"./utils/buffer.js":121,"./utils/dom.js":123,"./utils/events.js":124,"./utils/fn.js":125,"./utils/guid.js":127,"./utils/log.js":128,"./utils/merge-options.js":129,"./utils/stylesheet.js":130,"./utils/time-ranges.js":131,"./utils/to-title-case.js":132,"global/document":1,"global/window":2,"object.assign":45,"safe-json-parse/tuple":53}],104:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0;var e=a("./player.js"),f=d(e),g=function(a,b){f["default"].prototype[a]=b};c["default"]=g,b.exports=c["default"]},{"./player.js":103}],105:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("./button.js"),i=e(h),j=a("./component.js"),k=e(j),l=a("./utils/fn.js"),m=d(l),n=a("./utils/dom.js"),o=d(n),p=a("./utils/browser.js"),q=d(p),r=function(a){function b(c,d){f(this,b),a.call(this,c,d),this.update(),c.on("posterchange",m.bind(this,this.update))}return g(b,a),b.prototype.dispose=function(){this.player().off("posterchange",this.update),a.prototype.dispose.call(this)},b.prototype.createEl=function(){var a=o.createEl("div",{className:"vjs-poster",tabIndex:-1});return q.BACKGROUND_SIZE_SUPPORTED||(this.fallbackImg_=o.createEl("img"),a.appendChild(this.fallbackImg_)),a},b.prototype.update=function(){var a=this.player().poster();this.setSrc(a),a?this.show():this.hide()},b.prototype.setSrc=function(a){if(this.fallbackImg_)this.fallbackImg_.src=a;else{var b="";a&&(b='url("'+a+'")'),this.el_.style.backgroundImage=b}},b.prototype.handleClick=function(){this.player_.paused()?this.player_.play():this.player_.pause()},b}(i["default"]);k["default"].registerComponent("PosterImage",r),c["default"]=r,b.exports=c["default"]},{"./button.js":62,"./component.js":63,"./utils/browser.js":120,"./utils/dom.js":123,"./utils/fn.js":125}],106:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}c.__esModule=!0;var f=a("./utils/events.js"),g=e(f),h=a("global/document"),i=d(h),j=a("global/window"),k=d(j),l=!1,m=void 0,n=function(){var a=i["default"].getElementsByTagName("video"),b=i["default"].getElementsByTagName("audio"),c=[];if(a&&a.length>0)for(var d=0,e=a.length;e>d;d++)c.push(a[d]);if(b&&b.length>0)for(var d=0,e=b.length;e>d;d++)c.push(b[d]);if(c&&c.length>0)for(var d=0,e=c.length;e>d;d++){var f=c[d];if(!f||!f.getAttribute){o(1);break}if(void 0===f.player){var g=f.getAttribute("data-setup");if(null!==g){m(f)}}}else l||o(1)},o=function(a,b){m=b,setTimeout(n,a)};"complete"===i["default"].readyState?l=!0:g.one(k["default"],"load",function(){l=!0});var p=function(){return l};c.autoSetup=n,c.autoSetupTimeout=o,c.hasLoaded=p},{"./utils/events.js":124,"global/document":1,"global/window":2}],107:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("../component.js"),i=e(h),j=a("../utils/dom.js"),k=d(j),l=a("global/document"),m=e(l),n=a("object.assign"),o=e(n),p=function(a){function b(c,d){f(this,b),a.call(this,c,d),this.bar=this.getChild(this.options_.barName),this.vertical(!!this.options_.vertical),this.on("mousedown",this.handleMouseDown),this.on("touchstart",this.handleMouseDown),this.on("focus",this.handleFocus),this.on("blur",this.handleBlur),this.on("click",this.handleClick),this.on(c,"controlsvisible",this.update),this.on(c,this.playerEvent,this.update)}return g(b,a),b.prototype.createEl=function(b){var c=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],d=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];return c.className=c.className+" vjs-slider",c=o["default"]({tabIndex:0},c),d=o["default"]({role:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,tabIndex:0},d),a.prototype.createEl.call(this,b,c,d)},b.prototype.handleMouseDown=function(a){a.preventDefault(),k.blockTextSelection(),this.addClass("vjs-sliding"),this.trigger("slideractive"),this.on(m["default"],"mousemove",this.handleMouseMove),this.on(m["default"],"mouseup",this.handleMouseUp),this.on(m["default"],"touchmove",this.handleMouseMove),this.on(m["default"],"touchend",this.handleMouseUp),this.handleMouseMove(a)},b.prototype.handleMouseMove=function(){},b.prototype.handleMouseUp=function(){k.unblockTextSelection(),this.removeClass("vjs-sliding"),this.trigger("sliderinactive"),this.off(m["default"],"mousemove",this.handleMouseMove),this.off(m["default"],"mouseup",this.handleMouseUp),this.off(m["default"],"touchmove",this.handleMouseMove),
this.off(m["default"],"touchend",this.handleMouseUp),this.update()},b.prototype.update=function(){if(this.el_){var a=this.getPercent(),b=this.bar;if(b){("number"!=typeof a||a!==a||0>a||a===1/0)&&(a=0);var c=(100*a).toFixed(2)+"%";this.vertical()?b.el().style.height=c:b.el().style.width=c}}},b.prototype.calculateDistance=function(a){var b=k.getPointerPosition(this.el_,a);return this.vertical()?b.y:b.x},b.prototype.handleFocus=function(){this.on(m["default"],"keydown",this.handleKeyPress)},b.prototype.handleKeyPress=function(a){37===a.which||40===a.which?(a.preventDefault(),this.stepBack()):(38===a.which||39===a.which)&&(a.preventDefault(),this.stepForward())},b.prototype.handleBlur=function(){this.off(m["default"],"keydown",this.handleKeyPress)},b.prototype.handleClick=function(a){a.stopImmediatePropagation(),a.preventDefault()},b.prototype.vertical=function(a){return void 0===a?this.vertical_||!1:(this.vertical_=!!a,this.addClass(this.vertical_?"vjs-slider-vertical":"vjs-slider-horizontal"),this)},b}(i["default"]);i["default"].registerComponent("Slider",p),c["default"]=p,b.exports=c["default"]},{"../component.js":63,"../utils/dom.js":123,"global/document":1,"object.assign":45}],108:[function(a,b,c){"use strict";function d(a){return a.streamingFormats={"rtmp/mp4":"MP4","rtmp/flv":"FLV"},a.streamFromParts=function(a,b){return a+"&"+b},a.streamToParts=function(a){var b={connection:"",stream:""};if(!a)return b;var c=a.indexOf("&"),d=void 0;return-1!==c?d=c+1:(c=d=a.lastIndexOf("/")+1,0===c&&(c=d=a.length)),b.connection=a.substring(0,c),b.stream=a.substring(d,a.length),b},a.isStreamingType=function(b){return b in a.streamingFormats},a.RTMP_RE=/^rtmp[set]?:\/\//i,a.isStreamingSrc=function(b){return a.RTMP_RE.test(b)},a.rtmpSourceHandler={},a.rtmpSourceHandler.canHandleSource=function(b){return a.isStreamingType(b.type)||a.isStreamingSrc(b.src)?"maybe":""},a.rtmpSourceHandler.handleSource=function(b,c){var d=a.streamToParts(b.src);c.setRtmpConnection(d.connection),c.setRtmpStream(d.stream)},a.registerSourceHandler(a.rtmpSourceHandler),a}c.__esModule=!0,c["default"]=d,b.exports=c["default"]},{}],109:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function h(a){var b=a.charAt(0).toUpperCase()+a.slice(1);A["set"+b]=function(b){return this.el_.vjs_setProperty(a,b)}}function i(a){A[a]=function(){return this.el_.vjs_getProperty(a)}}c.__esModule=!0;for(var j=a("./tech"),k=e(j),l=a("../utils/dom.js"),m=d(l),n=a("../utils/url.js"),o=d(n),p=a("../utils/time-ranges.js"),q=a("./flash-rtmp"),r=e(q),s=a("../component"),t=e(s),u=a("global/window"),v=e(u),w=a("object.assign"),x=e(w),y=v["default"].navigator,z=function(a){function b(c,d){f(this,b),a.call(this,c,d),c.source&&this.ready(function(){this.setSource(c.source)},!0),c.startTime&&this.ready(function(){this.load(),this.play(),this.currentTime(c.startTime)},!0),v["default"].videojs=v["default"].videojs||{},v["default"].videojs.Flash=v["default"].videojs.Flash||{},v["default"].videojs.Flash.onReady=b.onReady,v["default"].videojs.Flash.onEvent=b.onEvent,v["default"].videojs.Flash.onError=b.onError,this.on("seeked",function(){this.lastSeekTarget_=void 0})}return g(b,a),b.prototype.createEl=function(){var a=this.options_;a.swf||(a.swf="//vjs.zencdn.net/swf/5.0.0-rc1/video-js.swf");var c=a.techId,d=x["default"]({readyFunction:"videojs.Flash.onReady",eventProxyFunction:"videojs.Flash.onEvent",errorEventProxyFunction:"videojs.Flash.onError",autoplay:a.autoplay,preload:a.preload,loop:a.loop,muted:a.muted},a.flashVars),e=x["default"]({wmode:"opaque",bgcolor:"#000000"},a.params),f=x["default"]({id:c,name:c,"class":"vjs-tech"},a.attributes);return this.el_=b.embed(a.swf,d,e,f),this.el_.tech=this,this.el_},b.prototype.play=function(){this.ended()&&this.setCurrentTime(0),this.el_.vjs_play()},b.prototype.pause=function(){this.el_.vjs_pause()},b.prototype.src=function(a){return void 0===a?this.currentSrc():this.setSrc(a)},b.prototype.setSrc=function(a){if(a=o.getAbsoluteURL(a),this.el_.vjs_src(a),this.autoplay()){var b=this;this.setTimeout(function(){b.play()},0)}},b.prototype.seeking=function(){return void 0!==this.lastSeekTarget_},b.prototype.setCurrentTime=function(b){var c=this.seekable();c.length&&(b=b>c.start(0)?b:c.start(0),b=b<c.end(c.length-1)?b:c.end(c.length-1),this.lastSeekTarget_=b,this.trigger("seeking"),this.el_.vjs_setProperty("currentTime",b),a.prototype.setCurrentTime.call(this))},b.prototype.currentTime=function(){return this.seeking()?this.lastSeekTarget_||0:this.el_.vjs_getProperty("currentTime")},b.prototype.currentSrc=function(){return this.currentSource_?this.currentSource_.src:this.el_.vjs_getProperty("currentSrc")},b.prototype.load=function(){this.el_.vjs_load()},b.prototype.poster=function(){this.el_.vjs_getProperty("poster")},b.prototype.setPoster=function(){},b.prototype.seekable=function(){var a=this.duration();return 0===a?p.createTimeRange():p.createTimeRange(0,a)},b.prototype.buffered=function(){var a=this.el_.vjs_getProperty("buffered");return 0===a.length?p.createTimeRange():p.createTimeRange(a[0][0],a[0][1])},b.prototype.supportsFullScreen=function(){return!1},b.prototype.enterFullScreen=function(){return!1},b}(k["default"]),A=z.prototype,B="rtmpConnection,rtmpStream,preload,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted".split(","),C="networkState,readyState,initialTime,duration,startOffsetTime,paused,ended,videoTracks,audioTracks,videoWidth,videoHeight".split(","),D=0;D<B.length;D++)i(B[D]),h(B[D]);for(var D=0;D<C.length;D++)i(C[D]);z.isSupported=function(){return z.version()[0]>=10},k["default"].withSourceHandlers(z),z.nativeSourceHandler={},z.nativeSourceHandler.canHandleSource=function(a){function b(a){var b=o.getFileExtension(a);return b?"video/"+b:""}var c;return c=a.type?a.type.replace(/;.*/,"").toLowerCase():b(a.src),c in z.formats?"maybe":""},z.nativeSourceHandler.handleSource=function(a,b){b.setSrc(a.src)},z.nativeSourceHandler.dispose=function(){},z.registerSourceHandler(z.nativeSourceHandler),z.formats={"video/flv":"FLV","video/x-flv":"FLV","video/mp4":"MP4","video/m4v":"MP4"},z.onReady=function(a){var b=m.getEl(a),c=b&&b.tech;c&&c.el()&&z.checkReady(c)},z.checkReady=function(a){a.el()&&(a.el().vjs_getProperty?a.triggerReady():this.setTimeout(function(){z.checkReady(a)},50))},z.onEvent=function(a,b){var c=m.getEl(a).tech;c.trigger(b)},z.onError=function(a,b){var c=m.getEl(a).tech;return"srcnotfound"===b?c.error(4):void c.error("FLASH: "+b)},z.version=function(){var a="0,0,0";try{a=new v["default"].ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g,",").match(/^,?(.+),?$/)[1]}catch(b){try{y.mimeTypes["application/x-shockwave-flash"].enabledPlugin&&(a=(y.plugins["Shockwave Flash 2.0"]||y.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1])}catch(c){}}return a.split(",")},z.embed=function(a,b,c,d){var e=z.getEmbedCode(a,b,c,d),f=m.createEl("div",{innerHTML:e}).childNodes[0];return f},z.getEmbedCode=function(a,b,c,d){var e='<object type="application/x-shockwave-flash" ',f="",g="",h="";return b&&Object.getOwnPropertyNames(b).forEach(function(a){f+=a+"="+b[a]+"&amp;"}),c=x["default"]({movie:a,flashvars:f,allowScriptAccess:"always",allowNetworking:"all"},c),Object.getOwnPropertyNames(c).forEach(function(a){g+='<param name="'+a+'" value="'+c[a]+'" />'}),d=x["default"]({data:a,width:"100%",height:"100%"},d),Object.getOwnPropertyNames(d).forEach(function(a){h+=a+'="'+d[a]+'" '}),""+e+h+">"+g+"</object>"},r["default"](z),t["default"].registerComponent("Flash",z),c["default"]=z,b.exports=c["default"]},{"../component":63,"../utils/dom.js":123,"../utils/time-ranges.js":131,"../utils/url.js":133,"./flash-rtmp":108,"./tech":112,"global/window":2,"object.assign":45}],110:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("./tech.js"),i=e(h),j=a("../component"),k=e(j),l=a("../utils/dom.js"),m=d(l),n=a("../utils/url.js"),o=d(n),p=a("../utils/fn.js"),q=d(p),r=a("../utils/log.js"),s=e(r),t=a("../utils/browser.js"),u=d(t),v=a("global/document"),w=e(v),x=a("global/window"),y=e(x),z=a("object.assign"),A=e(z),B=a("../utils/merge-options.js"),C=e(B),D=function(a){function b(c,d){f(this,b),a.call(this,c,d);var e=c.source;if(e&&(this.el_.currentSrc!==e.src||c.tag&&3===c.tag.initNetworkState_)?this.setSource(e):this.handleLateInit_(this.el_),this.el_.hasChildNodes()){for(var g=this.el_.childNodes,h=g.length,i=[];h--;){var j=g[h],k=j.nodeName.toLowerCase();"track"===k&&(this.featuresNativeTextTracks?this.remoteTextTracks().addTrack_(j.track):i.push(j))}for(var l=0;l<i.length;l++)this.el_.removeChild(i[l])}this.featuresNativeTextTracks&&(this.handleTextTrackChange_=q.bind(this,this.handleTextTrackChange),this.handleTextTrackAdd_=q.bind(this,this.handleTextTrackAdd),this.handleTextTrackRemove_=q.bind(this,this.handleTextTrackRemove),this.proxyNativeTextTracks_()),(u.TOUCH_ENABLED&&c.nativeControlsForTouch===!0||u.IS_IPHONE||u.IS_NATIVE_ANDROID)&&this.setControls(!0),this.triggerReady()}return g(b,a),b.prototype.dispose=function(){var c=this.el().textTracks,d=this.textTracks();c&&c.removeEventListener&&(c.removeEventListener("change",this.handleTextTrackChange_),c.removeEventListener("addtrack",this.handleTextTrackAdd_),c.removeEventListener("removetrack",this.handleTextTrackRemove_));for(var e=d.length;e--;)d.removeTrack_(d[e]);b.disposeMediaElement(this.el_),a.prototype.dispose.call(this)},b.prototype.createEl=function(){var a=this.options_.tag;if(!a||this.movingMediaElementInDOM===!1)if(a){var c=a.cloneNode(!0);a.parentNode.insertBefore(c,a),b.disposeMediaElement(a),a=c}else{a=w["default"].createElement("video");var d=this.options_.tag&&m.getElAttributes(this.options_.tag),e=C["default"]({},d);u.TOUCH_ENABLED&&this.options_.nativeControlsForTouch===!0||delete e.controls,m.setElAttributes(a,A["default"](e,{id:this.options_.techId,"class":"vjs-tech"}))}for(var f=["autoplay","preload","loop","muted"],g=f.length-1;g>=0;g--){var h=f[g],i={};"undefined"!=typeof this.options_[h]&&(i[h]=this.options_[h]),m.setElAttributes(a,i)}return a},b.prototype.handleLateInit_=function(a){var b=this;if(0!==a.networkState&&3!==a.networkState){if(0===a.readyState){var c=function(){var a=!1,c=function(){a=!0};b.on("loadstart",c);var d=function(){a||this.trigger("loadstart")};return b.on("loadedmetadata",d),b.ready(function(){this.off("loadstart",c),this.off("loadedmetadata",d),a||this.trigger("loadstart")}),{v:void 0}}();if("object"==typeof c)return c.v}var d=["loadstart"];d.push("loadedmetadata"),a.readyState>=2&&d.push("loadeddata"),a.readyState>=3&&d.push("canplay"),a.readyState>=4&&d.push("canplaythrough"),this.ready(function(){d.forEach(function(a){this.trigger(a)},this)})}},b.prototype.proxyNativeTextTracks_=function(){var a=this.el().textTracks;a&&a.addEventListener&&(a.addEventListener("change",this.handleTextTrackChange_),a.addEventListener("addtrack",this.handleTextTrackAdd_),a.addEventListener("removetrack",this.handleTextTrackRemove_))},b.prototype.handleTextTrackChange=function(){var a=this.textTracks();this.textTracks().trigger({type:"change",target:a,currentTarget:a,srcElement:a})},b.prototype.handleTextTrackAdd=function(a){this.textTracks().addTrack_(a.track)},b.prototype.handleTextTrackRemove=function(a){this.textTracks().removeTrack_(a.track)},b.prototype.play=function(){this.el_.play()},b.prototype.pause=function(){this.el_.pause()},b.prototype.paused=function(){return this.el_.paused},b.prototype.currentTime=function(){return this.el_.currentTime},b.prototype.setCurrentTime=function(a){try{this.el_.currentTime=a}catch(b){s["default"](b,"Video is not ready. (Video.js)")}},b.prototype.duration=function(){return this.el_.duration||0},b.prototype.buffered=function(){return this.el_.buffered},b.prototype.volume=function(){return this.el_.volume},b.prototype.setVolume=function(a){this.el_.volume=a},b.prototype.muted=function(){return this.el_.muted},b.prototype.setMuted=function(a){this.el_.muted=a},b.prototype.width=function(){return this.el_.offsetWidth},b.prototype.height=function(){return this.el_.offsetHeight},b.prototype.supportsFullScreen=function(){if("function"==typeof this.el_.webkitEnterFullScreen){var a=y["default"].navigator.userAgent;if(/Android/.test(a)||!/Chrome|Mac OS X 10.5/.test(a))return!0}return!1},b.prototype.enterFullScreen=function(){var a=this.el_;"webkitDisplayingFullscreen"in a&&this.one("webkitbeginfullscreen",function(){this.one("webkitendfullscreen",function(){this.trigger("fullscreenchange",{isFullscreen:!1})}),this.trigger("fullscreenchange",{isFullscreen:!0})}),a.paused&&a.networkState<=a.HAVE_METADATA?(this.el_.play(),this.setTimeout(function(){a.pause(),a.webkitEnterFullScreen()},0)):a.webkitEnterFullScreen()},b.prototype.exitFullScreen=function(){this.el_.webkitExitFullScreen()},b.prototype.src=function(a){return void 0===a?this.el_.src:void this.setSrc(a)},b.prototype.setSrc=function(a){this.el_.src=a},b.prototype.load=function(){this.el_.load()},b.prototype.currentSrc=function(){return this.el_.currentSrc},b.prototype.poster=function(){return this.el_.poster},b.prototype.setPoster=function(a){this.el_.poster=a},b.prototype.preload=function(){return this.el_.preload},b.prototype.setPreload=function(a){this.el_.preload=a},b.prototype.autoplay=function(){return this.el_.autoplay},b.prototype.setAutoplay=function(a){this.el_.autoplay=a},b.prototype.controls=function(){return this.el_.controls},b.prototype.setControls=function(a){this.el_.controls=!!a},b.prototype.loop=function(){return this.el_.loop},b.prototype.setLoop=function(a){this.el_.loop=a},b.prototype.error=function(){return this.el_.error},b.prototype.seeking=function(){return this.el_.seeking},b.prototype.seekable=function(){return this.el_.seekable},b.prototype.ended=function(){return this.el_.ended},b.prototype.defaultMuted=function(){return this.el_.defaultMuted},b.prototype.playbackRate=function(){return this.el_.playbackRate},b.prototype.played=function(){return this.el_.played},b.prototype.setPlaybackRate=function(a){this.el_.playbackRate=a},b.prototype.networkState=function(){return this.el_.networkState},b.prototype.readyState=function(){return this.el_.readyState},b.prototype.videoWidth=function(){return this.el_.videoWidth},b.prototype.videoHeight=function(){return this.el_.videoHeight},b.prototype.textTracks=function(){return a.prototype.textTracks.call(this)},b.prototype.addTextTrack=function(b,c,d){return this.featuresNativeTextTracks?this.el_.addTextTrack(b,c,d):a.prototype.addTextTrack.call(this,b,c,d)},b.prototype.addRemoteTextTrack=function(){var b=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(!this.featuresNativeTextTracks)return a.prototype.addRemoteTextTrack.call(this,b);var c=w["default"].createElement("track");return b.kind&&(c.kind=b.kind),b.label&&(c.label=b.label),(b.language||b.srclang)&&(c.srclang=b.language||b.srclang),b["default"]&&(c["default"]=b["default"]),b.id&&(c.id=b.id),b.src&&(c.src=b.src),this.el().appendChild(c),this.remoteTextTracks().addTrack_(c.track),c},b.prototype.removeRemoteTextTrack=function(b){if(!this.featuresNativeTextTracks)return a.prototype.removeRemoteTextTrack.call(this,b);var c,d;for(this.remoteTextTracks().removeTrack_(b),c=this.el().querySelectorAll("track"),d=c.length;d--;)(b===c[d]||b===c[d].track)&&this.el().removeChild(c[d])},b}(i["default"]);D.TEST_VID=w["default"].createElement("video");var E=w["default"].createElement("track");E.kind="captions",E.srclang="en",E.label="English",D.TEST_VID.appendChild(E),D.isSupported=function(){try{D.TEST_VID.volume=.5}catch(a){return!1}return!!D.TEST_VID.canPlayType},i["default"].withSourceHandlers(D),D.nativeSourceHandler={},D.nativeSourceHandler.canHandleSource=function(a){function b(a){try{return D.TEST_VID.canPlayType(a)}catch(b){return""}}var c;return a.type?b(a.type):a.src?(c=o.getFileExtension(a.src),b("video/"+c)):""},D.nativeSourceHandler.handleSource=function(a,b){b.setSrc(a.src)},D.nativeSourceHandler.dispose=function(){},D.registerSourceHandler(D.nativeSourceHandler),D.canControlVolume=function(){var a=D.TEST_VID.volume;return D.TEST_VID.volume=a/2+.1,a!==D.TEST_VID.volume},D.canControlPlaybackRate=function(){var a=D.TEST_VID.playbackRate;return D.TEST_VID.playbackRate=a/2+.1,a!==D.TEST_VID.playbackRate},D.supportsNativeTextTracks=function(){var a;return a=!!D.TEST_VID.textTracks,a&&D.TEST_VID.textTracks.length>0&&(a="number"!=typeof D.TEST_VID.textTracks[0].mode),a&&u.IS_FIREFOX&&(a=!1),!a||"onremovetrack"in D.TEST_VID.textTracks||(a=!1),a},D.Events=["loadstart","suspend","abort","error","emptied","stalled","loadedmetadata","loadeddata","canplay","canplaythrough","playing","waiting","seeking","seeked","ended","durationchange","timeupdate","progress","play","pause","ratechange","volumechange"],D.prototype.featuresVolumeControl=D.canControlVolume(),D.prototype.featuresPlaybackRate=D.canControlPlaybackRate(),D.prototype.movingMediaElementInDOM=!u.IS_IOS,D.prototype.featuresFullscreenResize=!0,D.prototype.featuresProgressEvents=!0,D.prototype.featuresNativeTextTracks=D.supportsNativeTextTracks();var F=void 0,G=/^application\/(?:x-|vnd\.apple\.)mpegurl/i,H=/^video\/mp4/i;D.patchCanPlayType=function(){u.ANDROID_VERSION>=4&&(F||(F=D.TEST_VID.constructor.prototype.canPlayType),D.TEST_VID.constructor.prototype.canPlayType=function(a){return a&&G.test(a)?"maybe":F.call(this,a)}),u.IS_OLD_ANDROID&&(F||(F=D.TEST_VID.constructor.prototype.canPlayType),D.TEST_VID.constructor.prototype.canPlayType=function(a){return a&&H.test(a)?"maybe":F.call(this,a)})},D.unpatchCanPlayType=function(){var a=D.TEST_VID.constructor.prototype.canPlayType;return D.TEST_VID.constructor.prototype.canPlayType=F,F=null,a},D.patchCanPlayType(),D.disposeMediaElement=function(a){if(a){for(a.parentNode&&a.parentNode.removeChild(a);a.hasChildNodes();)a.removeChild(a.firstChild);a.removeAttribute("src"),"function"==typeof a.load&&!function(){try{a.load()}catch(b){}}()}},k["default"].registerComponent("Html5",D),c["default"]=D,b.exports=c["default"]},{"../component":63,"../utils/browser.js":120,"../utils/dom.js":123,"../utils/fn.js":125,"../utils/log.js":128,"../utils/merge-options.js":129,"../utils/url.js":133,"./tech.js":112,"global/document":1,"global/window":2,"object.assign":45}],111:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var g=a("../component"),h=d(g),i=a("global/window"),j=(d(i),a("../utils/to-title-case.js")),k=d(j),l=function(a){function b(c,d,f){if(e(this,b),a.call(this,c,d,f),d.playerOptions.sources&&0!==d.playerOptions.sources.length)c.src(d.playerOptions.sources);else for(var g=0,i=d.playerOptions.techOrder;g<i.length;g++){var j=k["default"](i[g]),l=h["default"].getComponent(j);if(l&&l.isSupported()){c.loadTech_(j);break}}}return f(b,a),b}(h["default"]);h["default"].registerComponent("MediaLoader",l),c["default"]=l,b.exports=c["default"]},{"../component":63,"../utils/to-title-case.js":132,"global/window":2}],112:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}c.__esModule=!0;var h=a("../component"),i=e(h),j=a("../tracks/text-track"),k=e(j),l=a("../tracks/text-track-list"),m=e(l),n=a("../utils/fn.js"),o=d(n),p=a("../utils/log.js"),q=e(p),r=a("../utils/time-ranges.js"),s=a("../utils/buffer.js"),t=a("../media-error.js"),u=e(t),v=a("global/window"),w=e(v),x=a("global/document"),y=e(x),z=function(a){function b(){var c=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],d=arguments.length<=1||void 0===arguments[1]?function(){}:arguments[1];f(this,b),c.reportTouchActivity=!1,a.call(this,null,c,d),this.hasStarted_=!1,this.on("playing",function(){this.hasStarted_=!0}),this.on("loadstart",function(){this.hasStarted_=!1}),this.textTracks_=c.textTracks,this.featuresProgressEvents||this.manualProgressOn(),this.featuresTimeupdateEvents||this.manualTimeUpdatesOn(),(c.nativeCaptions===!1||c.nativeTextTracks===!1)&&(this.featuresNativeTextTracks=!1),this.featuresNativeTextTracks||this.on("ready",this.emulateTextTracks),this.initTextTrackListeners(),this.emitTapEvents()}/*! Time Tracking -------------------------------------------------------------- */
return g(b,a),b.prototype.manualProgressOn=function(){this.on("durationchange",this.onDurationChange),this.manualProgress=!0,this.one("ready",this.trackProgress)},b.prototype.manualProgressOff=function(){this.manualProgress=!1,this.stopTrackingProgress(),this.off("durationchange",this.onDurationChange)},b.prototype.trackProgress=function(){this.stopTrackingProgress(),this.progressInterval=this.setInterval(o.bind(this,function(){var a=this.bufferedPercent();this.bufferedPercent_!==a&&this.trigger("progress"),this.bufferedPercent_=a,1===a&&this.stopTrackingProgress()}),500)},b.prototype.onDurationChange=function(){this.duration_=this.duration()},b.prototype.buffered=function(){return r.createTimeRange(0,0)},b.prototype.bufferedPercent=function(){return s.bufferedPercent(this.buffered(),this.duration_)},b.prototype.stopTrackingProgress=function(){this.clearInterval(this.progressInterval)},b.prototype.manualTimeUpdatesOn=function(){this.manualTimeUpdates=!0,this.on("play",this.trackCurrentTime),this.on("pause",this.stopTrackingCurrentTime)},b.prototype.manualTimeUpdatesOff=function(){this.manualTimeUpdates=!1,this.stopTrackingCurrentTime(),this.off("play",this.trackCurrentTime),this.off("pause",this.stopTrackingCurrentTime)},b.prototype.trackCurrentTime=function(){this.currentTimeInterval&&this.stopTrackingCurrentTime(),this.currentTimeInterval=this.setInterval(function(){this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},250)},b.prototype.stopTrackingCurrentTime=function(){this.clearInterval(this.currentTimeInterval),this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},b.prototype.dispose=function(){var b=this.textTracks();if(b)for(var c=b.length;c--;)this.removeRemoteTextTrack(b[c]);this.manualProgress&&this.manualProgressOff(),this.manualTimeUpdates&&this.manualTimeUpdatesOff(),a.prototype.dispose.call(this)},b.prototype.error=function(a){return void 0!==a&&(this.error_=a instanceof u["default"]?a:new u["default"](a),this.trigger("error")),this.error_},b.prototype.played=function(){return this.hasStarted_?r.createTimeRange(0,0):r.createTimeRange()},b.prototype.setCurrentTime=function(){this.manualTimeUpdates&&this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},b.prototype.initTextTrackListeners=function(){var a=o.bind(this,function(){this.trigger("texttrackchange")}),b=this.textTracks();b&&(b.addEventListener("removetrack",a),b.addEventListener("addtrack",a),this.on("dispose",o.bind(this,function(){b.removeEventListener("removetrack",a),b.removeEventListener("addtrack",a)})))},b.prototype.emulateTextTracks=function(){if(!w["default"].WebVTT&&null!=this.el().parentNode){var a=y["default"].createElement("script");a.src=this.options_["vtt.js"]||"../node_modules/vtt.js/dist/vtt.js",this.el().parentNode.appendChild(a),w["default"].WebVTT=!0}var b=this.textTracks();if(b){var c=o.bind(this,function(){var a=this,c=function(){return a.trigger("texttrackchange")};c();for(var d=0;d<b.length;d++){var e=b[d];e.removeEventListener("cuechange",c),"showing"===e.mode&&e.addEventListener("cuechange",c)}});b.addEventListener("change",c),this.on("dispose",function(){b.removeEventListener("change",c)})}},b.prototype.textTracks=function(){return this.textTracks_=this.textTracks_||new m["default"],this.textTracks_},b.prototype.remoteTextTracks=function(){return this.remoteTextTracks_=this.remoteTextTracks_||new m["default"],this.remoteTextTracks_},b.prototype.addTextTrack=function(a,b,c){if(!a)throw new Error("TextTrack kind is required but was not provided");return A(this,a,b,c)},b.prototype.addRemoteTextTrack=function(a){var b=A(this,a.kind,a.label,a.language,a);return this.remoteTextTracks().addTrack_(b),{track:b}},b.prototype.removeRemoteTextTrack=function(a){this.textTracks().removeTrack_(a),this.remoteTextTracks().removeTrack_(a)},b.prototype.setPoster=function(){},b}(i["default"]);z.prototype.textTracks_;var A=function(a,b,c,d){var e=arguments.length<=4||void 0===arguments[4]?{}:arguments[4],f=a.textTracks();e.kind=b,c&&(e.label=c),d&&(e.language=d),e.tech=a;var g=new k["default"](e);return f.addTrack_(g),g};z.prototype.featuresVolumeControl=!0,z.prototype.featuresFullscreenResize=!1,z.prototype.featuresPlaybackRate=!1,z.prototype.featuresProgressEvents=!1,z.prototype.featuresTimeupdateEvents=!1,z.prototype.featuresNativeTextTracks=!1,z.withSourceHandlers=function(a){a.registerSourceHandler=function(b,c){var d=a.sourceHandlers;d||(d=a.sourceHandlers=[]),void 0===c&&(c=d.length),d.splice(c,0,b)},a.selectSourceHandler=function(b){for(var c=a.sourceHandlers||[],d=void 0,e=0;e<c.length;e++)if(d=c[e].canHandleSource(b))return c[e];return null},a.canPlaySource=function(b){var c=a.selectSourceHandler(b);return c?c.canHandleSource(b):""};var b=a.prototype.seekable;a.prototype.seekable=function(){return this.sourceHandler_&&this.sourceHandler_.seekable?this.sourceHandler_.seekable():b.call(this)},a.prototype.setSource=function(b){var c=a.selectSourceHandler(b);return c||(a.nativeSourceHandler?c=a.nativeSourceHandler:q["default"].error("No source hander found for the current source.")),this.disposeSourceHandler(),this.off("dispose",this.disposeSourceHandler),this.currentSource_=b,this.sourceHandler_=c.handleSource(b,this),this.on("dispose",this.disposeSourceHandler),this},a.prototype.disposeSourceHandler=function(){this.sourceHandler_&&this.sourceHandler_.dispose&&this.sourceHandler_.dispose()}},i["default"].registerComponent("Tech",z),i["default"].registerComponent("MediaTechController",z),c["default"]=z,b.exports=c["default"]},{"../component":63,"../media-error.js":99,"../tracks/text-track":119,"../tracks/text-track-list":117,"../utils/buffer.js":121,"../utils/fn.js":125,"../utils/log.js":128,"../utils/time-ranges.js":131,"global/document":1,"global/window":2}],113:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}c.__esModule=!0;var f=a("../utils/browser.js"),g=e(f),h=a("global/document"),i=d(h),j=function k(a){var b=this;if(g.IS_IE8){b=i["default"].createElement("custom");for(var c in k.prototype)b[c]=k.prototype[c]}return k.prototype.setCues_.call(b,a),Object.defineProperty(b,"length",{get:function(){return this.length_}}),g.IS_IE8?b:void 0};j.prototype.setCues_=function(a){var b=this.length||0,c=0,d=a.length;this.cues_=a,this.length_=a.length;var e=function(a){""+a in this||Object.defineProperty(this,""+a,{get:function(){return this.cues_[a]}})};if(d>b)for(c=b;d>c;c++)e.call(this,c)},j.prototype.getCueById=function(a){for(var b=null,c=0,d=this.length;d>c;c++){var e=this[c];if(e.id===a){b=e;break}}return b},c["default"]=j,b.exports=c["default"]},{"../utils/browser.js":120,"global/document":1}],114:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function h(a,b){return"rgba("+parseInt(a[1]+a[1],16)+","+parseInt(a[2]+a[2],16)+","+parseInt(a[3]+a[3],16)+","+b+")"}function i(a,b,c){try{a.style[b]=c}catch(d){}}c.__esModule=!0;var j=a("../component"),k=e(j),l=a("../menu/menu.js"),m=(e(l),a("../menu/menu-item.js")),n=(e(m),a("../menu/menu-button.js")),o=(e(n),a("../utils/fn.js")),p=d(o),q=a("global/document"),r=(e(q),a("global/window")),s=e(r),t="#222",u="#ccc",v={monospace:"monospace",sansSerif:"sans-serif",serif:"serif",monospaceSansSerif:'"Andale Mono", "Lucida Console", monospace',monospaceSerif:'"Courier New", monospace',proportionalSansSerif:"sans-serif",proportionalSerif:"serif",casual:'"Comic Sans MS", Impact, fantasy',script:'"Monotype Corsiva", cursive',smallcaps:'"Andale Mono", "Lucida Console", monospace, sans-serif'},w=function(a){function b(c,d,e){f(this,b),a.call(this,c,d,e),c.on("loadstart",p.bind(this,this.toggleDisplay)),c.on("texttrackchange",p.bind(this,this.updateDisplay)),c.ready(p.bind(this,function(){if(c.tech_&&c.tech_.featuresNativeTextTracks)return void this.hide();c.on("fullscreenchange",p.bind(this,this.updateDisplay));for(var a=this.options_.playerOptions.tracks||[],b=0;b<a.length;b++){var d=a[b];this.player_.addRemoteTextTrack(d)}}))}return g(b,a),b.prototype.toggleDisplay=function(){this.player_.tech_&&this.player_.tech_.featuresNativeTextTracks?this.hide():this.show()},b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-text-track-display"})},b.prototype.clearDisplay=function(){"function"==typeof s["default"].WebVTT&&s["default"].WebVTT.processCues(s["default"],[],this.el_)},b.prototype.updateDisplay=function(){var a=this.player_.textTracks();if(this.clearDisplay(),a)for(var b=0;b<a.length;b++){var c=a[b];"showing"===c.mode&&this.updateForTrack(c)}},b.prototype.updateForTrack=function(a){if("function"==typeof s["default"].WebVTT&&a.activeCues){for(var b=this.player_.textTrackSettings.getValues(),c=[],d=0;d<a.activeCues.length;d++)c.push(a.activeCues[d]);s["default"].WebVTT.processCues(s["default"],a.activeCues,this.el_);for(var e=c.length;e--;){var f=c[e].displayState;if(b.color&&(f.firstChild.style.color=b.color),b.textOpacity&&i(f.firstChild,"color",h(b.color||"#fff",b.textOpacity)),b.backgroundColor&&(f.firstChild.style.backgroundColor=b.backgroundColor),b.backgroundOpacity&&i(f.firstChild,"backgroundColor",h(b.backgroundColor||"#000",b.backgroundOpacity)),b.windowColor&&(b.windowOpacity?i(f,"backgroundColor",h(b.windowColor,b.windowOpacity)):f.style.backgroundColor=b.windowColor),b.edgeStyle&&("dropshadow"===b.edgeStyle?f.firstChild.style.textShadow="2px 2px 3px "+t+", 2px 2px 4px "+t+", 2px 2px 5px "+t:"raised"===b.edgeStyle?f.firstChild.style.textShadow="1px 1px "+t+", 2px 2px "+t+", 3px 3px "+t:"depressed"===b.edgeStyle?f.firstChild.style.textShadow="1px 1px "+u+", 0 1px "+u+", -1px -1px "+t+", 0 -1px "+t:"uniform"===b.edgeStyle&&(f.firstChild.style.textShadow="0 0 4px "+t+", 0 0 4px "+t+", 0 0 4px "+t+", 0 0 4px "+t)),b.fontPercent&&1!==b.fontPercent){var g=s["default"].parseFloat(f.style.fontSize);f.style.fontSize=g*b.fontPercent+"px",f.style.height="auto",f.style.top="auto",f.style.bottom="2px"}b.fontFamily&&"default"!==b.fontFamily&&("small-caps"===b.fontFamily?f.firstChild.style.fontVariant="small-caps":f.firstChild.style.fontFamily=v[b.fontFamily])}}},b}(k["default"]);k["default"].registerComponent("TextTrackDisplay",w),c["default"]=w,b.exports=c["default"]},{"../component":63,"../menu/menu-button.js":100,"../menu/menu-item.js":101,"../menu/menu.js":102,"../utils/fn.js":125,"global/document":1,"global/window":2}],115:[function(a,b,c){"use strict";c.__esModule=!0;var d={disabled:"disabled",hidden:"hidden",showing:"showing"},e={subtitles:"subtitles",captions:"captions",descriptions:"descriptions",chapters:"chapters",metadata:"metadata"};c.TextTrackMode=d,c.TextTrackKind=e},{}],116:[function(a,b,c){"use strict";c.__esModule=!0;var d=function(a){return{kind:a.kind,label:a.label,language:a.language,id:a.id,inBandMetadataTrackDispatchType:a.inBandMetadataTrackDispatchType,mode:a.mode,cues:a.cues&&Array.prototype.map.call(a.cues,function(a){return{startTime:a.startTime,endTime:a.endTime,text:a.text,id:a.id}}),src:a.src}},e=function(a){var b=a.el().querySelectorAll("track"),c=Array.prototype.map.call(b,function(a){return a.track}),e=Array.prototype.map.call(b,function(a){var b=d(a.track);return b.src=a.src,b});return e.concat(Array.prototype.filter.call(a.textTracks(),function(a){return-1===c.indexOf(a)}).map(d))},f=function(a,b){return a.forEach(function(a){var c=b.addRemoteTextTrack(a).track;!a.src&&a.cues&&a.cues.forEach(function(a){return c.addCue(a)})}),b.textTracks()};c["default"]={textTracksToJson:e,jsonToTextTracks:f,trackToJson_:d},b.exports=c["default"]},{}],117:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0;var f=a("../event-target"),g=e(f),h=a("../utils/fn.js"),i=d(h),j=a("../utils/browser.js"),k=d(j),l=a("global/document"),m=e(l),n=function p(a){var b=this;if(k.IS_IE8){b=m["default"].createElement("custom");for(var c in p.prototype)b[c]=p.prototype[c]}a=a||[],b.tracks_=[],Object.defineProperty(b,"length",{get:function(){return this.tracks_.length}});for(var d=0;d<a.length;d++)b.addTrack_(a[d]);return k.IS_IE8?b:void 0};n.prototype=Object.create(g["default"].prototype),n.prototype.constructor=n,n.prototype.allowedEvents_={change:"change",addtrack:"addtrack",removetrack:"removetrack"};for(var o in n.prototype.allowedEvents_)n.prototype["on"+o]=null;n.prototype.addTrack_=function(a){var b=this.tracks_.length;""+b in this||Object.defineProperty(this,b,{get:function(){return this.tracks_[b]}}),a.addEventListener("modechange",i.bind(this,function(){this.trigger("change")})),this.tracks_.push(a),this.trigger({type:"addtrack",track:a})},n.prototype.removeTrack_=function(a){for(var b=void 0,c=0,d=this.length;d>c;c++)if(b=this[c],b===a){this.tracks_.splice(c,1);break}this.trigger({type:"removetrack",track:b})},n.prototype.getTrackById=function(a){for(var b=null,c=0,d=this.length;d>c;c++){var e=this[c];if(e.id===a){b=e;break}}return b},c["default"]=n,b.exports=c["default"]},{"../event-target":95,"../utils/browser.js":120,"../utils/fn.js":125,"global/document":1}],118:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function h(a){var b=void 0;return a.selectedOptions?b=a.selectedOptions[0]:a.options&&(b=a.options[a.options.selectedIndex]),b.value}function i(a,b){if(b){var c=void 0;for(c=0;c<a.options.length;c++){var d=a.options[c];if(d.value===b)break}a.selectedIndex=c}}function j(){var a='<div class="vjs-tracksettings">\n      <div class="vjs-tracksettings-colors">\n        <div class="vjs-fg-color vjs-tracksetting">\n            <label class="vjs-label">Foreground</label>\n            <select>\n              <option value="">---</option>\n              <option value="#FFF">White</option>\n              <option value="#000">Black</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-text-opacity vjs-opacity">\n              <select>\n                <option value="">---</option>\n                <option value="1">Opaque</option>\n                <option value="0.5">Semi-Opaque</option>\n              </select>\n            </span>\n        </div> <!-- vjs-fg-color -->\n        <div class="vjs-bg-color vjs-tracksetting">\n            <label class="vjs-label">Background</label>\n            <select>\n              <option value="">---</option>\n              <option value="#FFF">White</option>\n              <option value="#000">Black</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-bg-opacity vjs-opacity">\n                <select>\n                  <option value="">---</option>\n                  <option value="1">Opaque</option>\n                  <option value="0.5">Semi-Transparent</option>\n                  <option value="0">Transparent</option>\n                </select>\n            </span>\n        </div> <!-- vjs-bg-color -->\n        <div class="window-color vjs-tracksetting">\n            <label class="vjs-label">Window</label>\n            <select>\n              <option value="">---</option>\n              <option value="#FFF">White</option>\n              <option value="#000">Black</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-window-opacity vjs-opacity">\n                <select>\n                  <option value="">---</option>\n                  <option value="1">Opaque</option>\n                  <option value="0.5">Semi-Transparent</option>\n                  <option value="0">Transparent</option>\n                </select>\n            </span>\n        </div> <!-- vjs-window-color -->\n      </div> <!-- vjs-tracksettings -->\n      <div class="vjs-tracksettings-font">\n        <div class="vjs-font-percent vjs-tracksetting">\n          <label class="vjs-label">Font Size</label>\n          <select>\n            <option value="0.50">50%</option>\n            <option value="0.75">75%</option>\n            <option value="1.00" selected>100%</option>\n            <option value="1.25">125%</option>\n            <option value="1.50">150%</option>\n            <option value="1.75">175%</option>\n            <option value="2.00">200%</option>\n            <option value="3.00">300%</option>\n            <option value="4.00">400%</option>\n          </select>\n        </div> <!-- vjs-font-percent -->\n        <div class="vjs-edge-style vjs-tracksetting">\n          <label class="vjs-label">Text Edge Style</label>\n          <select>\n            <option value="none">None</option>\n            <option value="raised">Raised</option>\n            <option value="depressed">Depressed</option>\n            <option value="uniform">Uniform</option>\n            <option value="dropshadow">Dropshadow</option>\n          </select>\n        </div> <!-- vjs-edge-style -->\n        <div class="vjs-font-family vjs-tracksetting">\n          <label class="vjs-label">Font Family</label>\n          <select>\n            <option value="">Default</option>\n            <option value="monospaceSerif">Monospace Serif</option>\n            <option value="proportionalSerif">Proportional Serif</option>\n            <option value="monospaceSansSerif">Monospace Sans-Serif</option>\n            <option value="proportionalSansSerif">Proportional Sans-Serif</option>\n            <option value="casual">Casual</option>\n            <option value="script">Script</option>\n            <option value="small-caps">Small Caps</option>\n          </select>\n        </div> <!-- vjs-font-family -->\n      </div>\n    </div>\n    <div class="vjs-tracksettings-controls">\n      <button class="vjs-default-button">Defaults</button>\n      <button class="vjs-done-button">Done</button>\n    </div>';return a}c.__esModule=!0;var k=a("../component"),l=e(k),m=a("../utils/events.js"),n=d(m),o=a("../utils/fn.js"),p=d(o),q=a("../utils/log.js"),r=e(q),s=a("safe-json-parse/tuple"),t=e(s),u=a("global/window"),v=e(u),w=function(a){function b(c,d){f(this,b),a.call(this,c,d),this.hide(),void 0===d.persistTextTrackSettings&&(this.options_.persistTextTrackSettings=this.options_.playerOptions.persistTextTrackSettings),n.on(this.el().querySelector(".vjs-done-button"),"click",p.bind(this,function(){this.saveSettings(),this.hide()})),n.on(this.el().querySelector(".vjs-default-button"),"click",p.bind(this,function(){this.el().querySelector(".vjs-fg-color > select").selectedIndex=0,this.el().querySelector(".vjs-bg-color > select").selectedIndex=0,this.el().querySelector(".window-color > select").selectedIndex=0,this.el().querySelector(".vjs-text-opacity > select").selectedIndex=0,this.el().querySelector(".vjs-bg-opacity > select").selectedIndex=0,this.el().querySelector(".vjs-window-opacity > select").selectedIndex=0,this.el().querySelector(".vjs-edge-style select").selectedIndex=0,this.el().querySelector(".vjs-font-family select").selectedIndex=0,this.el().querySelector(".vjs-font-percent select").selectedIndex=2,this.updateDisplay()})),n.on(this.el().querySelector(".vjs-fg-color > select"),"change",p.bind(this,this.updateDisplay)),n.on(this.el().querySelector(".vjs-bg-color > select"),"change",p.bind(this,this.updateDisplay)),n.on(this.el().querySelector(".window-color > select"),"change",p.bind(this,this.updateDisplay)),n.on(this.el().querySelector(".vjs-text-opacity > select"),"change",p.bind(this,this.updateDisplay)),n.on(this.el().querySelector(".vjs-bg-opacity > select"),"change",p.bind(this,this.updateDisplay)),n.on(this.el().querySelector(".vjs-window-opacity > select"),"change",p.bind(this,this.updateDisplay)),n.on(this.el().querySelector(".vjs-font-percent select"),"change",p.bind(this,this.updateDisplay)),n.on(this.el().querySelector(".vjs-edge-style select"),"change",p.bind(this,this.updateDisplay)),n.on(this.el().querySelector(".vjs-font-family select"),"change",p.bind(this,this.updateDisplay)),this.options_.persistTextTrackSettings&&this.restoreSettings()}return g(b,a),b.prototype.createEl=function(){return a.prototype.createEl.call(this,"div",{className:"vjs-caption-settings vjs-modal-overlay",innerHTML:j()})},b.prototype.getValues=function(){var a=this.el(),b=h(a.querySelector(".vjs-edge-style select")),c=h(a.querySelector(".vjs-font-family select")),d=h(a.querySelector(".vjs-fg-color > select")),e=h(a.querySelector(".vjs-text-opacity > select")),f=h(a.querySelector(".vjs-bg-color > select")),g=h(a.querySelector(".vjs-bg-opacity > select")),i=h(a.querySelector(".window-color > select")),j=h(a.querySelector(".vjs-window-opacity > select")),k=v["default"].parseFloat(h(a.querySelector(".vjs-font-percent > select"))),l={backgroundOpacity:g,textOpacity:e,windowOpacity:j,edgeStyle:b,fontFamily:c,color:d,backgroundColor:f,windowColor:i,fontPercent:k};for(var m in l)(""===l[m]||"none"===l[m]||"fontPercent"===m&&1===l[m])&&delete l[m];return l},b.prototype.setValues=function(a){var b=this.el();i(b.querySelector(".vjs-edge-style select"),a.edgeStyle),i(b.querySelector(".vjs-font-family select"),a.fontFamily),i(b.querySelector(".vjs-fg-color > select"),a.color),i(b.querySelector(".vjs-text-opacity > select"),a.textOpacity),i(b.querySelector(".vjs-bg-color > select"),a.backgroundColor),i(b.querySelector(".vjs-bg-opacity > select"),a.backgroundOpacity),i(b.querySelector(".window-color > select"),a.windowColor),i(b.querySelector(".vjs-window-opacity > select"),a.windowOpacity);var c=a.fontPercent;c&&(c=c.toFixed(2)),i(b.querySelector(".vjs-font-percent > select"),c)},b.prototype.restoreSettings=function(){var a=t["default"](v["default"].localStorage.getItem("vjs-text-track-settings")),b=a[0],c=a[1];b&&r["default"].error(b),c&&this.setValues(c)},b.prototype.saveSettings=function(){if(this.options_.persistTextTrackSettings){var a=this.getValues();try{Object.getOwnPropertyNames(a).length>0?v["default"].localStorage.setItem("vjs-text-track-settings",JSON.stringify(a)):v["default"].localStorage.removeItem("vjs-text-track-settings")}catch(b){}}},b.prototype.updateDisplay=function(){var a=this.player_.getChild("textTrackDisplay");a&&a.updateDisplay()},b}(l["default"]);l["default"].registerComponent("TextTrackSettings",w),c["default"]=w,b.exports=c["default"]},{"../component":63,"../utils/events.js":124,"../utils/fn.js":125,"../utils/log.js":128,"global/window":2,"safe-json-parse/tuple":53}],119:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0;var f=a("./text-track-cue-list"),g=e(f),h=a("../utils/fn.js"),i=d(h),j=a("../utils/guid.js"),k=d(j),l=a("../utils/browser.js"),m=d(l),n=a("./text-track-enums"),o=d(n),p=a("../utils/log.js"),q=e(p),r=a("../event-target"),s=e(r),t=a("global/document"),u=e(t),v=a("global/window"),w=e(v),x=a("../utils/url.js"),y=a("xhr"),z=e(y),A=function E(){var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(!a.tech)throw new Error("A tech was not provided.");var b=this;if(m.IS_IE8){b=u["default"].createElement("custom");for(var c in E.prototype)b[c]=E.prototype[c]}b.tech_=a.tech;var d=o.TextTrackMode[a.mode]||"disabled",e=o.TextTrackKind[a.kind]||"subtitles",f=a.label||"",h=a.language||a.srclang||"",j=a.id||"vjs_text_track_"+k.newGUID();("metadata"===e||"chapters"===e)&&(d="hidden"),b.cues_=[],b.activeCues_=[];var l=new g["default"](b.cues_),n=new g["default"](b.activeCues_),p=!1,q=i.bind(b,function(){this.activeCues,p&&(this.trigger("cuechange"),p=!1)});return"disabled"!==d&&b.tech_.on("timeupdate",q),Object.defineProperty(b,"kind",{get:function(){return e},set:Function.prototype}),Object.defineProperty(b,"label",{get:function(){return f},set:Function.prototype}),Object.defineProperty(b,"language",{get:function(){return h},set:Function.prototype}),Object.defineProperty(b,"id",{get:function(){return j},set:Function.prototype}),Object.defineProperty(b,"mode",{get:function(){return d},set:function(a){o.TextTrackMode[a]&&(d=a,"showing"===d&&this.tech_.on("timeupdate",q),this.trigger("modechange"))}}),Object.defineProperty(b,"cues",{get:function(){return this.loaded_?l:null},set:Function.prototype}),Object.defineProperty(b,"activeCues",{get:function(){if(!this.loaded_)return null;if(0===this.cues.length)return n;for(var a=this.tech_.currentTime(),b=[],c=0,d=this.cues.length;d>c;c++){var e=this.cues[c];e.startTime<=a&&e.endTime>=a?b.push(e):e.startTime===e.endTime&&e.startTime<=a&&e.startTime+.5>=a&&b.push(e)}if(p=!1,b.length!==this.activeCues_.length)p=!0;else for(var c=0;c<b.length;c++)-1===D.call(this.activeCues_,b[c])&&(p=!0);return this.activeCues_=b,n.setCues_(this.activeCues_),n},set:Function.prototype}),a.src?(b.src=a.src,C(a.src,b)):b.loaded_=!0,m.IS_IE8?b:void 0};A.prototype=Object.create(s["default"].prototype),A.prototype.constructor=A,A.prototype.allowedEvents_={cuechange:"cuechange"},A.prototype.addCue=function(a){var b=this.tech_.textTracks();if(b)for(var c=0;c<b.length;c++)b[c]!==this&&b[c].removeCue(a);this.cues_.push(a),this.cues.setCues_(this.cues_)},A.prototype.removeCue=function(a){for(var b=!1,c=0,d=this.cues_.length;d>c;c++){var e=this.cues_[c];e===a&&(this.cues_.splice(c,1),b=!0)}b&&this.cues.setCues_(this.cues_)};var B=function F(a,b){if("function"!=typeof w["default"].WebVTT)return w["default"].setTimeout(function(){F(a,b)},25);var c=new w["default"].WebVTT.Parser(w["default"],w["default"].vttjs,w["default"].WebVTT.StringDecoder());c.oncue=function(a){b.addCue(a)},c.onparsingerror=function(a){q["default"].error(a)},c.parse(a),c.flush()},C=function(a,b){var c={uri:a},d=x.isCrossOrigin(a);d&&(c.cors=d),z["default"](c,i.bind(this,function(a,c,d){return a?q["default"].error(a,c):(b.loaded_=!0,void B(d,b))}))},D=function(a,b){if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),d=c.length>>>0;if(0===d)return-1;var e=+b||0;if(Math.abs(e)===1/0&&(e=0),e>=d)return-1;for(var f=Math.max(e>=0?e:d-Math.abs(e),0);d>f;){if(f in c&&c[f]===a)return f;f++}return-1};c["default"]=A,b.exports=c["default"]},{"../event-target":95,"../utils/browser.js":120,"../utils/fn.js":125,"../utils/guid.js":127,"../utils/log.js":128,"../utils/url.js":133,"./text-track-cue-list":113,"./text-track-enums":115,"global/document":1,"global/window":2,xhr:55}],120:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0;var e=a("global/document"),f=d(e),g=a("global/window"),h=d(g),i=h["default"].navigator.userAgent,j=/AppleWebKit\/([\d.]+)/i.exec(i),k=j?parseFloat(j.pop()):null,l=/iPhone/i.test(i);c.IS_IPHONE=l;var m=/iPad/i.test(i);c.IS_IPAD=m;var n=/iPod/i.test(i);c.IS_IPOD=n;var o=l||m||n;c.IS_IOS=o;var p=function(){var a=i.match(/OS (\d+)_/i);return a&&a[1]?a[1]:void 0}();c.IOS_VERSION=p;var q=/Android/i.test(i);c.IS_ANDROID=q;var r=function(){var a,b,c=i.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);return c?(a=c[1]&&parseFloat(c[1]),b=c[2]&&parseFloat(c[2]),a&&b?parseFloat(c[1]+"."+c[2]):a?a:null):null}();c.ANDROID_VERSION=r;var s=q&&/webkit/i.test(i)&&2.3>r;c.IS_OLD_ANDROID=s;var t=q&&5>r&&537>k;c.IS_NATIVE_ANDROID=t;var u=/Firefox/i.test(i);c.IS_FIREFOX=u;var v=/Chrome/i.test(i);c.IS_CHROME=v;var w=/MSIE\s8\.0/.test(i);c.IS_IE8=w;var x=!!("ontouchstart"in h["default"]||h["default"].DocumentTouch&&f["default"]instanceof h["default"].DocumentTouch);c.TOUCH_ENABLED=x;var y="backgroundSize"in f["default"].createElement("video").style;c.BACKGROUND_SIZE_SUPPORTED=y},{"global/document":1,"global/window":2}],121:[function(a,b,c){"use strict";function d(a,b){var c,d,f=0;if(!b)return 0;a&&a.length||(a=e.createTimeRange(0,0));for(var g=0;g<a.length;g++)c=a.start(g),d=a.end(g),d>b&&(d=b),f+=d-c;return f/b}c.__esModule=!0,c.bufferedPercent=d;var e=a("./time-ranges.js")},{"./time-ranges.js":131}],122:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0;var e=a("./log.js"),f=d(e),g={get:function(a,b){return a[b]},set:function(a,b,c){return a[b]=c,!0}};c["default"]=function(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if("function"==typeof Proxy){var c=function(){var c={};return Object.keys(b).forEach(function(a){g.hasOwnProperty(a)&&(c[a]=function(){return f["default"].warn(b[a]),g[a].apply(this,arguments)})}),{v:new Proxy(a,c)}}();if("object"==typeof c)return c.v}return a},b.exports=c["default"]},{"./log.js":128}],123:[function(a,b,c){"use strict";function d(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function e(a){return a&&a.__esModule?a:{"default":a}}function f(a,b){return a.raw=b,a}function g(a){return 0===a.indexOf("#")&&(a=a.slice(1)),x["default"].getElementById(a)}function h(){var a=arguments.length<=0||void 0===arguments[0]?"div":arguments[0],b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],c=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],d=x["default"].createElement(a);return Object.getOwnPropertyNames(b).forEach(function(a){var c=b[a];-1!==a.indexOf("aria-")||"role"===a||"type"===a?(D["default"].warn(F["default"](v,a,c)),d.setAttribute(a,c)):d[a]=c}),Object.getOwnPropertyNames(c).forEach(function(a){c[a];d.setAttribute(a,c[a])}),d}function i(a,b){b.firstChild?b.insertBefore(a,b.firstChild):b.appendChild(a)}function j(a){var b=a[H];return b||(b=a[H]=B.newGUID()),G[b]||(G[b]={}),G[b]}function k(a){var b=a[H];return b?!!Object.getOwnPropertyNames(G[b]).length:!1}function l(a){var b=a[H];if(b){delete G[b];try{delete a[H]}catch(c){a.removeAttribute?a.removeAttribute(H):a[H]=null}}}function m(a,b){return-1!==(" "+a.className+" ").indexOf(" "+b+" ")}function n(a,b){m(a,b)||(a.className=""===a.className?b:a.className+" "+b)}function o(a,b){if(m(a,b)){for(var c=a.className.split(" "),d=c.length-1;d>=0;d--)c[d]===b&&c.splice(d,1);

a.className=c.join(" ")}}function p(a,b){Object.getOwnPropertyNames(b).forEach(function(c){var d=b[c];null===d||"undefined"==typeof d||d===!1?a.removeAttribute(c):a.setAttribute(c,d===!0?"":d)})}function q(a){var b,c,d,e,f;if(b={},c=",autoplay,controls,loop,muted,default,",a&&a.attributes&&a.attributes.length>0){d=a.attributes;for(var g=d.length-1;g>=0;g--)e=d[g].name,f=d[g].value,("boolean"==typeof a[e]||-1!==c.indexOf(","+e+","))&&(f=null!==f?!0:!1),b[e]=f}return b}function r(){x["default"].body.focus(),x["default"].onselectstart=function(){return!1}}function s(){x["default"].onselectstart=function(){return!0}}function t(a){var b=void 0;if(a.getBoundingClientRect&&a.parentNode&&(b=a.getBoundingClientRect()),!b)return{left:0,top:0};var c=x["default"].documentElement,d=x["default"].body,e=c.clientLeft||d.clientLeft||0,f=z["default"].pageXOffset||d.scrollLeft,g=b.left+f-e,h=c.clientTop||d.clientTop||0,i=z["default"].pageYOffset||d.scrollTop,j=b.top+i-h;return{left:Math.round(g),top:Math.round(j)}}function u(a,b){var c={},d=t(a),e=a.offsetWidth,f=a.offsetHeight,g=d.top,h=d.left,i=b.pageY,j=b.pageX;return b.changedTouches&&(j=b.changedTouches[0].pageX,i=b.changedTouches[0].pageY),c.y=Math.max(0,Math.min(1,(g-i+f)/f)),c.x=Math.max(0,Math.min(1,(j-h)/e)),c}c.__esModule=!0,c.getEl=g,c.createEl=h,c.insertElFirst=i,c.getElData=j,c.hasElData=k,c.removeElData=l,c.hasElClass=m,c.addElClass=n,c.removeElClass=o,c.setElAttributes=p,c.getElAttributes=q,c.blockTextSelection=r,c.unblockTextSelection=s,c.findElPosition=t,c.getPointerPosition=u;var v=f(["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set "," to ","."],["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set "," to ","."]),w=a("global/document"),x=e(w),y=a("global/window"),z=e(y),A=a("./guid.js"),B=d(A),C=a("./log.js"),D=e(C),E=a("tsml"),F=e(E),G={},H="vdata"+(new Date).getTime()},{"./guid.js":127,"./log.js":128,"global/document":1,"global/window":2,tsml:54}],124:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a,b,c){if(Array.isArray(b))return l(f,a,b,c);var d=n.getElData(a);d.handlers||(d.handlers={}),d.handlers[b]||(d.handlers[b]=[]),c.guid||(c.guid=p.newGUID()),d.handlers[b].push(c),d.dispatcher||(d.disabled=!1,d.dispatcher=function(b,c){if(!d.disabled){b=j(b);var e=d.handlers[b.type];if(e)for(var f=e.slice(0),g=0,h=f.length;h>g&&!b.isImmediatePropagationStopped();g++)f[g].call(a,b,c)}}),1===d.handlers[b].length&&(a.addEventListener?a.addEventListener(b,d.dispatcher,!1):a.attachEvent&&a.attachEvent("on"+b,d.dispatcher))}function g(a,b,c){if(n.hasElData(a)){var d=n.getElData(a);if(d.handlers){if(Array.isArray(b))return l(g,a,b,c);var e=function(b){d.handlers[b]=[],k(a,b)};if(b){var f=d.handlers[b];if(f){if(!c)return void e(b);if(c.guid)for(var h=0;h<f.length;h++)f[h].guid===c.guid&&f.splice(h--,1);k(a,b)}}else for(var i in d.handlers)e(i)}}}function h(a,b,c){var d=n.hasElData(a)?n.getElData(a):{},e=a.parentNode||a.ownerDocument;if("string"==typeof b&&(b={type:b,target:a}),b=j(b),d.dispatcher&&d.dispatcher.call(a,b,c),e&&!b.isPropagationStopped()&&b.bubbles===!0)h.call(null,e,b,c);else if(!e&&!b.defaultPrevented){var f=n.getElData(b.target);b.target[b.type]&&(f.disabled=!0,"function"==typeof b.target[b.type]&&b.target[b.type](),f.disabled=!1)}return!b.defaultPrevented}function i(a,b,c){if(Array.isArray(b))return l(i,a,b,c);var d=function e(){g(a,b,e),c.apply(this,arguments)};d.guid=c.guid=c.guid||p.newGUID(),f(a,b,d)}function j(a){function b(){return!0}function c(){return!1}if(!a||!a.isPropagationStopped){var d=a||r["default"].event;a={};for(var e in d)"layerX"!==e&&"layerY"!==e&&"keyLocation"!==e&&"webkitMovementX"!==e&&"webkitMovementY"!==e&&("returnValue"===e&&d.preventDefault||(a[e]=d[e]));if(a.target||(a.target=a.srcElement||t["default"]),a.relatedTarget||(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement),a.preventDefault=function(){d.preventDefault&&d.preventDefault(),a.returnValue=!1,d.returnValue=!1,a.defaultPrevented=!0},a.defaultPrevented=!1,a.stopPropagation=function(){d.stopPropagation&&d.stopPropagation(),a.cancelBubble=!0,d.cancelBubble=!0,a.isPropagationStopped=b},a.isPropagationStopped=c,a.stopImmediatePropagation=function(){d.stopImmediatePropagation&&d.stopImmediatePropagation(),a.isImmediatePropagationStopped=b,a.stopPropagation()},a.isImmediatePropagationStopped=c,null!=a.clientX){var f=t["default"].documentElement,g=t["default"].body;a.pageX=a.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=a.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)}a.which=a.charCode||a.keyCode,null!=a.button&&(a.button=1&a.button?0:4&a.button?1:2&a.button?2:0)}return a}function k(a,b){var c=n.getElData(a);0===c.handlers[b].length&&(delete c.handlers[b],a.removeEventListener?a.removeEventListener(b,c.dispatcher,!1):a.detachEvent&&a.detachEvent("on"+b,c.dispatcher)),Object.getOwnPropertyNames(c.handlers).length<=0&&(delete c.handlers,delete c.dispatcher,delete c.disabled),0===Object.getOwnPropertyNames(c).length&&n.removeElData(a)}function l(a,b,c,d){c.forEach(function(c){a(b,c,d)})}c.__esModule=!0,c.on=f,c.off=g,c.trigger=h,c.one=i,c.fixEvent=j;var m=a("./dom.js"),n=e(m),o=a("./guid.js"),p=e(o),q=a("global/window"),r=d(q),s=a("global/document"),t=d(s)},{"./dom.js":123,"./guid.js":127,"global/document":1,"global/window":2}],125:[function(a,b,c){"use strict";c.__esModule=!0;var d=a("./guid.js"),e=function(a,b,c){b.guid||(b.guid=d.newGUID());var e=function(){return b.apply(a,arguments)};return e.guid=c?c+"_"+b.guid:b.guid,e};c.bind=e},{"./guid.js":127}],126:[function(a,b,c){"use strict";function d(a){var b=arguments.length<=1||void 0===arguments[1]?a:arguments[1];return function(){var c=Math.floor(a%60),d=Math.floor(a/60%60),e=Math.floor(a/3600),f=Math.floor(b/60%60),g=Math.floor(b/3600);return(isNaN(a)||a===1/0)&&(e=d=c="-"),e=e>0||g>0?e+":":"",d=((e||f>=10)&&10>d?"0"+d:d)+":",c=10>c?"0"+c:c,e+d+c}()}c.__esModule=!0,c["default"]=d,b.exports=c["default"]},{}],127:[function(a,b,c){"use strict";function d(){return e++}c.__esModule=!0,c.newGUID=d;var e=1},{}],128:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){var c=Array.prototype.slice.call(b),d=function(){},e=g["default"].console||{log:d,warn:d,error:d};a?c.unshift(a.toUpperCase()+":"):a="log",h.history.push(c),c.unshift("VIDEOJS:"),e[a].apply?e[a].apply(e,c):e[a](c.join(" "))}c.__esModule=!0;var f=a("global/window"),g=d(f),h=function(){e(null,arguments)};h.history=[],h.error=function(){e("error",arguments)},h.warn=function(){e("warn",arguments)},c["default"]=h,b.exports=c["default"]},{"global/window":2}],129:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){return!!a&&"object"==typeof a&&"[object Object]"===a.toString()&&a.constructor===Object}function f(){var a=Array.prototype.slice.call(arguments);return a.unshift({}),a.push(i),h["default"].apply(null,a),a[0]}c.__esModule=!0,c["default"]=f;var g=a("lodash-compat/object/merge"),h=d(g),i=function(a,b){return e(b)?e(a)?void 0:f(b):b};b.exports=c["default"]},{"lodash-compat/object/merge":40}],130:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0;var e=a("global/document"),f=d(e),g=function(a){var b=f["default"].createElement("style");return b.className=a,b};c.createStyleElement=g;var h=function(a,b){a.styleSheet?a.styleSheet.cssText=b:a.textContent=b};c.setTextContent=h},{"global/document":1}],131:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){return Array.isArray(a)?f(a):void 0===a||void 0===b?f():f([[a,b]])}function f(a){return void 0===a||0===a.length?{length:0,start:function(){throw new Error("This TimeRanges object is empty")},end:function(){throw new Error("This TimeRanges object is empty")}}:{length:a.length,start:g.bind(null,"start",0,a),end:g.bind(null,"end",1,a)}}function g(a,b,c,d){return void 0===d&&(j["default"].warn("DEPRECATED: Function '"+a+"' on 'TimeRanges' called without an index argument."),d=0),h(a,d,c.length-1),c[d][b]}function h(a,b,c){if(0>b||b>c)throw new Error("Failed to execute '"+a+"' on 'TimeRanges': The index provided ("+b+") is greater than or equal to the maximum bound ("+c+").")}c.__esModule=!0,c.createTimeRanges=e;var i=a("./log.js"),j=d(i);c.createTimeRange=e},{"./log.js":128}],132:[function(a,b,c){"use strict";function d(a){return a.charAt(0).toUpperCase()+a.slice(1)}c.__esModule=!0,c["default"]=d,b.exports=c["default"]},{}],133:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}c.__esModule=!0;var e=a("global/document"),f=d(e),g=a("global/window"),h=d(g),i=function(a){var b=["protocol","hostname","port","pathname","search","hash","host"],c=f["default"].createElement("a");c.href=a;var d=""===c.host&&"file:"!==c.protocol,e=void 0;d&&(e=f["default"].createElement("div"),e.innerHTML='<a href="'+a+'"></a>',c=e.firstChild,e.setAttribute("style","display:none; position:absolute;"),f["default"].body.appendChild(e));for(var g={},h=0;h<b.length;h++)g[b[h]]=c[b[h]];return"http:"===g.protocol&&(g.host=g.host.replace(/:80$/,"")),"https:"===g.protocol&&(g.host=g.host.replace(/:443$/,"")),d&&f["default"].body.removeChild(e),g};c.parseUrl=i;var j=function(a){if(!a.match(/^https?:\/\//)){var b=f["default"].createElement("div");b.innerHTML='<a href="'+a+'">x</a>',a=b.firstChild.href}return a};c.getAbsoluteURL=j;var k=function(a){if("string"==typeof a){var b=/^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i,c=b.exec(a);if(c)return c.pop().toLowerCase()}return""};c.getFileExtension=k;var l=function(a){var b=i(a),c=h["default"].location,d=":"===b.protocol?c.protocol:b.protocol,e=d+b.host!==c.protocol+c.host;return e};c.isCrossOrigin=l},{"global/document":1,"global/window":2}],134:[function(b,c,d){"use strict";function e(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b}function f(a){return a&&a.__esModule?a:{"default":a}}d.__esModule=!0;{var g=b("global/document"),h=f(g),i=b("./setup"),j=e(i),k=b("./utils/stylesheet.js"),l=e(k),m=b("./component"),n=f(m),o=b("./event-target"),p=f(o),q=b("./utils/events.js"),r=e(q),s=b("./player"),t=f(s),u=b("./plugins.js"),v=f(u),w=b("../../src/js/utils/merge-options.js"),x=f(w),y=b("./utils/fn.js"),z=e(y),A=b("./tracks/text-track.js"),B=f(A),C=b("object.assign"),D=(f(C),b("./utils/time-ranges.js")),E=b("./utils/format-time.js"),F=f(E),G=b("./utils/log.js"),H=f(G),I=b("./utils/dom.js"),J=e(I),K=b("./utils/browser.js"),L=e(K),M=b("./utils/url.js"),N=e(M),O=b("./extend.js"),P=f(O),Q=b("lodash-compat/object/merge"),R=f(Q),S=b("./utils/create-deprecation-proxy.js"),T=f(S),U=b("xhr"),V=f(U),W=b("./tech/html5.js"),X=(f(W),b("./tech/flash.js"));f(X)}"undefined"==typeof HTMLVideoElement&&(h["default"].createElement("video"),h["default"].createElement("audio"),h["default"].createElement("track"));var Y=function _(a,b,c){var d;if("string"==typeof a){if(0===a.indexOf("#")&&(a=a.slice(1)),_.getPlayers()[a])return b&&H["default"].warn('Player "'+a+'" is already initialised. Options will not be applied.'),c&&_.getPlayers()[a].ready(c),_.getPlayers()[a];d=J.getEl(a)}else d=a;if(!d||!d.nodeName)throw new TypeError("The element or ID supplied is not valid. (videojs)");return d.player||new t["default"](d,b,c)},Z=h["default"].querySelector(".vjs-styles-defaults");if(!Z){Z=l.createStyleElement("vjs-styles-defaults");var $=h["default"].querySelector("head");$.insertBefore(Z,$.firstChild),l.setTextContent(Z,"\n    .video-js {\n      width: 300px;\n      height: 150px;\n    }\n\n    .vjs-fluid {\n      padding-top: 56.25%\n    }\n  ")}j.autoSetupTimeout(1,Y),Y.VERSION="5.0.2",Y.options=t["default"].prototype.options_,Y.getPlayers=function(){return t["default"].players},Y.players=T["default"](t["default"].players,{get:"Access to videojs.players is deprecated; use videojs.getPlayers instead",set:"Modification of videojs.players is deprecated"}),Y.getComponent=n["default"].getComponent,Y.registerComponent=n["default"].registerComponent,Y.browser=L,Y.TOUCH_ENABLED=L.TOUCH_ENABLED,Y.extend=P["default"],Y.mergeOptions=x["default"],Y.bind=z.bind,Y.plugin=v["default"],Y.addLanguage=function(a,b){var c;return a=(""+a).toLowerCase(),R["default"](Y.options.languages,(c={},c[a]=b,c))[a]},Y.log=H["default"],Y.createTimeRange=Y.createTimeRanges=D.createTimeRanges,Y.formatTime=F["default"],Y.parseUrl=N.parseUrl,Y.isCrossOrigin=N.isCrossOrigin,Y.EventTarget=p["default"],Y.on=r.on,Y.one=r.one,Y.off=r.off,Y.trigger=r.trigger,Y.xhr=V["default"],Y.TextTrack=B["default"],"function"==typeof a&&a.amd?a("videojs",[],function(){return Y}):"object"==typeof d&&"object"==typeof c&&(c.exports=Y),d["default"]=Y,c.exports=d["default"]},{"../../src/js/utils/merge-options.js":129,"./component":63,"./event-target":95,"./extend.js":96,"./player":103,"./plugins.js":104,"./setup":106,"./tech/flash.js":109,"./tech/html5.js":110,"./tracks/text-track.js":119,"./utils/browser.js":120,"./utils/create-deprecation-proxy.js":122,"./utils/dom.js":123,"./utils/events.js":124,"./utils/fn.js":125,"./utils/format-time.js":126,"./utils/log.js":128,"./utils/stylesheet.js":130,"./utils/time-ranges.js":131,"./utils/url.js":133,"global/document":1,"lodash-compat/object/merge":40,"object.assign":45,xhr:55}]},{},[134])(134)}),function(a){var b=a.vttjs={},c=b.VTTCue,d=b.VTTRegion,e=a.VTTCue,f=a.VTTRegion;b.shim=function(){b.VTTCue=c,b.VTTRegion=d},b.restore=function(){b.VTTCue=e,b.VTTRegion=f}}(this),function(a,b){function c(a){if("string"!=typeof a)return!1;var b=h[a.toLowerCase()];return b?a.toLowerCase():!1}function d(a){if("string"!=typeof a)return!1;var b=i[a.toLowerCase()];return b?a.toLowerCase():!1}function e(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)a[d]=c[d]}return a}function f(a,b,f){var h=this,i=/MSIE\s8\.0/.test(navigator.userAgent),j={};i?h=document.createElement("custom"):j.enumerable=!0,h.hasBeenReset=!1;var k="",l=!1,m=a,n=b,o=f,p=null,q="",r=!0,s="auto",t="start",u=50,v="middle",w=50,x="middle";return Object.defineProperty(h,"id",e({},j,{get:function(){return k},set:function(a){k=""+a}})),Object.defineProperty(h,"pauseOnExit",e({},j,{get:function(){return l},set:function(a){l=!!a}})),Object.defineProperty(h,"startTime",e({},j,{get:function(){return m},set:function(a){if("number"!=typeof a)throw new TypeError("Start time must be set to a number.");m=a,this.hasBeenReset=!0}})),Object.defineProperty(h,"endTime",e({},j,{get:function(){return n},set:function(a){if("number"!=typeof a)throw new TypeError("End time must be set to a number.");n=a,this.hasBeenReset=!0}})),Object.defineProperty(h,"text",e({},j,{get:function(){return o},set:function(a){o=""+a,this.hasBeenReset=!0}})),Object.defineProperty(h,"region",e({},j,{get:function(){return p},set:function(a){p=a,this.hasBeenReset=!0}})),Object.defineProperty(h,"vertical",e({},j,{get:function(){return q},set:function(a){var b=c(a);if(b===!1)throw new SyntaxError("An invalid or illegal string was specified.");q=b,this.hasBeenReset=!0}})),Object.defineProperty(h,"snapToLines",e({},j,{get:function(){return r},set:function(a){r=!!a,this.hasBeenReset=!0}})),Object.defineProperty(h,"line",e({},j,{get:function(){return s},set:function(a){if("number"!=typeof a&&a!==g)throw new SyntaxError("An invalid number or illegal string was specified.");s=a,this.hasBeenReset=!0}})),Object.defineProperty(h,"lineAlign",e({},j,{get:function(){return t},set:function(a){var b=d(a);if(!b)throw new SyntaxError("An invalid or illegal string was specified.");t=b,this.hasBeenReset=!0}})),Object.defineProperty(h,"position",e({},j,{get:function(){return u},set:function(a){if(0>a||a>100)throw new Error("Position must be between 0 and 100.");u=a,this.hasBeenReset=!0}})),Object.defineProperty(h,"positionAlign",e({},j,{get:function(){return v},set:function(a){var b=d(a);if(!b)throw new SyntaxError("An invalid or illegal string was specified.");v=b,this.hasBeenReset=!0}})),Object.defineProperty(h,"size",e({},j,{get:function(){return w},set:function(a){if(0>a||a>100)throw new Error("Size must be between 0 and 100.");w=a,this.hasBeenReset=!0}})),Object.defineProperty(h,"align",e({},j,{get:function(){return x},set:function(a){var b=d(a);if(!b)throw new SyntaxError("An invalid or illegal string was specified.");x=b,this.hasBeenReset=!0}})),h.displayState=void 0,i?h:void 0}var g="auto",h={"":!0,lr:!0,rl:!0},i={start:!0,middle:!0,end:!0,left:!0,right:!0};f.prototype.getCueAsHTML=function(){return WebVTT.convertCueToDOMTree(window,this.text)},a.VTTCue=a.VTTCue||f,b.VTTCue=f}(this,this.vttjs||{}),function(a,b){function c(a){if("string"!=typeof a)return!1;var b=f[a.toLowerCase()];return b?a.toLowerCase():!1}function d(a){return"number"==typeof a&&a>=0&&100>=a}function e(){var a=100,b=3,e=0,f=100,g=0,h=100,i="";Object.defineProperties(this,{width:{enumerable:!0,get:function(){return a},set:function(b){if(!d(b))throw new Error("Width must be between 0 and 100.");a=b}},lines:{enumerable:!0,get:function(){return b},set:function(a){if("number"!=typeof a)throw new TypeError("Lines must be set to a number.");b=a}},regionAnchorY:{enumerable:!0,get:function(){return f},set:function(a){if(!d(a))throw new Error("RegionAnchorX must be between 0 and 100.");f=a}},regionAnchorX:{enumerable:!0,get:function(){return e},set:function(a){if(!d(a))throw new Error("RegionAnchorY must be between 0 and 100.");e=a}},viewportAnchorY:{enumerable:!0,get:function(){return h},set:function(a){if(!d(a))throw new Error("ViewportAnchorY must be between 0 and 100.");h=a}},viewportAnchorX:{enumerable:!0,get:function(){return g},set:function(a){if(!d(a))throw new Error("ViewportAnchorX must be between 0 and 100.");g=a}},scroll:{enumerable:!0,get:function(){return i},set:function(a){var b=c(a);if(b===!1)throw new SyntaxError("An invalid or illegal string was specified.");i=b}}})}var f={"":!0,up:!0};a.VTTRegion=a.VTTRegion||e,b.VTTRegion=e}(this,this.vttjs||{}),function(a){function b(a,b){this.name="ParsingError",this.code=a.code,this.message=b||a.message}function c(a){function b(a,b,c,d){return 3600*(0|a)+60*(0|b)+(0|c)+(0|d)/1e3}var c=a.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);return c?c[3]?b(c[1],c[2],c[3].replace(":",""),c[4]):c[1]>59?b(c[1],c[2],0,c[4]):b(0,c[1],c[2],c[4]):null}function d(){this.values=o(null)}function e(a,b,c,d){var e=d?a.split(d):[a];for(var f in e)if("string"==typeof e[f]){var g=e[f].split(c);if(2===g.length){var h=g[0],i=g[1];b(h,i)}}}function f(a,f,g){function h(){var d=c(a);if(null===d)throw new b(b.Errors.BadTimeStamp,"Malformed timestamp: "+k);return a=a.replace(/^[^\sa-zA-Z-]+/,""),d}function i(a,b){var c=new d;e(a,function(a,b){switch(a){case"region":for(var d=g.length-1;d>=0;d--)if(g[d].id===b){c.set(a,g[d].region);break}break;case"vertical":c.alt(a,b,["rl","lr"]);break;case"line":var e=b.split(","),f=e[0];c.integer(a,f),c.percent(a,f)?c.set("snapToLines",!1):null,c.alt(a,f,["auto"]),2===e.length&&c.alt("lineAlign",e[1],["start","middle","end"]);break;case"position":e=b.split(","),c.percent(a,e[0]),2===e.length&&c.alt("positionAlign",e[1],["start","middle","end"]);break;case"size":c.percent(a,b);break;case"align":c.alt(a,b,["start","middle","end","left","right"])}},/:/,/\s/),b.region=c.get("region",null),b.vertical=c.get("vertical",""),b.line=c.get("line","auto"),b.lineAlign=c.get("lineAlign","start"),b.snapToLines=c.get("snapToLines",!0),b.size=c.get("size",100),b.align=c.get("align","middle"),b.position=c.get("position",{start:0,left:0,middle:50,end:100,right:100},b.align),b.positionAlign=c.get("positionAlign",{start:"start",left:"start",middle:"middle",end:"end",right:"end"},b.align)}function j(){a=a.replace(/^\s+/,"")}var k=a;if(j(),f.startTime=h(),j(),"-->"!==a.substr(0,3))throw new b(b.Errors.BadTimeStamp,"Malformed time stamp (time stamps must be separated by '-->'): "+k);a=a.substr(3),j(),f.endTime=h(),j(),i(a,f)}function g(a,b){function d(){function a(a){return b=b.substr(a.length),a}if(!b)return null;var c=b.match(/^([^<]*)(<[^>]+>?)?/);return a(c[1]?c[1]:c[2])}function e(a){return p[a]}function f(a){for(;o=a.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);)a=a.replace(o[0],e);return a}function g(a,b){return!s[b.localName]||s[b.localName]===a.localName}function h(b,c){var d=q[b];if(!d)return null;var e=a.document.createElement(d);e.localName=d;var f=r[b];return f&&c&&(e[f]=c.trim()),e}for(var i,j=a.document.createElement("div"),k=j,l=[];null!==(i=d());)if("<"!==i[0])k.appendChild(a.document.createTextNode(f(i)));else{if("/"===i[1]){l.length&&l[l.length-1]===i.substr(2).replace(">","")&&(l.pop(),k=k.parentNode);continue}var m,n=c(i.substr(1,i.length-2));if(n){m=a.document.createProcessingInstruction("timestamp",n),k.appendChild(m);continue}var o=i.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);if(!o)continue;if(m=h(o[1],o[3]),!m)continue;if(!g(k,m))continue;o[2]&&(m.className=o[2].substr(1).replace("."," ")),l.push(o[1]),k.appendChild(m),k=m}return j}function h(a){function b(a,b){for(var c=b.childNodes.length-1;c>=0;c--)a.push(b.childNodes[c])}function c(a){if(!a||!a.length)return null;var d=a.pop(),e=d.textContent||d.innerText;if(e){var f=e.match(/^.*(\n|\r)/);return f?(a.length=0,f[0]):e}return"ruby"===d.tagName?c(a):d.childNodes?(b(a,d),c(a)):void 0}var d,e=[],f="";if(!a||!a.childNodes)return"ltr";for(b(e,a);f=c(e);)for(var g=0;g<f.length;g++){d=f.charCodeAt(g);for(var h=0;h<t.length;h++)if(t[h]===d)return"rtl"}return"ltr"}function i(a){if("number"==typeof a.line&&(a.snapToLines||a.line>=0&&a.line<=100))return a.line;if(!a.track||!a.track.textTrackList||!a.track.textTrackList.mediaElement)return-1;for(var b=a.track,c=b.textTrackList,d=0,e=0;e<c.length&&c[e]!==b;e++)"showing"===c[e].mode&&d++;return-1*++d}function j(){}function k(a,b,c){var d=/MSIE\s8\.0/.test(navigator.userAgent),e="rgba(255, 255, 255, 1)",f="rgba(0, 0, 0, 0.8)";d&&(e="rgb(255, 255, 255)",f="rgb(0, 0, 0)"),j.call(this),this.cue=b,this.cueDiv=g(a,b.text);var i={color:e,backgroundColor:f,position:"relative",left:0,right:0,top:0,bottom:0,display:"inline"};d||(i.writingMode=""===b.vertical?"horizontal-tb":"lr"===b.vertical?"vertical-lr":"vertical-rl",i.unicodeBidi="plaintext"),this.applyStyles(i,this.cueDiv),this.div=a.document.createElement("div"),i={textAlign:"middle"===b.align?"center":b.align,font:c.font,whiteSpace:"pre-line",position:"absolute"},d||(i.direction=h(this.cueDiv),i.writingMode=""===b.vertical?"horizontal-tb":"lr"===b.vertical?"vertical-lr":"vertical-rl".stylesunicodeBidi="plaintext"),this.applyStyles(i),this.div.appendChild(this.cueDiv);var k=0;switch(b.positionAlign){case"start":k=b.position;break;case"middle":k=b.position-b.size/2;break;case"end":k=b.position-b.size}this.applyStyles(""===b.vertical?{left:this.formatStyle(k,"%"),width:this.formatStyle(b.size,"%")}:{top:this.formatStyle(k,"%"),height:this.formatStyle(b.size,"%")}),this.move=function(a){this.applyStyles({top:this.formatStyle(a.top,"px"),bottom:this.formatStyle(a.bottom,"px"),left:this.formatStyle(a.left,"px"),right:this.formatStyle(a.right,"px"),height:this.formatStyle(a.height,"px"),width:this.formatStyle(a.width,"px")})}}function l(a){var b,c,d,e,f=/MSIE\s8\.0/.test(navigator.userAgent);if(a.div){c=a.div.offsetHeight,d=a.div.offsetWidth,e=a.div.offsetTop;var g=(g=a.div.childNodes)&&(g=g[0])&&g.getClientRects&&g.getClientRects();a=a.div.getBoundingClientRect(),b=g?Math.max(g[0]&&g[0].height||0,a.height/g.length):0}this.left=a.left,this.right=a.right,this.top=a.top||e,this.height=a.height||c,this.bottom=a.bottom||e+(a.height||c),this.width=a.width||d,this.lineHeight=void 0!==b?b:a.lineHeight,f&&!this.lineHeight&&(this.lineHeight=13)}function m(a,b,c,d){function e(a,b){for(var e,f=new l(a),g=1,h=0;h<b.length;h++){for(;a.overlapsOppositeAxis(c,b[h])||a.within(c)&&a.overlapsAny(d);)a.move(b[h]);if(a.within(c))return a;var i=a.intersectPercentage(c);g>i&&(e=new l(a),g=i),a=new l(f)}return e||f}var f=new l(b),g=b.cue,h=i(g),j=[];if(g.snapToLines){var k;switch(g.vertical){case"":j=["+y","-y"],k="height";break;case"rl":j=["+x","-x"],k="width";break;case"lr":j=["-x","+x"],k="width"}var m=f.lineHeight,n=m*Math.round(h),o=c[k]+m,p=j[0];Math.abs(n)>o&&(n=0>n?-1:1,n*=Math.ceil(o/m)*m),0>h&&(n+=""===g.vertical?c.height:c.width,j=j.reverse()),f.move(p,n)}else{var q=f.lineHeight/c.height*100;switch(g.lineAlign){case"middle":h-=q/2;break;case"end":h-=q}switch(g.vertical){case"":b.applyStyles({top:b.formatStyle(h,"%")});break;case"rl":b.applyStyles({left:b.formatStyle(h,"%")});break;case"lr":b.applyStyles({right:b.formatStyle(h,"%")})}j=["+y","-x","+x","-y"],f=new l(b)}var r=e(f,j);b.move(r.toCSSCompatValues(c))}function n(){}var o=Object.create||function(){function a(){}return function(b){if(1!==arguments.length)throw new Error("Object.create shim only accepts one parameter.");return a.prototype=b,new a}}();b.prototype=o(Error.prototype),b.prototype.constructor=b,b.Errors={BadSignature:{code:0,message:"Malformed WebVTT signature."},BadTimeStamp:{code:1,message:"Malformed time stamp."}},d.prototype={set:function(a,b){this.get(a)||""===b||(this.values[a]=b)},get:function(a,b,c){return c?this.has(a)?this.values[a]:b[c]:this.has(a)?this.values[a]:b},has:function(a){return a in this.values},alt:function(a,b,c){for(var d=0;d<c.length;++d)if(b===c[d]){this.set(a,b);break}},integer:function(a,b){/^-?\d+$/.test(b)&&this.set(a,parseInt(b,10))},percent:function(a,b){var c;return(c=b.match(/^([\d]{1,3})(\.[\d]*)?%$/))&&(b=parseFloat(b),b>=0&&100>=b)?(this.set(a,b),!0):!1}};var p={"&amp;":"&","&lt;":"<","&gt;":">","&lrm;":"‎","&rlm;":"‏","&nbsp;":" "},q={c:"span",i:"i",b:"b",u:"u",ruby:"ruby",rt:"rt",v:"span",lang:"span"},r={v:"title",lang:"lang"},s={rt:"ruby"},t=[1470,1472,1475,1478,1488,1489,1490,1491,1492,1493,1494,1495,1496,1497,1498,1499,1500,1501,1502,1503,1504,1505,1506,1507,1508,1509,1510,1511,1512,1513,1514,1520,1521,1522,1523,1524,1544,1547,1549,1563,1566,1567,1568,1569,1570,1571,1572,1573,1574,1575,1576,1577,1578,1579,1580,1581,1582,1583,1584,1585,1586,1587,1588,1589,1590,1591,1592,1593,1594,1595,1596,1597,1598,1599,1600,1601,1602,1603,1604,1605,1606,1607,1608,1609,1610,1645,1646,1647,1649,1650,1651,1652,1653,1654,1655,1656,1657,1658,1659,1660,1661,1662,1663,1664,1665,1666,1667,1668,1669,1670,1671,1672,1673,1674,1675,1676,1677,1678,1679,1680,1681,1682,1683,1684,1685,1686,1687,1688,1689,1690,1691,1692,1693,1694,1695,1696,1697,1698,1699,1700,1701,1702,1703,1704,1705,1706,1707,1708,1709,1710,1711,1712,1713,1714,1715,1716,1717,1718,1719,1720,1721,1722,1723,1724,1725,1726,1727,1728,1729,1730,1731,1732,1733,1734,1735,1736,1737,1738,1739,1740,1741,1742,1743,1744,1745,1746,1747,1748,1749,1765,1766,1774,1775,1786,1787,1788,1789,1790,1791,1792,1793,1794,1795,1796,1797,1798,1799,1800,1801,1802,1803,1804,1805,1807,1808,1810,1811,1812,1813,1814,1815,1816,1817,1818,1819,1820,1821,1822,1823,1824,1825,1826,1827,1828,1829,1830,1831,1832,1833,1834,1835,1836,1837,1838,1839,1869,1870,1871,1872,1873,1874,1875,1876,1877,1878,1879,1880,1881,1882,1883,1884,1885,1886,1887,1888,1889,1890,1891,1892,1893,1894,1895,1896,1897,1898,1899,1900,1901,1902,1903,1904,1905,1906,1907,1908,1909,1910,1911,1912,1913,1914,1915,1916,1917,1918,1919,1920,1921,1922,1923,1924,1925,1926,1927,1928,1929,1930,1931,1932,1933,1934,1935,1936,1937,1938,1939,1940,1941,1942,1943,1944,1945,1946,1947,1948,1949,1950,1951,1952,1953,1954,1955,1956,1957,1969,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2e3,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2036,2037,2042,2048,2049,2050,2051,2052,2053,2054,2055,2056,2057,2058,2059,2060,2061,2062,2063,2064,2065,2066,2067,2068,2069,2074,2084,2088,2096,2097,2098,2099,2100,2101,2102,2103,2104,2105,2106,2107,2108,2109,2110,2112,2113,2114,2115,2116,2117,2118,2119,2120,2121,2122,2123,2124,2125,2126,2127,2128,2129,2130,2131,2132,2133,2134,2135,2136,2142,2208,2210,2211,2212,2213,2214,2215,2216,2217,2218,2219,2220,8207,64285,64287,64288,64289,64290,64291,64292,64293,64294,64295,64296,64298,64299,64300,64301,64302,64303,64304,64305,64306,64307,64308,64309,64310,64312,64313,64314,64315,64316,64318,64320,64321,64323,64324,64326,64327,64328,64329,64330,64331,64332,64333,64334,64335,64336,64337,64338,64339,64340,64341,64342,64343,64344,64345,64346,64347,64348,64349,64350,64351,64352,64353,64354,64355,64356,64357,64358,64359,64360,64361,64362,64363,64364,64365,64366,64367,64368,64369,64370,64371,64372,64373,64374,64375,64376,64377,64378,64379,64380,64381,64382,64383,64384,64385,64386,64387,64388,64389,64390,64391,64392,64393,64394,64395,64396,64397,64398,64399,64400,64401,64402,64403,64404,64405,64406,64407,64408,64409,64410,64411,64412,64413,64414,64415,64416,64417,64418,64419,64420,64421,64422,64423,64424,64425,64426,64427,64428,64429,64430,64431,64432,64433,64434,64435,64436,64437,64438,64439,64440,64441,64442,64443,64444,64445,64446,64447,64448,64449,64467,64468,64469,64470,64471,64472,64473,64474,64475,64476,64477,64478,64479,64480,64481,64482,64483,64484,64485,64486,64487,64488,64489,64490,64491,64492,64493,64494,64495,64496,64497,64498,64499,64500,64501,64502,64503,64504,64505,64506,64507,64508,64509,64510,64511,64512,64513,64514,64515,64516,64517,64518,64519,64520,64521,64522,64523,64524,64525,64526,64527,64528,64529,64530,64531,64532,64533,64534,64535,64536,64537,64538,64539,64540,64541,64542,64543,64544,64545,64546,64547,64548,64549,64550,64551,64552,64553,64554,64555,64556,64557,64558,64559,64560,64561,64562,64563,64564,64565,64566,64567,64568,64569,64570,64571,64572,64573,64574,64575,64576,64577,64578,64579,64580,64581,64582,64583,64584,64585,64586,64587,64588,64589,64590,64591,64592,64593,64594,64595,64596,64597,64598,64599,64600,64601,64602,64603,64604,64605,64606,64607,64608,64609,64610,64611,64612,64613,64614,64615,64616,64617,64618,64619,64620,64621,64622,64623,64624,64625,64626,64627,64628,64629,64630,64631,64632,64633,64634,64635,64636,64637,64638,64639,64640,64641,64642,64643,64644,64645,64646,64647,64648,64649,64650,64651,64652,64653,64654,64655,64656,64657,64658,64659,64660,64661,64662,64663,64664,64665,64666,64667,64668,64669,64670,64671,64672,64673,64674,64675,64676,64677,64678,64679,64680,64681,64682,64683,64684,64685,64686,64687,64688,64689,64690,64691,64692,64693,64694,64695,64696,64697,64698,64699,64700,64701,64702,64703,64704,64705,64706,64707,64708,64709,64710,64711,64712,64713,64714,64715,64716,64717,64718,64719,64720,64721,64722,64723,64724,64725,64726,64727,64728,64729,64730,64731,64732,64733,64734,64735,64736,64737,64738,64739,64740,64741,64742,64743,64744,64745,64746,64747,64748,64749,64750,64751,64752,64753,64754,64755,64756,64757,64758,64759,64760,64761,64762,64763,64764,64765,64766,64767,64768,64769,64770,64771,64772,64773,64774,64775,64776,64777,64778,64779,64780,64781,64782,64783,64784,64785,64786,64787,64788,64789,64790,64791,64792,64793,64794,64795,64796,64797,64798,64799,64800,64801,64802,64803,64804,64805,64806,64807,64808,64809,64810,64811,64812,64813,64814,64815,64816,64817,64818,64819,64820,64821,64822,64823,64824,64825,64826,64827,64828,64829,64848,64849,64850,64851,64852,64853,64854,64855,64856,64857,64858,64859,64860,64861,64862,64863,64864,64865,64866,64867,64868,64869,64870,64871,64872,64873,64874,64875,64876,64877,64878,64879,64880,64881,64882,64883,64884,64885,64886,64887,64888,64889,64890,64891,64892,64893,64894,64895,64896,64897,64898,64899,64900,64901,64902,64903,64904,64905,64906,64907,64908,64909,64910,64911,64914,64915,64916,64917,64918,64919,64920,64921,64922,64923,64924,64925,64926,64927,64928,64929,64930,64931,64932,64933,64934,64935,64936,64937,64938,64939,64940,64941,64942,64943,64944,64945,64946,64947,64948,64949,64950,64951,64952,64953,64954,64955,64956,64957,64958,64959,64960,64961,64962,64963,64964,64965,64966,64967,65008,65009,65010,65011,65012,65013,65014,65015,65016,65017,65018,65019,65020,65136,65137,65138,65139,65140,65142,65143,65144,65145,65146,65147,65148,65149,65150,65151,65152,65153,65154,65155,65156,65157,65158,65159,65160,65161,65162,65163,65164,65165,65166,65167,65168,65169,65170,65171,65172,65173,65174,65175,65176,65177,65178,65179,65180,65181,65182,65183,65184,65185,65186,65187,65188,65189,65190,65191,65192,65193,65194,65195,65196,65197,65198,65199,65200,65201,65202,65203,65204,65205,65206,65207,65208,65209,65210,65211,65212,65213,65214,65215,65216,65217,65218,65219,65220,65221,65222,65223,65224,65225,65226,65227,65228,65229,65230,65231,65232,65233,65234,65235,65236,65237,65238,65239,65240,65241,65242,65243,65244,65245,65246,65247,65248,65249,65250,65251,65252,65253,65254,65255,65256,65257,65258,65259,65260,65261,65262,65263,65264,65265,65266,65267,65268,65269,65270,65271,65272,65273,65274,65275,65276,67584,67585,67586,67587,67588,67589,67592,67594,67595,67596,67597,67598,67599,67600,67601,67602,67603,67604,67605,67606,67607,67608,67609,67610,67611,67612,67613,67614,67615,67616,67617,67618,67619,67620,67621,67622,67623,67624,67625,67626,67627,67628,67629,67630,67631,67632,67633,67634,67635,67636,67637,67639,67640,67644,67647,67648,67649,67650,67651,67652,67653,67654,67655,67656,67657,67658,67659,67660,67661,67662,67663,67664,67665,67666,67667,67668,67669,67671,67672,67673,67674,67675,67676,67677,67678,67679,67840,67841,67842,67843,67844,67845,67846,67847,67848,67849,67850,67851,67852,67853,67854,67855,67856,67857,67858,67859,67860,67861,67862,67863,67864,67865,67866,67867,67872,67873,67874,67875,67876,67877,67878,67879,67880,67881,67882,67883,67884,67885,67886,67887,67888,67889,67890,67891,67892,67893,67894,67895,67896,67897,67903,67968,67969,67970,67971,67972,67973,67974,67975,67976,67977,67978,67979,67980,67981,67982,67983,67984,67985,67986,67987,67988,67989,67990,67991,67992,67993,67994,67995,67996,67997,67998,67999,68e3,68001,68002,68003,68004,68005,68006,68007,68008,68009,68010,68011,68012,68013,68014,68015,68016,68017,68018,68019,68020,68021,68022,68023,68030,68031,68096,68112,68113,68114,68115,68117,68118,68119,68121,68122,68123,68124,68125,68126,68127,68128,68129,68130,68131,68132,68133,68134,68135,68136,68137,68138,68139,68140,68141,68142,68143,68144,68145,68146,68147,68160,68161,68162,68163,68164,68165,68166,68167,68176,68177,68178,68179,68180,68181,68182,68183,68184,68192,68193,68194,68195,68196,68197,68198,68199,68200,68201,68202,68203,68204,68205,68206,68207,68208,68209,68210,68211,68212,68213,68214,68215,68216,68217,68218,68219,68220,68221,68222,68223,68352,68353,68354,68355,68356,68357,68358,68359,68360,68361,68362,68363,68364,68365,68366,68367,68368,68369,68370,68371,68372,68373,68374,68375,68376,68377,68378,68379,68380,68381,68382,68383,68384,68385,68386,68387,68388,68389,68390,68391,68392,68393,68394,68395,68396,68397,68398,68399,68400,68401,68402,68403,68404,68405,68416,68417,68418,68419,68420,68421,68422,68423,68424,68425,68426,68427,68428,68429,68430,68431,68432,68433,68434,68435,68436,68437,68440,68441,68442,68443,68444,68445,68446,68447,68448,68449,68450,68451,68452,68453,68454,68455,68456,68457,68458,68459,68460,68461,68462,68463,68464,68465,68466,68472,68473,68474,68475,68476,68477,68478,68479,68608,68609,68610,68611,68612,68613,68614,68615,68616,68617,68618,68619,68620,68621,68622,68623,68624,68625,68626,68627,68628,68629,68630,68631,68632,68633,68634,68635,68636,68637,68638,68639,68640,68641,68642,68643,68644,68645,68646,68647,68648,68649,68650,68651,68652,68653,68654,68655,68656,68657,68658,68659,68660,68661,68662,68663,68664,68665,68666,68667,68668,68669,68670,68671,68672,68673,68674,68675,68676,68677,68678,68679,68680,126464,126465,126466,126467,126469,126470,126471,126472,126473,126474,126475,126476,126477,126478,126479,126480,126481,126482,126483,126484,126485,126486,126487,126488,126489,126490,126491,126492,126493,126494,126495,126497,126498,126500,126503,126505,126506,126507,126508,126509,126510,126511,126512,126513,126514,126516,126517,126518,126519,126521,126523,126530,126535,126537,126539,126541,126542,126543,126545,126546,126548,126551,126553,126555,126557,126559,126561,126562,126564,126567,126568,126569,126570,126572,126573,126574,126575,126576,126577,126578,126580,126581,126582,126583,126585,126586,126587,126588,126590,126592,126593,126594,126595,126596,126597,126598,126599,126600,126601,126603,126604,126605,126606,126607,126608,126609,126610,126611,126612,126613,126614,126615,126616,126617,126618,126619,126625,126626,126627,126629,126630,126631,126632,126633,126635,126636,126637,126638,126639,126640,126641,126642,126643,126644,126645,126646,126647,126648,126649,126650,126651,1114109];

j.prototype.applyStyles=function(a,b){b=b||this.div;for(var c in a)a.hasOwnProperty(c)&&(b.style[c]=a[c])},j.prototype.formatStyle=function(a,b){return 0===a?0:a+b},k.prototype=o(j.prototype),k.prototype.constructor=k,l.prototype.move=function(a,b){switch(b=void 0!==b?b:this.lineHeight,a){case"+x":this.left+=b,this.right+=b;break;case"-x":this.left-=b,this.right-=b;break;case"+y":this.top+=b,this.bottom+=b;break;case"-y":this.top-=b,this.bottom-=b}},l.prototype.overlaps=function(a){return this.left<a.right&&this.right>a.left&&this.top<a.bottom&&this.bottom>a.top},l.prototype.overlapsAny=function(a){for(var b=0;b<a.length;b++)if(this.overlaps(a[b]))return!0;return!1},l.prototype.within=function(a){return this.top>=a.top&&this.bottom<=a.bottom&&this.left>=a.left&&this.right<=a.right},l.prototype.overlapsOppositeAxis=function(a,b){switch(b){case"+x":return this.left<a.left;case"-x":return this.right>a.right;case"+y":return this.top<a.top;case"-y":return this.bottom>a.bottom}},l.prototype.intersectPercentage=function(a){var b=Math.max(0,Math.min(this.right,a.right)-Math.max(this.left,a.left)),c=Math.max(0,Math.min(this.bottom,a.bottom)-Math.max(this.top,a.top)),d=b*c;return d/(this.height*this.width)},l.prototype.toCSSCompatValues=function(a){return{top:this.top-a.top,bottom:a.bottom-this.bottom,left:this.left-a.left,right:a.right-this.right,height:this.height,width:this.width}},l.getSimpleBoxPosition=function(a){var b=a.div?a.div.offsetHeight:a.tagName?a.offsetHeight:0,c=a.div?a.div.offsetWidth:a.tagName?a.offsetWidth:0,d=a.div?a.div.offsetTop:a.tagName?a.offsetTop:0;a=a.div?a.div.getBoundingClientRect():a.tagName?a.getBoundingClientRect():a;var e={left:a.left,right:a.right,top:a.top||d,height:a.height||b,bottom:a.bottom||d+(a.height||b),width:a.width||c};return e},n.StringDecoder=function(){return{decode:function(a){if(!a)return"";if("string"!=typeof a)throw new Error("Error - expected string data.");return decodeURIComponent(encodeURIComponent(a))}}},n.convertCueToDOMTree=function(a,b){return a&&b?g(a,b):null};var u=.05,v="sans-serif",w="1.5%";n.processCues=function(a,b,c){function d(a){for(var b=0;b<a.length;b++)if(a[b].hasBeenReset||!a[b].displayState)return!0;return!1}if(!a||!b||!c)return null;for(;c.firstChild;)c.removeChild(c.firstChild);var e=a.document.createElement("div");if(e.style.position="absolute",e.style.left="0",e.style.right="0",e.style.top="0",e.style.bottom="0",e.style.margin=w,c.appendChild(e),d(b)){var f=[],g=l.getSimpleBoxPosition(e),h=Math.round(g.height*u*100)/100,i={font:h+"px "+v};!function(){for(var c,d,h=0;h<b.length;h++)d=b[h],c=new k(a,d,i),e.appendChild(c.div),m(a,c,g,f),d.displayState=c.div,f.push(l.getSimpleBoxPosition(c))}()}else for(var j=0;j<b.length;j++)e.appendChild(b[j].displayState)},n.Parser=function(a,b,c){c||(c=b,b={}),b||(b={}),this.window=a,this.vttjs=b,this.state="INITIAL",this.buffer="",this.decoder=c||new TextDecoder("utf8"),this.regionList=[]},n.Parser.prototype={reportOrThrowError:function(a){if(!(a instanceof b))throw a;this.onparsingerror&&this.onparsingerror(a)},parse:function(a){function c(){for(var a=i.buffer,b=0;b<a.length&&"\r"!==a[b]&&"\n"!==a[b];)++b;var c=a.substr(0,b);return"\r"===a[b]&&++b,"\n"===a[b]&&++b,i.buffer=a.substr(b),c}function g(a){var b=new d;if(e(a,function(a,c){switch(a){case"id":b.set(a,c);break;case"width":b.percent(a,c);break;case"lines":b.integer(a,c);break;case"regionanchor":case"viewportanchor":var e=c.split(",");if(2!==e.length)break;var f=new d;if(f.percent("x",e[0]),f.percent("y",e[1]),!f.has("x")||!f.has("y"))break;b.set(a+"X",f.get("x")),b.set(a+"Y",f.get("y"));break;case"scroll":b.alt(a,c,["up"])}},/=/,/\s/),b.has("id")){var c=new(i.vttjs.VTTRegion||i.window.VTTRegion);c.width=b.get("width",100),c.lines=b.get("lines",3),c.regionAnchorX=b.get("regionanchorX",0),c.regionAnchorY=b.get("regionanchorY",100),c.viewportAnchorX=b.get("viewportanchorX",0),c.viewportAnchorY=b.get("viewportanchorY",100),c.scroll=b.get("scroll",""),i.onregion&&i.onregion(c),i.regionList.push({id:b.get("id"),region:c})}}function h(a){e(a,function(a,b){switch(a){case"Region":g(b)}},/:/)}var i=this;a&&(i.buffer+=i.decoder.decode(a,{stream:!0}));try{var j;if("INITIAL"===i.state){if(!/\r\n|\n/.test(i.buffer))return this;j=c();var k=j.match(/^WEBVTT([ \t].*)?$/);if(!k||!k[0])throw new b(b.Errors.BadSignature);i.state="HEADER"}for(var l=!1;i.buffer;){if(!/\r\n|\n/.test(i.buffer))return this;switch(l?l=!1:j=c(),i.state){case"HEADER":/:/.test(j)?h(j):j||(i.state="ID");continue;case"NOTE":j||(i.state="ID");continue;case"ID":if(/^NOTE($|[ \t])/.test(j)){i.state="NOTE";break}if(!j)continue;if(i.cue=new(i.vttjs.VTTCue||i.window.VTTCue)(0,0,""),i.state="CUE",-1===j.indexOf("-->")){i.cue.id=j;continue}case"CUE":try{f(j,i.cue,i.regionList)}catch(m){i.reportOrThrowError(m),i.cue=null,i.state="BADCUE";continue}i.state="CUETEXT";continue;case"CUETEXT":var n=-1!==j.indexOf("-->");if(!j||n&&(l=!0)){i.oncue&&i.oncue(i.cue),i.cue=null,i.state="ID";continue}i.cue.text&&(i.cue.text+="\n"),i.cue.text+=j;continue;case"BADCUE":j||(i.state="ID");continue}}}catch(m){i.reportOrThrowError(m),"CUETEXT"===i.state&&i.cue&&i.oncue&&i.oncue(i.cue),i.cue=null,i.state="INITIAL"===i.state?"BADWEBVTT":"BADCUE"}return this},flush:function(){var a=this;try{if(a.buffer+=a.decoder.decode(),(a.cue||"HEADER"===a.state)&&(a.buffer+="\n\n",a.parse()),"INITIAL"===a.state)throw new b(b.Errors.BadSignature)}catch(c){a.reportOrThrowError(c)}return a.onflush&&a.onflush(),this}},a.WebVTT=n}(this,this.vttjs||{});
//# sourceMappingURL=video.min.js.map
!function(){!function(a){var b=a&&a.videojs;if(b){b.CDN_VERSION="5.0.2";var c="https:"===a.location.protocol?"https://":"http://";b.options.flash.swf=c+"vjs.zencdn.net/swf/5.0.0-rc1/video-js.swf"}}(window),function(a,b,c,d,e,f,g){b&&b.HELP_IMPROVE_VIDEOJS!==!1&&(e.random()>.01||(f=b.location,g=b.videojs||{},a.src="//www.google-analytics.com/__utm.gif?utmwv=5.4.2&utmac=UA-16505296-3&utmn=1&utmhn="+d(f.hostname)+"&utmsr="+b.screen.availWidth+"x"+b.screen.availHeight+"&utmul="+(c.language||c.userLanguage||"").toLowerCase()+"&utmr="+d(f.href)+"&utmp="+d(f.hostname+f.pathname)+"&utmcc=__utma%3D1."+e.floor(1e10*e.random())+".1.1.1.1%3B&utme=8(vjsv*cdnv)9("+g.VERSION+"*"+g.CDN_VERSION+")"))}(new Image,window,navigator,encodeURIComponent,Math)}();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)))

/***/ }),

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return require(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){var d=a("hls.js"),e=a("./videojs5-hlsjs-source-handler.js");e(window,window.videojs,d)},{"./videojs5-hlsjs-source-handler.js":2,"hls.js":3}],2:[function(a,b,c){a("videojs-quality-picker");var d=function(a,b,c){function d(a,b){function d(){var a=b.options_.hlsjsConfig||{};j=new c(a),j.on(c.Events.ERROR,function(a,c){g(a,c,b,l)}),j.on(c.Events.MANIFEST_PARSED,h),j.on(c.Events.LEVEL_LOADED,function(a,b){m=b.details.live?1/0:b.details.totalduration}),j.attachMedia(k),k.addEventListener("waiting",i)}function e(a,b){j.nextLevel=a}function f(){1===l[c.ErrorTypes.MEDIA_ERROR]?j.recoverMediaError():2===l[c.ErrorTypes.MEDIA_ERROR]?(j.swapAudioCodec(),j.recoverMediaError()):l[c.ErrorTypes.MEDIA_ERROR]>2&&(error.code=3,b.error=function(){return error},b.trigger("error"))}function g(a,d){var e={message:"HLS.js error: "+d.type+" - fatal: "+d.fatal+" - "+d.details};if(l[d.type]?l[d.type]+=1:l[d.type]=1,d.fatal)switch(d.type){case c.ErrorTypes.NETWORK_ERROR:e.code=2,b.error=function(){return e},b.trigger("error");break;case c.ErrorTypes.MEDIA_ERROR:f();break;default:j.destroy(),b.error=function(){return e},b.trigger("error")}}function h(a,c){function d(a){return a.height?a.height+"p":a.width?Math.round(9*a.width/16)+"p":a.bitrate?a.bitrate/1e3+"kbps":0}var f=[];if(c.levels.length>1){var g={id:-1,label:"auto",selected:-1===j.manualLevel};f.push(g)}c.levels.forEach(function(a,b){var c={};c.id=b,c.selected=b===j.manualLevel,c.label=d(a),f.push(c)});var h={qualityData:{video:f},qualitySwitchCallback:e};b.trigger("loadedqualitydata",h)}function i(){j.loadSource(a.src),k.removeEventListener("waiting",i)}b.name_="streamrootHLS";var j,k=b.el(),l={},m=null;k.addEventListener("error",function(a){var b,c=a.currentTarget.error;switch(c.code){case c.MEDIA_ERR_ABORTED:b="You aborted the video playback";break;case c.MEDIA_ERR_DECODE:b="The video playback was aborted due to a corruption problem or because the video used features your browser did not support",f();break;case c.MEDIA_ERR_NETWORK:b="A network error caused the video download to fail part-way";break;case c.MEDIA_ERR_SRC_NOT_SUPPORTED:b="The video could not be loaded, either because the server or network failed or because the format is not supported"}}),this.duration=function(){return m||k.duration||0},this.dispose=function(){k.removeEventListener("waiting",i),j.destroy()},d()}c.isSupported()&&b.getComponent("Html5").registerSourceHandler({canHandleSource:function(a){var b,c=/^application\/x-mpegURL$/i,d=/\.m3u8/i;return b=c.test(a.type)?"probably":d.test(a.src)?"maybe":""},handleSource:function(a,b){return b.hlsProvider&&b.hlsProvider.dispose(),b.hlsProvider=new d(a,b),b.hlsProvider}},0),b.StreamrootProviderHLS=d};b.exports=d},{"videojs-quality-picker":7}],3:[function(a,b,c){(function(d){!function(a){if("object"==typeof c&&"undefined"!=typeof b)b.exports=a();else if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (a),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof d?d:"undefined"!=typeof self?self:this,e.Hls=a()}}(function(){var b;return function c(b,d,e){function f(h,i){if(!d[h]){if(!b[h]){var j="function"==typeof a&&a;if(!i&&j)return j(h,!0);if(g)return g(h,!0);var k=new Error("Cannot find module '"+h+"'");throw k.code="MODULE_NOT_FOUND",k}var l=d[h]={exports:{}};b[h][0].call(l.exports,function(a){var c=b[h][1][a];return f(c?c:a)},l,l.exports,c,b,d,e)}return d[h].exports}for(var g="function"==typeof a&&a,h=0;h<e.length;h++)f(e[h]);return f}({1:[function(a,b,c){function d(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function e(a){return"function"==typeof a}function f(a){return"number"==typeof a}function g(a){return"object"==typeof a&&null!==a}function h(a){return void 0===a}b.exports=d,d.EventEmitter=d,d.prototype._events=void 0,d.prototype._maxListeners=void 0,d.defaultMaxListeners=10,d.prototype.setMaxListeners=function(a){if(!f(a)||a<0||isNaN(a))throw TypeError("n must be a positive number");return this._maxListeners=a,this},d.prototype.emit=function(a){var b,c,d,f,i,j;if(this._events||(this._events={}),"error"===a&&(!this._events.error||g(this._events.error)&&!this._events.error.length)){if(b=arguments[1],b instanceof Error)throw b;var k=new Error('Uncaught, unspecified "error" event. ('+b+")");throw k.context=b,k}if(c=this._events[a],h(c))return!1;if(e(c))switch(arguments.length){case 1:c.call(this);break;case 2:c.call(this,arguments[1]);break;case 3:c.call(this,arguments[1],arguments[2]);break;default:f=Array.prototype.slice.call(arguments,1),c.apply(this,f)}else if(g(c))for(f=Array.prototype.slice.call(arguments,1),j=c.slice(),d=j.length,i=0;i<d;i++)j[i].apply(this,f);return!0},d.prototype.addListener=function(a,b){var c;if(!e(b))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",a,e(b.listener)?b.listener:b),this._events[a]?g(this._events[a])?this._events[a].push(b):this._events[a]=[this._events[a],b]:this._events[a]=b,g(this._events[a])&&!this._events[a].warned&&(c=h(this._maxListeners)?d.defaultMaxListeners:this._maxListeners,c&&c>0&&this._events[a].length>c&&(this._events[a].warned=!0,"function"==typeof console.trace)),this},d.prototype.on=d.prototype.addListener,d.prototype.once=function(a,b){function c(){this.removeListener(a,c),d||(d=!0,b.apply(this,arguments))}if(!e(b))throw TypeError("listener must be a function");var d=!1;return c.listener=b,this.on(a,c),this},d.prototype.removeListener=function(a,b){var c,d,f,h;if(!e(b))throw TypeError("listener must be a function");if(!this._events||!this._events[a])return this;if(c=this._events[a],f=c.length,d=-1,c===b||e(c.listener)&&c.listener===b)delete this._events[a],this._events.removeListener&&this.emit("removeListener",a,b);else if(g(c)){for(h=f;h-- >0;)if(c[h]===b||c[h].listener&&c[h].listener===b){d=h;break}if(d<0)return this;1===c.length?(c.length=0,delete this._events[a]):c.splice(d,1),this._events.removeListener&&this.emit("removeListener",a,b)}return this},d.prototype.removeAllListeners=function(a){var b,c;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[a]&&delete this._events[a],this;if(0===arguments.length){for(b in this._events)"removeListener"!==b&&this.removeAllListeners(b);return this.removeAllListeners("removeListener"),this._events={},this}if(c=this._events[a],e(c))this.removeListener(a,c);else if(c)for(;c.length;)this.removeListener(a,c[c.length-1]);return delete this._events[a],this},d.prototype.listeners=function(a){var b;return b=this._events&&this._events[a]?e(this._events[a])?[this._events[a]]:this._events[a].slice():[]},d.prototype.listenerCount=function(a){if(this._events){var b=this._events[a];if(e(b))return 1;if(b)return b.length}return 0},d.listenerCount=function(a,b){return a.listenerCount(b)}},{}],2:[function(a,c,d){!function(a){var e=/^([^#]*)(.*)$/,f=/^([^\?]*)(.*)$/,g=/^(([a-z]+:\/\/)?[^:\/]+(?::[0-9]+)?)?(\/?.*)$/i,h={buildAbsoluteURL:function(a,b){if(b=b.trim(),/^[a-z]+:/i.test(b))return b;var c=null,d=null,i=e.exec(b);i&&(d=i[2],b=i[1]);var j=f.exec(b);j&&(c=j[2],b=j[1]);var k=e.exec(a);k&&(a=k[1]);var l=f.exec(a);l&&(a=l[1]);var m=g.exec(a);if(!m)throw new Error("Error trying to parse base URL.");var n=m[2]||"",o=m[1]||"",p=m[3];0!==p.indexOf("/")&&""!==o&&(p="/"+p);var q=null;return q=/^\/\//.test(b)?n+h.buildAbsolutePath("",b.substring(2)):/^\//.test(b)?o+"/"+h.buildAbsolutePath("",b.substring(1)):h.buildAbsolutePath(o+p,b),c&&(q+=c),d&&(q+=d),q},buildAbsolutePath:function(a,b){for(var c,d,e=b,f="",g=a.replace(/[^\/]*$/,e.replace(/(\/|^)(?:\.?\/+)+/g,"$1")),h=0;d=g.indexOf("/../",h),d>-1;h=d+c)c=/^\/(?:\.\.\/)*/.exec(g.slice(d))[0].length,f=(f+g.substring(h,d)).replace(new RegExp("(?:\\/+[^\\/]*){0,"+(c-1)/3+"}$"),"/");return f+g.substr(h)}};"object"==typeof d&&"object"==typeof c?c.exports=h:"function"==typeof b&&b.amd?b([],function(){return h}):"object"==typeof d?d.URLToolkit=h:a.URLToolkit=h}(this)},{}],3:[function(a,b,c){var d=arguments[3],e=arguments[4],f=arguments[5],g=JSON.stringify;b.exports=function(a,b){function c(a){q[a]=!0;for(var b in e[a][1]){var d=e[a][1][b];q[d]||c(d)}}for(var h,i=Object.keys(f),j=0,k=i.length;j<k;j++){var l=i[j],m=f[l].exports;if(m===a||m&&m["default"]===a){h=l;break}}if(!h){h=Math.floor(Math.pow(16,8)*Math.random()).toString(16);for(var n={},j=0,k=i.length;j<k;j++){var l=i[j];n[l]=l}e[h]=[Function(["require","module","exports"],"("+a+")(self)"),n]}var o=Math.floor(Math.pow(16,8)*Math.random()).toString(16),p={};p[h]=h,e[o]=[Function(["require"],"var f = require("+g(h)+");(f.default ? f.default : f)(self);"),p];var q={};c(o);var r="("+d+")({"+Object.keys(q).map(function(a){return g(a)+":["+e[a][0]+","+g(e[a][1])+"]"}).join(",")+"},{},["+g(o)+"])",s=window.URL||window.webkitURL||window.mozURL||window.msURL,t=new Blob([r],{type:"text/javascript"});if(b&&b.bare)return t;var u=s.createObjectURL(t),v=new Worker(u);return v.objectURL=u,v}},{}],4:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}Object.defineProperty(c,"__esModule",{value:!0});var h=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),i=a(28),j=d(i),k=a(27),l=d(k),m=a(30),n=d(m),o=a(26),p=a(45),q=a(9),r=d(q),s=function(a){function b(a){e(this,b);var c=f(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,a,j["default"].FRAG_LOADING,j["default"].FRAG_LOADED,j["default"].FRAG_BUFFERED,j["default"].ERROR));return c.lastLoadedFragLevel=0,c._autoLevelCapping=-1,c._nextAutoLevel=-1,c.hls=a,c.onCheck=c.abandonRulesCheck.bind(c),c}return g(b,a),h(b,[{key:"destroy",value:function(){this.clearTimer(),l["default"].prototype.destroy.call(this)}},{key:"onFragLoading",value:function(a){var b=a.frag;if("main"===b.type){if(this.timer||(this.timer=setInterval(this.onCheck,100)),!this.bwEstimator){var c=this.hls,d=a.frag.level,e=c.levels[d].details.live,f=c.config,g=void 0,h=void 0;e?(g=f.abrEwmaFastLive,h=f.abrEwmaSlowLive):(g=f.abrEwmaFastVoD,h=f.abrEwmaSlowVoD),this.bwEstimator=new r["default"](c,h,g,f.abrEwmaDefaultEstimate)}this.fragCurrent=b}}},{key:"abandonRulesCheck",value:function(){var a=this.hls,b=a.media,c=this.fragCurrent,d=c.loader,e=this.minAutoLevel;if(!d||d.stats&&d.stats.aborted)return p.logger.warn("frag loader destroy or aborted, disarm abandonRules"),void this.clearTimer();var f=d.stats;if(b&&(!b.paused&&0!==b.playbackRate||!b.readyState)&&c.autoLevel&&c.level){var g=performance.now()-f.trequest,h=Math.abs(b.playbackRate);if(g>500*c.duration/h){var i=a.levels,k=Math.max(1,f.bw?f.bw/8:1e3*f.loaded/g),l=i[c.level],m=l.realBitrate?Math.max(l.realBitrate,l.bitrate):l.bitrate,o=f.total?f.total:Math.max(f.loaded,Math.round(c.duration*m/8)),q=b.currentTime,r=(o-f.loaded)/k,s=(n["default"].bufferInfo(b,q,a.config.maxBufferHole).end-q)/h;if(s<2*c.duration/h&&r>s){var t=void 0,u=void 0;for(u=c.level-1;u>e;u--){var v=i[u].realBitrate?Math.max(i[u].realBitrate,i[u].bitrate):i[u].bitrate;if(t=c.duration*v/(6.4*k),t<s)break}t<r&&(p.logger.warn("loading too slow, abort fragment loading and switch to level "+u+":fragLoadedDelay["+u+"]<fragLoadedDelay["+(c.level-1)+"];bufferStarvationDelay:"+t.toFixed(1)+"<"+r.toFixed(1)+":"+s.toFixed(1)),a.nextLoadLevel=u,this.bwEstimator.sample(g,f.loaded),d.abort(),this.clearTimer(),a.trigger(j["default"].FRAG_LOAD_EMERGENCY_ABORTED,{frag:c,stats:f}))}}}}},{key:"onFragLoaded",value:function(a){var b=a.frag;if("main"===b.type){this.clearTimer(),this.lastLoadedFragLevel=b.level,this._nextAutoLevel=-1;var c=this.hls.levels[b.level],d=(c.loaded?c.loaded.bytes:0)+a.stats.loaded,e=(c.loaded?c.loaded.duration:0)+a.frag.duration;if(c.loaded={bytes:d,duration:e},c.realBitrate=Math.round(8*d/e),a.frag.bitrateTest){var f=a.stats;f.tparsed=f.tbuffered=f.tload,this.onFragBuffered(a)}}}},{key:"onFragBuffered",value:function(a){var b=a.stats,c=a.frag;if(b.aborted!==!0&&1===c.loadCounter&&"main"===c.type&&(!c.bitrateTest||b.tload===b.tbuffered)){var d=b.tparsed-b.trequest;p.logger.log("latency/loading/parsing/append/kbps:"+Math.round(b.tfirst-b.trequest)+"/"+Math.round(b.tload-b.tfirst)+"/"+Math.round(b.tparsed-b.tload)+"/"+Math.round(b.tbuffered-b.tparsed)+"/"+Math.round(8*b.loaded/(b.tbuffered-b.trequest))),this.bwEstimator.sample(d,b.loaded),c.bitrateTest?this.bitrateTestDelay=d/1e3:this.bitrateTestDelay=0}}},{key:"onError",value:function(a){switch(a.details){case o.ErrorDetails.FRAG_LOAD_ERROR:case o.ErrorDetails.FRAG_LOAD_TIMEOUT:this.clearTimer()}}},{key:"clearTimer",value:function(){this.timer&&(clearInterval(this.timer),this.timer=null)}},{key:"findBestLevel",value:function(a,b,c,d,e,f,g,h,i){for(var j=e;j>=d;j--){var k=i[j],l=k.details,m=l?l.totalduration/l.fragments.length:b,n=!!l&&l.live,o=void 0;o=j<=a?g*c:h*c;var q=i[j].realBitrate?Math.max(i[j].realBitrate,i[j].bitrate):i[j].bitrate,r=q*m/o;if(p.logger.trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: "+j+"/"+Math.round(o)+"/"+q+"/"+m+"/"+f+"/"+r),o>q&&(!r||n||r<f))return j}return-1}},{key:"autoLevelCapping",get:function(){return this._autoLevelCapping},set:function(a){this._autoLevelCapping=a}},{key:"nextAutoLevel",get:function(){var a=this._nextAutoLevel,b=this.bwEstimator,c=this.hls,d=c.levels,e=c.config.minAutoBitrate;if(!(a===-1||b&&b.canEstimate()))return Math.min(a,this.maxAutoLevel);var f=this.nextABRAutoLevel;if(a!==-1&&(f=Math.min(a,f)),void 0!==e)for(var g=d[f].realBitrate?Math.max(d[f].realBitrate,d[f].bitrate):d[f].bitrate;g<e;)f++;return f},set:function(a){this._nextAutoLevel=a}},{key:"minAutoLevel",get:function(){for(var a=this.hls,b=a.levels,c=a.config.minAutoBitrate,d=b?b.length:0,e=0;e<d;e++){var f=b[e].realBitrate?Math.max(b[e].realBitrate,b[e].bitrate):b[e].bitrate;if(f>c)return e}return 0}},{key:"maxAutoLevel",get:function(){var a,b=this.hls.levels,c=this._autoLevelCapping;return a=c===-1&&b&&b.length?b.length-1:c}},{key:"nextABRAutoLevel",get:function(){var a=this.hls,b=this.maxAutoLevel,c=a.levels,d=a.config,e=this.minAutoLevel,f=a.media,g=this.lastLoadedFragLevel,h=this.fragCurrent?this.fragCurrent.duration:0,i=f?f.currentTime:0,j=f&&0!==f.playbackRate?Math.abs(f.playbackRate):1,k=this.bwEstimator?this.bwEstimator.getEstimate():d.abrEwmaDefaultEstimate,l=(n["default"].bufferInfo(f,i,d.maxBufferHole).end-i)/j,m=this.findBestLevel(g,h,k,e,b,l,d.abrBandWidthFactor,d.abrBandWidthUpFactor,c);if(m>=0)return m;p.logger.trace("rebuffering expected to happen, lets try to find a quality level minimizing the rebuffering");var o=h?Math.min(h,d.maxStarvationDelay):d.maxStarvationDelay,q=d.abrBandWidthFactor,r=d.abrBandWidthUpFactor;if(0===l){var s=this.bitrateTestDelay;if(s){var t=h?Math.min(h,d.maxLoadingDelay):d.maxLoadingDelay;o=t-s,p.logger.trace("bitrate test took "+Math.round(1e3*s)+"ms, set first fragment max fetchDuration to "+Math.round(1e3*o)+" ms"),q=r=1}}return m=this.findBestLevel(g,h,k,e,b,l+o,q,r,c),Math.max(m,0)}}]),b}(l["default"]);c["default"]=s},{26:26,27:27,28:28,30:30,45:45,9:9}],5:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}Object.defineProperty(c,"__esModule",{value:!0});var h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},i=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),j=a(41),k=d(j),l=a(30),m=d(l),n=a(22),o=d(n),p=a(28),q=d(p),r=a(27),s=d(r),t=a(31),u=d(t),v=a(46),w=d(v),x=a(26),y=a(45),z={STOPPED:"STOPPED",STARTING:"STARTING",IDLE:"IDLE",PAUSED:"PAUSED",KEY_LOADING:"KEY_LOADING",FRAG_LOADING:"FRAG_LOADING",FRAG_LOADING_WAITING_RETRY:"FRAG_LOADING_WAITING_RETRY",WAITING_TRACK:"WAITING_TRACK",PARSING:"PARSING",PARSED:"PARSED",BUFFER_FLUSHING:"BUFFER_FLUSHING",ENDED:"ENDED",ERROR:"ERROR",WAITING_INIT_PTS:"WAITING_INIT_PTS"},A=function(a){function b(a){e(this,b);var c=f(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,a,q["default"].MEDIA_ATTACHED,q["default"].MEDIA_DETACHING,q["default"].AUDIO_TRACKS_UPDATED,q["default"].AUDIO_TRACK_SWITCHING,q["default"].AUDIO_TRACK_LOADED,q["default"].KEY_LOADED,q["default"].FRAG_LOADED,q["default"].FRAG_PARSING_INIT_SEGMENT,q["default"].FRAG_PARSING_DATA,q["default"].FRAG_PARSED,q["default"].ERROR,q["default"].BUFFER_CREATED,q["default"].BUFFER_APPENDED,q["default"].BUFFER_FLUSHED,q["default"].INIT_PTS_FOUND));return c.config=a.config,c.audioCodecSwap=!1,c.ticks=0,c._state=z.STOPPED,c.ontick=c.tick.bind(c),c.initPTS=[],c.waitingFragment=null,c}return g(b,a),i(b,[{key:"destroy",value:function(){this.stopLoad(),this.timer&&(clearInterval(this.timer),this.timer=null),s["default"].prototype.destroy.call(this),this.state=z.STOPPED}},{key:"onInitPtsFound",value:function(a){var b=a.id,c=a.cc,d=a.initPTS;"main"===b&&(this.initPTS[c]=d,y.logger.log("InitPTS for cc:"+c+" found from video track:"+d),this.state===z.WAITING_INIT_PTS&&(y.logger.log("sending pending audio frag to demuxer"),this.state=z.FRAG_LOADING,this.onFragLoaded(this.waitingFragment),this.waitingFragment=null))}},{key:"startLoad",value:function(a){if(this.tracks){var b=this.lastCurrentTime;this.stopLoad(),this.timer||(this.timer=setInterval(this.ontick,100)),this.fragLoadError=0,b>0&&a===-1?(y.logger.log("audio:override startPosition with lastCurrentTime @"+b.toFixed(3)),this.state=z.IDLE):(this.lastCurrentTime=this.startPosition?this.startPosition:a,this.state=z.STARTING),this.nextLoadPosition=this.startPosition=this.lastCurrentTime,this.tick()}else this.startPosition=a,this.state=z.STOPPED}},{key:"stopLoad",value:function(){var a=this.fragCurrent;a&&(a.loader&&a.loader.abort(),this.fragCurrent=null),this.fragPrevious=null,this.demuxer&&(this.demuxer.destroy(),this.demuxer=null),this.state=z.STOPPED}},{key:"tick",value:function(){this.ticks++,1===this.ticks&&(this.doTick(),this.ticks>1&&setTimeout(this.tick,1),this.ticks=0)}},{key:"doTick",value:function(){var a,b,c,d,e,f,g=this,i=this.hls,j=i.config,l=function(){switch(g.state){case z.ERROR:case z.PAUSED:case z.BUFFER_FLUSHING:break;case z.STARTING:g.state=z.WAITING_TRACK,g.loadedmetadata=!1;break;case z.IDLE:var h=g.tracks;if(!h)break;if(!g.media&&(g.startFragRequested||!j.startFragPrefetch))break;a=g.loadedmetadata?g.media.currentTime:g.nextLoadPosition;var l=g.mediaBuffer?g.mediaBuffer:g.media,n=m["default"].bufferInfo(l,a,j.maxBufferHole),o=n.len,p=n.end,r=g.fragPrevious,s=j.maxMaxBufferLength,t=g.audioSwitch,u=g.trackId;if(o<s&&u<h.length){if(c=h[u].details,"undefined"==typeof c){g.state=z.WAITING_TRACK;break}if(!t&&!c.live&&r&&r.sn===c.endSN&&(!g.media.seeking||g.media.duration-p<r.duration/2)){g.hls.trigger(q["default"].BUFFER_EOS,{type:"audio"}),g.state=z.ENDED;break}var v=c.fragments,w=v.length,A=v[0].start,B=v[w-1].start+v[w-1].duration,C=void 0;if(t)if(c.live&&!c.PTSKnown)y.logger.log("switching audiotrack, live stream, unknown PTS,load first fragment"),p=0;else if(p=a,c.PTSKnown&&a<A){if(!(n.end>A||n.nextStart))return{v:void 0};y.logger.log("alt audio track ahead of main track, seek to start of alt audio track"),g.media.currentTime=A+.05}if(p<=A){if(C=v[0],c.live&&C.loadIdx&&C.loadIdx===g.fragLoadIdx){var D=n.nextStart?n.nextStart:A;return y.logger.log("no alt audio available @currentTime:"+g.media.currentTime+", seeking @"+(D+.05)),g.media.currentTime=D+.05,{v:void 0}}}else!function(){var a=void 0,b=j.maxFragLookUpTolerance;p<B?(p>B-b&&(b=0),a=k["default"].search(v,function(a){return a.start+a.duration-b<=p?1:a.start-b>p?-1:0}),a||y.logger.log("frag not found @bufferEnd/start:"+p+"/"+A)):a=v[w-1],a&&(C=a,A=a.start,r&&C.level===r.level&&C.sn===r.sn&&(C.sn<c.endSN?(C=v[C.sn+1-c.startSN],y.logger.log("SN just loaded, load next one: "+C.sn)):C=null))}();if(C)if(null!=C.decryptdata.uri&&null==C.decryptdata.key)y.logger.log("Loading key for "+C.sn+" of ["+c.startSN+" ,"+c.endSN+"],track "+u),g.state=z.KEY_LOADING,i.trigger(q["default"].KEY_LOADING,{frag:C});else{if(y.logger.log("Loading "+C.sn+" of ["+c.startSN+" ,"+c.endSN+"],track "+u+", currentTime:"+a+",bufferEnd:"+p.toFixed(3)),void 0!==g.fragLoadIdx?g.fragLoadIdx++:g.fragLoadIdx=0,C.loadCounter){C.loadCounter++;var E=j.fragLoadingLoopThreshold;if(C.loadCounter>E&&Math.abs(g.fragLoadIdx-C.loadIdx)<E)return i.trigger(q["default"].ERROR,{type:x.ErrorTypes.MEDIA_ERROR,details:x.ErrorDetails.FRAG_LOOP_LOADING_ERROR,fatal:!1,frag:C}),{v:void 0}}else C.loadCounter=1;C.loadIdx=g.fragLoadIdx,g.fragCurrent=C,g.startFragRequested=!0,g.nextLoadPosition=C.start+C.duration,i.trigger(q["default"].FRAG_LOADING,{frag:C}),g.state=z.FRAG_LOADING}}break;case z.WAITING_TRACK:b=g.tracks[g.trackId],b&&b.details&&(g.state=z.IDLE);break;case z.FRAG_LOADING_WAITING_RETRY:d=performance.now(),e=g.retryDate,l=g.media,f=l&&l.seeking,(!e||d>=e||f)&&(y.logger.log("audioStreamController: retryDate reached, switch back to IDLE state"),g.state=z.IDLE);break;case z.WAITING_INIT_PTS:case z.STOPPED:case z.FRAG_LOADING:case z.PARSING:case z.PARSED:case z.ENDED:}}();if("object"===("undefined"==typeof l?"undefined":h(l)))return l.v}},{key:"onMediaAttached",value:function(a){var b=this.media=this.mediaBuffer=a.media;this.onvseeking=this.onMediaSeeking.bind(this),this.onvended=this.onMediaEnded.bind(this),b.addEventListener("seeking",this.onvseeking),b.addEventListener("ended",this.onvended);var c=this.config;this.tracks&&c.autoStartLoad&&this.startLoad(c.startPosition)}},{key:"onMediaDetaching",value:function(){var a=this.media;a&&a.ended&&(y.logger.log("MSE detaching and video ended, reset startPosition"),this.startPosition=this.lastCurrentTime=0);var b=this.tracks;b&&b.forEach(function(a){a.details&&a.details.fragments.forEach(function(a){a.loadCounter=void 0})}),a&&(a.removeEventListener("seeking",this.onvseeking),a.removeEventListener("ended",this.onvended),this.onvseeking=this.onvseeked=this.onvended=null),this.media=this.mediaBuffer=null,this.loadedmetadata=!1,this.stopLoad()}},{key:"onMediaSeeking",value:function(){this.state===z.ENDED&&(this.state=z.IDLE),this.media&&(this.lastCurrentTime=this.media.currentTime),void 0!==this.fragLoadIdx&&(this.fragLoadIdx+=2*this.config.fragLoadingLoopThreshold),this.tick()}},{key:"onMediaEnded",value:function(){this.startPosition=this.lastCurrentTime=0}},{key:"onAudioTracksUpdated",value:function(a){y.logger.log("audio tracks updated"),this.tracks=a.audioTracks}},{key:"onAudioTrackSwitching",value:function(a){var b=!!a.url;this.trackId=a.id,this.state=z.IDLE,this.fragCurrent=null,this.state=z.PAUSED,this.waitingFragment=null,b?this.timer||(this.timer=setInterval(this.ontick,100)):this.demuxer&&(this.demuxer.destroy(),this.demuxer=null),b&&(this.audioSwitch=!0,this.state=z.IDLE,void 0!==this.fragLoadIdx&&(this.fragLoadIdx+=2*this.config.fragLoadingLoopThreshold)),this.tick()}},{key:"onAudioTrackLoaded",value:function(a){var b=a.details,c=a.id,d=this.tracks[c],e=b.totalduration,f=0;if(y.logger.log("track "+c+" loaded ["+b.startSN+","+b.endSN+"],duration:"+e),b.live){var g=d.details;g&&b.fragments.length>0?(u["default"].mergeDetails(g,b),f=b.fragments[0].start,b.PTSKnown?y.logger.log("live audio playlist sliding:"+f.toFixed(3)):y.logger.log("live audio playlist - outdated PTS, unknown sliding")):(b.PTSKnown=!1,y.logger.log("live audio playlist - first load, unknown sliding"))}else b.PTSKnown=!1;if(d.details=b,!this.startFragRequested){if(this.startPosition===-1){var h=b.startTimeOffset;isNaN(h)?this.startPosition=0:(y.logger.log("start time offset found in playlist, adjust startPosition to "+h),this.startPosition=h)}this.nextLoadPosition=this.startPosition}this.state===z.WAITING_TRACK&&(this.state=z.IDLE),this.tick()}},{key:"onKeyLoaded",value:function(){this.state===z.KEY_LOADING&&(this.state=z.IDLE,this.tick())}},{key:"onFragLoaded",value:function(a){var b=this.fragCurrent;if(this.state===z.FRAG_LOADING&&b&&"audio"===a.frag.type&&a.frag.level===b.level&&a.frag.sn===b.sn){this.state=z.PARSING,this.stats=a.stats;var c=this.tracks[this.trackId],d=c.details,e=d.totalduration,f=b.start,g=b.level,h=b.sn,i=b.cc,j=this.config.defaultAudioCodec||c.audioCodec;this.appended=!1,this.demuxer||(this.demuxer=new o["default"](this.hls,"audio"));var k=this.initPTS[i];if(void 0!==k){this.pendingBuffering=!0,y.logger.log("Demuxing "+h+" of ["+d.startSN+" ,"+d.endSN+"],track "+g);var l=!1;this.demuxer.push(a.payload,j,null,f,i,g,h,e,b.decryptdata,l,k)}else y.logger.log("unknown video PTS for continuity counter "+i+", waiting for video PTS before demuxing audio frag "+h+" of ["+d.startSN+" ,"+d.endSN+"],track "+g),this.waitingFragment=a,this.state=z.WAITING_INIT_PTS}this.fragLoadError=0}},{key:"onFragParsingInitSegment",value:function(a){var b=this.fragCurrent;if(b&&"audio"===a.id&&a.sn===b.sn&&a.level===b.level&&this.state===z.PARSING){var c=a.tracks,d=void 0;if(c.video&&delete c.video,d=c.audio){d.levelCodec="mp4a.40.2",d.id=a.id,this.hls.trigger(q["default"].BUFFER_CODECS,c),y.logger.log("audio track:audio,container:"+d.container+",codecs[level/parsed]=["+d.levelCodec+"/"+d.codec+"]");var e=d.initSegment;if(e){var f={type:"audio",data:e,parent:"audio",content:"initSegment"};this.audioSwitch?this.pendingData=[f]:(this.appended=!0,this.pendingBuffering=!0,this.hls.trigger(q["default"].BUFFER_APPENDING,f))}this.tick()}}}},{key:"onFragParsingData",value:function(a){var b=this,c=this.fragCurrent;c&&"audio"===a.id&&"audio"===a.type&&a.sn===c.sn&&a.level===c.level&&this.state===z.PARSING&&!function(){var c=b.trackId,d=b.tracks[c],e=b.fragCurrent,f=b.hls;y.logger.log("parsed "+a.type+",PTS:["+a.startPTS.toFixed(3)+","+a.endPTS.toFixed(3)+"],DTS:["+a.startDTS.toFixed(3)+"/"+a.endDTS.toFixed(3)+"],nb:"+a.nb),u["default"].updateFragPTSDTS(d.details,e.sn,a.startPTS,a.endPTS);var g=b.audioSwitch,h=b.media,i=!1;if(g&&h)if(h.readyState){var j=h.currentTime;y.logger.log("switching audio track : currentTime:"+j),j>=a.startPTS&&(y.logger.log("switching audio track : flushing all audio"),b.state=z.BUFFER_FLUSHING,f.trigger(q["default"].BUFFER_FLUSHING,{startOffset:0,endOffset:Number.POSITIVE_INFINITY,type:"audio"}),i=!0,b.audioSwitch=!1,f.trigger(q["default"].AUDIO_TRACK_SWITCHED,{id:c}))}else b.audioSwitch=!1,f.trigger(q["default"].AUDIO_TRACK_SWITCHED,{id:c});var k=b.pendingData;b.audioSwitch||([a.data1,a.data2].forEach(function(b){b&&k.push({type:a.type,data:b,parent:"audio",content:"data"})}),!i&&k.length&&(k.forEach(function(a){b.pendingBuffering=!0,b.hls.trigger(q["default"].BUFFER_APPENDING,a)}),b.pendingData=[],b.appended=!0)),b.tick()}()}},{key:"onFragParsed",value:function(a){var b=this.fragCurrent;b&&"audio"===a.id&&a.sn===b.sn&&a.level===b.level&&this.state===z.PARSING&&(this.stats.tparsed=performance.now(),this.state=z.PARSED,this._checkAppendedParsed())}},{key:"onBufferCreated",value:function(a){var b=a.tracks.audio;b&&(this.mediaBuffer=b.buffer,this.loadedmetadata=!0)}},{key:"onBufferAppended",value:function(a){if("audio"===a.parent){var b=this.state;b!==z.PARSING&&b!==z.PARSED||(this.pendingBuffering=a.pending>0,this._checkAppendedParsed())}}},{key:"_checkAppendedParsed",value:function(){if(!(this.state!==z.PARSED||this.appended&&this.pendingBuffering)){var a=this.fragCurrent,b=this.stats,c=this.hls;if(a){this.fragPrevious=a,b.tbuffered=performance.now(),c.trigger(q["default"].FRAG_BUFFERED,{stats:b,frag:a,id:"audio"});var d=this.mediaBuffer?this.mediaBuffer:this.media;y.logger.log("audio buffered : "+w["default"].toString(d.buffered)),this.audioSwitch&&this.appended&&(this.audioSwitch=!1,c.trigger(q["default"].AUDIO_TRACK_SWITCHED,{id:this.trackId})),this.state=z.IDLE}this.tick()}}},{key:"onError",value:function(a){var b=a.frag;if(!b||"audio"===b.type)switch(a.details){case x.ErrorDetails.FRAG_LOAD_ERROR:case x.ErrorDetails.FRAG_LOAD_TIMEOUT:if(!a.fatal){var c=this.fragLoadError;c?c++:c=1;var d=this.config;if(c<=d.fragLoadingMaxRetry){this.fragLoadError=c,b.loadCounter=0;var e=Math.min(Math.pow(2,c-1)*d.fragLoadingRetryDelay,d.fragLoadingMaxRetryTimeout);y.logger.warn("audioStreamController: frag loading failed, retry in "+e+" ms"),this.retryDate=performance.now()+e,this.state=z.FRAG_LOADING_WAITING_RETRY}else y.logger.error("audioStreamController: "+a.details+" reaches max retry, redispatch as fatal ..."),a.fatal=!0,this.hls.trigger(q["default"].ERROR,a),this.state=z.ERROR}break;case x.ErrorDetails.FRAG_LOOP_LOADING_ERROR:case x.ErrorDetails.AUDIO_TRACK_LOAD_ERROR:case x.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT:case x.ErrorDetails.KEY_LOAD_ERROR:case x.ErrorDetails.KEY_LOAD_TIMEOUT:this.state!==z.ERROR&&(this.state=a.fatal?z.ERROR:z.IDLE,y.logger.warn("audioStreamController: "+a.details+" while loading frag,switch to "+this.state+" state ..."))}}},{key:"onBufferFlushed",value:function(){var a=this,b=this.pendingData;b&&b.length?(y.logger.log("appending pending audio data on Buffer Flushed"),b.forEach(function(b){a.hls.trigger(q["default"].BUFFER_APPENDING,b)}),this.appended=!0,this.pendingData=[],this.state=z.PARSED):(this.state=z.IDLE,this.fragPrevious=null,this.tick())}},{key:"state",set:function(a){if(this.state!==a){var b=this.state;this._state=a,y.logger.log("audio stream:"+b+"->"+a)}},get:function(){return this._state}}]),b}(s["default"]);c["default"]=A},{22:22,26:26,27:27,28:28,30:30,31:31,41:41,45:45,46:46}],6:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}Object.defineProperty(c,"__esModule",{value:!0});var h=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d);
}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),i=a(28),j=d(i),k=a(27),l=d(k),m=a(45),n=function(a){function b(a){e(this,b);var c=f(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,a,j["default"].MANIFEST_LOADING,j["default"].MANIFEST_LOADED,j["default"].AUDIO_TRACK_LOADED));return c.ticks=0,c.ontick=c.tick.bind(c),c}return g(b,a),h(b,[{key:"destroy",value:function(){l["default"].prototype.destroy.call(this)}},{key:"tick",value:function(){this.ticks++,1===this.ticks&&(this.doTick(),this.ticks>1&&setTimeout(this.tick,1),this.ticks=0)}},{key:"doTick",value:function(){this.updateTrack(this.trackId)}},{key:"onManifestLoading",value:function(){this.tracks=[],this.trackId=-1}},{key:"onManifestLoaded",value:function(a){var b=this,c=a.audioTracks||[],d=!1;this.tracks=c,this.hls.trigger(j["default"].AUDIO_TRACKS_UPDATED,{audioTracks:c});var e=0;c.forEach(function(a){return a["default"]?(b.audioTrack=e,void(d=!0)):void e++}),d===!1&&c.length&&(m.logger.log("no default audio track defined, use first audio track as default"),this.audioTrack=0)}},{key:"onAudioTrackLoaded",value:function(a){a.id<this.tracks.length&&(m.logger.log("audioTrack "+a.id+" loaded"),this.tracks[a.id].details=a.details,a.details.live&&!this.timer&&(this.timer=setInterval(this.ontick,1e3*a.details.targetduration)),!a.details.live&&this.timer&&(clearInterval(this.timer),this.timer=null))}},{key:"setAudioTrackInternal",value:function(a){if(a>=0&&a<this.tracks.length){this.timer&&(clearInterval(this.timer),this.timer=null),this.trackId=a,m.logger.log("switching to audioTrack "+a);var b=this.tracks[a],c=this.hls,d=b.type,e=b.url,f={id:a,type:d,url:e};c.trigger(j["default"].AUDIO_TRACK_SWITCH,f),c.trigger(j["default"].AUDIO_TRACK_SWITCHING,f);var g=b.details;!e||void 0!==g&&g.live!==!0||(m.logger.log("(re)loading playlist for audioTrack "+a),c.trigger(j["default"].AUDIO_TRACK_LOADING,{url:e,id:a}))}}},{key:"updateTrack",value:function(a){if(a>=0&&a<this.tracks.length){this.timer&&(clearInterval(this.timer),this.timer=null),this.trackId=a,m.logger.log("updating audioTrack "+a);var b=this.tracks[a],c=b.url,d=b.details;!c||void 0!==d&&d.live!==!0||(m.logger.log("(re)loading playlist for audioTrack "+a),this.hls.trigger(j["default"].AUDIO_TRACK_LOADING,{url:c,id:a}))}}},{key:"audioTracks",get:function(){return this.tracks}},{key:"audioTrack",get:function(){return this.trackId},set:function(a){this.trackId===a&&void 0!==this.tracks[a].details||this.setAudioTrackInternal(a)}}]),b}(l["default"]);c["default"]=n},{27:27,28:28,45:45}],7:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}Object.defineProperty(c,"__esModule",{value:!0});var h=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),i=a(28),j=d(i),k=a(27),l=d(k),m=a(45),n=a(26),o=function(a){function b(a){e(this,b);var c=f(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,a,j["default"].MEDIA_ATTACHING,j["default"].MEDIA_DETACHING,j["default"].MANIFEST_PARSED,j["default"].BUFFER_RESET,j["default"].BUFFER_APPENDING,j["default"].BUFFER_CODECS,j["default"].BUFFER_EOS,j["default"].BUFFER_FLUSHING,j["default"].LEVEL_PTS_UPDATED,j["default"].LEVEL_UPDATED));return c._msDuration=null,c._levelDuration=null,c.onsbue=c.onSBUpdateEnd.bind(c),c.onsbe=c.onSBUpdateError.bind(c),c.pendingTracks={},c.tracks={},c}return g(b,a),h(b,[{key:"destroy",value:function(){l["default"].prototype.destroy.call(this)}},{key:"onLevelPtsUpdated",value:function(a){var b=a.type,c=this.tracks.audio;if("audio"===b&&c&&"audio/mpeg"===c.container){var d=this.sourceBuffer.audio,e=Math.abs(d.timestampOffset-a.start);if(e>.1){var f=d.updating;try{d.abort()}catch(g){f=!0,m.logger.warn("can not abort audio buffer: "+g)}f?this.audioTimestampOffset=a.start:(m.logger.warn("change mpeg audio timestamp offset from "+d.timestampOffset+" to "+a.start),d.timestampOffset=a.start)}}}},{key:"onManifestParsed",value:function(a){var b=a.audio,c=a.video,d=0;a.altAudio&&(b||c)&&(d=(b?1:0)+(c?1:0),m.logger.log(d+" sourceBuffer(s) expected")),this.sourceBufferNb=d}},{key:"onMediaAttaching",value:function(a){var b=this.media=a.media;if(b){var c=this.mediaSource=new MediaSource;this.onmso=this.onMediaSourceOpen.bind(this),this.onmse=this.onMediaSourceEnded.bind(this),this.onmsc=this.onMediaSourceClose.bind(this),c.addEventListener("sourceopen",this.onmso),c.addEventListener("sourceended",this.onmse),c.addEventListener("sourceclose",this.onmsc),b.src=URL.createObjectURL(c)}}},{key:"onMediaDetaching",value:function(){m.logger.log("media source detaching");var a=this.mediaSource;if(a){if("open"===a.readyState)try{a.endOfStream()}catch(b){m.logger.warn("onMediaDetaching:"+b.message+" while calling endOfStream")}a.removeEventListener("sourceopen",this.onmso),a.removeEventListener("sourceended",this.onmse),a.removeEventListener("sourceclose",this.onmsc),this.media&&(URL.revokeObjectURL(this.media.src),this.media.removeAttribute("src"),this.media.load()),this.mediaSource=null,this.media=null,this.pendingTracks={},this.tracks={},this.sourceBuffer={},this.flushRange=[],this.segments=[],this.appended=0}this.onmso=this.onmse=this.onmsc=null,this.hls.trigger(j["default"].MEDIA_DETACHED)}},{key:"onMediaSourceOpen",value:function(){m.logger.log("media source opened"),this.hls.trigger(j["default"].MEDIA_ATTACHED,{media:this.media});var a=this.mediaSource;a&&a.removeEventListener("sourceopen",this.onmso),this.checkPendingTracks()}},{key:"checkPendingTracks",value:function(){var a=this.pendingTracks,b=Object.keys(a).length;b&&(this.sourceBufferNb<=b||0===this.sourceBufferNb)&&(this.createSourceBuffers(a),this.pendingTracks={},this.doAppending())}},{key:"onMediaSourceClose",value:function(){m.logger.log("media source closed")}},{key:"onMediaSourceEnded",value:function(){m.logger.log("media source ended")}},{key:"onSBUpdateEnd",value:function(){if(this.audioTimestampOffset){var a=this.sourceBuffer.audio;m.logger.warn("change mpeg audio timestamp offset from "+a.timestampOffset+" to "+this.audioTimestampOffset),a.timestampOffset=this.audioTimestampOffset,delete this.audioTimestampOffset}this._needsFlush&&this.doFlush(),this._needsEos&&this.checkEos(),this.appending=!1;var b=this.parent,c=this.segments.reduce(function(a,c){return c.parent===b?a+1:a},0);this.hls.trigger(j["default"].BUFFER_APPENDED,{parent:b,pending:c}),this._needsFlush||this.doAppending(),this.updateMediaElementDuration()}},{key:"onSBUpdateError",value:function(a){m.logger.error("sourceBuffer error:"+a),this.hls.trigger(j["default"].ERROR,{type:n.ErrorTypes.MEDIA_ERROR,details:n.ErrorDetails.BUFFER_APPENDING_ERROR,fatal:!1})}},{key:"onBufferReset",value:function(){var a=this.sourceBuffer;for(var b in a){var c=a[b];try{this.mediaSource.removeSourceBuffer(c),c.removeEventListener("updateend",this.onsbue),c.removeEventListener("error",this.onsbe)}catch(d){}}this.sourceBuffer={},this.flushRange=[],this.segments=[],this.appended=0}},{key:"onBufferCodecs",value:function(a){if(0===Object.keys(this.sourceBuffer).length){for(var b in a)this.pendingTracks[b]=a[b];var c=this.mediaSource;c&&"open"===c.readyState&&this.checkPendingTracks()}}},{key:"createSourceBuffers",value:function(a){var b=this.sourceBuffer,c=this.mediaSource;for(var d in a)if(!b[d]){var e=a[d],f=e.levelCodec||e.codec,g=e.container+";codecs="+f;m.logger.log("creating sourceBuffer("+g+")");try{var h=b[d]=c.addSourceBuffer(g);h.addEventListener("updateend",this.onsbue),h.addEventListener("error",this.onsbe),this.tracks[d]={codec:f,container:e.container},e.buffer=h}catch(i){m.logger.error("error while trying to add sourceBuffer:"+i.message),this.hls.trigger(j["default"].ERROR,{type:n.ErrorTypes.MEDIA_ERROR,details:n.ErrorDetails.BUFFER_ADD_CODEC_ERROR,fatal:!1,err:i,mimeType:g})}}this.hls.trigger(j["default"].BUFFER_CREATED,{tracks:a})}},{key:"onBufferAppending",value:function(a){this._needsFlush||(this.segments?this.segments.push(a):this.segments=[a],this.doAppending())}},{key:"onBufferAppendFail",value:function(a){m.logger.error("sourceBuffer error:",a.event),this.hls.trigger(j["default"].ERROR,{type:n.ErrorTypes.MEDIA_ERROR,details:n.ErrorDetails.BUFFER_APPENDING_ERROR,fatal:!1,frag:this.fragCurrent})}},{key:"onBufferEos",value:function(a){var b=this.sourceBuffer,c=a.type;for(var d in b)c&&d!==c||b[d].ended||(b[d].ended=!0,m.logger.log(d+" sourceBuffer now EOS"));this.checkEos()}},{key:"checkEos",value:function(){var a=this.sourceBuffer,b=this.mediaSource;if(!b||"open"!==b.readyState)return void(this._needsEos=!1);for(var c in a){var d=a[c];if(!d.ended)return;if(d.updating)return void(this._needsEos=!0)}m.logger.log("all media data available, signal endOfStream() to MediaSource and stop loading fragment");try{b.endOfStream()}catch(e){m.logger.warn("exception while calling mediaSource.endOfStream()")}this._needsEos=!1}},{key:"onBufferFlushing",value:function(a){this.flushRange.push({start:a.startOffset,end:a.endOffset,type:a.type}),this.flushBufferCounter=0,this.doFlush()}},{key:"onLevelUpdated",value:function(a){var b=a.details;0!==b.fragments.length&&(this._levelDuration=b.totalduration+b.fragments[0].start,this.updateMediaElementDuration())}},{key:"updateMediaElementDuration",value:function(){var a=this.media,b=this.mediaSource,c=this.sourceBuffer,d=this._levelDuration;if(null!==d&&a&&b&&c&&0!==a.readyState&&"open"===b.readyState){for(var e in c)if(c[e].updating)return;null===this._msDuration&&(this._msDuration=b.duration);var f=a.duration;(d>this._msDuration&&d>f||f===1/0||isNaN(f))&&(m.logger.log("Updating mediasource duration to "+d.toFixed(3)),this._msDuration=b.duration=d)}}},{key:"doFlush",value:function(){for(;this.flushRange.length;){var a=this.flushRange[0];if(!this.flushBuffer(a.start,a.end,a.type))return void(this._needsFlush=!0);this.flushRange.shift(),this.flushBufferCounter=0}if(0===this.flushRange.length){this._needsFlush=!1;var b=0,c=this.sourceBuffer;try{for(var d in c)b+=c[d].buffered.length}catch(e){m.logger.error("error while accessing sourceBuffer.buffered")}this.appended=b,this.hls.trigger(j["default"].BUFFER_FLUSHED)}}},{key:"doAppending",value:function(){var a=this.hls,b=this.sourceBuffer,c=this.segments;if(Object.keys(b).length){if(this.media.error)return this.segments=[],void m.logger.error("trying to append although a media error occured, flush segment and abort");if(this.appending)return;if(c&&c.length){var d=c.shift();try{var e=d.type,f=b[e];f?f.updating?c.unshift(d):(f.ended=!1,this.parent=d.parent,f.appendBuffer(d.data),this.appendError=0,this.appended++,this.appending=!0):this.onSBUpdateEnd()}catch(g){m.logger.error("error while trying to append buffer:"+g.message),c.unshift(d);var h={type:n.ErrorTypes.MEDIA_ERROR};if(22===g.code)return this.segments=[],h.details=n.ErrorDetails.BUFFER_FULL_ERROR,h.fatal=!1,void a.trigger(j["default"].ERROR,h);if(this.appendError?this.appendError++:this.appendError=1,h.details=n.ErrorDetails.BUFFER_APPEND_ERROR,h.frag=this.fragCurrent,this.appendError>a.config.appendErrorMaxRetry)return m.logger.log("fail "+a.config.appendErrorMaxRetry+" times to append segment in sourceBuffer"),c=[],h.fatal=!0,void a.trigger(j["default"].ERROR,h);h.fatal=!1,a.trigger(j["default"].ERROR,h)}}}}},{key:"flushBuffer",value:function(a,b,c){var d,e,f,g,h,i,j=this.sourceBuffer;if(Object.keys(j).length){if(m.logger.log("flushBuffer,pos/start/end: "+this.media.currentTime.toFixed(3)+"/"+a+"/"+b),this.flushBufferCounter<this.appended){for(var k in j)if(!c||k===c){if(d=j[k],d.ended=!1,d.updating)return m.logger.warn("cannot flush, sb updating in progress"),!1;try{for(e=0;e<d.buffered.length;e++)if(f=d.buffered.start(e),g=d.buffered.end(e),navigator.userAgent.toLowerCase().indexOf("firefox")!==-1&&b===Number.POSITIVE_INFINITY?(h=a,i=b):(h=Math.max(f,a),i=Math.min(g,b)),Math.min(i,g)-h>.5)return this.flushBufferCounter++,m.logger.log("flush "+k+" ["+h+","+i+"], of ["+f+","+g+"], pos:"+this.media.currentTime),d.remove(h,i),!1}catch(l){m.logger.warn("exception while accessing sourcebuffer, it might have been removed from MediaSource")}}}else m.logger.warn("abort flushing too many retries");m.logger.log("buffer flushed")}return!0}}]),b}(l["default"]);c["default"]=o},{26:26,27:27,28:28,45:45}],8:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}Object.defineProperty(c,"__esModule",{value:!0});var h=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),i=a(28),j=d(i),k=a(27),l=d(k),m=function(a){function b(a){return e(this,b),f(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,a,j["default"].FPS_DROP_LEVEL_CAPPING,j["default"].MEDIA_ATTACHING,j["default"].MANIFEST_PARSED))}return g(b,a),h(b,[{key:"destroy",value:function(){this.hls.config.capLevelToPlayerSize&&(this.media=this.restrictedLevels=null,this.autoLevelCapping=Number.POSITIVE_INFINITY,this.timer&&(this.timer=clearInterval(this.timer)))}},{key:"onFpsDropLevelCapping",value:function(a){this.restrictedLevels||(this.restrictedLevels=[]),this.isLevelRestricted(a.droppedLevel)||this.restrictedLevels.push(a.droppedLevel)}},{key:"onMediaAttaching",value:function(a){this.media=a.media instanceof HTMLVideoElement?a.media:null}},{key:"onManifestParsed",value:function(a){var b=this.hls;b.config.capLevelToPlayerSize&&(this.autoLevelCapping=Number.POSITIVE_INFINITY,this.levels=a.levels,b.firstLevel=this.getMaxLevel(a.firstLevel),clearInterval(this.timer),this.timer=setInterval(this.detectPlayerSize.bind(this),1e3),this.detectPlayerSize())}},{key:"detectPlayerSize",value:function(){if(this.media){var a=this.levels?this.levels.length:0;if(a){var b=this.hls;b.autoLevelCapping=this.getMaxLevel(a-1),b.autoLevelCapping>this.autoLevelCapping&&b.streamController.nextLevelSwitch(),this.autoLevelCapping=b.autoLevelCapping}}}},{key:"getMaxLevel",value:function(a){var b=0,c=void 0,d=void 0,e=this.mediaWidth,f=this.mediaHeight,g=0,h=0;for(c=0;c<=a&&(d=this.levels[c],!this.isLevelRestricted(c))&&(b=c,g=d.width,h=d.height,!(e<=g||f<=h));c++);return b}},{key:"isLevelRestricted",value:function(a){return!(!this.restrictedLevels||this.restrictedLevels.indexOf(a)===-1)}},{key:"contentScaleFactor",get:function(){var a=1;try{a=window.devicePixelRatio}catch(b){}return a}},{key:"mediaWidth",get:function(){var a=void 0,b=this.media;return b&&(a=b.width||b.clientWidth||b.offsetWidth,a*=this.contentScaleFactor),a}},{key:"mediaHeight",get:function(){var a=void 0,b=this.media;return b&&(a=b.height||b.clientHeight||b.offsetHeight,a*=this.contentScaleFactor),a}}]),b}(l["default"]);c["default"]=m},{27:27,28:28}],9:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=a(44),h=d(g),i=function(){function a(b,c,d,f){e(this,a),this.hls=b,this.defaultEstimate_=f,this.minWeight_=.001,this.minDelayMs_=50,this.slow_=new h["default"](c),this.fast_=new h["default"](d)}return f(a,[{key:"sample",value:function(a,b){a=Math.max(a,this.minDelayMs_);var c=8e3*b/a,d=a/1e3;this.fast_.sample(d,c),this.slow_.sample(d,c)}},{key:"canEstimate",value:function(){var a=this.fast_;return a&&a.getTotalWeight()>=this.minWeight_}},{key:"getEstimate",value:function(){return this.canEstimate()?Math.min(this.fast_.getEstimate(),this.slow_.getEstimate()):this.defaultEstimate_}},{key:"destroy",value:function(){}}]),a}();c["default"]=i},{44:44}],10:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}Object.defineProperty(c,"__esModule",{value:!0});var h=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),i=a(28),j=d(i),k=a(27),l=d(k),m=a(45),n=function(a){function b(a){return e(this,b),f(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,a,j["default"].MEDIA_ATTACHING))}return g(b,a),h(b,[{key:"destroy",value:function(){this.timer&&clearInterval(this.timer),this.isVideoPlaybackQualityAvailable=!1}},{key:"onMediaAttaching",value:function(a){var b=this.hls.config;if(b.capLevelOnFPSDrop){var c=this.video=a.media instanceof HTMLVideoElement?a.media:null;"function"==typeof c.getVideoPlaybackQuality&&(this.isVideoPlaybackQualityAvailable=!0),clearInterval(this.timer),this.timer=setInterval(this.checkFPSInterval.bind(this),b.fpsDroppedMonitoringPeriod)}}},{key:"checkFPS",value:function(a,b,c){var d=performance.now();if(b){if(this.lastTime){var e=d-this.lastTime,f=c-this.lastDroppedFrames,g=b-this.lastDecodedFrames,h=1e3*f/e,i=this.hls;if(i.trigger(j["default"].FPS_DROP,{currentDropped:f,currentDecoded:g,totalDroppedFrames:c}),h>0&&f>i.config.fpsDroppedMonitoringThreshold*g){var k=i.currentLevel;m.logger.warn("drop FPS ratio greater than max allowed value for currentLevel: "+k),k>0&&(i.autoLevelCapping===-1||i.autoLevelCapping>=k)&&(k-=1,i.trigger(j["default"].FPS_DROP_LEVEL_CAPPING,{level:k,droppedLevel:i.currentLevel}),i.autoLevelCapping=k,i.streamController.nextLevelSwitch())}}this.lastTime=d,this.lastDroppedFrames=c,this.lastDecodedFrames=b}}},{key:"checkFPSInterval",value:function(){var a=this.video;if(a)if(this.isVideoPlaybackQualityAvailable){var b=a.getVideoPlaybackQuality();this.checkFPS(a,b.totalVideoFrames,b.droppedVideoFrames)}else this.checkFPS(a,a.webkitDecodedFrameCount,a.webkitDroppedFrameCount)}}]),b}(l["default"]);c["default"]=n},{27:27,28:28,45:45}],11:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}Object.defineProperty(c,"__esModule",{value:!0});var h=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),i=a(28),j=d(i),k=a(27),l=d(k),m=a(45),n=a(26),o=a(30),p=d(o),q=function(a){function b(a){e(this,b);var c=f(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,a,j["default"].MANIFEST_LOADED,j["default"].LEVEL_LOADED,j["default"].FRAG_LOADED,j["default"].ERROR));return c.ontick=c.tick.bind(c),c._manualLevel=c._autoLevelCapping=-1,c}return g(b,a),h(b,[{key:"destroy",value:function(){this.timer&&(clearTimeout(this.timer),this.timer=null),this._manualLevel=-1}},{key:"startLoad",value:function(){this.canload=!0;var a=this._levels;a&&a.forEach(function(a){a.loadError=0;var b=a.details;b&&b.live&&(a.details=void 0)}),this.timer&&this.tick()}},{key:"stopLoad",value:function(){this.canload=!1}},{key:"onManifestLoaded",value:function(a){var b,c=[],d=[],e={},f=!1,g=!1,h=this.hls,i=/chrome|firefox/.test(navigator.userAgent.toLowerCase()),k=function(a,b){return MediaSource.isTypeSupported(a+"/mp4;codecs="+b)};if(a.levels.forEach(function(a){a.videoCodec&&(f=!0),i&&a.audioCodec&&a.audioCodec.indexOf("mp4a.40.34")!==-1&&(a.audioCodec=void 0),(a.audioCodec||a.attrs&&a.attrs.AUDIO)&&(g=!0);var b=e[a.bitrate];void 0===b?(e[a.bitrate]=c.length,a.url=[a.url],a.urlId=0,c.push(a)):c[b].url.push(a.url)}),f&&g?c.forEach(function(a){a.videoCodec&&d.push(a)}):d=c,d=d.filter(function(a){var b=a.audioCodec,c=a.videoCodec;return(!b||k("audio",b))&&(!c||k("video",c))}),d.length){b=d[0].bitrate,d.sort(function(a,b){return a.bitrate-b.bitrate}),this._levels=d;for(var l=0;l<d.length;l++)if(d[l].bitrate===b){this._firstLevel=l,m.logger.log("manifest loaded,"+d.length+" level(s) found, first bitrate:"+b);break}h.trigger(j["default"].MANIFEST_PARSED,{levels:d,firstLevel:this._firstLevel,stats:a.stats,audio:g,video:f,altAudio:a.audioTracks.length>0})}else h.trigger(j["default"].ERROR,{type:n.ErrorTypes.MEDIA_ERROR,details:n.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR,fatal:!0,url:h.url,reason:"no level with compatible codecs found in manifest"})}},{key:"setLevelInternal",value:function(a){var b=this._levels;if(a>=0&&a<b.length){this.timer&&(clearTimeout(this.timer),this.timer=null),this._level!==a&&(m.logger.log("switching to level "+a),this._level=a,this.hls.trigger(j["default"].LEVEL_SWITCH,{level:a}));var c=b[a],d=c.details;if(!d||d.live===!0){var e=c.urlId;this.hls.trigger(j["default"].LEVEL_LOADING,{url:c.url[e],level:a,id:e})}}else this.hls.trigger(j["default"].ERROR,{type:n.ErrorTypes.OTHER_ERROR,details:n.ErrorDetails.LEVEL_SWITCH_ERROR,level:a,fatal:!1,reason:"invalid level idx"})}},{key:"onError",value:function(a){if(!a.fatal){var b=a.details,c=this.hls,d=void 0,e=void 0,f=!1,g=c.abrController,h=g.minAutoLevel;switch(b){case n.ErrorDetails.FRAG_LOAD_ERROR:case n.ErrorDetails.FRAG_LOAD_TIMEOUT:case n.ErrorDetails.FRAG_LOOP_LOADING_ERROR:case n.ErrorDetails.KEY_LOAD_ERROR:case n.ErrorDetails.KEY_LOAD_TIMEOUT:d=a.frag.level;break;case n.ErrorDetails.LEVEL_LOAD_ERROR:case n.ErrorDetails.LEVEL_LOAD_TIMEOUT:d=a.context.level,f=!0;break;case n.ErrorDetails.REMUX_ALLOC_ERROR:d=a.level}if(void 0!==d){e=this._levels[d],e.loadError?e.loadError++:e.loadError=1;var i=e.url.length;if(i>1&&e.loadError<i)e.urlId=(e.urlId+1)%i,e.details=void 0,m.logger.warn("level controller,"+b+" for level "+d+": switching to redundant stream id "+e.urlId);else{var k=this._manualLevel===-1&&d;if(k)m.logger.warn("level controller,"+b+": switch-down for next fragment"),g.nextAutoLevel=Math.max(h,d-1);else if(e&&e.details&&e.details.live)m.logger.warn("level controller,"+b+" on live stream, discard"),f&&(this._level=void 0);else if(b===n.ErrorDetails.LEVEL_LOAD_ERROR||b===n.ErrorDetails.LEVEL_LOAD_TIMEOUT){var l=c.media,o=l&&p["default"].isBuffered(l,l.currentTime)&&p["default"].isBuffered(l,l.currentTime+.5);if(o){var q=c.config.levelLoadingRetryDelay;m.logger.warn("level controller,"+b+", but media buffered, retry in "+q+"ms"),this.timer=setTimeout(this.ontick,q)}else m.logger.error("cannot recover "+b+" error"),this._level=void 0,this.timer&&(clearTimeout(this.timer),this.timer=null),a.fatal=!0,c.trigger(j["default"].ERROR,a)}}}}}},{key:"onFragLoaded",value:function(a){var b=a.frag;if(b&&"main"===b.type){var c=this._levels[b.level];c&&(c.loadError=0)}}},{key:"onLevelLoaded",value:function(a){var b=a.level;if(b===this._level){var c=this._levels[b];c.loadError=0;var d=a.details;if(d.live){var e=1e3*(d.averagetargetduration?d.averagetargetduration:d.targetduration),f=c.details;f&&d.endSN===f.endSN&&(e/=2,m.logger.log("same live playlist, reload twice faster")),e-=performance.now()-a.stats.trequest,e=Math.max(1e3,Math.round(e)),m.logger.log("live playlist, reload in "+e+" ms"),this.timer=setTimeout(this.ontick,e)}else this.timer=null}}},{key:"tick",value:function(){var a=this._level;if(void 0!==a&&this.canload){var b=this._levels[a],c=b.urlId;this.hls.trigger(j["default"].LEVEL_LOADING,{url:b.url[c],level:a,id:c})}}},{key:"levels",get:function(){return this._levels}},{key:"level",get:function(){return this._level},set:function(a){var b=this._levels;b&&b.length>a&&(this._level===a&&void 0!==b[a].details||this.setLevelInternal(a))}},{key:"manualLevel",get:function(){return this._manualLevel},set:function(a){this._manualLevel=a,void 0===this._startLevel&&(this._startLevel=a),a!==-1&&(this.level=a)}},{key:"firstLevel",get:function(){return this._firstLevel},set:function(a){this._firstLevel=a}},{key:"startLevel",get:function(){if(void 0===this._startLevel){var a=this.hls.config.startLevel;return void 0!==a?a:this._firstLevel}return this._startLevel},set:function(a){a!==-1&&(a=Math.max(a,this.hls.abrController.minAutoLevel)),this._startLevel=a}},{key:"nextLoadLevel",get:function(){return this._manualLevel!==-1?this._manualLevel:this.hls.abrController.nextAutoLevel},set:function(a){this.level=a,this._manualLevel===-1&&(this.hls.abrController.nextAutoLevel=a)}}]),b}(l["default"]);c["default"]=q},{26:26,27:27,28:28,30:30,45:45}],12:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}Object.defineProperty(c,"__esModule",{value:!0});var h=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),i=a(41),j=d(i),k=a(30),l=d(k),m=a(22),n=d(m),o=a(28),p=d(o),q=a(27),r=d(q),s=a(31),t=d(s),u=a(46),v=d(u),w=a(26),x=a(45),y={STOPPED:"STOPPED",IDLE:"IDLE",KEY_LOADING:"KEY_LOADING",FRAG_LOADING:"FRAG_LOADING",FRAG_LOADING_WAITING_RETRY:"FRAG_LOADING_WAITING_RETRY",WAITING_LEVEL:"WAITING_LEVEL",PARSING:"PARSING",PARSED:"PARSED",BUFFER_FLUSHING:"BUFFER_FLUSHING",ENDED:"ENDED",ERROR:"ERROR"},z=function(a){function b(a){e(this,b);var c=f(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,a,p["default"].MEDIA_ATTACHED,p["default"].MEDIA_DETACHING,p["default"].MANIFEST_LOADING,p["default"].MANIFEST_PARSED,p["default"].LEVEL_LOADED,p["default"].KEY_LOADED,p["default"].FRAG_LOADED,p["default"].FRAG_LOAD_EMERGENCY_ABORTED,p["default"].FRAG_PARSING_INIT_SEGMENT,p["default"].FRAG_PARSING_DATA,p["default"].FRAG_PARSED,p["default"].ERROR,p["default"].AUDIO_TRACK_SWITCHING,p["default"].AUDIO_TRACK_SWITCHED,p["default"].BUFFER_CREATED,p["default"].BUFFER_APPENDED,p["default"].BUFFER_FLUSHED));return c.config=a.config,c.audioCodecSwap=!1,c.ticks=0,c._state=y.STOPPED,c.ontick=c.tick.bind(c),c}return g(b,a),h(b,[{key:"destroy",value:function(){this.stopLoad(),this.timer&&(clearInterval(this.timer),this.timer=null),r["default"].prototype.destroy.call(this),this.state=y.STOPPED}},{key:"startLoad",value:function(a){if(this.levels){var b=this.lastCurrentTime,c=this.hls;if(this.stopLoad(),this.timer||(this.timer=setInterval(this.ontick,100)),this.level=-1,this.fragLoadError=0,!this.startFragRequested){var d=c.startLevel;d===-1&&(d=0,this.bitrateTest=!0),this.level=c.nextLoadLevel=d,this.loadedmetadata=!1}b>0&&a===-1&&(x.logger.log("override startPosition with lastCurrentTime @"+b.toFixed(3)),a=b),this.state=y.IDLE,this.nextLoadPosition=this.startPosition=this.lastCurrentTime=a,this.tick()}else x.logger.warn("cannot start loading as manifest not parsed yet"),this.state=y.STOPPED}},{key:"stopLoad",value:function(){var a=this.fragCurrent;a&&(a.loader&&a.loader.abort(),this.fragCurrent=null),this.fragPrevious=null,this.demuxer&&(this.demuxer.destroy(),this.demuxer=null),this.state=y.STOPPED}},{key:"tick",value:function(){this.ticks++,1===this.ticks&&(this.doTick(),this.ticks>1&&setTimeout(this.tick,1),this.ticks=0)}},{key:"doTick",value:function(){switch(this.state){case y.ERROR:break;case y.BUFFER_FLUSHING:this.fragLoadError=0;break;case y.IDLE:if(!this._doTickIdle())return;break;case y.WAITING_LEVEL:var a=this.levels[this.level];a&&a.details&&(this.state=y.IDLE);break;case y.FRAG_LOADING_WAITING_RETRY:var b=performance.now(),c=this.retryDate;(!c||b>=c||this.media&&this.media.seeking)&&(x.logger.log("mediaController: retryDate reached, switch back to IDLE state"),this.state=y.IDLE);break;case y.ERROR:case y.STOPPED:case y.FRAG_LOADING:case y.PARSING:case y.PARSED:case y.ENDED:}this._checkBuffer(),this._checkFragmentChanged()}},{key:"_doTickIdle",value:function(){var a=this.hls,b=a.config,c=this.media;if(void 0!==this.levelLastLoaded&&!c&&(this.startFragRequested||!b.startFragPrefetch))return!0;var d=void 0;d=this.loadedmetadata?c.currentTime:this.nextLoadPosition;var e=a.nextLoadLevel,f=this.levels[e],g=f.bitrate,h=void 0;h=g?Math.max(8*b.maxBufferSize/g,b.maxBufferLength):b.maxBufferLength,h=Math.min(h,b.maxMaxBufferLength);var i=l["default"].bufferInfo(this.mediaBuffer?this.mediaBuffer:c,d,b.maxBufferHole),j=i.len;if(j>=h)return!0;x.logger.trace("buffer length of "+j.toFixed(3)+" is below max of "+h.toFixed(3)+". checking for more payload ..."),this.level=a.nextLoadLevel=e;var k=f.details;if("undefined"==typeof k||k.live&&this.levelLastLoaded!==e)return this.state=y.WAITING_LEVEL,!0;var m=this.fragPrevious;if(!k.live&&m&&m.sn===k.endSN&&c.duration-Math.max(i.end,m.start)<=Math.max(.2,m.duration/2)){var n={};return this.altAudio&&(n.type="video"),this.hls.trigger(p["default"].BUFFER_EOS,n),this.state=y.ENDED,!0}return this._fetchPayloadOrEos(d,i,k)}},{key:"_fetchPayloadOrEos",value:function(a,b,c){var d=this.fragPrevious,e=this.level,f=c.fragments,g=f.length;if(0===g)return!1;var h=f[0].start,i=f[g-1].start+f[g-1].duration,j=b.end,k=void 0;if(c.live){var l=this.config.initialLiveManifestSize;if(g<l)return x.logger.warn("Can not start playback of a level, reason: not enough fragments "+g+" < "+l),!1;if(k=this._ensureFragmentAtLivePoint(c,j,h,i,d,f,g),null===k)return!1}else j<h&&(k=f[0]);return k||(k=this._findFragment(h,d,g,f,j,i,c)),!k||this._loadFragmentOrKey(k,e,c,a,j);
}},{key:"_ensureFragmentAtLivePoint",value:function(a,b,c,d,e,f,g){var h=this.hls.config,i=this.media,j=void 0,k=void 0!==h.liveMaxLatencyDuration?h.liveMaxLatencyDuration:h.liveMaxLatencyDurationCount*a.targetduration;if(b<Math.max(c-h.maxFragLookUpTolerance,d-k)){var l=this.liveSyncPosition=this.computeLivePosition(c,a);x.logger.log("buffer end: "+b.toFixed(3)+" is located too far from the end of live sliding playlist, reset currentTime to : "+l.toFixed(3)),b=l,i&&i.readyState&&i.duration>l&&(i.currentTime=l)}if(a.PTSKnown&&b>d&&i&&i.readyState)return null;if(this.startFragRequested&&!a.PTSKnown){if(e){var m=e.sn+1;m>=a.startSN&&m<=a.endSN&&(j=f[m-a.startSN],x.logger.log("live playlist, switching playlist, load frag with next SN: "+j.sn))}j||(j=f[Math.min(g-1,Math.round(g/2))],x.logger.log("live playlist, switching playlist, unknown, load middle frag : "+j.sn))}return j}},{key:"_findFragment",value:function(a,b,c,d,e,f,g){var h=this.hls.config,i=void 0,k=void 0,l=h.maxFragLookUpTolerance;if(e<f?(e>f-l&&(l=0),k=j["default"].search(d,function(a){return a.start+a.duration-l<=e?1:a.start-l>e&&a.start?-1:0})):k=d[c-1],k&&(i=k,a=k.start,b&&i.level===b.level&&i.sn===b.sn))if(i.sn<g.endSN){var m=b.deltaPTS,n=i.sn-g.startSN;m&&m>h.maxBufferHole&&b.dropped&&n?(i=d[n-1],x.logger.warn("SN just loaded, with large PTS gap between audio and video, maybe frag is not starting with a keyframe ? load previous one to try to overcome this"),b.loadCounter--):(i=d[n+1],x.logger.log("SN just loaded, load next one: "+i.sn))}else i=null;return i}},{key:"_loadFragmentOrKey",value:function(a,b,c,d,e){var f=this.hls,g=f.config;if(null==a.decryptdata.uri||null!=a.decryptdata.key){if(x.logger.log("Loading "+a.sn+" of ["+c.startSN+" ,"+c.endSN+"],level "+b+", currentTime:"+d.toFixed(3)+",bufferEnd:"+e.toFixed(3)),void 0!==this.fragLoadIdx?this.fragLoadIdx++:this.fragLoadIdx=0,a.loadCounter){a.loadCounter++;var h=g.fragLoadingLoopThreshold;if(a.loadCounter>h&&Math.abs(this.fragLoadIdx-a.loadIdx)<h)return f.trigger(p["default"].ERROR,{type:w.ErrorTypes.MEDIA_ERROR,details:w.ErrorDetails.FRAG_LOOP_LOADING_ERROR,fatal:!1,frag:a}),!1}else a.loadCounter=1;return a.loadIdx=this.fragLoadIdx,this.fragCurrent=a,this.startFragRequested=!0,this.nextLoadPosition=a.start+a.duration,a.autoLevel=f.autoLevelEnabled,a.bitrateTest=this.bitrateTest,f.trigger(p["default"].FRAG_LOADING,{frag:a}),this.demuxer||(this.demuxer=new n["default"](f,"main")),this.state=y.FRAG_LOADING,!0}x.logger.log("Loading key for "+a.sn+" of ["+c.startSN+" ,"+c.endSN+"],level "+b),this.state=y.KEY_LOADING,f.trigger(p["default"].KEY_LOADING,{frag:a})}},{key:"getBufferRange",value:function(a){return j["default"].search(this.bufferRange,function(b){return a<b.start?-1:a>b.end?1:0})}},{key:"followingBufferRange",value:function(a){return a?this.getBufferRange(a.end+.5):null}},{key:"_checkFragmentChanged",value:function(){var a,b,c=this.media;if(c&&c.readyState&&c.seeking===!1&&(b=c.currentTime,b>c.playbackRate*this.lastCurrentTime&&(this.lastCurrentTime=b),l["default"].isBuffered(c,b)?a=this.getBufferRange(b):l["default"].isBuffered(c,b+.1)&&(a=this.getBufferRange(b+.1)),a)){var d=a.frag;d!==this.fragPlaying&&(this.fragPlaying=d,this.hls.trigger(p["default"].FRAG_CHANGED,{frag:d}))}}},{key:"immediateLevelSwitch",value:function(){if(x.logger.log("immediateLevelSwitch"),!this.immediateSwitch){this.immediateSwitch=!0;var a=this.media,b=void 0;a?(b=a.paused,a.pause()):b=!0,this.previouslyPaused=b}var c=this.fragCurrent;c&&c.loader&&c.loader.abort(),this.fragCurrent=null,this.fragLoadIdx+=2*this.config.fragLoadingLoopThreshold,this.flushMainBuffer(0,Number.POSITIVE_INFINITY)}},{key:"immediateLevelSwitchEnd",value:function(){var a=this.media;a&&a.buffered.length&&(this.immediateSwitch=!1,l["default"].isBuffered(a,a.currentTime)&&(a.currentTime-=1e-4),this.previouslyPaused||a.play())}},{key:"nextLevelSwitch",value:function(){var a=this.media;if(a&&a.readyState){var b=void 0,c=void 0,d=void 0;if(this.fragLoadIdx+=2*this.config.fragLoadingLoopThreshold,c=this.getBufferRange(a.currentTime),c&&c.start>1&&this.flushMainBuffer(0,c.start-1),a.paused)b=0;else{var e=this.hls.nextLoadLevel,f=this.levels[e],g=this.fragLastKbps;b=g&&this.fragCurrent?this.fragCurrent.duration*f.bitrate/(1e3*g)+1:0}if(d=this.getBufferRange(a.currentTime+b),d&&(d=this.followingBufferRange(d))){var h=this.fragCurrent;h&&h.loader&&h.loader.abort(),this.fragCurrent=null,this.flushMainBuffer(d.start,Number.POSITIVE_INFINITY)}}}},{key:"flushMainBuffer",value:function(a,b){this.state=y.BUFFER_FLUSHING;var c={startOffset:a,endOffset:b};this.altAudio&&(c.type="video"),this.hls.trigger(p["default"].BUFFER_FLUSHING,c)}},{key:"onMediaAttached",value:function(a){var b=this.media=this.mediaBuffer=a.media;this.onvseeking=this.onMediaSeeking.bind(this),this.onvseeked=this.onMediaSeeked.bind(this),this.onvended=this.onMediaEnded.bind(this),b.addEventListener("seeking",this.onvseeking),b.addEventListener("seeked",this.onvseeked),b.addEventListener("ended",this.onvended);var c=this.config;this.levels&&c.autoStartLoad&&this.hls.startLoad(c.startPosition)}},{key:"onMediaDetaching",value:function(){var a=this.media;a&&a.ended&&(x.logger.log("MSE detaching and video ended, reset startPosition"),this.startPosition=this.lastCurrentTime=0);var b=this.levels;b&&b.forEach(function(a){a.details&&a.details.fragments.forEach(function(a){a.loadCounter=void 0})}),a&&(a.removeEventListener("seeking",this.onvseeking),a.removeEventListener("seeked",this.onvseeked),a.removeEventListener("ended",this.onvended),this.onvseeking=this.onvseeked=this.onvended=null),this.media=this.mediaBuffer=null,this.loadedmetadata=!1,this.stopLoad()}},{key:"onMediaSeeking",value:function(){var a=this.media,b=a?a.currentTime:void 0,c=this.config;if(x.logger.log("media seeking to "+b.toFixed(3)),this.state===y.FRAG_LOADING){var d=this.mediaBuffer?this.mediaBuffer:a,e=l["default"].bufferInfo(d,b,this.config.maxBufferHole),f=this.fragCurrent;if(0===e.len&&f){var g=c.maxFragLookUpTolerance,h=f.start-g,i=f.start+f.duration+g;b<h||b>i?(f.loader&&(x.logger.log("seeking outside of buffer while fragment load in progress, cancel fragment load"),f.loader.abort()),this.fragCurrent=null,this.fragPrevious=null,this.state=y.IDLE):x.logger.log("seeking outside of buffer but within currently loaded fragment range")}}else this.state===y.ENDED&&(this.state=y.IDLE);a&&(this.lastCurrentTime=b),this.state!==y.FRAG_LOADING&&void 0!==this.fragLoadIdx&&(this.fragLoadIdx+=2*c.fragLoadingLoopThreshold),this.loadedmetadata||(this.nextLoadPosition=this.startPosition=b),this.tick()}},{key:"onMediaSeeked",value:function(){x.logger.log("media seeked to "+this.media.currentTime.toFixed(3)),this.tick()}},{key:"onMediaEnded",value:function(){x.logger.log("media ended"),this.startPosition=this.lastCurrentTime=0}},{key:"onManifestLoading",value:function(){x.logger.log("trigger BUFFER_RESET"),this.hls.trigger(p["default"].BUFFER_RESET),this.bufferRange=[],this.stalled=!1,this.startPosition=this.lastCurrentTime=0}},{key:"onManifestParsed",value:function(a){var b,c=!1,d=!1;a.levels.forEach(function(a){b=a.audioCodec,b&&(b.indexOf("mp4a.40.2")!==-1&&(c=!0),b.indexOf("mp4a.40.5")!==-1&&(d=!0))}),this.audioCodecSwitch=c&&d,this.audioCodecSwitch&&x.logger.log("both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"),this.levels=a.levels,this.startLevelLoaded=!1,this.startFragRequested=!1;var e=this.config;e.autoStartLoad&&this.hls.startLoad(e.startPosition)}},{key:"onLevelLoaded",value:function(a){var b=a.details,c=a.level,d=this.levels[c],e=b.totalduration,f=0;if(x.logger.log("level "+c+" loaded ["+b.startSN+","+b.endSN+"],duration:"+e),this.levelLastLoaded=c,b.live){var g=d.details;g&&b.fragments.length>0?(t["default"].mergeDetails(g,b),f=b.fragments[0].start,this.liveSyncPosition=this.computeLivePosition(f,g),b.PTSKnown?x.logger.log("live playlist sliding:"+f.toFixed(3)):x.logger.log("live playlist - outdated PTS, unknown sliding")):(b.PTSKnown=!1,x.logger.log("live playlist - first load, unknown sliding"))}else b.PTSKnown=!1;if(d.details=b,this.hls.trigger(p["default"].LEVEL_UPDATED,{details:b,level:c}),this.startFragRequested===!1){if(this.startPosition===-1||this.lastCurrentTime===-1){var h=b.startTimeOffset;isNaN(h)?b.live?(this.startPosition=this.computeLivePosition(f,b),x.logger.log("configure startPosition to "+this.startPosition)):this.startPosition=0:(h<0&&(x.logger.log("negative start time offset "+h+", count from end of last fragment"),h=f+e+h),x.logger.log("start time offset found in playlist, adjust startPosition to "+h),this.startPosition=h),this.lastCurrentTime=this.startPosition}this.nextLoadPosition=this.startPosition}this.state===y.WAITING_LEVEL&&(this.state=y.IDLE),this.tick()}},{key:"onKeyLoaded",value:function(){this.state===y.KEY_LOADING&&(this.state=y.IDLE,this.tick())}},{key:"onFragLoaded",value:function(a){var b=this.fragCurrent,c=a.frag;if(this.state===y.FRAG_LOADING&&b&&"main"===c.type&&c.level===b.level&&c.sn===b.sn){var d=a.stats,e=this.levels[b.level],f=e.details;if(x.logger.log("Loaded  "+b.sn+" of ["+f.startSN+" ,"+f.endSN+"],level "+b.level),this.bitrateTest=!1,c.bitrateTest===!0&&this.hls.nextLoadLevel)this.state=y.IDLE,this.startFragRequested=!1,d.tparsed=d.tbuffered=performance.now(),this.hls.trigger(p["default"].FRAG_BUFFERED,{stats:d,frag:b,id:"main"}),this.tick();else{this.state=y.PARSING,this.stats=d;var g=f.totalduration,h=isNaN(b.startDTS)?b.start:b.startDTS,i=b.level,j=b.sn,k=this.config.defaultAudioCodec||e.audioCodec;this.audioCodecSwap&&(x.logger.log("swapping playlist audio codec"),void 0===k&&(k=this.lastAudioCodec),k&&(k=k.indexOf("mp4a.40.5")!==-1?"mp4a.40.2":"mp4a.40.5")),this.pendingBuffering=!0,this.appended=!1,x.logger.log("Parsing "+j+" of ["+f.startSN+" ,"+f.endSN+"],level "+i+", cc "+b.cc);var l=this.demuxer;l||(l=this.demuxer=new n["default"](this.hls,"main"));var m=this.media,o=m&&m.seeking,q=!o&&(f.PTSKnown||!f.live);l.push(a.payload,k,e.videoCodec,h,b.cc,i,j,g,b.decryptdata,q,null)}}this.fragLoadError=0}},{key:"onFragParsingInitSegment",value:function(a){var b=this.fragCurrent;if(b&&"main"===a.id&&a.sn===b.sn&&a.level===b.level&&this.state===y.PARSING){var c,d,e=a.tracks;if(e.audio&&this.altAudio&&delete e.audio,d=e.audio){var f=this.levels[this.level].audioCodec,g=navigator.userAgent.toLowerCase();f&&this.audioCodecSwap&&(x.logger.log("swapping playlist audio codec"),f=f.indexOf("mp4a.40.5")!==-1?"mp4a.40.2":"mp4a.40.5"),this.audioCodecSwitch&&1!==d.metadata.channelCount&&g.indexOf("firefox")===-1&&(f="mp4a.40.5"),g.indexOf("android")!==-1&&"audio/mpeg"!==d.container&&(f="mp4a.40.2",x.logger.log("Android: force audio codec to "+f)),d.levelCodec=f,d.id=a.id}if(d=e.video,d&&(d.levelCodec=this.levels[this.level].videoCodec,d.id=a.id),a.unique){var h={codec:"",levelCodec:""};for(c in a.tracks)d=e[c],h.container=d.container,h.codec&&(h.codec+=",",h.levelCodec+=","),d.codec&&(h.codec+=d.codec),d.levelCodec&&(h.levelCodec+=d.levelCodec);e={audiovideo:h}}this.hls.trigger(p["default"].BUFFER_CODECS,e);for(c in e){d=e[c],x.logger.log("main track:"+c+",container:"+d.container+",codecs[level/parsed]=["+d.levelCodec+"/"+d.codec+"]");var i=d.initSegment;i&&(this.appended=!0,this.pendingBuffering=!0,this.hls.trigger(p["default"].BUFFER_APPENDING,{type:c,data:i,parent:"main",content:"initSegment"}))}this.tick()}}},{key:"onFragParsingData",value:function(a){var b=this,c=this.fragCurrent;if(c&&"main"===a.id&&a.sn===c.sn&&a.level===c.level&&("audio"!==a.type||!this.altAudio)&&this.state===y.PARSING){var d=this.levels[this.level],e=this.fragCurrent;x.logger.log("Parsed "+a.type+",PTS:["+a.startPTS.toFixed(3)+","+a.endPTS.toFixed(3)+"],DTS:["+a.startDTS.toFixed(3)+"/"+a.endDTS.toFixed(3)+"],nb:"+a.nb+",dropped:"+(a.dropped||0));var f=t["default"].updateFragPTSDTS(d.details,e.sn,a.startPTS,a.endPTS,a.startDTS,a.endDTS),g=this.hls;g.trigger(p["default"].LEVEL_PTS_UPDATED,{details:d.details,level:this.level,drift:f,type:a.type,start:a.startPTS,end:a.endPTS}),"video"===a.type&&(e.dropped=a.dropped),[a.data1,a.data2].forEach(function(c){c&&(b.appended=!0,b.pendingBuffering=!0,g.trigger(p["default"].BUFFER_APPENDING,{type:a.type,data:c,parent:"main",content:"data"}))}),this.tick()}}},{key:"onFragParsed",value:function(a){var b=this.fragCurrent;b&&"main"===a.id&&a.sn===b.sn&&a.level===b.level&&this.state===y.PARSING&&(this.stats.tparsed=performance.now(),this.state=y.PARSED,this._checkAppendedParsed())}},{key:"onAudioTrackSwitching",value:function(a){var b=!!a.url,c=a.id;if(!b){if(this.mediaBuffer!==this.media){x.logger.log("switching on main audio, use media.buffered to schedule main fragment loading"),this.mediaBuffer=this.media;var d=this.fragCurrent;d.loader&&(x.logger.log("switching to main audio track, cancel main fragment load"),d.loader.abort()),this.fragCurrent=null,this.fragPrevious=null,this.demuxer&&(this.demuxer.destroy(),this.demuxer=null),this.state=y.IDLE}var e=this.hls;e.trigger(p["default"].BUFFER_FLUSHING,{startOffset:0,endOffset:Number.POSITIVE_INFINITY,type:"audio"}),e.trigger(p["default"].AUDIO_TRACK_SWITCHED,{id:c}),this.altAudio=!1}}},{key:"onAudioTrackSwitched",value:function(a){var b=a.id,c=!!this.hls.audioTracks[b].url;if(c){var d=this.videoBuffer;d&&this.mediaBuffer!==d&&(x.logger.log("switching on alternate audio, use video.buffered to schedule main fragment loading"),this.mediaBuffer=d)}this.altAudio=c,this.tick()}},{key:"onBufferCreated",value:function(a){var b=a.tracks,c=void 0,d=void 0,e=!1;for(var f in b){var g=b[f];"main"===g.id?(d=f,c=g,"video"===f&&(this.videoBuffer=b[f].buffer)):e=!0}e&&c?(x.logger.log("alternate track found, use "+d+".buffered to schedule main fragment loading"),this.mediaBuffer=c.buffer):this.mediaBuffer=this.media}},{key:"onBufferAppended",value:function(a){if("main"===a.parent){var b=this.state;b!==y.PARSING&&b!==y.PARSED||(this.pendingBuffering=a.pending>0,this._checkAppendedParsed())}}},{key:"_checkAppendedParsed",value:function(){var a=this;if(!(this.state!==y.PARSED||this.appended&&this.pendingBuffering)){var b=this.fragCurrent;b&&!function(){var c=a.mediaBuffer?a.mediaBuffer:a.media;x.logger.log("main buffered : "+v["default"].toString(c.buffered));var d=a.bufferRange.filter(function(a){return l["default"].isBuffered(c,(a.start+a.end)/2)});d.push({type:b.type,start:b.startPTS,end:b.endPTS,frag:b}),a.bufferRange=d.sort(function(a,b){return a.start-b.start}),a.fragPrevious=b;var e=a.stats;e.tbuffered=performance.now(),a.fragLastKbps=Math.round(8*e.total/(e.tbuffered-e.tfirst)),a.hls.trigger(p["default"].FRAG_BUFFERED,{stats:e,frag:b,id:"main"}),a.state=y.IDLE}(),this.tick()}}},{key:"onError",value:function(a){var b=a.frag||this.fragCurrent;if(!b||"main"===b.type){var c=this.media,d=c&&l["default"].isBuffered(c,c.currentTime)&&l["default"].isBuffered(c,c.currentTime+.5);switch(a.details){case w.ErrorDetails.FRAG_LOAD_ERROR:case w.ErrorDetails.FRAG_LOAD_TIMEOUT:case w.ErrorDetails.KEY_LOAD_ERROR:case w.ErrorDetails.KEY_LOAD_TIMEOUT:if(!a.fatal){var e=this.fragLoadError;e?e++:e=1;var f=this.config;if(e<=f.fragLoadingMaxRetry||d||b.autoLevel&&b.level){this.fragLoadError=e,b.loadCounter=0;var g=Math.min(Math.pow(2,e-1)*f.fragLoadingRetryDelay,f.fragLoadingMaxRetryTimeout);x.logger.warn("mediaController: frag loading failed, retry in "+g+" ms"),this.retryDate=performance.now()+g,this.loadedmetadata||(this.startFragRequested=!1,this.nextLoadPosition=this.startPosition),this.state=y.FRAG_LOADING_WAITING_RETRY}else x.logger.error("mediaController: "+a.details+" reaches max retry, redispatch as fatal ..."),a.fatal=!0,this.hls.trigger(p["default"].ERROR,a),this.state=y.ERROR}break;case w.ErrorDetails.FRAG_LOOP_LOADING_ERROR:a.fatal||(d?(this._reduceMaxBufferLength(b.duration),this.state=y.IDLE):b.autoLevel&&0!==b.level||(a.fatal=!0,this.hls.trigger(p["default"].ERROR,a),this.state=y.ERROR));break;case w.ErrorDetails.LEVEL_LOAD_ERROR:case w.ErrorDetails.LEVEL_LOAD_TIMEOUT:this.state!==y.ERROR&&(a.fatal?(this.state=y.ERROR,x.logger.warn("streamController: "+a.details+",switch to "+this.state+" state ...")):this.state===y.WAITING_LEVEL&&(this.state=y.IDLE));break;case w.ErrorDetails.BUFFER_FULL_ERROR:this.state!==y.PARSING&&this.state!==y.PARSED||(d?(this._reduceMaxBufferLength(b.duration),this.state=y.IDLE):(x.logger.warn("buffer full error also media.currentTime is not buffered, flush everything"),this.fragCurrent=null,this.flushMainBuffer(0,Number.POSITIVE_INFINITY)))}}}},{key:"_reduceMaxBufferLength",value:function(a){var b=this.config;b.maxMaxBufferLength>=a&&(b.maxMaxBufferLength/=2,x.logger.warn("reduce max buffer length to "+b.maxMaxBufferLength+"s and switch to IDLE state"),this.fragLoadIdx+=2*b.fragLoadingLoopThreshold)}},{key:"_checkBuffer",value:function(){var a=this.media;if(a&&a.readyState){var b=a.currentTime,c=this.mediaBuffer?this.mediaBuffer:a,d=c.buffered;if(this.loadedmetadata||!d.length||a.seeking)if(this.immediateSwitch)this.immediateLevelSwitchEnd();else{var e=l["default"].bufferInfo(a,b,0),f=!(a.paused||a.ended||0===a.buffered.length),g=.5,h=b!==this.lastCurrentTime,i=this.config;if(h)this.stallReported&&(x.logger.warn("playback not stuck anymore @"+b+", after "+Math.round(performance.now()-this.stalled)+"ms"),this.stallReported=!1),this.stalled=void 0,this.nudgeRetry=0;else if(f){var j=performance.now(),k=this.hls;if(this.stalled){var m=j-this.stalled,n=e.len,o=this.nudgeRetry||0;if(n<=g&&m>1e3*i.lowBufferWatchdogPeriod){this.stallReported||(this.stallReported=!0,x.logger.warn("playback stalling in low buffer @"+b),k.trigger(p["default"].ERROR,{type:w.ErrorTypes.MEDIA_ERROR,details:w.ErrorDetails.BUFFER_STALLED_ERROR,fatal:!1,buffer:n}));var q=e.nextStart,r=q-b;if(q&&r<i.maxSeekHole&&r>0){this.nudgeRetry=++o;var s=o*i.nudgeOffset;x.logger.log("adjust currentTime from "+a.currentTime+" to next buffered @ "+q+" + nudge "+s),a.currentTime=q+s,this.stalled=void 0,k.trigger(p["default"].ERROR,{type:w.ErrorTypes.MEDIA_ERROR,details:w.ErrorDetails.BUFFER_SEEK_OVER_HOLE,fatal:!1,hole:q+s-b})}}else if(n>g&&m>1e3*i.highBufferWatchdogPeriod)if(this.stallReported||(this.stallReported=!0,x.logger.warn("playback stalling in high buffer @"+b),k.trigger(p["default"].ERROR,{type:w.ErrorTypes.MEDIA_ERROR,details:w.ErrorDetails.BUFFER_STALLED_ERROR,fatal:!1,buffer:n})),this.stalled=void 0,this.nudgeRetry=++o,o<i.nudgeMaxRetry){var t=a.currentTime,u=t+o*i.nudgeOffset;x.logger.log("adjust currentTime from "+t+" to "+u),a.currentTime=u,k.trigger(p["default"].ERROR,{type:w.ErrorTypes.MEDIA_ERROR,details:w.ErrorDetails.BUFFER_NUDGE_ON_STALL,fatal:!1})}else x.logger.error("still stuck in high buffer @"+b+" after "+i.nudgeMaxRetry+", raise fatal error"),k.trigger(p["default"].ERROR,{type:w.ErrorTypes.MEDIA_ERROR,details:w.ErrorDetails.BUFFER_STALLED_ERROR,fatal:!0})}else this.stalled=j,this.stallReported=!1}}else{this.loadedmetadata=!0;var v=this.startPosition,y=l["default"].isBuffered(c,v);b===v&&y||(x.logger.log("target start position:"+v),y||(v=d.start(0),x.logger.log("target start position not buffered, seek to buffered.start(0) "+v)),x.logger.log("adjust currentTime from "+b+" to "+v),a.currentTime=v)}}}},{key:"onFragLoadEmergencyAborted",value:function(){this.state=y.IDLE,this.loadedmetadata||(this.startFragRequested=!1,this.nextLoadPosition=this.startPosition),this.tick()}},{key:"onBufferFlushed",value:function(){var a=this.mediaBuffer?this.mediaBuffer:this.media;this.bufferRange=this.bufferRange.filter(function(b){return l["default"].isBuffered(a,(b.start+b.end)/2)}),this.fragLoadIdx+=2*this.config.fragLoadingLoopThreshold,this.state=y.IDLE,this.fragPrevious=null}},{key:"swapAudioCodec",value:function(){this.audioCodecSwap=!this.audioCodecSwap}},{key:"computeLivePosition",value:function(a,b){var c=void 0!==this.config.liveSyncDuration?this.config.liveSyncDuration:this.config.liveSyncDurationCount*b.targetduration;return a+Math.max(0,b.totalduration-c)}},{key:"state",set:function(a){if(this.state!==a){var b=this.state;this._state=a,x.logger.log("main stream:"+b+"->"+a),this.hls.trigger(p["default"].STREAM_STATE_TRANSITION,{previousState:b,nextState:a})}},get:function(){return this._state}},{key:"currentLevel",get:function(){var a=this.media;if(a){var b=this.getBufferRange(a.currentTime);if(b)return b.frag.level}return-1}},{key:"nextBufferRange",get:function(){var a=this.media;return a?this.followingBufferRange(this.getBufferRange(a.currentTime)):null}},{key:"nextLevel",get:function(){var a=this.nextBufferRange;return a?a.frag.level:-1}},{key:"liveSyncPosition",get:function(){return this._liveSyncPosition},set:function(a){this._liveSyncPosition=a}}]),b}(r["default"]);c["default"]=z},{22:22,26:26,27:27,28:28,30:30,31:31,41:41,45:45,46:46}],13:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}Object.defineProperty(c,"__esModule",{value:!0});var h=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),i=a(28),j=d(i),k=a(27),l=d(k),m=a(42),n=d(m),o=function(a){function b(a){e(this,b);var c=f(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,a,j["default"].MEDIA_ATTACHING,j["default"].MEDIA_DETACHING,j["default"].FRAG_PARSING_USERDATA,j["default"].MANIFEST_LOADING,j["default"].FRAG_LOADED,j["default"].LEVEL_SWITCH));if(c.hls=a,c.config=a.config,c.enabled=!0,c.Cues=a.config.cueHandler,c.config.enableCEA708Captions){var d=c,g=function(a,b){var c=null;try{c=new window.Event("addtrack")}catch(d){c=document.createEvent("Event"),c.initEvent("addtrack",!1,!1)}c.track=a,b.dispatchEvent(c)},h={newCue:function(a,b,c){if(!d.textTrack1){var e=d.getExistingTrack("1");e?(d.textTrack1=e,d.clearCurrentCues(d.textTrack1),g(d.textTrack1,d.media)):(d.textTrack1=d.createTextTrack("captions","English","en"),d.textTrack1.textTrack1=!0)}d.Cues.newCue(d.textTrack1,a,b,c)}},i={newCue:function(a,b,c){if(!d.textTrack2){var e=d.getExistingTrack("2");e?(d.textTrack2=e,d.clearCurrentCues(d.textTrack2),g(d.textTrack2,d.media)):(d.textTrack2=d.createTextTrack("captions","Spanish","es"),d.textTrack2.textTrack2=!0)}d.Cues.newCue(d.textTrack2,a,b,c)}};c.cea608Parser=new n["default"](0,h,i)}return c}return g(b,a),h(b,[{key:"clearCurrentCues",value:function(a){if(a&&a.cues)for(;a.cues.length>0;)a.removeCue(a.cues[0])}},{key:"getExistingTrack",value:function(a){var b=this.media;if(b)for(var c=0;c<b.textTracks.length;c++){var d=b.textTracks[c],e="textTrack"+a;if(d[e]===!0)return d}return null}},{key:"createTextTrack",value:function(a,b,c){if(this.media)return this.media.addTextTrack(a,b,c)}},{key:"destroy",value:function(){l["default"].prototype.destroy.call(this)}},{key:"onMediaAttaching",value:function(a){this.media=a.media}},{key:"onMediaDetaching",value:function(){this.clearCurrentCues(this.textTrack1),this.clearCurrentCues(this.textTrack2)}},{key:"onManifestLoading",value:function(){this.lastPts=Number.NEGATIVE_INFINITY}},{key:"onLevelSwitch",value:function(){"NONE"===this.hls.currentLevel.closedCaptions?this.enabled=!1:this.enabled=!0}},{key:"onFragLoaded",value:function(a){if("main"===a.frag.type){var b=a.frag.start;b<=this.lastPts&&(this.clearCurrentCues(this.textTrack1),this.clearCurrentCues(this.textTrack2)),this.lastPts=b}}},{key:"onFragParsingUserdata",value:function(a){if(this.enabled&&this.config.enableCEA708Captions)for(var b=0;b<a.samples.length;b++){var c=this.extractCea608Data(a.samples[b].bytes);this.cea608Parser.addData(a.samples[b].pts,c)}}},{key:"extractCea608Data",value:function(a){for(var b,c,d,e,f,g=31&a[0],h=2,i=[],j=0;j<g;j++)b=a[h++],c=127&a[h++],d=127&a[h++],e=0!==(4&b),f=3&b,0===c&&0===d||e&&0===f&&(i.push(c),i.push(d));return i}}]),b}(l["default"]);c["default"]=o},{27:27,28:28,42:42}],14:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=function(){function a(b,c){d(this,a),this.subtle=b,this.aesIV=c}return e(a,[{key:"decrypt",value:function(a,b){return this.subtle.decrypt({name:"AES-CBC",iv:this.aesIV},b,a)}}]),a}();c["default"]=f},{}],15:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=function(){function a(){d(this,a),this.rcon=[0,1,2,4,8,16,32,64,128,27,54],this.subMix=[],this.subMix[0]=new Uint32Array(256),this.subMix[1]=new Uint32Array(256),this.subMix[2]=new Uint32Array(256),this.subMix[3]=new Uint32Array(256),this.invSubMix=[],this.invSubMix[0]=new Uint32Array(256),this.invSubMix[1]=new Uint32Array(256),this.invSubMix[2]=new Uint32Array(256),this.invSubMix[3]=new Uint32Array(256),this.sBox=new Uint32Array(256),this.invSBox=new Uint32Array(256),this.key=new Uint32Array(0),this.initTable()}return e(a,[{key:"uint8ArrayToUint32Array_",value:function(a){for(var b=new DataView(a),c=new Uint32Array(4),d=0;d<c.length;d++)c[d]=b.getUint32(4*d);return c}},{key:"initTable",value:function(){var a=this.sBox,b=this.invSBox,c=this.subMix[0],d=this.subMix[1],e=this.subMix[2],f=this.subMix[3],g=this.invSubMix[0],h=this.invSubMix[1],i=this.invSubMix[2],j=this.invSubMix[3],k=new Uint32Array(256),l=0,m=0,n=0;for(n=0;n<256;n++)n<128?k[n]=n<<1:k[n]=n<<1^283;for(n=0;n<256;n++){var o=m^m<<1^m<<2^m<<3^m<<4;o=o>>>8^255&o^99,a[l]=o,b[o]=l;var p=k[l],q=k[p],r=k[q],s=257*k[o]^16843008*o;c[l]=s<<24|s>>>8,d[l]=s<<16|s>>>16,e[l]=s<<8|s>>>24,f[l]=s,s=16843009*r^65537*q^257*p^16843008*l,g[o]=s<<24|s>>>8,h[o]=s<<16|s>>>16,i[o]=s<<8|s>>>24,j[o]=s,l?(l=p^k[k[k[r^p]]],m^=k[k[m]]):l=m=1}}},{key:"expandKey",value:function(a){for(var b=this.uint8ArrayToUint32Array_(a),c=!0,d=0;d<b.length&&c;)c=b[d]===this.key[d],d++;if(!c){this.key=b;var e=this.keySize=b.length;if(4!==e&&6!==e&&8!==e)throw new Error("Invalid aes key size="+e);var f=this.ksRows=4*(e+6+1),g=void 0,h=void 0,i=this.keySchedule=new Uint32Array(this.ksRows),j=this.invKeySchedule=new Uint32Array(this.ksRows),k=this.sBox,l=this.rcon,m=this.invSubMix[0],n=this.invSubMix[1],o=this.invSubMix[2],p=this.invSubMix[3],q=void 0,r=void 0;for(g=0;g<f;g++)g<e?q=i[g]=b[g]:(r=q,g%e===0?(r=r<<8|r>>>24,r=k[r>>>24]<<24|k[r>>>16&255]<<16|k[r>>>8&255]<<8|k[255&r],r^=l[g/e|0]<<24):e>6&&g%e===4&&(r=k[r>>>24]<<24|k[r>>>16&255]<<16|k[r>>>8&255]<<8|k[255&r]),i[g]=q=(i[g-e]^r)>>>0);for(h=0;h<f;h++)g=f-h,r=3&h?i[g]:i[g-4],h<4||g<=4?j[h]=r:j[h]=m[k[r>>>24]]^n[k[r>>>16&255]]^o[k[r>>>8&255]]^p[k[255&r]],j[h]=j[h]>>>0}}},{key:"networkToHostOrderSwap",value:function(a){return a<<24|(65280&a)<<8|(16711680&a)>>8|a>>>24}},{key:"decrypt",value:function(a,b,c){for(var d,e,f=this.keySize+6,g=this.invKeySchedule,h=this.invSBox,i=this.invSubMix[0],j=this.invSubMix[1],k=this.invSubMix[2],l=this.invSubMix[3],m=this.uint8ArrayToUint32Array_(c),n=m[0],o=m[1],p=m[2],q=m[3],r=new Int32Array(a),s=new Int32Array(r.length),t=void 0,u=void 0,v=void 0,w=void 0,x=void 0,y=void 0,z=void 0,A=void 0,B=void 0,C=void 0,D=void 0,E=void 0;b<r.length;){for(B=this.networkToHostOrderSwap(r[b]),C=this.networkToHostOrderSwap(r[b+1]),D=this.networkToHostOrderSwap(r[b+2]),E=this.networkToHostOrderSwap(r[b+3]),x=B^g[0],y=E^g[1],z=D^g[2],A=C^g[3],d=4,e=1;e<f;e++)t=i[x>>>24]^j[y>>16&255]^k[z>>8&255]^l[255&A]^g[d],u=i[y>>>24]^j[z>>16&255]^k[A>>8&255]^l[255&x]^g[d+1],v=i[z>>>24]^j[A>>16&255]^k[x>>8&255]^l[255&y]^g[d+2],w=i[A>>>24]^j[x>>16&255]^k[y>>8&255]^l[255&z]^g[d+3],x=t,y=u,z=v,A=w,d+=4;t=h[x>>>24]<<24^h[y>>16&255]<<16^h[z>>8&255]<<8^h[255&A]^g[d],u=h[y>>>24]<<24^h[z>>16&255]<<16^h[A>>8&255]<<8^h[255&x]^g[d+1],v=h[z>>>24]<<24^h[A>>16&255]<<16^h[x>>8&255]<<8^h[255&y]^g[d+2],w=h[A>>>24]<<24^h[x>>16&255]<<16^h[y>>8&255]<<8^h[255&z]^g[d+3],d+=3,s[b]=this.networkToHostOrderSwap(t^n),s[b+1]=this.networkToHostOrderSwap(w^o),s[b+2]=this.networkToHostOrderSwap(v^p),s[b+3]=this.networkToHostOrderSwap(u^q),n=B,o=C,p=D,q=E,b+=4}return s.buffer}},{key:"destroy",value:function(){this.key=void 0,this.keySize=void 0,this.ksRows=void 0,this.sBox=void 0,this.invSBox=void 0,this.subMix=void 0,this.invSubMix=void 0,this.keySchedule=void 0,this.invKeySchedule=void 0,this.rcon=void 0}}]),a}();c["default"]=f},{}],16:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=a(14),h=d(g),i=a(17),j=d(i),k=a(15),l=d(k),m=a(26),n=a(45),o=function(){function a(b,c){e(this,a),this.observer=b,this.config=c;try{var d=crypto?crypto:self.crypto;this.subtle=d.subtle||d.webkitSubtle}catch(f){}this.disableWebCrypto=!this.subtle}return f(a,[{key:"decrypt",value:function(a,b,c,d){var e=this;if(this.disableWebCrypto&&this.config.enableSoftwareAES){n.logger.log("JS AES decrypt");var f=this.decryptor;f||(this.decryptor=f=new l["default"]),f.expandKey(b),d(f.decrypt(a,0,c))}else!function(){n.logger.log("WebCrypto AES decrypt");var f=e.subtle;e.key!==b&&(e.key=b,e.fastAesKey=new j["default"](f,b)),e.fastAesKey.expandKey().then(function(b){var e=new h["default"](f,c);e.decrypt(a,b).then(function(a){d(a)})})["catch"](function(f){e.onWebCryptoError(f,a,b,c,d)})}()}},{key:"onWebCryptoError",value:function(a,b,c,d,e){this.config.enableSoftwareAES?(n.logger.log("WebCrypto Error, disable WebCrypto API"),this.disableWebCrypto=!0,this.decrypt(b,c,d,e)):(n.logger.error("decrypting error : "+a.message),this.observer.trigger(Event.ERROR,{type:m.ErrorTypes.MEDIA_ERROR,details:m.ErrorDetails.FRAG_DECRYPT_ERROR,fatal:!0,reason:a.message}))}},{key:"destroy",value:function(){var a=this.decryptor;a&&(a.destroy(),this.decryptor=void 0)}}]),a}();c["default"]=o},{14:14,15:15,17:17,26:26,45:45}],17:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=function(){function a(b,c){d(this,a),this.subtle=b,this.key=c}return e(a,[{key:"expandKey",value:function(){return this.subtle.importKey("raw",this.key,{name:"AES-CBC"},!1,["encrypt","decrypt"])}}]),a}();c["default"]=f},{}],18:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var f=function(){function a(a,b){
for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=a(19),h=d(g),i=a(45),j=a(24),k=d(j),l=function(){function a(b,c,d,f,g){e(this,a),this.observer=b,this.id=c,this.remuxerClass=d,this.config=f,this.remuxer=new this.remuxerClass(b,c,f,g),this.insertDiscontinuity()}return f(a,[{key:"insertDiscontinuity",value:function(){this._aacTrack={container:"audio/adts",type:"audio",id:-1,sequenceNumber:0,isAAC:!0,samples:[],len:0}}},{key:"push",value:function(a,b,c,d,e,f,g,j,l,m){var n,o,p,q,r,s,t,u,v,w,x=new k["default"](a),y=90*x.timeStamp,z=!1;for(e!==this.lastCC?(i.logger.log(this.id+" discontinuity detected"),this.lastCC=e,this.insertDiscontinuity(),this.remuxer.switchLevel(),this.remuxer.insertDiscontinuity()):f!==this.lastLevel?(i.logger.log("audio track switch detected"),this.lastLevel=f,this.remuxer.switchLevel(),this.insertDiscontinuity()):g===this.lastSN+1&&(z=!0),n=this._aacTrack,this.lastSN=g,this.lastLevel=f,s=x.length,v=a.length;s<v-1&&(255!==a[s]||240!==(240&a[s+1]));s++);for(n.audiosamplerate||(o=h["default"].getAudioConfig(this.observer,a,s,b),n.config=o.config,n.audiosamplerate=o.samplerate,n.channelCount=o.channelCount,n.codec=o.codec,n.manifestCodec=o.manifestCodec,n.duration=j,i.logger.log("parsed codec:"+n.codec+",rate:"+o.samplerate+",nb channel:"+o.channelCount)),r=0,q=9216e4/n.audiosamplerate;s+5<v&&(t=1&a[s+1]?7:9,p=(3&a[s+3])<<11|a[s+4]<<3|(224&a[s+5])>>>5,p-=t,p>0&&s+t+p<=v);)for(u=y+r*q,w={unit:a.subarray(s+t,s+t+p),pts:u,dts:u},n.samples.push(w),n.len+=p,s+=p+t,r++;s<v-1&&(255!==a[s]||240!==(240&a[s+1]));s++);this.remuxer.remux(f,g,e,n,{samples:[]},{samples:[{pts:y,dts:y,unit:x.payload}]},{samples:[]},d,z,l,m)}},{key:"destroy",value:function(){}}],[{key:"probe",value:function(a){var b,c,d=new k["default"](a);if(d.hasTimeStamp)for(b=d.length,c=a.length;b<c-1;b++)if(255===a[b]&&240===(240&a[b+1]))return!0;return!1}}]),a}();c["default"]=l},{19:19,24:24,45:45}],19:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=a(45),g=a(26),h=function(){function a(){d(this,a)}return e(a,null,[{key:"getAudioConfig",value:function(a,b,c,d){var e,h,i,j,k,l=navigator.userAgent.toLowerCase(),m=d,n=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350];return e=((192&b[c+2])>>>6)+1,h=(60&b[c+2])>>>2,h>n.length-1?void a.trigger(Event.ERROR,{type:g.ErrorTypes.MEDIA_ERROR,details:g.ErrorDetails.FRAG_PARSING_ERROR,fatal:!0,reason:"invalid ADTS sampling index:"+h}):(j=(1&b[c+2])<<2,j|=(192&b[c+3])>>>6,f.logger.log("manifest codec:"+d+",ADTS data:type:"+e+",sampleingIndex:"+h+"["+n[h]+"Hz],channelConfig:"+j),/firefox/i.test(l)?h>=6?(e=5,k=new Array(4),i=h-3):(e=2,k=new Array(2),i=h):l.indexOf("android")!==-1?(e=2,k=new Array(2),i=h):(e=5,k=new Array(4),d&&(d.indexOf("mp4a.40.29")!==-1||d.indexOf("mp4a.40.5")!==-1)||!d&&h>=6?i=h-3:((d&&d.indexOf("mp4a.40.2")!==-1&&h>=6&&1===j||!d&&1===j)&&(e=2,k=new Array(2)),i=h)),k[0]=e<<3,k[0]|=(14&h)>>1,k[1]|=(1&h)<<7,k[1]|=j<<3,5===e&&(k[1]|=(14&i)>>1,k[2]=(1&i)<<7,k[2]|=8,k[3]=0),{config:k,samplerate:n[h],channelCount:j,codec:"mp4a.40."+e,manifestCodec:m})}}]),a}();c["default"]=h},{26:26,45:45}],20:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=a(28),h=d(g),i=a(26),j=a(16),k=d(j),l=a(18),m=d(l),n=a(25),o=d(n),p=a(38),q=d(p),r=a(39),s=d(r),t=function(){function a(b,c,d){var f=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;e(this,a),this.hls=b,this.id=c,this.config=this.hls.config||f,this.typeSupported=d}return f(a,[{key:"destroy",value:function(){var a=this.demuxer;a&&a.destroy()}},{key:"push",value:function(a,b,c,d,e,f,g,i,j,l,m){if(a.byteLength>0&&null!=j&&null!=j.key&&"AES-128"===j.method){null==this.decrypter&&(this.decrypter=new k["default"](this.hls,this.config));var n,o=this;try{n=performance.now()}catch(p){n=Date.now()}this.decrypter.decrypt(a,j.key.buffer,j.iv.buffer,function(a){var j;try{j=performance.now()}catch(k){j=Date.now()}o.hls.trigger(h["default"].FRAG_DECRYPTED,{level:f,sn:g,stats:{tstart:n,tdecrypt:j}}),o.pushDecrypted(new Uint8Array(a),b,c,d,e,f,g,i,l,m)})}else this.pushDecrypted(new Uint8Array(a),b,c,d,e,f,g,i,l,m)}},{key:"pushDecrypted",value:function(a,b,c,d,e,f,g,j,k,l){var n=this.demuxer;if(!n||e!==this.cc&&!n.probe(a)){var p=this.hls,r=this.id,t=this.config,u=this.typeSupported;if(o["default"].probe(a))n=this.typeSupported.mp2t===!0?new o["default"](p,r,s["default"],t,u):new o["default"](p,r,q["default"],t,u),n.probe=o["default"].probe;else{if(!m["default"].probe(a))return void p.trigger(h["default"].ERROR,{type:i.ErrorTypes.MEDIA_ERROR,id:r,details:i.ErrorDetails.FRAG_PARSING_ERROR,fatal:!0,reason:"no demux matching with content found"});n=new m["default"](p,r,q["default"],t,u),n.probe=m["default"].probe}this.demuxer=n}n.push(a,b,c,d,e,f,g,j,k,l),this.cc=e}}]),a}();c["default"]=t},{16:16,18:18,25:25,26:26,28:28,38:38,39:39}],21:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(c,"__esModule",{value:!0});var e=a(20),f=d(e),g=a(28),h=d(g),i=a(45),j=a(1),k=d(j),l=function(a){var b=new k["default"];b.trigger=function(a){for(var c=arguments.length,d=Array(c>1?c-1:0),e=1;e<c;e++)d[e-1]=arguments[e];b.emit.apply(b,[a,a].concat(d))},b.off=function(a){for(var c=arguments.length,d=Array(c>1?c-1:0),e=1;e<c;e++)d[e-1]=arguments[e];b.removeListener.apply(b,[a].concat(d))};var c=function(b,c){a.postMessage({event:b,data:c})};a.addEventListener("message",function(d){var e=d.data;switch(e.cmd){case"init":var g=JSON.parse(e.config);a.demuxer=new f["default"](b,e.id,e.typeSupported,g);try{(0,i.enableLogs)(g.debug===!0)}catch(h){}c("init",null);break;case"demux":a.demuxer.push(e.data,e.audioCodec,e.videoCodec,e.timeOffset,e.cc,e.level,e.sn,e.duration,e.decryptdata,e.accurateTimeOffset,e.defaultInitPTS)}}),b.on(h["default"].FRAG_DECRYPTED,c),b.on(h["default"].FRAG_PARSING_INIT_SEGMENT,c),b.on(h["default"].FRAG_PARSED,c),b.on(h["default"].ERROR,c),b.on(h["default"].FRAG_PARSING_METADATA,c),b.on(h["default"].FRAG_PARSING_USERDATA,c),b.on(h["default"].INIT_PTS_FOUND,c),b.on(h["default"].FRAG_PARSING_DATA,function(b,c){var d=c.data1.buffer,e=c.data2.buffer;delete c.data1,delete c.data2,a.postMessage({event:b,data:c,data1:d,data2:e},[d,e])})};c["default"]=l},{1:1,20:20,28:28,45:45}],22:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=a(28),h=d(g),i=a(20),j=d(i),k=a(21),l=d(k),m=a(45),n=a(26),o=function(){function b(c,d){e(this,b),this.hls=c,this.id=d;var f={mp4:MediaSource.isTypeSupported("video/mp4"),mp2t:c.config.enableMP2TPassThrough&&MediaSource.isTypeSupported("video/mp2t"),mpeg:MediaSource.isTypeSupported("audio/mpeg"),mp3:MediaSource.isTypeSupported('audio/mp4; codecs="mp3"')};if(c.config.enableWorker&&"undefined"!=typeof Worker){m.logger.log("demuxing in webworker");var g=void 0;try{var i=a(3);g=this.w=i(l["default"]),this.onwmsg=this.onWorkerMessage.bind(this),g.addEventListener("message",this.onwmsg),g.onerror=function(a){c.trigger(h["default"].ERROR,{type:n.ErrorTypes.OTHER_ERROR,details:n.ErrorDetails.INTERNAL_EXCEPTION,fatal:!0,event:"demuxerWorker",err:{message:a.message+" ("+a.filename+":"+a.lineno+")"}})},g.postMessage({cmd:"init",typeSupported:f,id:d,config:JSON.stringify(c.config)})}catch(k){m.logger.error("error while initializing DemuxerWorker, fallback on DemuxerInline"),g&&URL.revokeObjectURL(g.objectURL),this.demuxer=new j["default"](c,d,f),this.w=void 0}}else this.demuxer=new j["default"](c,d,f);this.demuxInitialized=!0}return f(b,[{key:"destroy",value:function(){var a=this.w;if(a)a.removeEventListener("message",this.onwmsg),a.terminate(),this.w=null;else{var b=this.demuxer;b&&(b.destroy(),this.demuxer=null)}}},{key:"push",value:function(a,b,c,d,e,f,g,h,i,j,k){var l=this.w;if(l)l.postMessage({cmd:"demux",data:a,audioCodec:b,videoCodec:c,timeOffset:d,cc:e,level:f,sn:g,duration:h,decryptdata:i,accurateTimeOffset:j,defaultInitPTS:k},[a]);else{var m=this.demuxer;m&&m.push(a,b,c,d,e,f,g,h,i,j,k)}}},{key:"onWorkerMessage",value:function(a){var b=a.data,c=this.hls;switch(b.event){case"init":URL.revokeObjectURL(this.w.objectURL);break;case h["default"].FRAG_PARSING_DATA:b.data.data1=new Uint8Array(b.data1),b.data.data2=new Uint8Array(b.data2);default:c.trigger(b.event,b.data)}}}]),b}();c["default"]=o},{20:20,21:21,26:26,28:28,3:3,45:45}],23:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=a(45),g=function(){function a(b){d(this,a),this.data=b,this.bytesAvailable=b.byteLength,this.word=0,this.bitsAvailable=0}return e(a,[{key:"loadWord",value:function(){var a=this.data,b=this.bytesAvailable,c=a.byteLength-b,d=new Uint8Array(4),e=Math.min(4,b);if(0===e)throw new Error("no bytes available");d.set(a.subarray(c,c+e)),this.word=new DataView(d.buffer).getUint32(0),this.bitsAvailable=8*e,this.bytesAvailable-=e}},{key:"skipBits",value:function(a){var b;this.bitsAvailable>a?(this.word<<=a,this.bitsAvailable-=a):(a-=this.bitsAvailable,b=a>>3,a-=b>>3,this.bytesAvailable-=b,this.loadWord(),this.word<<=a,this.bitsAvailable-=a)}},{key:"readBits",value:function(a){var b=Math.min(this.bitsAvailable,a),c=this.word>>>32-b;return a>32&&f.logger.error("Cannot read more than 32 bits at a time"),this.bitsAvailable-=b,this.bitsAvailable>0?this.word<<=b:this.bytesAvailable>0&&this.loadWord(),b=a-b,b>0&&this.bitsAvailable?c<<b|this.readBits(b):c}},{key:"skipLZ",value:function(){var a;for(a=0;a<this.bitsAvailable;++a)if(0!==(this.word&2147483648>>>a))return this.word<<=a,this.bitsAvailable-=a,a;return this.loadWord(),a+this.skipLZ()}},{key:"skipUEG",value:function(){this.skipBits(1+this.skipLZ())}},{key:"skipEG",value:function(){this.skipBits(1+this.skipLZ())}},{key:"readUEG",value:function(){var a=this.skipLZ();return this.readBits(a+1)-1}},{key:"readEG",value:function(){var a=this.readUEG();return 1&a?1+a>>>1:-1*(a>>>1)}},{key:"readBoolean",value:function(){return 1===this.readBits(1)}},{key:"readUByte",value:function(){return this.readBits(8)}},{key:"readUShort",value:function(){return this.readBits(16)}},{key:"readUInt",value:function(){return this.readBits(32)}},{key:"skipScalingList",value:function(a){var b,c,d=8,e=8;for(b=0;b<a;b++)0!==e&&(c=this.readEG(),e=(d+c+256)%256),d=0===e?d:e}},{key:"readSPS",value:function(){var a,b,c,d,e,f,g,h,i,j=0,k=0,l=0,m=0,n=this.readUByte.bind(this),o=this.readBits.bind(this),p=this.readUEG.bind(this),q=this.readBoolean.bind(this),r=this.skipBits.bind(this),s=this.skipEG.bind(this),t=this.skipUEG.bind(this),u=this.skipScalingList.bind(this);if(n(),a=n(),b=o(5),r(3),c=n(),t(),100===a||110===a||122===a||244===a||44===a||83===a||86===a||118===a||128===a){var v=p();if(3===v&&r(1),t(),t(),r(1),q())for(h=3!==v?8:12,i=0;i<h;i++)q()&&u(i<6?16:64)}t();var w=p();if(0===w)p();else if(1===w)for(r(1),s(),s(),d=p(),i=0;i<d;i++)s();t(),r(1),e=p(),f=p(),g=o(1),0===g&&r(1),r(1),q()&&(j=p(),k=p(),l=p(),m=p());var x=[1,1];if(q()&&q()){var y=n();switch(y){case 1:x=[1,1];break;case 2:x=[12,11];break;case 3:x=[10,11];break;case 4:x=[16,11];break;case 5:x=[40,33];break;case 6:x=[24,11];break;case 7:x=[20,11];break;case 8:x=[32,11];break;case 9:x=[80,33];break;case 10:x=[18,11];break;case 11:x=[15,11];break;case 12:x=[64,33];break;case 13:x=[160,99];break;case 14:x=[4,3];break;case 15:x=[3,2];break;case 16:x=[2,1];break;case 255:x=[n()<<8|n(),n()<<8|n()]}}return{width:Math.ceil(16*(e+1)-2*j-2*k),height:(2-g)*(f+1)*16-(g?2:4)*(l+m),pixelRatio:x}}},{key:"readSliceType",value:function(){return this.readUByte(),this.readUEG(),this.readUEG()}}]),a}();c["default"]=g},{45:45}],24:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=a(45),g=function(){function a(b){d(this,a),this._hasTimeStamp=!1;for(var c,e,g,h,i,j,k,l,m=0;;)if(k=this.readUTF(b,m,3),m+=3,"ID3"===k)m+=3,c=127&b[m++],e=127&b[m++],g=127&b[m++],h=127&b[m++],i=(c<<21)+(e<<14)+(g<<7)+h,j=m+i,this._parseID3Frames(b,m,j),m=j;else{if("3DI"!==k)return m-=3,l=m,void(l&&(this.hasTimeStamp||f.logger.warn("ID3 tag found, but no timestamp"),this._length=l,this._payload=b.subarray(0,l)));m+=7,f.logger.log("3DI footer found, end: "+m)}}return e(a,[{key:"readUTF",value:function(a,b,c){var d="",e=b,f=b+c;do d+=String.fromCharCode(a[e++]);while(e<f);return d}},{key:"_parseID3Frames",value:function(a,b,c){for(var d,e,g,h,i;b+8<=c;)switch(d=this.readUTF(a,b,4),b+=4,e=a[b++]<<24+a[b++]<<16+a[b++]<<8+a[b++],h=a[b++]<<8+a[b++],g=b,d){case"PRIV":if("com.apple.streaming.transportStreamTimestamp"===this.readUTF(a,b,44)){b+=44,b+=4;var j=1&a[b++];this._hasTimeStamp=!0,i=((a[b++]<<23)+(a[b++]<<15)+(a[b++]<<7)+a[b++])/45,j&&(i+=47721858.84),i=Math.round(i),f.logger.trace("ID3 timestamp found: "+i),this._timeStamp=i}}}},{key:"hasTimeStamp",get:function(){return this._hasTimeStamp}},{key:"timeStamp",get:function(){return this._timeStamp}},{key:"length",get:function(){return this._length}},{key:"payload",get:function(){return this._payload}}]),a}();c["default"]=g},{45:45}],25:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=a(19),h=d(g),i=a(28),j=d(i),k=a(23),l=d(k),m=a(45),n=a(26),o=function(){function a(b,c,d,f,g){e(this,a),this.observer=b,this.id=c,this.remuxerClass=d,this.config=f,this.typeSupported=g,this.lastCC=0,this.remuxer=new this.remuxerClass(b,c,f,g)}return f(a,[{key:"switchLevel",value:function(){this.pmtParsed=!1,this._pmtId=-1,this._avcTrack={container:"video/mp2t",type:"video",id:-1,sequenceNumber:0,samples:[],len:0,dropped:0},this._audioTrack={container:"video/mp2t",type:"audio",id:-1,sequenceNumber:0,samples:[],len:0,isAAC:!0},this._id3Track={type:"id3",id:-1,sequenceNumber:0,samples:[],len:0},this._txtTrack={type:"text",id:-1,sequenceNumber:0,samples:[],len:0},this.aacOverFlow=null,this.aacLastPTS=null,this.avcSample=null,this.remuxer.switchLevel()}},{key:"insertDiscontinuity",value:function(){this.switchLevel(),this.remuxer.insertDiscontinuity()}},{key:"push",value:function(a,b,c,d,e,f,g,h,i,k){var l,o,p,q,r,s,t=a.length,u=this.remuxer.passthrough,v=!1;this.audioCodec=b,this.videoCodec=c,this._duration=h,this.contiguous=!1,this.accurateTimeOffset=i,e!==this.lastCC&&(m.logger.log("discontinuity detected"),this.insertDiscontinuity(),this.lastCC=e),f!==this.lastLevel?(m.logger.log("level switch detected"),this.switchLevel(),this.lastLevel=f):g===this.lastSN+1&&(this.contiguous=!0),this.lastSN=g;var w=this.pmtParsed,x=this._avcTrack,y=this._audioTrack,z=this._id3Track,A=x.id,B=y.id,C=z.id,D=this._pmtId,E=x.pesData,F=y.pesData,G=z.pesData,H=this._parsePAT,I=this._parsePMT,J=this._parsePES,K=this._parseAVCPES.bind(this),L=this._parseAACPES.bind(this),M=this._parseMPEGPES.bind(this),N=this._parseID3PES.bind(this);for(t-=t%188,l=0;l<t;l+=188)if(71===a[l]){if(o=!!(64&a[l+1]),p=((31&a[l+1])<<8)+a[l+2],q=(48&a[l+3])>>4,q>1){if(r=l+5+a[l+4],r===l+188)continue}else r=l+4;switch(p){case A:if(o){if(E&&(s=J(E))&&(K(s,!1),u&&x.codec&&(B===-1||y.codec)))return void this.remux(f,g,e,a,d);E={data:[],size:0}}E&&(E.data.push(a.subarray(r,l+188)),E.size+=l+188-r);break;case B:if(o){if(F&&(s=J(F))&&(y.isAAC?L(s):M(s),u&&y.codec&&(A===-1||x.codec)))return void this.remux(f,g,e,a,d);F={data:[],size:0}}F&&(F.data.push(a.subarray(r,l+188)),F.size+=l+188-r);break;case C:o&&(G&&(s=J(G))&&N(s),G={data:[],size:0}),G&&(G.data.push(a.subarray(r,l+188)),G.size+=l+188-r);break;case 0:o&&(r+=a[r]+1),D=this._pmtId=H(a,r);break;case D:o&&(r+=a[r]+1);var O=I(a,r,this.typeSupported.mpeg===!0||this.typeSupported.mp3===!0);A=O.avc,A>0&&(x.id=A),B=O.audio,B>0&&(y.id=B,y.isAAC=O.isAAC),C=O.id3,C>0&&(z.id=C),v&&!w&&(m.logger.log("reparse from beginning"),v=!1,l=-188),w=this.pmtParsed=!0;break;case 17:case 8191:break;default:v=!0}}else this.observer.trigger(j["default"].ERROR,{type:n.ErrorTypes.MEDIA_ERROR,id:this.id,details:n.ErrorDetails.FRAG_PARSING_ERROR,fatal:!1,reason:"TS packet did not start with 0x47"});E&&(s=J(E))?(K(s,!0),x.pesData=null):x.pesData=E,F&&(s=J(F))?(y.isAAC?L(s):M(s),y.pesData=null):(F&&F.size&&m.logger.log("last AAC PES packet truncated,might overlap between fragments"),y.pesData=F),G&&(s=J(G))?(N(s),z.pesData=null):z.pesData=G,this.remux(f,g,e,null,d,k)}},{key:"remux",value:function(a,b,c,d,e,f){for(var g=this._avcTrack,h=g.samples,i=0,j=0,k=0;k<h.length;k++){for(var l=h[k],m=l.units.units,n=m.length,o=0,p=0;p<n;p++)o+=m[p].data.length;j+=o,i+=n,l.length=o}g.len=j,g.nbNalu=i,this.remuxer.remux(a,b,c,this._audioTrack,this._avcTrack,this._id3Track,this._txtTrack,e,this.contiguous,this.accurateTimeOffset,f,d)}},{key:"destroy",value:function(){this.switchLevel(),this._initPTS=this._initDTS=void 0,this._duration=0}},{key:"_parsePAT",value:function(a,b){return(31&a[b+10])<<8|a[b+11]}},{key:"_parsePMT",value:function(a,b,c){var d,e,f,g,h={audio:-1,avc:-1,id3:-1,isAAC:!0};for(d=(15&a[b+1])<<8|a[b+2],e=b+3+d-4,f=(15&a[b+10])<<8|a[b+11],b+=12+f;b<e;){switch(g=(31&a[b+1])<<8|a[b+2],a[b]){case 15:h.audio===-1&&(h.audio=g);break;case 21:h.id3===-1&&(h.id3=g);break;case 27:h.avc===-1&&(h.avc=g);break;case 3:case 4:c?h.audio===-1&&(h.audio=g,h.isAAC=!1):m.logger.log("MPEG audio found, not supported in this browser for now");break;case 36:m.logger.warn("HEVC stream type found, not supported for now");break;default:m.logger.log("unkown stream type:"+a[b])}b+=((15&a[b+3])<<8|a[b+4])+5}return h}},{key:"_parsePES",value:function(a){var b,c,d,e,f,g,h,i,j,k=0,l=a.data;if(!a||0===a.size)return null;for(;l[0].length<19&&l.length>1;){var n=new Uint8Array(l[0].length+l[1].length);n.set(l[0]),n.set(l[1],l[0].length),l[0]=n,l.splice(1,1)}if(b=l[0],d=(b[0]<<16)+(b[1]<<8)+b[2],1===d){if(e=(b[4]<<8)+b[5],e&&e>a.size-6)return null;c=b[7],192&c&&(h=536870912*(14&b[9])+4194304*(255&b[10])+16384*(254&b[11])+128*(255&b[12])+(254&b[13])/2,h>4294967295&&(h-=8589934592),64&c?(i=536870912*(14&b[14])+4194304*(255&b[15])+16384*(254&b[16])+128*(255&b[17])+(254&b[18])/2,i>4294967295&&(i-=8589934592),h-i>54e5&&(m.logger.warn(Math.round((h-i)/9e4)+"s delta between PTS and DTS, align them"),h=i)):i=h),f=b[8],j=f+9,a.size-=j,g=new Uint8Array(a.size);for(var o=0,p=l.length;o<p;o++){b=l[o];var q=b.byteLength;if(j){if(j>q){j-=q;continue}b=b.subarray(j),q-=j,j=0}g.set(b,k),k+=q}return e&&(e-=f+3),{data:g,pts:h,dts:i,len:e}}return null}},{key:"pushAccesUnit",value:function(a,b){a.units.units.length&&a.frame&&(!this.config.forceKeyFrameOnDiscontinuity||a.key===!0||b.sps&&(b.samples.length||this.contiguous)?b.samples.push(a):b.dropped++),a.debug.length&&m.logger.log(a.pts+"/"+a.dts+":"+a.debug+","+a.units.length)}},{key:"_parseAVCPES",value:function(a,b){var c,d,e,f=this,g=this._avcTrack,h=this._parseAVCNALu(a.data),i=!1,j=this.avcSample;a.data=null,h.forEach(function(b){switch(b.type){case 1:d=!0,i&&j&&(j.debug+="NDR "),j.frame=!0;var h=b.data;if(h.length>4){var k=new l["default"](h).readSliceType();2!==k&&4!==k&&7!==k&&9!==k||(j.key=!0)}break;case 5:d=!0,j||(j=f.avcSample=f._createAVCSample(!0,a.pts,a.dts,"")),i&&(j.debug+="IDR "),j.key=!0,j.frame=!0;break;case 6:d=!0,i&&j&&(j.debug+="SEI "),c=new l["default"](f.discardEPB(b.data)),c.readUByte();for(var m=0,n=0,o=!1,p=0;!o&&c.bytesAvailable>1;){m=0;do p=c.readUByte(),m+=p;while(255===p);n=0;do p=c.readUByte(),n+=p;while(255===p);if(4===m&&0!==c.bytesAvailable){o=!0;var q=c.readUByte();if(181===q){var r=c.readUShort();if(49===r){var s=c.readUInt();if(1195456820===s){var t=c.readUByte();if(3===t){var u=c.readUByte(),v=c.readUByte(),w=31&u,x=[u,v];for(e=0;e<w;e++)x.push(c.readUByte()),x.push(c.readUByte()),x.push(c.readUByte());f._insertSampleInOrder(f._txtTrack.samples,{type:3,pts:a.pts,bytes:x})}}}}}else if(n<c.bytesAvailable)for(e=0;e<n;e++)c.readUByte()}break;case 7:if(d=!0,i&&j&&(j.debug+="SPS "),!g.sps){c=new l["default"](b.data);var y=c.readSPS();g.width=y.width,g.height=y.height,g.pixelRatio=y.pixelRatio,g.sps=[b.data],g.duration=f._duration;var z=b.data.subarray(1,4),A="avc1.";for(e=0;e<3;e++){var B=z[e].toString(16);B.length<2&&(B="0"+B),A+=B}g.codec=A}break;case 8:d=!0,i&&j&&(j.debug+="PPS "),g.pps||(g.pps=[b.data]);break;case 9:d=!1,j&&f.pushAccesUnit(j,g),j=f.avcSample=f._createAVCSample(!1,a.pts,a.dts,i?"AUD ":"");break;case 12:d=!1;break;default:d=!1,j&&(j.debug+="unknown NAL "+b.type+" ")}if(j&&d){var C=j.units;C.units.push(b)}}),b&&j&&(this.pushAccesUnit(j,g),this.avcSample=null)}},{key:"_createAVCSample",value:function(a,b,c,d){return{key:a,pts:b,dts:c,units:{units:[],length:0},debug:d}}},{key:"_insertSampleInOrder",value:function(a,b){var c=a.length;if(c>0){if(b.pts>=a[c-1].pts)a.push(b);else for(var d=c-1;d>=0;d--)if(b.pts<a[d].pts){a.splice(d,0,b);break}}else a.push(b)}},{key:"_getLastNalUnit",value:function(){var a=this.avcSample,b=void 0;if(!a||0===a.units.units.length){var c=this._avcTrack,d=c.samples;a=d[d.length-1]}if(a){var e=a.units.units;b=e[e.length-1]}return b}},{key:"_parseAVCNALu",value:function(a){var b,c,d,e,f,g=0,h=a.byteLength,i=this._avcTrack,j=i.naluState||0,k=j,l=[],m=-1;for(j===-1&&(m=0,f=31&a[0],j=0,g=1);g<h;)if(b=a[g++],j)if(1!==j)if(b)if(1===b){if(m>=0)d={data:a.subarray(m,g-j-1),type:f},l.push(d);else{var n=this._getLastNalUnit();if(n&&(k&&g<=4-k&&n.state&&(n.data=n.data.subarray(0,n.data.byteLength-k)),c=g-j-1,c>0)){var o=new Uint8Array(n.data.byteLength+c);o.set(n.data,0),o.set(a.subarray(0,c),n.data.byteLength),n.data=o}}g<h?(e=31&a[g],m=g,f=e,j=0):j=-1}else j=0;else j=3;else j=b?0:2;else j=b?0:1;if(m>=0&&j>=0&&(d={data:a.subarray(m,h),type:f,state:j},l.push(d)),0===l.length){var p=this._getLastNalUnit();if(p){var q=new Uint8Array(p.data.byteLength+a.byteLength);q.set(p.data,0),q.set(a,p.data.byteLength),p.data=q}}return i.naluState=j,l}},{key:"discardEPB",value:function(a){for(var b,c,d=a.byteLength,e=[],f=1;f<d-2;)0===a[f]&&0===a[f+1]&&3===a[f+2]?(e.push(f+2),f+=2):f++;if(0===e.length)return a;b=d-e.length,c=new Uint8Array(b);var g=0;for(f=0;f<b;g++,f++)g===e[0]&&(g++,e.shift()),c[f]=a[g];return c}},{key:"_parseAACPES",value:function(a){var b,c,d,e,f,g,i,k,l,o=this._audioTrack,p=a.data,q=a.pts,r=0,s=this.aacOverFlow,t=this.aacLastPTS;if(s){var u=new Uint8Array(s.byteLength+p.byteLength);u.set(s,0),u.set(p,s.byteLength),p=u}for(f=r,k=p.length;f<k-1&&(255!==p[f]||240!==(240&p[f+1]));f++);if(f){var v,w;if(f<k-1?(v="AAC PES did not start with ADTS header,offset:"+f,w=!1):(v="no ADTS header found in AAC PES",w=!0),m.logger.warn("parsing error:"+v),this.observer.trigger(j["default"].ERROR,{type:n.ErrorTypes.MEDIA_ERROR,id:this.id,details:n.ErrorDetails.FRAG_PARSING_ERROR,fatal:w,reason:v}),w)return}if(!o.audiosamplerate){var x=this.audioCodec;b=h["default"].getAudioConfig(this.observer,p,f,x),o.config=b.config,o.audiosamplerate=b.samplerate,o.channelCount=b.channelCount,o.codec=b.codec,o.manifestCodec=b.manifestCodec,o.duration=this._duration,m.logger.log("parsed codec:"+o.codec+",rate:"+b.samplerate+",nb channel:"+b.channelCount)}if(e=0,d=9216e4/o.audiosamplerate,s&&t){var y=t+d;Math.abs(y-q)>1&&(m.logger.log("AAC: align PTS for overlapping frames by "+Math.round((y-q)/90)),q=y)}for(;f+5<k&&(g=1&p[f+1]?7:9,c=(3&p[f+3])<<11|p[f+4]<<3|(224&p[f+5])>>>5,c-=g,c>0&&f+g+c<=k);)for(i=q+e*d,l={unit:p.subarray(f+g,f+g+c),pts:i,dts:i},o.samples.push(l),o.len+=c,f+=c+g,e++;f<k-1&&(255!==p[f]||240!==(240&p[f+1]));f++);s=f<k?p.subarray(f,k):null,this.aacOverFlow=s,this.aacLastPTS=i}},{key:"_parseMPEGPES",value:function(a){for(var b,c=a.data,d=a.pts,e=c.length,f=0,g=0;g<e&&(b=this._parseMpeg(c,g,e,f++,d))>0;)g+=b}},{key:"_onMpegFrame",value:function(a,b,c,d,e,f){var g=1152/c*1e3,h=f+e*g,i=this._audioTrack;i.config=[],i.channelCount=d,i.audiosamplerate=c,i.duration=this._duration,i.samples.push({unit:a,pts:h,dts:h}),i.len+=a.length}},{key:"_onMpegNoise",value:function(a){m.logger.warn("mpeg audio has noise: "+a.length+" bytes")}},{key:"_parseMpeg",value:function(a,b,c,d,e){var f=[32,64,96,128,160,192,224,256,288,320,352,384,416,448,32,48,56,64,80,96,112,128,160,192,224,256,320,384,32,40,48,56,64,80,96,112,128,160,192,224,256,320,32,48,56,64,80,96,112,128,144,160,176,192,224,256,8,16,24,32,40,48,56,64,80,96,112,128,144,160],g=[44100,48e3,32e3,22050,24e3,16e3,11025,12e3,8e3];if(b+2>c)return-1;if(255===a[b]||224===(224&a[b+1])){if(b+24>c)return-1;var h=a[b+1]>>3&3,i=a[b+1]>>1&3,j=a[b+2]>>4&15,k=a[b+2]>>2&3,l=!!(2&a[b+2]);if(1!==h&&0!==j&&15!==j&&3!==k){var m=3===h?3-i:3===i?3:4,n=1e3*f[14*m+j-1],o=3===h?0:2===h?1:2,p=g[3*o+k],q=l?1:0,r=a[b+3]>>6===3?1:2,s=3===i?(3===h?12:6)*n/p+q<<2:(3===h?144:72)*n/p+q|0;return b+s>c?-1:(this._onMpegFrame&&this._onMpegFrame(a.subarray(b,b+s),n,p,r,d,e),s)}}for(var t=b+2;t<c;){if(255===a[t-1]&&224===(224&a[t]))return this._onMpegNoise&&this._onMpegNoise(a.subarray(b,t-1)),t-b-1;t++}return-1}},{key:"_parseID3PES",value:function(a){this._id3Track.samples.push(a)}}],[{key:"probe",value:function(a){return a.length>=564&&71===a[0]&&71===a[188]&&71===a[376]}}]),a}();c["default"]=o},{19:19,23:23,26:26,28:28,45:45}],26:[function(a,b,c){"use strict";Object.defineProperty(c,"__esModule",{value:!0});c.ErrorTypes={NETWORK_ERROR:"networkError",MEDIA_ERROR:"mediaError",MUX_ERROR:"muxError",OTHER_ERROR:"otherError"},c.ErrorDetails={MANIFEST_LOAD_ERROR:"manifestLoadError",MANIFEST_LOAD_TIMEOUT:"manifestLoadTimeOut",MANIFEST_PARSING_ERROR:"manifestParsingError",MANIFEST_INCOMPATIBLE_CODECS_ERROR:"manifestIncompatibleCodecsError",LEVEL_LOAD_ERROR:"levelLoadError",LEVEL_LOAD_TIMEOUT:"levelLoadTimeOut",LEVEL_SWITCH_ERROR:"levelSwitchError",AUDIO_TRACK_LOAD_ERROR:"audioTrackLoadError",AUDIO_TRACK_LOAD_TIMEOUT:"audioTrackLoadTimeOut",FRAG_LOAD_ERROR:"fragLoadError",FRAG_LOOP_LOADING_ERROR:"fragLoopLoadingError",FRAG_LOAD_TIMEOUT:"fragLoadTimeOut",FRAG_DECRYPT_ERROR:"fragDecryptError",FRAG_PARSING_ERROR:"fragParsingError",REMUX_ALLOC_ERROR:"remuxAllocError",KEY_LOAD_ERROR:"keyLoadError",KEY_LOAD_TIMEOUT:"keyLoadTimeOut",BUFFER_ADD_CODEC_ERROR:"bufferAddCodecError",BUFFER_APPEND_ERROR:"bufferAppendError",BUFFER_APPENDING_ERROR:"bufferAppendingError",BUFFER_STALLED_ERROR:"bufferStalledError",BUFFER_FULL_ERROR:"bufferFullError",BUFFER_SEEK_OVER_HOLE:"bufferSeekOverHole",BUFFER_NUDGE_ON_STALL:"bufferNudgeOnStall",INTERNAL_EXCEPTION:"internalException"}},{}],27:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},g=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),h=a(45),i=a(26),j=a(28),k=d(j),l=function(){function a(b){e(this,a),this.hls=b,this.onEvent=this.onEvent.bind(this);for(var c=arguments.length,d=Array(c>1?c-1:0),f=1;f<c;f++)d[f-1]=arguments[f];this.handledEvents=d,this.useGenericHandler=!0,this.registerListeners()}return g(a,[{key:"destroy",value:function(){this.unregisterListeners()}},{key:"isEventHandler",value:function(){return"object"===f(this.handledEvents)&&this.handledEvents.length&&"function"==typeof this.onEvent}},{key:"registerListeners",value:function(){this.isEventHandler()&&this.handledEvents.forEach(function(a){if("hlsEventGeneric"===a)throw new Error("Forbidden event name: "+a);this.hls.on(a,this.onEvent)}.bind(this))}},{key:"unregisterListeners",value:function(){this.isEventHandler()&&this.handledEvents.forEach(function(a){this.hls.off(a,this.onEvent)}.bind(this))}},{key:"onEvent",value:function(a,b){this.onEventGeneric(a,b)}},{key:"onEventGeneric",value:function(a,b){var c=function(a,b){var c="on"+a.replace("hls","");if("function"!=typeof this[c])throw new Error("Event "+a+" has no generic handler in this "+this.constructor.name+" class (tried "+c+")");return this[c].bind(this,b)};try{c.call(this,a,b).call()}catch(d){h.logger.error("internal error happened while processing "+a+":"+d.message),this.hls.trigger(k["default"].ERROR,{type:i.ErrorTypes.OTHER_ERROR,details:i.ErrorDetails.INTERNAL_EXCEPTION,fatal:!1,event:a,err:d})}}}]),a}();c["default"]=l},{26:26,28:28,45:45}],28:[function(a,b,c){"use strict";b.exports={MEDIA_ATTACHING:"hlsMediaAttaching",MEDIA_ATTACHED:"hlsMediaAttached",MEDIA_DETACHING:"hlsMediaDetaching",MEDIA_DETACHED:"hlsMediaDetached",BUFFER_RESET:"hlsBufferReset",BUFFER_CODECS:"hlsBufferCodecs",BUFFER_CREATED:"hlsBufferCreated",BUFFER_APPENDING:"hlsBufferAppending",BUFFER_APPENDED:"hlsBufferAppended",BUFFER_EOS:"hlsBufferEos",BUFFER_FLUSHING:"hlsBufferFlushing",BUFFER_FLUSHED:"hlsBufferFlushed",MANIFEST_LOADING:"hlsManifestLoading",MANIFEST_LOADED:"hlsManifestLoaded",MANIFEST_PARSED:"hlsManifestParsed",LEVEL_LOADING:"hlsLevelLoading",LEVEL_LOADED:"hlsLevelLoaded",LEVEL_UPDATED:"hlsLevelUpdated",LEVEL_PTS_UPDATED:"hlsLevelPtsUpdated",LEVEL_SWITCH:"hlsLevelSwitch",AUDIO_TRACKS_UPDATED:"hlsAudioTracksUpdated",AUDIO_TRACK_SWITCH:"hlsAudioTrackSwitch",AUDIO_TRACK_SWITCHING:"hlsAudioTrackSwitching",AUDIO_TRACK_SWITCHED:"hlsAudioTrackSwitched",AUDIO_TRACK_LOADING:"hlsAudioTrackLoading",AUDIO_TRACK_LOADED:"hlsAudioTrackLoaded",INIT_PTS_FOUND:"hlsInitPtsFound",FRAG_LOADING:"hlsFragLoading",FRAG_LOAD_PROGRESS:"hlsFragLoadProgress",FRAG_LOAD_EMERGENCY_ABORTED:"hlsFragLoadEmergencyAborted",FRAG_LOADED:"hlsFragLoaded",FRAG_DECRYPTED:"hlsFragDecrypted",FRAG_PARSING_INIT_SEGMENT:"hlsFragParsingInitSegment",FRAG_PARSING_USERDATA:"hlsFragParsingUserdata",FRAG_PARSING_METADATA:"hlsFragParsingMetadata",FRAG_PARSING_DATA:"hlsFragParsingData",FRAG_PARSED:"hlsFragParsed",FRAG_BUFFERED:"hlsFragBuffered",FRAG_CHANGED:"hlsFragChanged",
FPS_DROP:"hlsFpsDrop",FPS_DROP_LEVEL_CAPPING:"hlsFpsDropLevelCapping",ERROR:"hlsError",DESTROYING:"hlsDestroying",KEY_LOADING:"hlsKeyLoading",KEY_LOADED:"hlsKeyLoaded",STREAM_STATE_TRANSITION:"hlsStreamStateTransition"}},{}],29:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=function(){function a(){d(this,a)}return e(a,null,[{key:"getSilentFrame",value:function(a,b){switch(a){case"mp4a.40.2":if(1===b)return new Uint8Array([0,200,0,128,35,128]);if(2===b)return new Uint8Array([33,0,73,144,2,25,0,35,128]);if(3===b)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,142]);if(4===b)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,128,44,128,8,2,56]);if(5===b)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,130,48,4,153,0,33,144,2,56]);if(6===b)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,130,48,4,153,0,33,144,2,0,178,0,32,8,224]);break;default:if(1===b)return new Uint8Array([1,64,34,128,163,78,230,128,186,8,0,0,0,28,6,241,193,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94]);if(2===b)return new Uint8Array([1,64,34,128,163,94,230,128,186,8,0,0,0,0,149,0,6,241,161,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94]);if(3===b)return new Uint8Array([1,64,34,128,163,94,230,128,186,8,0,0,0,0,149,0,6,241,161,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94])}return null}}]),a}();c["default"]=f},{}],30:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=function(){function a(){d(this,a)}return e(a,null,[{key:"isBuffered",value:function(a,b){if(a)for(var c=a.buffered,d=0;d<c.length;d++)if(b>=c.start(d)&&b<=c.end(d))return!0;return!1}},{key:"bufferInfo",value:function(a,b,c){if(a){var d,e=a.buffered,f=[];for(d=0;d<e.length;d++)f.push({start:e.start(d),end:e.end(d)});return this.bufferedInfo(f,b,c)}return{len:0,start:0,end:0,nextStart:void 0}}},{key:"bufferedInfo",value:function(a,b,c){var d,e,f,g,h,i=[];for(a.sort(function(a,b){var c=a.start-b.start;return c?c:b.end-a.end}),h=0;h<a.length;h++){var j=i.length;if(j){var k=i[j-1].end;a[h].start-k<c?a[h].end>k&&(i[j-1].end=a[h].end):i.push(a[h])}else i.push(a[h])}for(h=0,d=0,e=f=b;h<i.length;h++){var l=i[h].start,m=i[h].end;if(b+c>=l&&b<m)e=l,f=m,d=f-b;else if(b+c<l){g=l;break}}return{len:d,start:e,end:f,nextStart:g}}}]),a}();c["default"]=f},{}],31:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=a(45),g=function(){function a(){d(this,a)}return e(a,null,[{key:"mergeDetails",value:function(b,c){var d,e=Math.max(b.startSN,c.startSN)-c.startSN,g=Math.min(b.endSN,c.endSN)-c.startSN,h=c.startSN-b.startSN,i=b.fragments,j=c.fragments,k=0;if(g<e)return void(c.PTSKnown=!1);for(var l=e;l<=g;l++){var m=i[h+l],n=j[l];n&&m&&(k=m.cc-n.cc,isNaN(m.startPTS)||(n.start=n.startPTS=m.startPTS,n.endPTS=m.endPTS,n.duration=m.duration,d=n))}if(k)for(f.logger.log("discontinuity sliding from playlist, take drift into account"),l=0;l<j.length;l++)j[l].cc+=k;if(d)a.updateFragPTSDTS(c,d.sn,d.startPTS,d.endPTS,d.startDTS,d.endDTS);else if(h>=0&&h<i.length){var o=i[h].start;for(l=0;l<j.length;l++)j[l].start+=o}c.PTSKnown=b.PTSKnown}},{key:"updateFragPTSDTS",value:function(b,c,d,e,f,g){var h,i,j,k;if(!b||c<b.startSN||c>b.endSN)return 0;if(h=c-b.startSN,i=b.fragments,j=i[h],!isNaN(j.startPTS)){var l=Math.abs(j.startPTS-d);isNaN(j.deltaPTS)?j.deltaPTS=l:j.deltaPTS=Math.max(l,j.deltaPTS),d=Math.min(d,j.startPTS),e=Math.max(e,j.endPTS),f=Math.min(f,j.startDTS),g=Math.max(g,j.endDTS)}var m=d-j.start;for(j.start=j.startPTS=d,j.endPTS=e,j.startDTS=f,j.endDTS=g,j.duration=e-d,k=h;k>0;k--)a.updatePTS(i,k,k-1);for(k=h;k<i.length-1;k++)a.updatePTS(i,k,k+1);return b.PTSKnown=!0,m}},{key:"updatePTS",value:function(a,b,c){var d=a[b],e=a[c],g=e.startPTS;isNaN(g)?c>b?e.start=d.start+d.duration:e.start=d.start-e.duration:c>b?(d.duration=g-d.start,d.duration<0&&f.logger.warn("negative duration computed for frag "+d.sn+",level "+d.level+", there should be some duration drift between playlist and fragment!")):(e.duration=d.start-g,e.duration<0&&f.logger.warn("negative duration computed for frag "+e.sn+",level "+e.level+", there should be some duration drift between playlist and fragment!"))}}]),a}();c["default"]=g},{45:45}],32:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=a(28),h=d(g),i=a(26),j=a(36),k=d(j),l=a(34),m=d(l),n=a(4),o=d(n),p=a(7),q=d(p),r=a(8),s=d(r),t=a(5),u=d(t),v=a(12),w=d(v),x=a(11),y=d(x),z=a(13),A=d(z),B=a(10),C=d(B),D=a(6),E=d(D),F=a(45),G=a(47),H=d(G),I=a(1),J=d(I),K=a(35),L=d(K),M=a(43),N=d(M),O=function(){function a(){var b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e(this,a);var c=a.DefaultConfig;if((b.liveSyncDurationCount||b.liveMaxLatencyDurationCount)&&(b.liveSyncDuration||b.liveMaxLatencyDuration))throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");for(var d in c)d in b||(b[d]=c[d]);if(void 0!==b.liveMaxLatencyDurationCount&&b.liveMaxLatencyDurationCount<=b.liveSyncDurationCount)throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be gt "liveSyncDurationCount"');if(void 0!==b.liveMaxLatencyDuration&&(b.liveMaxLatencyDuration<=b.liveSyncDuration||void 0===b.liveSyncDuration))throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be gt "liveSyncDuration"');(0,F.enableLogs)(b.debug),this.config=b;var f=this.observer=new J["default"];f.trigger=function(a){for(var b=arguments.length,c=Array(b>1?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];f.emit.apply(f,[a,a].concat(c))},f.off=function(a){for(var b=arguments.length,c=Array(b>1?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];f.removeListener.apply(f,[a].concat(c))},this.on=f.on.bind(f),this.off=f.off.bind(f),this.trigger=f.trigger.bind(f),this.playlistLoader=new k["default"](this),this.fragmentLoader=new m["default"](this),this.levelController=new y["default"](this),this.abrController=new b.abrController(this),this.bufferController=new b.bufferController(this),this.capLevelController=new b.capLevelController(this),this.fpsController=new b.fpsController(this),this.streamController=new b.streamController(this),this.audioStreamController=new b.audioStreamController(this),this.timelineController=new b.timelineController(this),this.audioTrackController=new E["default"](this),this.keyLoader=new L["default"](this)}return f(a,null,[{key:"isSupported",value:function(){return window.MediaSource=window.MediaSource||window.WebKitMediaSource,window.MediaSource&&"function"==typeof window.MediaSource.isTypeSupported&&window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')}},{key:"version",get:function(){return"0.6.21"}},{key:"Events",get:function(){return h["default"]}},{key:"ErrorTypes",get:function(){return i.ErrorTypes}},{key:"ErrorDetails",get:function(){return i.ErrorDetails}},{key:"DefaultConfig",get:function(){return a.defaultConfig||(a.defaultConfig={autoStartLoad:!0,startPosition:-1,defaultAudioCodec:void 0,debug:!1,capLevelOnFPSDrop:!1,capLevelToPlayerSize:!1,initialLiveManifestSize:1,maxBufferLength:30,maxBufferSize:6e7,maxBufferHole:.5,maxMaxBufferLength:600,maxSeekHole:2,lowBufferWatchdogPeriod:.5,highBufferWatchdogPeriod:3,nudgeOffset:.1,nudgeMaxRetry:3,maxFragLookUpTolerance:.2,liveSyncDurationCount:3,liveMaxLatencyDurationCount:1/0,liveSyncDuration:void 0,liveMaxLatencyDuration:void 0,enableWorker:!0,enableSoftwareAES:!0,manifestLoadingTimeOut:1e4,manifestLoadingMaxRetry:1,manifestLoadingRetryDelay:1e3,manifestLoadingMaxRetryTimeout:64e3,startLevel:void 0,levelLoadingTimeOut:1e4,levelLoadingMaxRetry:4,levelLoadingRetryDelay:1e3,levelLoadingMaxRetryTimeout:64e3,fragLoadingTimeOut:2e4,fragLoadingMaxRetry:6,fragLoadingRetryDelay:1e3,fragLoadingMaxRetryTimeout:64e3,fragLoadingLoopThreshold:3,startFragPrefetch:!1,fpsDroppedMonitoringPeriod:5e3,fpsDroppedMonitoringThreshold:.2,appendErrorMaxRetry:3,loader:H["default"],fLoader:void 0,pLoader:void 0,xhrSetup:void 0,fetchSetup:void 0,abrController:o["default"],bufferController:q["default"],capLevelController:s["default"],fpsController:C["default"],streamController:w["default"],audioStreamController:u["default"],timelineController:A["default"],cueHandler:N["default"],enableCEA708Captions:!0,enableMP2TPassThrough:!1,stretchShortVideoTrack:!1,forceKeyFrameOnDiscontinuity:!0,abrEwmaFastLive:3,abrEwmaSlowLive:9,abrEwmaFastVoD:3,abrEwmaSlowVoD:9,abrEwmaDefaultEstimate:5e5,abrBandWidthFactor:.95,abrBandWidthUpFactor:.7,maxStarvationDelay:4,maxLoadingDelay:4,minAutoBitrate:0}),a.defaultConfig},set:function(b){a.defaultConfig=b}}]),f(a,[{key:"destroy",value:function(){F.logger.log("destroy"),this.trigger(h["default"].DESTROYING),this.detachMedia(),this.playlistLoader.destroy(),this.fragmentLoader.destroy(),this.levelController.destroy(),this.abrController.destroy(),this.bufferController.destroy(),this.capLevelController.destroy(),this.fpsController.destroy(),this.streamController.destroy(),this.audioStreamController.destroy(),this.timelineController.destroy(),this.audioTrackController.destroy(),this.keyLoader.destroy(),this.url=null,this.observer.removeAllListeners()}},{key:"attachMedia",value:function(a){F.logger.log("attachMedia"),this.media=a,this.trigger(h["default"].MEDIA_ATTACHING,{media:a})}},{key:"detachMedia",value:function(){F.logger.log("detachMedia"),this.trigger(h["default"].MEDIA_DETACHING),this.media=null}},{key:"loadSource",value:function(a){F.logger.log("loadSource:"+a),this.url=a,this.trigger(h["default"].MANIFEST_LOADING,{url:a})}},{key:"startLoad",value:function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1;F.logger.log("startLoad("+a+")"),this.levelController.startLoad(),this.streamController.startLoad(a),this.audioStreamController.startLoad(a)}},{key:"stopLoad",value:function(){F.logger.log("stopLoad"),this.levelController.stopLoad(),this.streamController.stopLoad(),this.audioStreamController.stopLoad()}},{key:"swapAudioCodec",value:function(){F.logger.log("swapAudioCodec"),this.streamController.swapAudioCodec()}},{key:"recoverMediaError",value:function(){F.logger.log("recoverMediaError");var a=this.media;this.detachMedia(),this.attachMedia(a)}},{key:"levels",get:function(){return this.levelController.levels}},{key:"currentLevel",get:function(){return this.streamController.currentLevel},set:function(a){F.logger.log("set currentLevel:"+a),this.loadLevel=a,this.streamController.immediateLevelSwitch()}},{key:"nextLevel",get:function(){return this.streamController.nextLevel},set:function(a){F.logger.log("set nextLevel:"+a),this.levelController.manualLevel=a,this.streamController.nextLevelSwitch()}},{key:"loadLevel",get:function(){return this.levelController.level},set:function(a){F.logger.log("set loadLevel:"+a),this.levelController.manualLevel=a}},{key:"nextLoadLevel",get:function(){return this.levelController.nextLoadLevel},set:function(a){this.levelController.nextLoadLevel=a}},{key:"firstLevel",get:function(){return Math.max(this.levelController.firstLevel,this.abrController.minAutoLevel)},set:function(a){F.logger.log("set firstLevel:"+a),this.levelController.firstLevel=a}},{key:"startLevel",get:function(){return this.levelController.startLevel},set:function(a){F.logger.log("set startLevel:"+a),this.levelController.startLevel=a}},{key:"autoLevelCapping",get:function(){return this.abrController.autoLevelCapping},set:function(a){F.logger.log("set autoLevelCapping:"+a),this.abrController.autoLevelCapping=a}},{key:"autoLevelEnabled",get:function(){return this.levelController.manualLevel===-1}},{key:"manualLevel",get:function(){return this.levelController.manualLevel}},{key:"audioTracks",get:function(){return this.audioTrackController.audioTracks}},{key:"audioTrack",get:function(){return this.audioTrackController.audioTrack},set:function(a){this.audioTrackController.audioTrack=a}},{key:"liveSyncPosition",get:function(){return this.streamController.liveSyncPosition}}]),a}();c["default"]=O},{1:1,10:10,11:11,12:12,13:13,26:26,28:28,34:34,35:35,36:36,4:4,43:43,45:45,47:47,5:5,6:6,7:7,8:8}],33:[function(a,b,c){"use strict";b.exports=a(32)["default"]},{32:32}],34:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}Object.defineProperty(c,"__esModule",{value:!0});var h=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),i=a(28),j=d(i),k=a(27),l=d(k),m=a(26),n=a(45),o=function(a){function b(a){e(this,b);var c=f(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,a,j["default"].FRAG_LOADING));return c.loaders={},c}return g(b,a),h(b,[{key:"destroy",value:function(){var a=this.loaders;for(var b in a){var c=a[b];c&&c.destroy()}this.loaders={},l["default"].prototype.destroy.call(this)}},{key:"onFragLoading",value:function(a){var b=a.frag,c=b.type,d=this.loaders[c],e=this.hls.config;b.loaded=0,d&&(n.logger.warn("abort previous fragment loader for type:"+c),d.abort()),d=this.loaders[c]=b.loader="undefined"!=typeof e.fLoader?new e.fLoader(e):new e.loader(e);var f=void 0,g=void 0,h=void 0;f={url:b.url,frag:b,responseType:"arraybuffer",progressData:!1};var i=b.byteRangeStartOffset,j=b.byteRangeEndOffset;isNaN(i)||isNaN(j)||(f.rangeStart=i,f.rangeEnd=j),g={timeout:e.fragLoadingTimeOut,maxRetry:0,retryDelay:0,maxRetryDelay:e.fragLoadingMaxRetryTimeout},h={onSuccess:this.loadsuccess.bind(this),onError:this.loaderror.bind(this),onTimeout:this.loadtimeout.bind(this),onProgress:this.loadprogress.bind(this)},d.load(f,g,h)}},{key:"loadsuccess",value:function(a,b,c){var d=a.data,e=c.frag;e.loader=void 0,this.loaders[e.type]=void 0,this.hls.trigger(j["default"].FRAG_LOADED,{payload:d,frag:e,stats:b})}},{key:"loaderror",value:function(a,b){var c=b.loader;c&&c.abort(),this.loaders[b.type]=void 0,this.hls.trigger(j["default"].ERROR,{type:m.ErrorTypes.NETWORK_ERROR,details:m.ErrorDetails.FRAG_LOAD_ERROR,fatal:!1,frag:b.frag,response:a})}},{key:"loadtimeout",value:function(a,b){var c=b.loader;c&&c.abort(),this.loaders[b.type]=void 0,this.hls.trigger(j["default"].ERROR,{type:m.ErrorTypes.NETWORK_ERROR,details:m.ErrorDetails.FRAG_LOAD_TIMEOUT,fatal:!1,frag:b.frag})}},{key:"loadprogress",value:function(a,b,c){var d=b.frag;d.loaded=a.loaded,this.hls.trigger(j["default"].FRAG_LOAD_PROGRESS,{frag:d,stats:a})}}]),b}(l["default"]);c["default"]=o},{26:26,27:27,28:28,45:45}],35:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}Object.defineProperty(c,"__esModule",{value:!0});var h=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),i=a(28),j=d(i),k=a(27),l=d(k),m=a(26),n=a(45),o=function(a){function b(a){e(this,b);var c=f(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,a,j["default"].KEY_LOADING));return c.loaders={},c.decryptkey=null,c.decrypturl=null,c}return g(b,a),h(b,[{key:"destroy",value:function(){for(var a in this.loaders){var b=this.loaders[a];b&&b.destroy()}this.loaders={},l["default"].prototype.destroy.call(this)}},{key:"onKeyLoading",value:function(a){var b=a.frag,c=b.type,d=this.loaders[c],e=b.decryptdata,f=e.uri;if(f!==this.decrypturl||null===this.decryptkey){var g=this.hls.config;d&&(n.logger.warn("abort previous key loader for type:"+c),d.abort()),b.loader=this.loaders[c]=new g.loader(g),this.decrypturl=f,this.decryptkey=null;var h=void 0,i=void 0,k=void 0;h={url:f,frag:b,responseType:"arraybuffer"},i={timeout:g.fragLoadingTimeOut,maxRetry:g.fragLoadingMaxRetry,retryDelay:g.fragLoadingRetryDelay,maxRetryDelay:g.fragLoadingMaxRetryTimeout},k={onSuccess:this.loadsuccess.bind(this),onError:this.loaderror.bind(this),onTimeout:this.loadtimeout.bind(this)},b.loader.load(h,i,k)}else this.decryptkey&&(e.key=this.decryptkey,this.hls.trigger(j["default"].KEY_LOADED,{frag:b}))}},{key:"loadsuccess",value:function(a,b,c){var d=c.frag;this.decryptkey=d.decryptdata.key=new Uint8Array(a.data),d.loader=void 0,this.loaders[d.type]=void 0,this.hls.trigger(j["default"].KEY_LOADED,{frag:d})}},{key:"loaderror",value:function(a,b){var c=b.frag,d=c.loader;d&&d.abort(),this.loaders[b.type]=void 0,this.hls.trigger(j["default"].ERROR,{type:m.ErrorTypes.NETWORK_ERROR,details:m.ErrorDetails.KEY_LOAD_ERROR,fatal:!1,frag:c,response:a})}},{key:"loadtimeout",value:function(a,b){var c=b.frag,d=c.loader;d&&d.abort(),this.loaders[b.type]=void 0,this.hls.trigger(j["default"].ERROR,{type:m.ErrorTypes.NETWORK_ERROR,details:m.ErrorDetails.KEY_LOAD_TIMEOUT,fatal:!1,frag:c})}}]),b}(l["default"]);c["default"]=o},{26:26,27:27,28:28,45:45}],36:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function g(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var h=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),i=a(2),j=d(i),k=a(28),l=d(k),m=a(27),n=d(m),o=a(26),p=a(40),q=d(p),r=a(45),s=/#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g,t=/#EXT-X-MEDIA:(.*)/g,u=/#EXTINF:(\d*(?:\.\d+)?)(?:,(.*))?|(?!#)(\S.+)|#EXT-X-BYTERANGE: *(.+)|#EXT-X-PROGRAM-DATE-TIME:(.+)|#.*/g,v=/(?:(?:#(EXTM3U))|(?:#EXT-X-(PLAYLIST-TYPE):(.+))|(?:#EXT-X-(MEDIA-SEQUENCE): *(\d+))|(?:#EXT-X-(TARGETDURATION): *(\d+))|(?:#EXT-X-(KEY):(.+))|(?:#EXT-X-(START):(.+))|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DISCONTINUITY-SEQ)UENCE:(\d+))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(VERSION):(\d+))|(?:#EXT-X-(MAP):(.+))|(?:(#)(.*):(.*))|(?:(#)(.*))(?:.*)\r?\n?/,w=function(){function a(){g(this,a),this.method=null,this.key=null,this.iv=null,this._uri=null}return h(a,[{key:"uri",get:function(){return!this._uri&&this.reluri&&(this._uri=j["default"].buildAbsoluteURL(this.baseuri,this.reluri)),this._uri}}]),a}(),x=function(){function a(){g(this,a),this._url=null,this._byteRange=null,this._decryptdata=null,this.tagList=[]}return h(a,[{key:"createInitializationVector",value:function(a){for(var b=new Uint8Array(16),c=12;c<16;c++)b[c]=a>>8*(15-c)&255;return b}},{key:"fragmentDecryptdataFromLevelkey",value:function(a,b){var c=a;return a&&a.method&&a.uri&&!a.iv&&(c=new w,c.method=a.method,c.baseuri=a.baseuri,c.reluri=a.reluri,c.iv=this.createInitializationVector(b)),c}},{key:"cloneObj",value:function(a){return JSON.parse(JSON.stringify(a))}},{key:"url",get:function(){return!this._url&&this.relurl&&(this._url=j["default"].buildAbsoluteURL(this.baseurl,this.relurl)),this._url},set:function(a){this._url=a}},{key:"programDateTime",get:function(){return!this._programDateTime&&this.rawProgramDateTime&&(this._programDateTime=new Date(Date.parse(this.rawProgramDateTime))),this._programDateTime}},{key:"byteRange",get:function(){if(!this._byteRange){var a=this._byteRange=[];if(this.rawByteRange){var b=this.rawByteRange.split("@",2);if(1===b.length){var c=this.lastByteRangeEndOffset;a[0]=c?c:0}else a[0]=parseInt(b[1]);a[1]=parseInt(b[0])+a[0]}}return this._byteRange}},{key:"byteRangeStartOffset",get:function(){return this.byteRange[0]}},{key:"byteRangeEndOffset",get:function(){return this.byteRange[1]}},{key:"decryptdata",get:function(){return this._decryptdata||(this._decryptdata=this.fragmentDecryptdataFromLevelkey(this.levelkey,this.sn)),this._decryptdata}}]),a}(),y=function(a){function b(a){g(this,b);var c=e(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,a,l["default"].MANIFEST_LOADING,l["default"].LEVEL_LOADING,l["default"].AUDIO_TRACK_LOADING));return c.loaders={},c}return f(b,a),h(b,[{key:"destroy",value:function(){for(var a in this.loaders){var b=this.loaders[a];b&&b.destroy()}this.loaders={},n["default"].prototype.destroy.call(this)}},{key:"onManifestLoading",value:function(a){this.load(a.url,{type:"manifest"})}},{key:"onLevelLoading",value:function(a){this.load(a.url,{type:"level",level:a.level,id:a.id})}},{key:"onAudioTrackLoading",value:function(a){this.load(a.url,{type:"audioTrack",id:a.id})}},{key:"load",value:function(a,b){var c=this.loaders[b.type];if(c){var d=c.context;if(d&&d.url===a)return void r.logger.trace("playlist request ongoing");r.logger.warn("abort previous loader for type:"+b.type),c.abort()}var e=this.hls.config,f=void 0,g=void 0,h=void 0,i=void 0;"manifest"===b.type?(f=e.manifestLoadingMaxRetry,g=e.manifestLoadingTimeOut,h=e.manifestLoadingRetryDelay,i=e.manifestLoadingMaxRetryTimeout):(f=e.levelLoadingMaxRetry,g=e.levelLoadingTimeOut,h=e.levelLoadingRetryDelay,i=e.levelLoadingMaxRetryTimeout,r.logger.log("loading playlist for "+b.type+" "+(b.level||b.id))),c=this.loaders[b.type]=b.loader="undefined"!=typeof e.pLoader?new e.pLoader(e):new e.loader(e),b.url=a,b.responseType="";var j=void 0,k=void 0;j={timeout:g,maxRetry:f,retryDelay:h,maxRetryDelay:i},k={onSuccess:this.loadsuccess.bind(this),onError:this.loaderror.bind(this),onTimeout:this.loadtimeout.bind(this)},c.load(b,j,k)}},{key:"resolve",value:function(a,b){return j["default"].buildAbsoluteURL(b,a)}},{key:"parseMasterPlaylist",value:function(a,b){var c=[],d=void 0;for(s.lastIndex=0;null!=(d=s.exec(a));){var e={},f=e.attrs=new q["default"](d[1]);e.url=this.resolve(d[2],b);var g=f.decimalResolution("RESOLUTION");g&&(e.width=g.width,e.height=g.height),e.bitrate=f.decimalInteger("AVERAGE-BANDWIDTH")||f.decimalInteger("BANDWIDTH"),e.name=f.NAME;var h=f.CODECS;if(h){h=h.split(/[ ,]+/);for(var i=0;i<h.length;i++){var j=h[i];j.indexOf("avc1")!==-1?e.videoCodec=this.avc1toavcoti(j):e.audioCodec=j}}c.push(e)}return c}},{key:"parseMasterPlaylistMedia",value:function(a,b,c){var d=void 0,e=[];for(t.lastIndex=0;null!=(d=t.exec(a));){var f={},g=new q["default"](d[1]);g.TYPE===c&&(f.groupId=g["GROUP-ID"],f.name=g.NAME,f.type=c,f["default"]="YES"===g.DEFAULT,f.autoselect="YES"===g.AUTOSELECT,f.forced="YES"===g.FORCED,g.URI&&(f.url=this.resolve(g.URI,b)),f.lang=g.LANGUAGE,f.name||(f.name=f.lang),e.push(f))}return e}},{key:"avc1toavcoti",value:function(a){var b,c=a.split(".");return c.length>2?(b=c.shift()+".",b+=parseInt(c.shift()).toString(16),b+=("000"+parseInt(c.shift()).toString(16)).substr(-4)):b=a,b}},{key:"parseLevelPlaylist",value:function(a,b,c,d){var e,f,g=0,h=0,i={type:null,version:null,url:b,fragments:[],live:!0,startSN:0},j=new w,k=0,l=null,m=new x;for(u.lastIndex=0;null!==(e=u.exec(a));){var n=e[1];if(n){m.duration=parseFloat(n);var o=(" "+e[2]).slice(1);m.title=o?o:null,m.tagList.push(o?["INF",n,o]:["INF",n])}else if(e[3]){if(!isNaN(m.duration)){var p=g++;m.type=d,m.start=h,m.levelkey=j,m.sn=p,m.level=c,m.cc=k,m.baseurl=b,m.relurl=(" "+e[3]).slice(1),i.fragments.push(m),l=m,h+=m.duration,m=new x}}else if(e[4]){if(m.rawByteRange=(" "+e[4]).slice(1),l){var s=l.byteRangeEndOffset;s&&(m.lastByteRangeEndOffset=s)}}else if(e[5])m.rawProgramDateTime=(" "+e[5]).slice(1),m.tagList.push(["PROGRAM-DATE-TIME",m.rawProgramDateTime]);else{for(e=e[0].match(v),f=1;f<e.length&&void 0===e[f];f++);var t=(" "+e[f+1]).slice(1),y=(" "+e[f+2]).slice(1);switch(e[f]){case"#":m.tagList.push(y?[t,y]:[t]);break;case"PLAYLIST-TYPE":i.type=t.toUpperCase();break;case"MEDIA-SEQUENCE":g=i.startSN=parseInt(t);break;case"TARGETDURATION":i.targetduration=parseFloat(t);break;case"VERSION":i.version=parseInt(t);break;case"EXTM3U":break;case"ENDLIST":i.live=!1;break;case"DIS":k++,m.tagList.push(["DIS"]);break;case"DISCONTINUITY-SEQ":k=parseInt(t);break;case"KEY":var z=t,A=new q["default"](z),B=A.enumeratedString("METHOD"),C=A.URI,D=A.hexadecimalInteger("IV");B&&(j=new w,C&&"AES-128"===B&&(j.method=B,j.baseuri=b,j.reluri=C,j.key=null,j.iv=D));break;case"START":var E=t,F=new q["default"](E),G=F.decimalFloatingPoint("TIME-OFFSET");isNaN(G)||(i.startTimeOffset=G);break;case"MAP":var H=new q["default"](t);m.relurl=H.URI,m.rawByteRange=H.BYTERANGE,m.baseurl=b,m.level=c,m.type=d,m.sn="initSegment",i.initSegment=m,m=new x;break;default:r.logger.warn("line parsed but not handled: "+e)}}}return m=l,m&&!m.relurl&&(i.fragments.pop(),h-=m.duration),i.totalduration=h,i.averagetargetduration=h/i.fragments.length,i.endSN=g-1,i}},{key:"loadsuccess",value:function(a,b,c){var d=a.data,e=a.url,f=c.type,g=c.id,h=c.level,i=this.hls;if(this.loaders[f]=void 0,void 0!==e&&0!==e.indexOf("data:")||(e=c.url),b.tload=performance.now(),0===d.indexOf("#EXTM3U"))if(d.indexOf("#EXTINF:")>0){var j="audioTrack"!==f,k=this.parseLevelPlaylist(d,e,(j?h:g)||0,j?"main":"audio");"manifest"===f&&i.trigger(l["default"].MANIFEST_LOADED,{levels:[{url:e,details:k}],audioTracks:[],url:e,stats:b}),b.tparsed=performance.now(),k.targetduration?j?i.trigger(l["default"].LEVEL_LOADED,{details:k,level:h||0,id:g||0,stats:b}):i.trigger(l["default"].AUDIO_TRACK_LOADED,{details:k,id:g,stats:b}):i.trigger(l["default"].ERROR,{type:o.ErrorTypes.NETWORK_ERROR,details:o.ErrorDetails.MANIFEST_PARSING_ERROR,fatal:!0,url:e,reason:"invalid targetduration"})}else{var m=this.parseMasterPlaylist(d,e);if(m.length){var n=this.parseMasterPlaylistMedia(d,e,"AUDIO");if(n.length){var p=!1;n.forEach(function(a){a.url||(p=!0)}),p===!1&&m[0].audioCodec&&!m[0].attrs.AUDIO&&(r.logger.log("audio codec signaled in quality level, but no embedded audio track signaled, create one"),n.unshift({type:"main",name:"main"}))}i.trigger(l["default"].MANIFEST_LOADED,{levels:m,audioTracks:n,url:e,stats:b})}else i.trigger(l["default"].ERROR,{type:o.ErrorTypes.NETWORK_ERROR,details:o.ErrorDetails.MANIFEST_PARSING_ERROR,fatal:!0,url:e,reason:"no level found in manifest"})}else i.trigger(l["default"].ERROR,{type:o.ErrorTypes.NETWORK_ERROR,details:o.ErrorDetails.MANIFEST_PARSING_ERROR,fatal:!0,url:e,reason:"no EXTM3U delimiter"})}},{key:"loaderror",value:function(a,b){var c,d,e=b.loader;switch(b.type){case"manifest":c=o.ErrorDetails.MANIFEST_LOAD_ERROR,d=!0;break;case"level":c=o.ErrorDetails.LEVEL_LOAD_ERROR,d=!1;break;case"audioTrack":c=o.ErrorDetails.AUDIO_TRACK_LOAD_ERROR,d=!1}e&&(e.abort(),this.loaders[b.type]=void 0),this.hls.trigger(l["default"].ERROR,{type:o.ErrorTypes.NETWORK_ERROR,details:c,fatal:d,url:e.url,loader:e,response:a,context:b})}},{key:"loadtimeout",value:function(a,b){var c,d,e=b.loader;switch(b.type){case"manifest":c=o.ErrorDetails.MANIFEST_LOAD_TIMEOUT,d=!0;break;case"level":c=o.ErrorDetails.LEVEL_LOAD_TIMEOUT,d=!1;break;case"audioTrack":c=o.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT,d=!1}e&&(e.abort(),this.loaders[b.type]=void 0),this.hls.trigger(l["default"].ERROR,{type:o.ErrorTypes.NETWORK_ERROR,details:c,fatal:d,url:e.url,loader:e,context:b})}}]),b}(n["default"]);c["default"]=y},{2:2,26:26,27:27,28:28,40:40,45:45}],37:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=function(){function a(){d(this,a)}return e(a,null,[{key:"init",value:function(){a.types={avc1:[],avcC:[],btrt:[],dinf:[],dref:[],esds:[],ftyp:[],hdlr:[],mdat:[],mdhd:[],mdia:[],mfhd:[],minf:[],moof:[],moov:[],mp4a:[],".mp3":[],mvex:[],mvhd:[],pasp:[],sdtp:[],stbl:[],stco:[],stsc:[],stsd:[],stsz:[],stts:[],tfdt:[],tfhd:[],traf:[],trak:[],trun:[],trex:[],tkhd:[],vmhd:[],smhd:[]};var b;for(b in a.types)a.types.hasOwnProperty(b)&&(a.types[b]=[b.charCodeAt(0),b.charCodeAt(1),b.charCodeAt(2),b.charCodeAt(3)]);var c=new Uint8Array([0,0,0,0,0,0,0,0,118,105,100,101,0,0,0,0,0,0,0,0,0,0,0,0,86,105,100,101,111,72,97,110,100,108,101,114,0]),d=new Uint8Array([0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0]);a.HDLR_TYPES={video:c,audio:d};var e=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1]),f=new Uint8Array([0,0,0,0,0,0,0,0]);a.STTS=a.STSC=a.STCO=f,a.STSZ=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0]),a.VMHD=new Uint8Array([0,0,0,1,0,0,0,0,0,0,0,0]),a.SMHD=new Uint8Array([0,0,0,0,0,0,0,0]),a.STSD=new Uint8Array([0,0,0,0,0,0,0,1]);var g=new Uint8Array([105,115,111,109]),h=new Uint8Array([97,118,99,49]),i=new Uint8Array([0,0,0,1]);a.FTYP=a.box(a.types.ftyp,g,i,g,h),a.DINF=a.box(a.types.dinf,a.box(a.types.dref,e))}},{key:"box",value:function(a){for(var b,c=Array.prototype.slice.call(arguments,1),d=8,e=c.length,f=e;e--;)d+=c[e].byteLength;for(b=new Uint8Array(d),b[0]=d>>24&255,b[1]=d>>16&255,b[2]=d>>8&255,b[3]=255&d,b.set(a,4),e=0,d=8;e<f;e++)b.set(c[e],d),d+=c[e].byteLength;return b;
}},{key:"hdlr",value:function(b){return a.box(a.types.hdlr,a.HDLR_TYPES[b])}},{key:"mdat",value:function(b){return a.box(a.types.mdat,b)}},{key:"mdhd",value:function(b,c){return c*=b,a.box(a.types.mdhd,new Uint8Array([0,0,0,0,0,0,0,2,0,0,0,3,b>>24&255,b>>16&255,b>>8&255,255&b,c>>24,c>>16&255,c>>8&255,255&c,85,196,0,0]))}},{key:"mdia",value:function(b){return a.box(a.types.mdia,a.mdhd(b.timescale,b.duration),a.hdlr(b.type),a.minf(b))}},{key:"mfhd",value:function(b){return a.box(a.types.mfhd,new Uint8Array([0,0,0,0,b>>24,b>>16&255,b>>8&255,255&b]))}},{key:"minf",value:function(b){return"audio"===b.type?a.box(a.types.minf,a.box(a.types.smhd,a.SMHD),a.DINF,a.stbl(b)):a.box(a.types.minf,a.box(a.types.vmhd,a.VMHD),a.DINF,a.stbl(b))}},{key:"moof",value:function(b,c,d){return a.box(a.types.moof,a.mfhd(b),a.traf(d,c))}},{key:"moov",value:function(b){for(var c=b.length,d=[];c--;)d[c]=a.trak(b[c]);return a.box.apply(null,[a.types.moov,a.mvhd(b[0].timescale,b[0].duration)].concat(d).concat(a.mvex(b)))}},{key:"mvex",value:function(b){for(var c=b.length,d=[];c--;)d[c]=a.trex(b[c]);return a.box.apply(null,[a.types.mvex].concat(d))}},{key:"mvhd",value:function(b,c){c*=b;var d=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,2,b>>24&255,b>>16&255,b>>8&255,255&b,c>>24&255,c>>16&255,c>>8&255,255&c,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255]);return a.box(a.types.mvhd,d)}},{key:"sdtp",value:function(b){var c,d,e=b.samples||[],f=new Uint8Array(4+e.length);for(d=0;d<e.length;d++)c=e[d].flags,f[d+4]=c.dependsOn<<4|c.isDependedOn<<2|c.hasRedundancy;return a.box(a.types.sdtp,f)}},{key:"stbl",value:function(b){return a.box(a.types.stbl,a.stsd(b),a.box(a.types.stts,a.STTS),a.box(a.types.stsc,a.STSC),a.box(a.types.stsz,a.STSZ),a.box(a.types.stco,a.STCO))}},{key:"avc1",value:function(b){var c,d,e,f=[],g=[];for(c=0;c<b.sps.length;c++)d=b.sps[c],e=d.byteLength,f.push(e>>>8&255),f.push(255&e),f=f.concat(Array.prototype.slice.call(d));for(c=0;c<b.pps.length;c++)d=b.pps[c],e=d.byteLength,g.push(e>>>8&255),g.push(255&e),g=g.concat(Array.prototype.slice.call(d));var h=a.box(a.types.avcC,new Uint8Array([1,f[3],f[4],f[5],255,224|b.sps.length].concat(f).concat([b.pps.length]).concat(g))),i=b.width,j=b.height,k=b.pixelRatio[0],l=b.pixelRatio[1];return a.box(a.types.avc1,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,i>>8&255,255&i,j>>8&255,255&j,0,72,0,0,0,72,0,0,0,0,0,0,0,1,18,100,97,105,108,121,109,111,116,105,111,110,47,104,108,115,46,106,115,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,17,17]),h,a.box(a.types.btrt,new Uint8Array([0,28,156,128,0,45,198,192,0,45,198,192])),a.box(a.types.pasp,new Uint8Array([k>>24,k>>16&255,k>>8&255,255&k,l>>24,l>>16&255,l>>8&255,255&l])))}},{key:"esds",value:function(a){var b=a.config.length;return new Uint8Array([0,0,0,0,3,23+b,0,1,0,4,15+b,64,21,0,0,0,0,0,0,0,0,0,0,0,5].concat([b]).concat(a.config).concat([6,1,2]))}},{key:"mp4a",value:function(b){var c=b.audiosamplerate;return a.box(a.types.mp4a,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,b.channelCount,0,16,0,0,0,0,c>>8&255,255&c,0,0]),a.box(a.types.esds,a.esds(b)))}},{key:"mp3",value:function(b){var c=b.audiosamplerate;return a.box(a.types[".mp3"],new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,b.channelCount,0,16,0,0,0,0,c>>8&255,255&c,0,0]))}},{key:"stsd",value:function(b){return"audio"===b.type?b.isAAC||"mp3"!==b.codec?a.box(a.types.stsd,a.STSD,a.mp4a(b)):a.box(a.types.stsd,a.STSD,a.mp3(b)):a.box(a.types.stsd,a.STSD,a.avc1(b))}},{key:"tkhd",value:function(b){var c=b.id,d=b.duration*b.timescale,e=b.width,f=b.height;return a.box(a.types.tkhd,new Uint8Array([0,0,0,7,0,0,0,0,0,0,0,0,c>>24&255,c>>16&255,c>>8&255,255&c,0,0,0,0,d>>24,d>>16&255,d>>8&255,255&d,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,e>>8&255,255&e,0,0,f>>8&255,255&f,0,0]))}},{key:"traf",value:function(b,c){var d=a.sdtp(b),e=b.id;return a.box(a.types.traf,a.box(a.types.tfhd,new Uint8Array([0,0,0,0,e>>24,e>>16&255,e>>8&255,255&e])),a.box(a.types.tfdt,new Uint8Array([0,0,0,0,c>>24,c>>16&255,c>>8&255,255&c])),a.trun(b,d.length+16+16+8+16+8+8),d)}},{key:"trak",value:function(b){return b.duration=b.duration||4294967295,a.box(a.types.trak,a.tkhd(b),a.mdia(b))}},{key:"trex",value:function(b){var c=b.id;return a.box(a.types.trex,new Uint8Array([0,0,0,0,c>>24,c>>16&255,c>>8&255,255&c,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1]))}},{key:"trun",value:function(b,c){var d,e,f,g,h,i,j=b.samples||[],k=j.length,l=12+16*k,m=new Uint8Array(l);for(c+=8+l,m.set([0,0,15,1,k>>>24&255,k>>>16&255,k>>>8&255,255&k,c>>>24&255,c>>>16&255,c>>>8&255,255&c],0),d=0;d<k;d++)e=j[d],f=e.duration,g=e.size,h=e.flags,i=e.cts,m.set([f>>>24&255,f>>>16&255,f>>>8&255,255&f,g>>>24&255,g>>>16&255,g>>>8&255,255&g,h.isLeading<<2|h.dependsOn,h.isDependedOn<<6|h.hasRedundancy<<4|h.paddingValue<<1|h.isNonSync,61440&h.degradPrio,15&h.degradPrio,i>>>24&255,i>>>16&255,i>>>8&255,255&i],12+16*d);return a.box(a.types.trun,m)}},{key:"initSegment",value:function(b){a.types||a.init();var c,d=a.moov(b);return c=new Uint8Array(a.FTYP.byteLength+d.byteLength),c.set(a.FTYP),c.set(d,a.FTYP.byteLength),c}}]),a}();c["default"]=f},{}],38:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=a(29),h=d(g),i=a(28),j=d(i),k=a(45),l=a(37),m=d(l),n=a(26),o=function(){function a(b,c,d,f){e(this,a),this.observer=b,this.id=c,this.config=d,this.typeSupported=f,this.ISGenerated=!1,this.PES2MP4SCALEFACTOR=4,this.PES_TIMESCALE=9e4,this.MP4_TIMESCALE=this.PES_TIMESCALE/this.PES2MP4SCALEFACTOR}return f(a,[{key:"destroy",value:function(){}},{key:"insertDiscontinuity",value:function(){this._initPTS=this._initDTS=void 0}},{key:"switchLevel",value:function(){this.ISGenerated=!1}},{key:"remux",value:function(a,b,c,d,e,f,g,h,i,k,l){if(this.level=a,this.sn=b,this.ISGenerated||this.generateIS(d,e,h,c),null!==l&&(this._initPTS=this._initDTS=l),this.ISGenerated)if(d.samples.length){var m=this.remuxAudio(d,h,i,k);if(e.samples.length){var n=void 0;m&&(n=m.endPTS-m.startPTS),this.remuxVideo(e,h,i,n)}}else{var o=void 0;e.samples.length&&(o=this.remuxVideo(e,h,i)),o&&d.codec&&this.remuxEmptyAudio(d,h,i,o)}f.samples.length&&this.remuxID3(f,h),g.samples.length&&this.remuxText(g,h),this.observer.trigger(j["default"].FRAG_PARSED,{id:this.id,level:this.level,sn:this.sn})}},{key:"generateIS",value:function(a,b,c,d){var e,f,g=this.observer,h=a.samples,i=b.samples,l=this.PES_TIMESCALE,o=this.typeSupported,p="audio/mp4",q={},r={id:this.id,level:this.level,sn:this.sn,tracks:q,unique:!1},s=void 0===this._initPTS;s&&(e=f=1/0),a.config&&h.length&&(a.timescale=a.audiosamplerate,a.timescale*a.duration>Math.pow(2,32)&&!function(){var b=function c(a,b){return b?c(b,a%b):a};a.timescale=a.audiosamplerate/b(a.audiosamplerate,a.isAAC?1024:1152)}(),k.logger.log("audio mp4 timescale :"+a.timescale),a.isAAC||(o.mpeg?(p="audio/mpeg",a.codec=""):o.mp3&&(a.codec="mp3")),q.audio={container:p,codec:a.codec,initSegment:!a.isAAC&&o.mpeg?new Uint8Array:m["default"].initSegment([a]),metadata:{channelCount:a.channelCount}},s&&(e=f=h[0].pts-l*c)),b.sps&&b.pps&&i.length&&(b.timescale=this.MP4_TIMESCALE,q.video={container:"video/mp4",codec:b.codec,initSegment:m["default"].initSegment([b]),metadata:{width:b.width,height:b.height}},s&&(e=Math.min(e,i[0].pts-l*c),f=Math.min(f,i[0].dts-l*c),this.observer.trigger(j["default"].INIT_PTS_FOUND,{id:this.id,initPTS:e,cc:d}))),Object.keys(q).length?(g.trigger(j["default"].FRAG_PARSING_INIT_SEGMENT,r),this.ISGenerated=!0,s&&(this._initPTS=e,this._initDTS=f)):g.trigger(j["default"].ERROR,{type:n.ErrorTypes.MEDIA_ERROR,id:this.id,details:n.ErrorDetails.FRAG_PARSING_ERROR,fatal:!1,reason:"no audio/video samples found"})}},{key:"remuxVideo",value:function(a,b,c,d){var e,f,g,h,i,l,o,p,q=8,r=this.PES_TIMESCALE,s=this.PES2MP4SCALEFACTOR,t=a.samples,u=[],v=t.length,w=this._PTSNormalize,x=this._initDTS;t.sort(function(a,b){var c=a.dts-b.dts;return c?c:a.pts-b.pts});var y=t.reduce(function(a,b){return Math.max(Math.min(a,b.pts-b.dts),-18e3)},0);if(y<0){k.logger.warn("PTS < DTS detected in video samples, shifting DTS by "+Math.round(y/90)+" ms to overcome this issue");for(var z=0;z<t.length;z++)t[z].dts+=y}var A=void 0;A=c?this.nextAvcDts:b*r;var B=t[0];i=Math.max(w(B.dts-x,A),0),h=Math.max(w(B.pts-x,A),0);var C=Math.round((i-A)/90);c&&C&&(C>1?k.logger.log("AVC:"+C+" ms hole between fragments detected,filling it"):C<-1&&k.logger.log("AVC:"+-C+" ms overlapping between fragments detected"),i=A,t[0].dts=i+x,h=Math.max(h-C,A),t[0].pts=h+x,k.logger.log("Video/PTS/DTS adjusted: "+Math.round(h/90)+"/"+Math.round(i/90)+",delta:"+C+" ms")),l=i,B=t[t.length-1],p=Math.max(w(B.dts-x,A),0),o=Math.max(w(B.pts-x,A),0),o=Math.max(o,p);var D=navigator.vendor,E=navigator.userAgent,F=D&&D.indexOf("Apple")>-1&&E&&!E.match("CriOS");F&&(e=Math.round((p-i)/(s*(t.length-1))));for(var G=0;G<v;G++){var H=t[G];F?H.dts=i+G*s*e:(H.dts=Math.max(w(H.dts-x,A),i),H.dts=Math.round(H.dts/s)*s),H.pts=Math.max(w(H.pts-x,A),H.dts),H.pts=Math.round(H.pts/s)*s}var I=a.len+4*a.nbNalu+8;try{f=new Uint8Array(I)}catch(J){return void this.observer.trigger(j["default"].ERROR,{type:n.ErrorTypes.MUX_ERROR,level:this.level,id:this.id,details:n.ErrorDetails.REMUX_ALLOC_ERROR,fatal:!1,bytes:I,reason:"fail allocating video mdat "+I})}var K=new DataView(f.buffer);K.setUint32(0,I),f.set(m["default"].types.mdat,4);for(var L=0;L<v;L++){for(var M=t[L],N=M.units.units,O=0,P=void 0,Q=0,R=N.length;Q<R;Q++){var S=N[Q],T=S.data,U=S.data.byteLength;K.setUint32(q,U),q+=4,f.set(T,q),q+=U,O+=4+U}if(F)P=Math.max(0,e*Math.round((M.pts-M.dts)/(s*e)));else{if(L<v-1)e=t[L+1].dts-M.dts;else{var V=this.config,W=M.dts-t[L>0?L-1:L].dts;if(V.stretchShortVideoTrack){var X=V.maxBufferHole,Y=V.maxSeekHole,Z=Math.floor(Math.min(X,Y)*r),$=(d?h+d*r:this.nextAudioPts)-M.pts;$>Z?(e=$-W,e<0&&(e=W),k.logger.log("It is approximately "+$/90+" ms to the next segment; using duration "+e/90+" ms for the last video frame.")):e=W}else e=W}e/=s,P=Math.round((M.pts-M.dts)/s)}u.push({size:O,duration:e,cts:P,flags:{isLeading:0,isDependedOn:0,hasRedundancy:0,degradPrio:0,dependsOn:M.key?2:1,isNonSync:M.key?0:1}})}this.nextAvcDts=p+e*s;var _=a.dropped;if(a.len=0,a.nbNalu=0,a.dropped=0,u.length&&navigator.userAgent.toLowerCase().indexOf("chrome")>-1){var aa=u[0].flags;aa.dependsOn=2,aa.isNonSync=0}a.samples=u,g=m["default"].moof(a.sequenceNumber++,i/s,a),a.samples=[];var ba={id:this.id,level:this.level,sn:this.sn,data1:g,data2:f,startPTS:h/r,endPTS:(o+s*e)/r,startDTS:i/r,endDTS:this.nextAvcDts/r,type:"video",nb:u.length,dropped:_};return this.observer.trigger(j["default"].FRAG_PARSING_DATA,ba),ba}},{key:"remuxAudio",value:function(a,b,c,d){var e,f,g,i,l,o,p,q,r,s,t,u,v,w,x,y,z=this.PES_TIMESCALE,A=a.timescale,B=z/A,C=a.timescale*(a.isAAC?1024:1152)/a.audiosamplerate,D=C*B,E=this._PTSNormalize,F=this._initDTS,G=!a.isAAC&&this.typeSupported.mpeg,H=G?0:8,I=[],J=[];if(a.samples.sort(function(a,b){return a.pts-b.pts}),J=a.samples,y=this.nextAudioPts,c|=J.length&&y&&(Math.abs(b-y/z)<.1||Math.abs(J[0].pts-y-this._initDTS)<20*D),c||(y=b*z),d&&a.isAAC)for(var K=0,L=y;K<J.length;){var M=J[K],N=E(M.pts-F,y),O=N-L;if(O<=-D)k.logger.warn("Dropping 1 audio frame @ "+Math.round(L/90)/1e3+"s due to "+Math.round(Math.abs(O/90))+" ms overlap."),J.splice(K,1),a.len-=M.unit.length;else if(O>=D&&L){var P=Math.round(O/D);k.logger.warn("Injecting "+P+" audio frame @ "+Math.round(L/90)/1e3+"s due to "+Math.round(O/90)+" ms gap.");for(var Q=0;Q<P;Q++)x=L+F,x=Math.max(x,F),w=h["default"].getSilentFrame(a.manifestCodec||a.codec,a.channelCount),w||(k.logger.log("Unable to get silent frame for given audio codec; duplicating last frame instead."),w=M.unit.subarray()),J.splice(K,0,{unit:w,pts:x,dts:x}),a.len+=w.length,L+=D,K+=1;M.pts=M.dts=L+F,L+=D,K+=1}else Math.abs(O)>.1*D,L+=D,0===K?M.pts=M.dts=F+y:M.pts=M.dts=J[K-1].pts+D,K+=1}for(var R=0,S=J.length;R<S;R++){if(f=J[R],i=f.unit,s=f.pts-F,t=f.dts-F,void 0!==r)u=E(s,r),v=E(t,r),g.duration=Math.round((v-r)/B);else{u=E(s,y),v=E(t,y);var T=Math.round(1e3*(u-y)/z),U=0;if(c&&a.isAAC&&T){if(T>0)U=Math.round((u-y)/D),k.logger.log(T+" ms hole between AAC samples detected,filling it"),U>0&&(w=h["default"].getSilentFrame(a.manifestCodec||a.codec,a.channelCount),w||(w=i.subarray()),a.len+=U*w.length);else if(T<-12){k.logger.log(-T+" ms overlapping between AAC samples detected, drop frame"),a.len-=i.byteLength;continue}u=v=y}if(p=Math.max(0,u),q=Math.max(0,v),!(a.len>0))return;var V=G?a.len:a.len+8;try{l=new Uint8Array(V)}catch(W){return void this.observer.trigger(j["default"].ERROR,{type:n.ErrorTypes.MUX_ERROR,level:this.level,id:this.id,details:n.ErrorDetails.REMUX_ALLOC_ERROR,fatal:!1,bytes:V,reason:"fail allocating audio mdat "+V})}G||(e=new DataView(l.buffer),e.setUint32(0,V),l.set(m["default"].types.mdat,4));for(var X=0;X<U;X++)x=u-(U-X)*D,w=h["default"].getSilentFrame(a.manifestCodec||a.codec,a.channelCount),w||(k.logger.log("Unable to get silent frame for given audio codec; duplicating this frame instead."),w=i.subarray()),l.set(w,H),H+=w.byteLength,g={size:w.byteLength,cts:0,duration:1024,flags:{isLeading:0,isDependedOn:0,hasRedundancy:0,degradPrio:0,dependsOn:1}},I.push(g)}l.set(i,H);var Y=i.byteLength;H+=Y,g={size:Y,cts:0,duration:0,flags:{isLeading:0,isDependedOn:0,hasRedundancy:0,degradPrio:0,dependsOn:1}},I.push(g),r=v}var Z=0,$=I.length;if($>=2&&(Z=I[$-2].duration,g.duration=Z),$){this.nextAudioPts=u+B*Z,a.len=0,a.samples=I,o=G?new Uint8Array:m["default"].moof(a.sequenceNumber++,q/B,a),a.samples=[];var _={id:this.id,level:this.level,sn:this.sn,data1:o,data2:l,startPTS:p/z,endPTS:this.nextAudioPts/z,startDTS:q/z,endDTS:(v+B*Z)/z,type:"audio",nb:$};return this.observer.trigger(j["default"].FRAG_PARSING_DATA,_),_}return null}},{key:"remuxEmptyAudio",value:function(a,b,c,d){var e=this.PES_TIMESCALE,f=a.timescale?a.timescale:a.audiosamplerate,g=e/f,i=this.nextAudioPts,j=(void 0!==i?i:d.startDTS*e)+this._initDTS,l=d.endDTS*e+this._initDTS,m=1024,n=g*m,o=Math.ceil((l-j)/n),p=h["default"].getSilentFrame(a.manifestCodec||a.codec,a.channelCount);if(k.logger.warn("remux empty Audio"),!p)return void k.logger.trace("Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec!");for(var q=[],r=0;r<o;r++){var s=j+r*n;q.push({unit:p,pts:s,dts:s}),a.len+=p.length}a.samples=q,this.remuxAudio(a,b,c)}},{key:"remuxID3",value:function(a,b){var c,d=a.samples.length;if(d){for(var e=0;e<d;e++)c=a.samples[e],c.pts=(c.pts-this._initPTS)/this.PES_TIMESCALE,c.dts=(c.dts-this._initDTS)/this.PES_TIMESCALE;this.observer.trigger(j["default"].FRAG_PARSING_METADATA,{id:this.id,level:this.level,sn:this.sn,samples:a.samples})}a.samples=[],b=b}},{key:"remuxText",value:function(a,b){a.samples.sort(function(a,b){return a.pts-b.pts});var c,d=a.samples.length;if(d){for(var e=0;e<d;e++)c=a.samples[e],c.pts=(c.pts-this._initPTS)/this.PES_TIMESCALE;this.observer.trigger(j["default"].FRAG_PARSING_USERDATA,{id:this.id,level:this.level,sn:this.sn,samples:a.samples})}a.samples=[],b=b}},{key:"_PTSNormalize",value:function(a,b){var c;if(void 0===b)return a;for(c=b<a?-8589934592:8589934592;Math.abs(a-b)>4294967296;)a+=c;return a}},{key:"passthrough",get:function(){return!1}}]),a}();c["default"]=o},{26:26,28:28,29:29,37:37,45:45}],39:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=a(28),h=d(g),i=function(){function a(b,c){e(this,a),this.observer=b,this.id=c,this.ISGenerated=!1}return f(a,[{key:"destroy",value:function(){}},{key:"insertDiscontinuity",value:function(){}},{key:"switchLevel",value:function(){this.ISGenerated=!1}},{key:"remux",value:function(a,b,c,d,e,f){var g=this.observer;if(!this.ISGenerated){var i={},j={id:this.id,tracks:i,unique:!0},k=b,l=k.codec;l&&(j.tracks.video={container:k.container,codec:l,metadata:{width:k.width,height:k.height}}),k=a,l=k.codec,l&&(j.tracks.audio={container:k.container,codec:l,metadata:{channelCount:k.channelCount}}),this.ISGenerated=!0,g.trigger(h["default"].FRAG_PARSING_INIT_SEGMENT,j)}g.trigger(h["default"].FRAG_PARSING_DATA,{id:this.id,data1:f,startPTS:e,startDTS:e,type:"audiovideo",nb:1,dropped:0})}},{key:"passthrough",get:function(){return!0}}]),a}();c["default"]=i},{28:28}],40:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=/^(\d+)x(\d+)$/,g=/\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g,h=function(){function a(b){d(this,a),"string"==typeof b&&(b=a.parseAttrList(b));for(var c in b)b.hasOwnProperty(c)&&(this[c]=b[c])}return e(a,[{key:"decimalInteger",value:function(a){var b=parseInt(this[a],10);return b>Number.MAX_SAFE_INTEGER?1/0:b}},{key:"hexadecimalInteger",value:function(a){if(this[a]){var b=(this[a]||"0x").slice(2);b=(1&b.length?"0":"")+b;for(var c=new Uint8Array(b.length/2),d=0;d<b.length/2;d++)c[d]=parseInt(b.slice(2*d,2*d+2),16);return c}return null}},{key:"hexadecimalIntegerAsNumber",value:function(a){var b=parseInt(this[a],16);return b>Number.MAX_SAFE_INTEGER?1/0:b}},{key:"decimalFloatingPoint",value:function(a){return parseFloat(this[a])}},{key:"enumeratedString",value:function(a){return this[a]}},{key:"decimalResolution",value:function(a){var b=f.exec(this[a]);if(null!==b)return{width:parseInt(b[1],10),height:parseInt(b[2],10)}}}],[{key:"parseAttrList",value:function(a){var b,c={};for(g.lastIndex=0;null!==(b=g.exec(a));){var d=b[2],e='"';0===d.indexOf(e)&&d.lastIndexOf(e)===d.length-1&&(d=d.slice(1,-1)),c[b[1]]=d}return c}}]),a}();c["default"]=h},{}],41:[function(a,b,c){"use strict";var d={search:function(a,b){for(var c=0,d=a.length-1,e=null,f=null;c<=d;){e=(c+d)/2|0,f=a[e];var g=b(f);if(g>0)c=e+1;else{if(!(g<0))return f;d=e-1}}return null}};b.exports=d},{}],42:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f={42:225,92:233,94:237,95:243,96:250,123:231,124:247,125:209,126:241,127:9608,128:174,129:176,130:189,131:191,132:8482,133:162,134:163,135:9834,136:224,137:32,138:232,139:226,140:234,141:238,142:244,143:251,144:193,145:201,146:211,147:218,148:220,149:252,150:8216,151:161,152:42,153:8217,154:9473,155:169,156:8480,157:8226,158:8220,159:8221,160:192,161:194,162:199,163:200,164:202,165:203,166:235,167:206,168:207,169:239,170:212,171:217,172:249,173:219,174:171,175:187,176:195,177:227,178:205,179:204,180:236,181:210,182:242,183:213,184:245,185:123,186:125,187:92,188:94,189:95,190:124,191:8764,192:196,193:228,194:214,195:246,196:223,197:165,198:164,199:9475,200:197,201:229,202:216,203:248,204:9487,205:9491,206:9495,207:9499},g=function(a){var b=a;return f.hasOwnProperty(a)&&(b=f[a]),String.fromCharCode(b)},h=15,i=32,j={17:1,18:3,21:5,22:7,23:9,16:11,19:12,20:14},k={17:2,18:4,21:6,22:8,23:10,19:13,20:15},l={25:1,26:3,29:5,30:7,31:9,24:11,27:12,28:14},m={25:2,26:4,29:6,30:8,31:10,27:13,28:15},n=["white","green","blue","cyan","red","yellow","magenta","black","transparent"],o={verboseFilter:{DATA:3,DEBUG:3,INFO:2,WARNING:2,TEXT:1,ERROR:0},time:null,verboseLevel:0,setTime:function(a){this.time=a},log:function(a,b){var c=this.verboseFilter[a];this.verboseLevel>=c}},p=function(a){for(var b=[],c=0;c<a.length;c++)b.push(a[c].toString(16));return b},q=function(){function a(b,c,e,f,g){d(this,a),this.foreground=b||"white",this.underline=c||!1,this.italics=e||!1,this.background=f||"black",this.flash=g||!1}return e(a,[{key:"reset",value:function(){this.foreground="white",this.underline=!1,this.italics=!1,this.background="black",this.flash=!1}},{key:"setStyles",value:function(a){for(var b=["foreground","underline","italics","background","flash"],c=0;c<b.length;c++){var d=b[c];a.hasOwnProperty(d)&&(this[d]=a[d])}}},{key:"isDefault",value:function(){return"white"===this.foreground&&!this.underline&&!this.italics&&"black"===this.background&&!this.flash}},{key:"equals",value:function(a){return this.foreground===a.foreground&&this.underline===a.underline&&this.italics===a.italics&&this.background===a.background&&this.flash===a.flash}},{key:"copy",value:function(a){this.foreground=a.foreground,this.underline=a.underline,this.italics=a.italics,this.background=a.background,this.flash=a.flash}},{key:"toString",value:function(){return"color="+this.foreground+", underline="+this.underline+", italics="+this.italics+", background="+this.background+", flash="+this.flash}}]),a}(),r=function(){function a(b,c,e,f,g,h){d(this,a),this.uchar=b||" ",this.penState=new q(c,e,f,g,h)}return e(a,[{key:"reset",value:function(){this.uchar=" ",this.penState.reset()}},{key:"setChar",value:function(a,b){this.uchar=a,this.penState.copy(b)}},{key:"setPenState",value:function(a){this.penState.copy(a)}},{key:"equals",value:function(a){return this.uchar===a.uchar&&this.penState.equals(a.penState)}},{key:"copy",value:function(a){this.uchar=a.uchar,this.penState.copy(a.penState)}},{key:"isEmpty",value:function(){return" "===this.uchar&&this.penState.isDefault()}}]),a}(),s=function(){function a(){d(this,a),this.chars=[];for(var b=0;b<i;b++)this.chars.push(new r);this.pos=0,this.currPenState=new q}return e(a,[{key:"equals",value:function(a){for(var b=!0,c=0;c<i;c++)if(!this.chars[c].equals(a.chars[c])){b=!1;break}return b}},{key:"copy",value:function(a){for(var b=0;b<i;b++)this.chars[b].copy(a.chars[b])}},{key:"isEmpty",value:function(){for(var a=!0,b=0;b<i;b++)if(!this.chars[b].isEmpty()){a=!1;break}return a}},{key:"setCursor",value:function(a){this.pos!==a&&(this.pos=a),this.pos<0?(o.log("ERROR","Negative cursor position "+this.pos),this.pos=0):this.pos>i&&(o.log("ERROR","Too large cursor position "+this.pos),this.pos=i)}},{key:"moveCursor",value:function(a){var b=this.pos+a;if(a>1)for(var c=this.pos+1;c<b+1;c++)this.chars[c].setPenState(this.currPenState);this.setCursor(b)}},{key:"backSpace",value:function(){this.moveCursor(-1),this.chars[this.pos].setChar(" ",this.currPenState)}},{key:"insertChar",value:function(a){a>=144&&this.backSpace();var b=g(a);return this.pos>=i?void o.log("ERROR","Cannot insert "+a.toString(16)+" ("+b+") at position "+this.pos+". Skipping it!"):(this.chars[this.pos].setChar(b,this.currPenState),void this.moveCursor(1))}},{key:"clearFromPos",value:function(a){var b;for(b=a;b<i;b++)this.chars[b].reset()}},{key:"clear",value:function(){this.clearFromPos(0),this.pos=0,this.currPenState.reset()}},{key:"clearToEndOfRow",value:function(){this.clearFromPos(this.pos)}},{key:"getTextString",value:function(){for(var a=[],b=!0,c=0;c<i;c++){var d=this.chars[c].uchar;" "!==d&&(b=!1),a.push(d)}return b?"":a.join("")}},{key:"setPenStyles",value:function(a){this.currPenState.setStyles(a);var b=this.chars[this.pos];b.setPenState(this.currPenState)}}]),a}(),t=function(){function a(){d(this,a),this.rows=[];for(var b=0;b<h;b++)this.rows.push(new s);this.currRow=h-1,this.nrRollUpRows=null,this.reset()}return e(a,[{key:"reset",value:function(){for(var a=0;a<h;a++)this.rows[a].clear();this.currRow=h-1}},{key:"equals",value:function(a){for(var b=!0,c=0;c<h;c++)if(!this.rows[c].equals(a.rows[c])){b=!1;break}return b}},{key:"copy",value:function(a){for(var b=0;b<h;b++)this.rows[b].copy(a.rows[b])}},{key:"isEmpty",value:function(){for(var a=!0,b=0;b<h;b++)if(!this.rows[b].isEmpty()){a=!1;break}return a}},{key:"backSpace",value:function(){var a=this.rows[this.currRow];a.backSpace()}},{key:"clearToEndOfRow",value:function(){var a=this.rows[this.currRow];a.clearToEndOfRow()}},{key:"insertChar",value:function(a){var b=this.rows[this.currRow];b.insertChar(a)}},{key:"setPen",value:function(a){var b=this.rows[this.currRow];b.setPenStyles(a)}},{key:"moveCursor",value:function(a){var b=this.rows[this.currRow];b.moveCursor(a)}},{key:"setCursor",value:function(a){o.log("INFO","setCursor: "+a);var b=this.rows[this.currRow];b.setCursor(a)}},{key:"setPAC",value:function(a,b){o.log("INFO","pacData = "+JSON.stringify(a));var c=a.row-1;if(this.nrRollUpRows&&c<this.nrRollUpRows-1&&(c=this.nrRollUpRows-1),this.nrRollUpRows&&this.currRow!==c){for(var d=0;d<h;d++)this.rows[d].clear();var e=this.currRow+1-this.nrRollUpRows,f=b.rows[e].cueStartTime;if(f&&f<o.time)for(d=0;d<this.nrRollUpRows;d++)this.rows[c-this.nrRollUpRows+d+1].copy(b.rows[e+d])}this.currRow=c;var g=this.rows[this.currRow];if(null!==a.indent){var i=a.indent,j=Math.max(i-1,0);g.setCursor(a.indent),a.color=g.chars[j].penState.foreground}var k={foreground:a.color,underline:a.underline,italics:a.italics,background:"black",flash:!1};this.setPen(k)}},{key:"setBkgData",value:function(a){o.log("INFO","bkgData = "+JSON.stringify(a)),this.backSpace(),this.setPen(a),this.insertChar(32)}},{key:"setRollUpRows",value:function(a){this.nrRollUpRows=a}},{key:"rollUp",value:function(){if(null===this.nrRollUpRows)return void o.log("DEBUG","roll_up but nrRollUpRows not set yet");o.log("TEXT",this.getDisplayText());var a=this.currRow+1-this.nrRollUpRows,b=this.rows.splice(a,1)[0];b.clear(),this.rows.splice(this.currRow,0,b),o.log("INFO","Rolling up")}},{key:"getDisplayText",value:function(a){a=a||!1;for(var b=[],c="",d=-1,e=0;e<h;e++){var f=this.rows[e].getTextString();f&&(d=e+1,a?b.push("Row "+d+": '"+f+"'"):b.push(f.trim()))}return b.length>0&&(c=a?"["+b.join(" | ")+"]":b.join("\n")),c}},{key:"getTextAndFormat",value:function(){return this.rows}}]),a}(),u=function(){function a(b,c){d(this,a),this.chNr=b,this.outputFilter=c,this.mode=null,this.verbose=0,this.displayedMemory=new t,this.nonDisplayedMemory=new t,this.lastOutputScreen=new t,this.currRollUpRow=this.displayedMemory.rows[h-1],this.writeScreen=this.displayedMemory,this.mode=null,this.cueStartTime=null}return e(a,[{key:"reset",value:function(){this.mode=null,this.displayedMemory.reset(),this.nonDisplayedMemory.reset(),this.lastOutputScreen.reset(),this.currRollUpRow=this.displayedMemory.rows[h-1],this.writeScreen=this.displayedMemory,this.mode=null,this.cueStartTime=null,this.lastCueEndTime=null}},{key:"getHandler",value:function(){return this.outputFilter}},{key:"setHandler",value:function(a){this.outputFilter=a}},{key:"setPAC",value:function(a){this.writeScreen.setPAC(a,this.lastOutputScreen)}},{key:"setBkgData",value:function(a){this.writeScreen.setBkgData(a)}},{key:"setMode",value:function(a){a!==this.mode&&(this.mode=a,o.log("INFO","MODE="+a),"MODE_POP-ON"===this.mode?this.writeScreen=this.nonDisplayedMemory:(this.writeScreen=this.displayedMemory,this.writeScreen.reset(),this.lastOutputScreen.reset()),"MODE_ROLL-UP"!==this.mode&&(this.displayedMemory.nrRollUpRows=null,this.nonDisplayedMemory.nrRollUpRows=null),this.mode=a)}},{key:"insertChars",value:function(a){for(var b=0;b<a.length;b++)this.writeScreen.insertChar(a[b]);var c=this.writeScreen===this.displayedMemory?"DISP":"NON_DISP";o.log("INFO",c+": "+this.writeScreen.getDisplayText(!0)),"MODE_PAINT-ON"!==this.mode&&"MODE_ROLL-UP"!==this.mode||(o.log("TEXT","DISPLAYED: "+this.displayedMemory.getDisplayText(!0)),this.outputDataUpdate())}},{key:"ccRCL",value:function(){o.log("INFO","RCL - Resume Caption Loading"),this.setMode("MODE_POP-ON")}},{key:"ccBS",value:function(){o.log("INFO","BS - BackSpace"),"MODE_TEXT"!==this.mode&&(this.writeScreen.backSpace(),this.writeScreen===this.displayedMemory&&this.outputDataUpdate())}},{key:"ccAOF",value:function(){}},{key:"ccAON",value:function(){}},{key:"ccDER",value:function(){o.log("INFO","DER- Delete to End of Row"),this.writeScreen.clearToEndOfRow(),this.outputDataUpdate()}},{key:"ccRU",value:function(a){o.log("INFO","RU("+a+") - Roll Up"),this.writeScreen=this.displayedMemory,this.setMode("MODE_ROLL-UP"),this.writeScreen.setRollUpRows(a)}},{key:"ccFON",value:function(){o.log("INFO","FON - Flash On"),this.writeScreen.setPen({flash:!0})}},{key:"ccRDC",value:function(){o.log("INFO","RDC - Resume Direct Captioning"),this.setMode("MODE_PAINT-ON")}},{key:"ccTR",value:function(){o.log("INFO","TR"),this.setMode("MODE_TEXT")}},{key:"ccRTD",value:function(){o.log("INFO","RTD"),this.setMode("MODE_TEXT")}},{key:"ccEDM",value:function(){o.log("INFO","EDM - Erase Displayed Memory"),this.displayedMemory.reset(),this.outputDataUpdate()}},{key:"ccCR",value:function(){o.log("CR - Carriage Return"),this.writeScreen.rollUp(),this.outputDataUpdate()}},{key:"ccENM",value:function(){o.log("INFO","ENM - Erase Non-displayed Memory"),this.nonDisplayedMemory.reset()}},{key:"ccEOC",value:function(){if(o.log("INFO","EOC - End Of Caption"),"MODE_POP-ON"===this.mode){var a=this.displayedMemory;this.displayedMemory=this.nonDisplayedMemory,this.nonDisplayedMemory=a,this.writeScreen=this.nonDisplayedMemory,o.log("TEXT","DISP: "+this.displayedMemory.getDisplayText())}this.outputDataUpdate()}},{key:"ccTO",value:function(a){o.log("INFO","TO("+a+") - Tab Offset"),this.writeScreen.moveCursor(a)}},{key:"ccMIDROW",value:function(a){var b={flash:!1};if(b.underline=a%2===1,b.italics=a>=46,b.italics)b.foreground="white";else{var c=Math.floor(a/2)-16,d=["white","green","blue","cyan","red","yellow","magenta"];b.foreground=d[c]}o.log("INFO","MIDROW: "+JSON.stringify(b)),this.writeScreen.setPen(b)}},{key:"outputDataUpdate",value:function(){var a=o.time;null!==a&&this.outputFilter&&(this.outputFilter.updateData&&this.outputFilter.updateData(a,this.displayedMemory),null!==this.cueStartTime||this.displayedMemory.isEmpty()?this.displayedMemory.equals(this.lastOutputScreen)||(this.outputFilter.newCue&&this.outputFilter.newCue(this.cueStartTime,a,this.lastOutputScreen),this.cueStartTime=this.displayedMemory.isEmpty()?null:a):this.cueStartTime=a,this.lastOutputScreen.copy(this.displayedMemory))}},{key:"cueSplitAtTime",value:function(a){this.outputFilter&&(this.displayedMemory.isEmpty()||(this.outputFilter.newCue&&this.outputFilter.newCue(this.cueStartTime,a,this.displayedMemory),this.cueStartTime=a))}}]),a}(),v=function(){function a(b,c,e){d(this,a),this.field=b||1,this.outputs=[c,e],this.channels=[new u(1,c),new u(2,e)],this.currChNr=-1,this.lastCmdA=null,this.lastCmdB=null,this.bufferedData=[],this.startTime=null,this.lastTime=null,this.dataCounters={padding:0,"char":0,cmd:0,other:0}}return e(a,[{key:"getHandler",value:function(a){return this.channels[a].getHandler()}},{key:"setHandler",value:function(a,b){this.channels[a].setHandler(b)}},{key:"addData",value:function(a,b){var c,d,e,f=!1;this.lastTime=a,o.setTime(a);for(var g=0;g<b.length;g+=2)if(d=127&b[g],e=127&b[g+1],0!==d||0!==e){if(o.log("DATA","["+p([b[g],b[g+1]])+"] -> ("+p([d,e])+")"),c=this.parseCmd(d,e),c||(c=this.parseMidrow(d,e)),c||(c=this.parsePAC(d,e)),c||(c=this.parseBackgroundAttributes(d,e)),!c&&(f=this.parseChars(d,e)))if(this.currChNr&&this.currChNr>=0){var h=this.channels[this.currChNr-1];h.insertChars(f)}else o.log("WARNING","No channel found yet. TEXT-MODE?");
c?this.dataCounters.cmd+=2:f?this.dataCounters["char"]+=2:(this.dataCounters.other+=2,o.log("WARNING","Couldn't parse cleaned data "+p([d,e])+" orig: "+p([b[g],b[g+1]])))}else this.dataCounters.padding+=2}},{key:"parseCmd",value:function(a,b){var c=null,d=(20===a||28===a)&&32<=b&&b<=47,e=(23===a||31===a)&&33<=b&&b<=35;if(!d&&!e)return!1;if(a===this.lastCmdA&&b===this.lastCmdB)return this.lastCmdA=null,this.lastCmdB=null,o.log("DEBUG","Repeated command ("+p([a,b])+") is dropped"),!0;c=20===a||23===a?1:2;var f=this.channels[c-1];return 20===a||28===a?32===b?f.ccRCL():33===b?f.ccBS():34===b?f.ccAOF():35===b?f.ccAON():36===b?f.ccDER():37===b?f.ccRU(2):38===b?f.ccRU(3):39===b?f.ccRU(4):40===b?f.ccFON():41===b?f.ccRDC():42===b?f.ccTR():43===b?f.ccRTD():44===b?f.ccEDM():45===b?f.ccCR():46===b?f.ccENM():47===b&&f.ccEOC():f.ccTO(b-32),this.lastCmdA=a,this.lastCmdB=b,this.currChNr=c,!0}},{key:"parseMidrow",value:function(a,b){var c=null;if((17===a||25===a)&&32<=b&&b<=47){if(c=17===a?1:2,c!==this.currChNr)return o.log("ERROR","Mismatch channel in midrow parsing"),!1;var d=this.channels[c-1];return d.ccMIDROW(b),o.log("DEBUG","MIDROW ("+p([a,b])+")"),!0}return!1}},{key:"parsePAC",value:function(a,b){var c=null,d=null,e=(17<=a&&a<=23||25<=a&&a<=31)&&64<=b&&b<=127,f=(16===a||24===a)&&64<=b&&b<=95;if(!e&&!f)return!1;if(a===this.lastCmdA&&b===this.lastCmdB)return this.lastCmdA=null,this.lastCmdB=null,!0;c=a<=23?1:2,d=64<=b&&b<=95?1===c?j[a]:l[a]:1===c?k[a]:m[a];var g=this.interpretPAC(d,b),h=this.channels[c-1];return h.setPAC(g),this.lastCmdA=a,this.lastCmdB=b,this.currChNr=c,!0}},{key:"interpretPAC",value:function(a,b){var c=b,d={color:null,italics:!1,indent:null,underline:!1,row:a};return c=b>95?b-96:b-64,d.underline=1===(1&c),c<=13?d.color=["white","green","blue","cyan","red","yellow","magenta","white"][Math.floor(c/2)]:c<=15?(d.italics=!0,d.color="white"):d.indent=4*Math.floor((c-16)/2),d}},{key:"parseChars",value:function(a,b){var c=null,d=null,e=null;if(a>=25?(c=2,e=a-8):(c=1,e=a),17<=e&&e<=19){var f=b;f=17===e?b+80:18===e?b+112:b+144,o.log("INFO","Special char '"+g(f)+"' in channel "+c),d=[f]}else 32<=a&&a<=127&&(d=0===b?[a]:[a,b]);if(d){var h=p(d);o.log("DEBUG","Char codes =  "+h.join(",")),this.lastCmdA=null,this.lastCmdB=null}return d}},{key:"parseBackgroundAttributes",value:function(a,b){var c,d,e,f,g=(16===a||24===a)&&32<=b&&b<=47,h=(23===a||31===a)&&45<=b&&b<=47;return!(!g&&!h)&&(c={},16===a||24===a?(d=Math.floor((b-32)/2),c.background=n[d],b%2===1&&(c.background=c.background+"_semi")):45===b?c.background="transparent":(c.foreground="black",47===b&&(c.underline=!0)),e=a<24?1:2,f=this.channels[e-1],f.setBkgData(c),this.lastCmdA=null,this.lastCmdB=null,!0)}},{key:"reset",value:function(){for(var a=0;a<this.channels.length;a++)this.channels[a]&&this.channels[a].reset();this.lastCmdA=null,this.lastCmdB=null}},{key:"cueSplitAtTime",value:function(a){for(var b=0;b<this.channels.length;b++)this.channels[b]&&this.channels[b].cueSplitAtTime(a)}}]),a}();c["default"]=v},{}],43:[function(a,b,c){"use strict";var d={newCue:function(a,b,c,d){for(var e,f,g,h,i,j=window.VTTCue||window.TextTrackCue,k=0;k<d.rows.length;k++)if(e=d.rows[k],g=!0,h=0,i="",!e.isEmpty()){for(var l=0;l<e.chars.length;l++)e.chars[l].uchar.match(/\s/)&&g?h++:(i+=e.chars[l].uchar,g=!1);e.cueStartTime=b,f=new j(b,c,i.trim()),h>=16?h--:h++,navigator.userAgent.match(/Firefox\//)?f.line=k+1:f.line=k>7?k-2:k+1,f.align="left",f.position=Math.max(0,Math.min(100,100*(h/32)+(navigator.userAgent.match(/Firefox\//)?50:0))),a.addCue(f)}}};b.exports=d},{}],44:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=function(){function a(b){d(this,a),this.alpha_=b?Math.exp(Math.log(.5)/b):0,this.estimate_=0,this.totalWeight_=0}return e(a,[{key:"sample",value:function(a,b){var c=Math.pow(this.alpha_,a);this.estimate_=b*(1-c)+c*this.estimate_,this.totalWeight_+=a}},{key:"getTotalWeight",value:function(){return this.totalWeight_}},{key:"getEstimate",value:function(){if(this.alpha_){var a=1-Math.pow(this.alpha_,this.totalWeight_);return this.estimate_/a}return this.estimate_}}]),a}();c["default"]=f},{}],45:[function(a,b,c){"use strict";function d(){}function e(a,b){return b="["+a+"] > "+b}function f(a){var b=self.console[a];return b?function(){for(var c=arguments.length,d=Array(c),f=0;f<c;f++)d[f]=arguments[f];d[0]&&(d[0]=e(a,d[0])),b.apply(self.console,d)}:d}function g(a){for(var b=arguments.length,c=Array(b>1?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];c.forEach(function(b){j[b]=a[b]?a[b].bind(a):f(b)})}Object.defineProperty(c,"__esModule",{value:!0});var h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},i={trace:d,debug:d,log:d,warn:d,info:d,error:d},j=i;c.enableLogs=function(a){if(a===!0||"object"===("undefined"==typeof a?"undefined":h(a))){g(a,"debug","log","info","warn","error");try{j.log()}catch(b){j=i}}else j=i},c.logger=j},{}],46:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=function(){function a(){d(this,a)}return e(a,null,[{key:"toString",value:function(a){for(var b="",c=a.length,d=0;d<c;d++)b+="["+a.start(d).toFixed(3)+","+a.end(d).toFixed(3)+"]";return b}}]),a}();c["default"]=f},{}],47:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=a(45),g=function(){function a(b){d(this,a),b&&b.xhrSetup&&(this.xhrSetup=b.xhrSetup)}return e(a,[{key:"destroy",value:function(){this.abort(),this.loader=null}},{key:"abort",value:function(){var a=this.loader;a&&4!==a.readyState&&(this.stats.aborted=!0,a.abort()),window.clearTimeout(this.requestTimeout),this.requestTimeout=null,window.clearTimeout(this.retryTimeout),this.retryTimeout=null}},{key:"load",value:function(a,b,c){this.context=a,this.config=b,this.callbacks=c,this.stats={trequest:performance.now(),retry:0},this.retryDelay=b.retryDelay,this.loadInternal()}},{key:"loadInternal",value:function(){var a,b=this.context;a="undefined"!=typeof XDomainRequest?this.loader=new XDomainRequest:this.loader=new XMLHttpRequest,a.onreadystatechange=this.readystatechange.bind(this),a.onprogress=this.loadprogress.bind(this),a.open("GET",b.url,!0),b.rangeEnd&&a.setRequestHeader("Range","bytes="+b.rangeStart+"-"+(b.rangeEnd-1)),a.responseType=b.responseType;var c=this.stats;c.tfirst=0,c.loaded=0,this.xhrSetup&&this.xhrSetup(a,b.url),this.requestTimeout=window.setTimeout(this.loadtimeout.bind(this),this.config.timeout),a.send()}},{key:"readystatechange",value:function(a){var b=a.currentTarget,c=b.readyState,d=this.stats,e=this.context,g=this.config;if(!d.aborted&&c>=2)if(window.clearTimeout(this.requestTimeout),0===d.tfirst&&(d.tfirst=Math.max(performance.now(),d.trequest)),4===c){var h=b.status;if(h>=200&&h<300){d.tload=Math.max(d.tfirst,performance.now());var i=void 0,j=void 0;"arraybuffer"===e.responseType?(i=b.response,j=i.byteLength):(i=b.responseText,j=i.length),d.loaded=d.total=j;var k={url:b.responseURL,data:i};this.callbacks.onSuccess(k,d,e)}else d.retry>=g.maxRetry||h>=400&&h<499?(f.logger.error(h+" while loading "+e.url),this.callbacks.onError({code:h,text:b.statusText},e)):(f.logger.warn(h+" while loading "+e.url+", retrying in "+this.retryDelay+"..."),this.destroy(),this.retryTimeout=window.setTimeout(this.loadInternal.bind(this),this.retryDelay),this.retryDelay=Math.min(2*this.retryDelay,g.maxRetryDelay),d.retry++)}else this.requestTimeout=window.setTimeout(this.loadtimeout.bind(this),g.timeout)}},{key:"loadtimeout",value:function(){f.logger.warn("timeout while loading "+this.context.url),this.callbacks.onTimeout(this.stats,this.context)}},{key:"loadprogress",value:function(a){var b=this.stats;b.loaded=a.loaded,a.lengthComputable&&(b.total=a.total);var c=this.callbacks.onProgress;c&&c(b,this.context,null)}}]),a}();c["default"]=g},{45:45}]},{},[33])(33)})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],4:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function e(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}Object.defineProperty(c,"__esModule",{value:!0});var g=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),h=function k(a,b,c){null===a&&(a=Function.prototype);var d=Object.getOwnPropertyDescriptor(a,b);if(void 0===d){var e=Object.getPrototypeOf(a);return null===e?void 0:k(e,b,c)}if("value"in d)return d.value;var f=d.get;if(void 0!==f)return f.call(c)},i=videojs.getComponent("MenuItem"),j=function(a){function b(){return d(this,b),e(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return f(b,a),g(b,[{key:"handleClick",value:function(){h(b.prototype.__proto__||Object.getPrototypeOf(b.prototype),"handleClick",this).call(this),this.options_.qualitySwitchCallback(this.options_.id,this.options_.trackType)}}]),b}(i);c["default"]=j},{}],5:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function e(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function f(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}Object.defineProperty(c,"__esModule",{value:!0});var g=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),h=function k(a,b,c){null===a&&(a=Function.prototype);var d=Object.getOwnPropertyDescriptor(a,b);if(void 0===d){var e=Object.getPrototypeOf(a);return null===e?void 0:k(e,b,c)}if("value"in d)return d.value;var f=d.get;if(void 0!==f)return f.call(c)},i=videojs.getComponent("Menu"),j=function(a){function b(){return d(this,b),e(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return f(b,a),g(b,[{key:"addItem",value:function(a){var c=this;h(b.prototype.__proto__||Object.getPrototypeOf(b.prototype),"addItem",this).call(this,a),a.on("click",function(){for(var b=c.children(),d=0;d<b.length;d++){var e=b[d];a!==e&&e.selected(!1)}})}}]),b}(i);c["default"]=j},{}],6:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function f(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function g(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}Object.defineProperty(c,"__esModule",{value:!0});var h=Object.assign||function(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d])}return a},i=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),j=a("./quality-menu"),k=d(j),l=a("./quality-menu-item"),m=d(l),n=videojs.getComponent("MenuButton"),o=function(a){function b(){return e(this,b),f(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return g(b,a),i(b,[{key:"createMenu",value:function(){for(var a,b,c=new k["default"](this.player,this.options_),d=0;d<this.options_.qualityList.length;d++){var e=this.options_.qualityList[d],f=this.options_,g=f.qualitySwitchCallback,i=f.trackType;b=h({qualitySwitchCallback:g,trackType:i},e,{selectable:!0}),a=new m["default"](this.player,b),c.addItem(a)}return c}}]),b}(n);c["default"]=o},{"./quality-menu":5,"./quality-menu-item":4}],7:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a){function b(a,b){var d=b.qualityData,h=b.qualitySwitchCallback,i=c.controlBar.getChild("fullscreenToggle");c.controlBar.removeChild(i);for(var j=0;j<e.length;j++){var k=e[j],l=k+"PickerButton",m=c.controlBar.getChild(l);m&&(m.dispose(),c.controlBar.removeChild(m)),d[k]&&d[k].length>1&&(m=new g["default"](c,{name:l,qualityList:d[k],qualitySwitchCallback:h,trackType:k}),m.addClass(f[k]),c.controlBar.addChild(m))}i&&c.controlBar.addChild(i)}var c=this,d=this.tech_,e=["video","audio","subtitle"],f={video:"vjs-icon-hd",audio:"vjs-icon-cog",subtitle:"vjs-icon-subtitles"};d.on("loadedqualitydata",b)}var f=a("./quality-picker-button"),g=d(f);videojs.plugin("qualityPickerPlugin",e)},{"./quality-picker-button":6}]},{},[1]);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)))

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_settings__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__favorites_favorites__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(112);
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

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(34);
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

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DownloadProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_file_transfer__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
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




// import { ToasterProvider } from '../toaster/toaster';
var DownloadProvider = (function () {
    function DownloadProvider(transfer, file) {
        this.transfer = transfer;
        this.file = file;
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
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__["a" /* File */]])
    ], DownloadProvider);
    return DownloadProvider;
}());

//# sourceMappingURL=download.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PressDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_gestures_gesture__ = __webpack_require__(207);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PressDirective = (function () {
    function PressDirective(el) {
        this.longPress = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.el = el.nativeElement;
    }
    PressDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.pressGesture = new __WEBPACK_IMPORTED_MODULE_1_ionic_angular_gestures_gesture__["a" /* Gesture */](this.el);
        this.pressGesture.listen();
        this.pressGesture.on('press', function (e) {
            _this.longPress.emit(e);
        });
    };
    PressDirective.prototype.ngOnDestroy = function () {
        this.pressGesture.destroy();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], PressDirective.prototype, "longPress", void 0);
    PressDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[longPress]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], PressDirective);
    return PressDirective;
}());

//# sourceMappingURL=longpress.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedItemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_favorites_favorites__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_toaster_toaster__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_epg_epg__ = __webpack_require__(222);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FeedItemComponent = (function () {
    function FeedItemComponent(navCtrl, actionSheetCtrl, favorites, toastProvider, modalCtrl) {
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.favorites = favorites;
        this.toastProvider = toastProvider;
        this.modalCtrl = modalCtrl;
        this.goToPlayChannel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.current = new Date().getTime();
    }
    FeedItemComponent.prototype.playChannel = function (item) {
        this.goToPlayChannel.emit(this.channel);
    };
    FeedItemComponent.prototype.getCurrentEPGTimeBar = function (programme) {
        var stop = new Date(programme._stop).getTime();
        var start = new Date(programme._start).getTime();
        var output = Math.floor(((this.current - start) * 100 / (stop - start)));
        return output >= 100 || output <= 0 ? "0%" : output.toString() + "%";
    };
    FeedItemComponent.prototype.itemOptions = function (index) {
        var _this = this;
        var item = this.channel;
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
                    text: 'Programme list',
                    icon: 'list-box',
                    handler: function () {
                        if (item.epg.length > 0) {
                            _this.presentEpgModal(item);
                        }
                        else {
                            _this.toastProvider.presentToast('No EPG available');
                        }
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
                /*
                {
                  text: "Hide",
                  icon: 'eye-off',
                  handler: () =>{
                    // Hide object
                    this.toastProvider.presentToast('Feature not enabled')
                  }
                },
                */
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
    FeedItemComponent.prototype.presentEpgModal = function (item) {
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_epg_epg__["a" /* EpgModalPage */], { item: item });
        profileModal.present();
    };
    FeedItemComponent.prototype.ngOnInit = function () {
        this.channel = this.obj;
        console.log('FROM ITEM', this.channel, this.index);
    };
    FeedItemComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], FeedItemComponent.prototype, "obj", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], FeedItemComponent.prototype, "index", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], FeedItemComponent.prototype, "goToPlayChannel", void 0);
    FeedItemComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'feed-item',template:/*ion-inline-start:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/directives/feed-item/feed-item.html"*/'<ion-item *ngIf="channel"\n  tappable\n  [ngClass]="{\'active\': channel.active}"\n  aria-checked="true" tabindex="{{index}}"\n  class="items-template item-{{index}}"\n  (press)="itemOptions(i)"\n  (tap)="playChannel(channel)">\n      <ion-thumbnail item-start >\n        <virtual-ion-img  *ngIf="channel.tvLogo" [src]="channel.tvLogo" [cache]="true" ></virtual-ion-img>\n        <!--<ion-img *ngIf="channel.tvLogo" [src]="channel.tvLogo" [cache]="true" ></ion-img>-->\n      </ion-thumbnail>\n      <h2>{{channel.tvName}}</h2>\n      <div *ngIf="channel.epg" class="epg" >\n          <div *ngFor="let epg of channel.epg">\n            <p>\n              <ion-icon name="information-circle"></ion-icon> {{epg.title.__text}}\n            </p>\n            <div class="timeline">\n              <div class="progress" [style.width]="getCurrentEPGTimeBar(epg)"></div>\n            </div>\n            <p class="epg-hours">\n                <span>{{epg._start  | date : \'shortTime\'}}</span>\n                -\n                <span>{{epg._stop  | date : \'shortTime\'}}</span>\n              </p>\n          </div>\n      </div>\n</ion-item>'/*ion-inline-end:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/directives/feed-item/feed-item.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_favorites_favorites__["a" /* FavoritesProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_toaster_toaster__["a" /* ToasterProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]])
    ], FeedItemComponent);
    return FeedItemComponent;
}());

//# sourceMappingURL=feed-item.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VirtualIonImg; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var VirtualIonImg = (function (_super) {
    __extends(VirtualIonImg, _super);
    function VirtualIonImg(__elementRef, __renderer, __plt, __content, __dom) {
        var _this = _super.call(this, __elementRef, __renderer, __plt, __content, __dom) || this;
        _this.__elementRef = __elementRef;
        _this.__content = __content;
        return _this;
    }
    Object.defineProperty(VirtualIonImg.prototype, "top", {
        get: function () {
            this._rect = this.__elementRef.nativeElement.getBoundingClientRect();
            return this._rect.top + this.__content.scrollTop - this.__content._cTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualIonImg.prototype, "bottom", {
        get: function () {
            this._rect = this.__elementRef.nativeElement.getBoundingClientRect();
            return this._rect.bottom + this.__content.scrollTop - this.__content._cTop;
        },
        enumerable: true,
        configurable: true
    });
    VirtualIonImg = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'virtual-ion-img',
            template: '<img>'
        }),
        __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* Optional */])()),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* DomController */]])
    ], VirtualIonImg);
    return VirtualIonImg;
}(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Img */]));

//# sourceMappingURL=virtual-list-image.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChannelPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_platform_platform__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_screen_orientation__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_insomnia__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_js_video_min_js__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_js_video_min_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__assets_js_video_min_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assets_js_videojs5_hlsjs_source_handler_min_js__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assets_js_videojs5_hlsjs_source_handler_min_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__assets_js_videojs5_hlsjs_source_handler_min_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { AlertController } from 'ionic-angular/components/alert/alert-controller';




// declare let Hls: any;
var ChannelPage = (function () {
    function ChannelPage(navParams, plt, screenOrientation, 
        // private alertController: AlertController,
        navController, statusBar, platform, insomnia) {
        var _this = this;
        this.navParams = navParams;
        this.plt = plt;
        this.screenOrientation = screenOrientation;
        this.navController = navController;
        this.statusBar = statusBar;
        this.platform = platform;
        this.insomnia = insomnia;
        this.current = new Date().getTime();
        this.amount = 30;
        this.item = this.navParams.get('channel');
        this.list = this.navParams.get('list');
        this.platform.ready().then(function (data) {
            _this.statusBar.hide();
            _this.insomnia.keepAwake().then(function () { return console.log('success'); }, function () { return console.log('error'); });
            //this.activateOrientationDetection()
        });
    }
    ChannelPage.prototype.activateOrientationDetection = function () {
        var _this = this;
        // Detect orientation changes
        this.screenOrientation.onChange().subscribe(function (data) {
            if (_this.screenOrientation.type.indexOf('landscape') > -1) {
                // Not working
                _this.player.enterFullWindow();
                _this.player.height('100%');
            }
            else {
                // Not working
                _this.player.exitFullWindow();
                _this.player.height('200px');
            }
        });
    };
    ChannelPage.prototype.ngOnInit = function () { };
    ChannelPage.prototype.registerPlayerButtons = function () {
        var Button = videojs.getComponent('Button');
        var MyButton = videojs.extend(Button, {
            constructor: function () {
                Button.apply(this, arguments);
                /* initialize your button */
            },
            handleClick: function () {
                /* do something on click */
            },
            buildCSSClass: function () {
                return "vjs-icon-next-item vjs-control vjs-button";
            }
        });
        videojs.registerComponent('MyButton', MyButton);
    };
    ChannelPage.prototype.playItem = function (item) {
        this.item = item;
        this.player.pause();
        this.player.src('');
        this.player.src({
            src: this.item.url,
            type: "application/x-mpegURL",
        });
        this.player.play();
    };
    ChannelPage.prototype.playVideoJsHLS = function () {
        var _this = this;
        // https://github.com/streamroot/videojs5-hlsjs-source-handler
        var self = this;
        var options = {
            fluid: true,
            html5: {
                hlsjsConfig: {
                    debug: false
                }
            }
        };
        // Adds custom buttons
        // this.registerPlayerButtons()
        try {
            this.player = videojs('stream-video', options);
            this.player.qualityPickerPlugin();
            //this.player.requestFullscreen();
            this.player.ready(function () {
                this.src({
                    src: self.item.url,
                    type: "application/x-mpegURL",
                });
                this.play();
            });
        }
        catch (err) {
            console.log("ERR VIDEOJS");
        }
        //Registring new custom button
        // this.player.getChild('controlBar').addChild('myButton', {});
        // VIDEOJS Error handling
        this.player.on('error', function (e) {
            console.log("VIDEOJS ERROR:", e);
            _this.navController.pop();
        });
    };
    ChannelPage.prototype.ionViewWillLeave = function () {
        this.player.dispose();
        if (!this.statusBar.isVisible) {
            this.statusBar.show();
        }
        this.insomnia.allowSleepAgain().then(function () { return console.log('success'); }, function () { return console.log('error'); });
    };
    ChannelPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.platform.ready().then(function (data) {
            _this.playVideoJsHLS();
            // this.videoProvider.playVideoJsHLS(this.item)
        });
    };
    ChannelPage.prototype.doInfinite = function (infiniteScroll) {
        this.amount = this.amount + 30;
        infiniteScroll.complete();
    };
    ChannelPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'channel',template:/*ion-inline-start:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/channel/channel.html"*/'<ion-content>\n  <div class="video-container">\n    <div class="video-wrapper">\n      <video *ngIf="item.url" \n        id="stream-video" \n        poster="myPoster.jpg" \n        class="video-js vjs-big-play-centered" controls ></video>\n    </div>\n  </div>\n</ion-content>\n<!-- Channels menu -->\n<ion-menu side="right" [content]="content">\n  <!--<ion-header>\n    <ion-toolbar>\n      <ion-title>Channels</ion-title>\n    </ion-toolbar>\n  </ion-header>-->\n  <ion-content>\n    <ion-list>\n      <div *ngFor="let channel of list; let i = index;">\n        <feed-item \n          *ngIf="i < amount"\n          [obj]="channel" [index]="i"\n          (goToPlayChannel)="playItem($event)"\n          [ngClass]="{\'active\': item.tvName === channel.tvName}"></feed-item>\n        </div>\n    </ion-list>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </ion-content>\n</ion-menu>\n<ion-nav #content></ion-nav>\n'/*ion-inline-end:"/Users/joaomazarelo/Work/mobile/iptv-app/iptv-base-app/src/pages/channel/channel.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_platform_platform__["a" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_platform_platform__["a" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_insomnia__["a" /* Insomnia */]])
    ], ChannelPage);
    return ChannelPage;
}());

//# sourceMappingURL=channel.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EpgProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__storage_storage__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_alert_alert_controller__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__loading_loading__ = __webpack_require__(219);
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
    function EpgProvider(http, storage, alertCtrl, loadingProvider) {
        this.http = http;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.loadingProvider = loadingProvider;
        this.epgPrefix = 'epg-list-';
    }
    EpgProvider.prototype.convertXmlToJson = function (data) {
        var _this = this;
        var jsonData = this.x2jsParser(data);
        if (jsonData) {
            if (jsonData.hasOwnProperty('tv')) {
                jsonData = jsonData.tv;
            }
            // Normalize start and finish times before saving in memory
            jsonData.programme.map(function (programme) {
                programme._start = _this.convertEPGDateToReadable(programme._start);
                programme._stop = _this.convertEPGDateToReadable(programme._stop);
            });
            jsonData.lastUpdated = new Date();
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
            year: data.toString().slice(0, 4),
            month: data.toString().slice(4, 6),
            day: data.toString().slice(6, 8),
            hour: data.toString().slice(8, 10),
            min: data.toString().slice(10, 12)
        };
        var formatedData = new Date(output.year + "-" + output.month + "-" + output.day + " " + output.hour + ":" + output.min);
        return formatedData;
    };
    EpgProvider.prototype.x2jsParser = function (data) {
        var xml = data;
        var x2js = new X2JS();
        console.log(x2js.xml_str2json(xml));
        var jsonObj = x2js.xml_str2json(xml);
        return jsonObj;
    };
    EpgProvider.prototype.downloadEPGFile = function (url) {
        // 'https://mazarelo.ddns.net:8443/index.php/s/x9FNZby4dH4PPne/download'
        return this.http.get(url, { responseType: 'text' });
    };
    EpgProvider.prototype.promptForEPGFileUrl = function (country) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            var alert = _this.alertCtrl.create({
                title: 'Do you have a EPG url',
                inputs: [
                    {
                        name: 'url',
                        placeholder: 'Url'
                    }
                ],
                buttons: [
                    {
                        text: 'Choose from list',
                        handler: function (data) {
                            _this.getRemoteEPGList().subscribe(function (res) {
                                var data = res;
                                data = data.filter(function (el) { return el !== 'list.json'; });
                                _this.chooseFromRemoteEPGList(data).subscribe(function (response) {
                                    var url = 'https://mazarelo.com/iptv/epg/' + response;
                                    _this.getEPG(url, country).subscribe(function (data) {
                                        observer.next(data);
                                    });
                                });
                            }, function (err) {
                                console.log("FAILED TO GET EPG URL");
                                observer.next(false);
                            });
                        }
                    }, {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function (data) {
                            console.log(data);
                        }
                    }, {
                        text: 'Ok',
                        handler: function (data) {
                            _this.getEPG(data.url, country).subscribe(function (data) {
                                observer.next(data);
                            });
                        }
                    }
                ]
            });
            alert.present();
        });
    };
    EpgProvider.prototype.clear = function () {
        var _this = this;
        this.storage.listAll().then(function (data) {
            if (data) {
                data.map(function (el) {
                    if (el.indexOf(_this.epgPrefix) > -1) {
                        _this.storage.remove(el);
                    }
                });
            }
        });
    };
    EpgProvider.prototype.getEPG = function (url, country) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            var loader = _this.loadingProvider.presentLoadingDefault('Generating EPG');
            var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
            var regex = new RegExp(expression);
            if (url.match(regex)) {
                _this.downloadEPGFile(url).subscribe(function (res) {
                    if (res) {
                        var output_1 = _this.convertXmlToJson(res);
                        _this.storage.set(_this.epgPrefix + country.toLowerCase(), output_1)
                            .then(function () {
                            observer.next(output_1);
                            loader.dismiss();
                        })
                            .catch(function (err) {
                            observer.next(false);
                            loader.dismiss();
                        });
                    }
                    else {
                        loader.dismiss();
                    }
                }, function (err) {
                    loader.dismiss();
                    observer.next(false);
                });
            }
            else {
                loader.dismiss();
                observer.next(false);
            }
        });
    };
    EpgProvider.prototype.chooseFromRemoteEPGList = function (data) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            var alert = _this.alertCtrl.create();
            alert.setTitle('Select Site');
            data.forEach(function (el) {
                alert.addInput({
                    type: 'radio',
                    label: el.replace('.xml', ''),
                    value: el
                });
            });
            alert.addButton('Cancel');
            alert.addButton({
                text: 'OK',
                handler: function (data) {
                    alert.dismiss();
                    observer.next(data);
                    return false;
                }
            });
            alert.present();
        });
    };
    EpgProvider.prototype.remove = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!name)
                resolve({ error: true, message: 'Invalid name provided' });
            var reference = name.toLowerCase();
            _this.storage.listAll().then(function (data) {
                if (data) {
                    data.map(function (el) {
                        if (el == _this.epgPrefix + reference) {
                            _this.storage.remove(el);
                            resolve(true);
                        }
                    });
                }
                else {
                    resolve({ error: true, message: 'Error accessing store' });
                }
            });
        });
    };
    EpgProvider.prototype.getRemoteEPGList = function () {
        return this.http.get('https://mazarelo.com/iptv/epg/list.json');
    };
    EpgProvider.prototype.addEpg = function (group) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            _this.promptForEPGFileUrl(group).subscribe(function (data) {
                if (data) {
                    observer.next(data);
                }
                else {
                    observer.next(false);
                }
            });
        });
    };
    EpgProvider.prototype.getCountryEPG = function (country) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            _this.storage.get(_this.epgPrefix + country.toLowerCase()).then(function (data) {
                var epg;
                try {
                    epg = JSON.parse(data);
                }
                catch (err) {
                    console.log('ERROR PARSING JSON');
                    observer.next(false);
                }
                if (epg) {
                    console.log('From store:', epg);
                    return observer.next(epg);
                }
                else {
                    return observer.next(false);
                    /*this.promptForEPGFileUrl(country).subscribe(data => {
                      if (data) {
                        observer.next(data)
                      } else {
                        observer.next(false)
                      }
                    })*/
                }
            }).catch(function (err) {
                observer.next(false);
            });
        });
    };
    EpgProvider.prototype.refreshEPG = function (url) {
    };
    EpgProvider.prototype.getChannelEPG = function (channelId, country) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            _this.getCountryEPG(country).subscribe(function (data) {
                var epgData = data;
                observer.next(epgData.programme.filter(function (epg) { return epg._channel == channelId; }));
            });
        });
    };
    EpgProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__storage_storage__["a" /* StorageProvider */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular_components_alert_alert_controller__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_6__loading_loading__["a" /* LoadingProvider */]])
    ], EpgProvider);
    return EpgProvider;
}());

//# sourceMappingURL=epg.js.map

/***/ })

},[224]);
//# sourceMappingURL=main.js.map