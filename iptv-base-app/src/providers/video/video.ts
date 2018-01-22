import { Injectable } from '@angular/core';
//import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { AndroidExoplayer } from '@ionic-native/android-exoplayer'
import { StreamingMedia } from '@ionic-native/streaming-media';
//import { VideoPlayer } from '@ionic-native/video-player';

declare global {
    interface Window { ExoPlayer: any; }
}
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
    // private videoPlayer: VideoPlayer,
    //private storage: Storage
    ) {}

    buildPlayerOptions(item) : any{
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
         let simpleoptions = { 
             url: 'http://clientportal.link:8080/live/C0HCVMO3025/JcFT4I6502/3227.m3u8', 
             user_agent: "PluginExoPlayer", 
             aspectRatio: 'FILL_SCREEN', // default is FIT_SCREEN
             hideTimeout: 5000, // Hide controls after this many milliseconds, default is 5 sec
             autoPlay: true, // When set to false stream will not automatically start
             audioOnly: true, // Only play audio in the backgroud, default is false.
             connectTimeout: 1000, // okhttp connect timeout in ms (default is 0)
             readTimeout: 1000, // okhttp read timeout in ms (default is 0)
             writeTimeout: 1000, // okhttp write timeout in ms (default is 0)
             pingInterval: 1000, // okhttp socket ping interval in ms (default is 0 or disabled)
             retryCount: 5, // number of times datasource will retry the stream before giving up (default is 3)
             controller: { // If this object is not present controller will not be visible
                 streamImage: 'http://url.to/channel.png',
                 streamTitle: 'Cool channel / movie',
                 streamDescription: '2nd line you can use to display whatever you want like current program epg or movie description',
                 hideProgress: true, // Hide entire progress timebar
                 hidePosition: false, // If timebar is visible hide current position from it
                 hideDuration: false, // If timebar is visible Hide stream duration from it
                 controlIcons: {
                     'exo_rew': 'http://url.to/rew.png',
                     'exo_play': 'http://url.to/play.png',
                     'exo_pause': 'http://url.to/pause.png',
                     'exo_ffwd': 'http://url.to/ffwd.png'
                 }
             }
        }
        return  simpleoptions
    }
    

  start(item){
      this.platform.ready().then(val => {
          if(val){
            this.startExoplayer(item)
            // this.startNativePlayer(item)
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

    var successCallback = function(json) {
        console.log('PLAYER SUCCESS:', json)
    };

    var errorCallback = function(error) {
        console.log("PLAYER ERRORS:", error)
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
  }

  startNativePlayer(item){
    let options = {
        successCallback: () => { 
          console.log('Video played')
        },
        errorCallback: (e) => { 
        },
        orientation: 'auto'
      };

     return this.streamingMedia.playVideo(item.url, options);
  }
}
