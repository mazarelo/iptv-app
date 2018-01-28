import { Injectable } from '@angular/core';
//import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
//import { VideoPlayer } from '@ionic-native/video-player';
declare let videojs: any;
declare let Hls: any;

@Injectable()
export class VideoProvider {

  constructor(
    private platform: Platform,
    //private storage: Storage
    ) {}

  start(item){
      this.platform.ready().then(val => {
          if(val){
            this.playVideoJsHLS(item)
          }
      })
  }

  showControlls(){
    
  }

  close(){

  }

  playVideoJsHLS(item){
    // https://github.com/streamroot/videojs5-hlsjs-source-handler
    var self = this
    var options = {
      html5: {
        hlsjsConfig: {
          debug: false
        }
      }
    };

    let player = videojs('stream-video', options);
    player.qualityPickerPlugin();
    player.ready(function(){
      this.src({
        src: item.url,
        type: "application/x-mpegURL",
      })
    })
  }

  startUsingHlsNative(){

    if(Hls.isSupported()) {
      var video: any = document.getElementById('stream-video');
      var hls = new Hls();
      hls.loadSource('http://clientportal.link:8080/live/zk5DrRr958/w9MaPr386/3214.m3u8');
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED,function() {
        video.play();
      });
   }
   // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
   // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
   // This is using the built-in support of the plain video element, without using hls.js.
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = 'http://clientportal.link:8080/live/zk5DrRr958/w9MaPr386/3214.m3u8';
      video.addEventListener('canplay',function() {
        video.play();
      });
    }

  }

}
