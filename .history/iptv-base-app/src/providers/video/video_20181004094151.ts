import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
declare let videojs: any;
declare let Hls: any;

@Injectable()
export class VideoProvider {

  constructor(
    private platform: Platform,
    ) {}

  start(item) {
    this.platform.ready().then((val) => {
      if (val) {
        this.playVideoJsHLS(item);
      }
    });
  }

  showControlls() {
    
  }

  close() {

  }

  playVideoJsHLS(item) {
    // https://github.com/streamroot/videojs5-hlsjs-source-handler
    const options = {
      html5: {
        hlsjsConfig: {
          debug: false,
        },
      },
    };

    const player = videojs('stream-video', options);
    player.qualityPickerPlugin();
    player.ready(function () {
      this.src({
        src: item.url,
        type: 'application/x-mpegURL',
      });
    });
  }

  startUsingHlsNative() {
    const video: any = document.getElementById('stream-video');
    if (Hls.isSupported()) {
     
      const hls = new Hls();
      hls.loadSource('http://clientportal.link:8080/live/zk5DrRr958/w9MaPr386/3214.m3u8');
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = 'http://clientportal.link:8080/live/zk5DrRr958/w9MaPr386/3214.m3u8';
      video.addEventListener('canplay', () => {
        video.play();
      });
    }
  }
}
