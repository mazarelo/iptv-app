import { Injectable } from '@angular/core';
//import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { AndroidExoplayer } from '@ionic-native/android-exoplayer'
import { StreamingMedia } from '@ionic-native/streaming-media';

/*
  Generated class for the M3u8Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VideoProvider {

  constructor(
    private androidExoPlayer: AndroidExoplayer,
    private platform: Platform,
    private streamingMedia: StreamingMedia,
    //private storage: Storage
    ) {}

    buildPlayerOptions(item) : any{
        let options = {
            url: item.url, 
            aspectRatio: 'FIT_SCREEN',
            connectTimeout: 1000,
            autoPlay: true,
            controller: { // If this object is not present controller will not be visible
                streamImage: '',
                streamTitle: item.tvName,
                streamDescription: '',
                hideProgress: true, // Hide entire progress timebar
                hidePosition: false, // If timebar is visible hide current position from it
                hideDuration: true, // If timebar is visible Hide stream duration from it
                controlIcons: {
                }
            }
        }
        return  options
    }

  start(item){
      // Push a new View
      this.platform.ready().then(val => {
          if(val){
            this.startNativePlayer(item)
          }
    })
  }

  showControlls(){
    return this.androidExoPlayer.showController()
  }

  close(){
    return this.androidExoPlayer.close()
  }
  
  startExoplayer(item){
    let options = this.buildPlayerOptions(item)
    console.log('OPTIONS', options)
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
  }

  startNativePlayer(item){
    let options = {
        successCallback: () => { 
          console.log('Video played')
        },
        errorCallback: (e) => { 
        },
        orientation: 'landscape'
      };

    return this.streamingMedia.playVideo(item.url, options);
  }
}
