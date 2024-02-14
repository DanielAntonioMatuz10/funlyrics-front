import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.scss']
})
export class SyncComponent implements OnInit {


  title = 'MusicLetter';

  public play = false;
  public lyricsDisplay = '...';
  public lyricsTraslateDisplay = '...';
  public playControl = false;
  public volumeControl = false;
  public timeTotalMusic = '0:00';
  public timeCurrentMusic = '0:00';
  public volumeDefect = 100;
  public fullScreen = false;

  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;
  public eventData: any;
  public nameVideo = '';

  public syncStart = false;
  public error = false;
  public dataLyricsMain = [];
  public mainAction = false;
  public position = 0;
  public statusSync = 2;

  public dataSyncEnter = [];
  public preview = false;
  public detailsHidden = true;
  public pauseActions = true;
  public endSyncExecute = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  dataLyricsSync = [];
  elem = document.documentElement;


  btnVolume() {
    this.volumeControl = !this.volumeControl;
  }

  timeSlider() {
    var seekslider, seekto;
    seekslider = <HTMLVideoElement> document.getElementById('seekslider');
    seekto = this.player.getDuration() * (seekslider.value / 100);
    this.player.seekTo(seekto);
    seekslider.value = (100 / this.player.getDuration()) * this.player.getCurrentTime();
    // @ts-ignore
    document.getElementById('audio-element').play();
    document.getElementById('body').classList.remove('bkg-alternative');
    this.eventData.target.playVideo();
    this.playControl = true;
    this.lyricsDisplay = '...';
    this.lyricsTraslateDisplay = '...';
  }

  volumeSlider() {
    var volumeslider;
    volumeslider = <HTMLVideoElement> document.getElementById('volume');
    this.player.setVolume(volumeslider.value);
    this.volumeDefect = volumeslider.value;
  }

  playSyncMusic() {
    document.getElementById('body').classList.remove('bkg-alternative');
    setTimeout(() => {
      this.syncLyrics();
    }, 1000);

  }

  syncLyrics() {
    var time = this.cleanTime();
    this.timeTotalMusic = this.timeCurrentPlay(this.player.getDuration());
    this.timeCurrentMusic = this.timeCurrentPlay(this.cleanTime());
    this.nameVideo = this.player.getVideoData().title;

    var seekslider;
    seekslider = <HTMLVideoElement> document.getElementById('seekslider');
    seekslider.value = (100 / this.player.getDuration()) * this.player.getCurrentTime();

    if (Math.round(time) == this.dataLyricsSync[this.dataLyricsSync.length - 1][2]) {
      this.playControl = false;
      seekslider.value = 100;
    }


    if (this.preview){
      for (let i = 0; i < this.dataLyricsSync.length; i++) {
        if (Math.round(time) == this.dataLyricsSync[i].tI) {
          this.lyricsDisplay = this.dataLyricsSync[i].data + '';
        }
/*        if (Math.round(time) == this.dataLyricsSync[i].tE) {
          this.lyricsDisplay = this.dataLyricsSync[i + 1].data + '';
        }*/
      }
    }


    setTimeout(() => {
      this.syncLyrics();
    }, 1000);
  }


  timeCurrentPlay(segundosP) {
    var dataTime = '';
    let segundos = (Math.round(segundosP % 0x3C)).toString();
    let horas = (Math.floor(segundosP / 0xE10)).toString();
    let minutos = (Math.floor(segundosP / 0x3C) % 0x3C).toString();

    if (parseInt(segundos) < 10) {
      segundos = '0' + segundos;
    }

    if (segundos == '60') {
      segundos = '59';
    }

    dataTime = minutos + ':' + segundos;

    return dataTime;
  }

  init() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  startVideo() {
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      videoId: this.video,
      playerVars: {
        autoplay: 0,
        modestbranding: 0,
        controls: 0,
        disablekb: 0,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 0
      },
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onError': this.onPlayerError.bind(this),
        'onReady': this.onPlayerReady.bind(this),
      }
    });
  }

  onPlayerReady(event) {
    this.eventData = event;
  }

  onPlayerStateChange(event) {
    //console.log(event)
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          //console.log('started ' + this.cleanTime());
          this.playSyncMusic();
        } else {
          //console.log('playing ' + this.cleanTime())
        }
        ;
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          // console.log('paused' + ' @ ' + this.cleanTime());
        }
        ;
        break;
      case window['YT'].PlayerState.ENDED:
        document.getElementById('body').classList.add('bkg-alternative');
        this.playControl = false;
        //console.log('ended ');
        break;
    }
  }

  cleanTime() {
    return Math.round(this.player.getCurrentTime());
  }

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        //console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }

  playOrPaused() {
    this.playControl = !this.playControl;
    try {
      this.eventData.target.playVideo();
    } catch (e) {
      this.eventData.target.playVideo();
    }
    this.dataLyricsSync.push({"tI":Math.round(this.player.getCurrentTime()), "data":this.dataLyricsMain[this.position], "tE": 0})
  }

  playOrPaused2() {
    this.playControl = !this.playControl;
    if (this.pauseActions) { this.eventData.target.pauseVideo(); }
    this.dataLyricsSync[this.position][2] = Math.round(this.player.getCurrentTime());
    this.position++;
  }

  openFullScreen() {
    var elem = document.documentElement;
    this.fullScreen = true;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else { // @ts-ignore
      if (elem.webkitRequestFullscreen) { /* Safari */
        // @ts-ignore
        elem.webkitRequestFullscreen();
      } else { // @ts-ignore
        if (elem.msRequestFullscreen) { /* IE11 */
          // @ts-ignore
          elem.msRequestFullscreen();
        }
      }
    }
  }

  closeFullScreen() {
    var elem = document.documentElement;
    this.fullScreen = false;

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else { // @ts-ignore
      if (document.webkitExitFullscreen) { /* Safari */
        // @ts-ignore
        document.webkitExitFullscreen();
      } else { // @ts-ignore
        if (document.msExitFullscreen) { /* IE11 */
          // @ts-ignore
          document.msExitFullscreen();
        }
      }
    }
  }


  addLinkYouTube(value) {
    let dataAux = value.split('https://www.youtube.com/watch?v=');
    this.video = dataAux[1];

  }

  startSyncExecutions() {
    if (this.video != null) {
      this.syncStart = true;
      this.error = false;
      this.init();
      this.playSyncMusic();
      this.detailsHidden = false;
    } else {
      this.error = true;
    }
  }

  addLyricsData(value) {
    this.dataLyricsMain = value.split("\n");
  }

  startProcessMainSync() {
    let dataAux = [];

    for (let i=0; i< this.dataLyricsMain.length; i++){
      if (this.dataLyricsMain[i] != "") {
        dataAux.push(this.dataLyricsMain[i]);
      }
    }
    this.dataLyricsMain = dataAux;
    this.mainAction = true;
  }

  endSyncVideo() {
    this.preview = true;
    this.init();
    this.player.seekTo(0);
    this.eventData.target.playVideo();
  }

  pauseByActions() {
    this.pauseActions = false;
  }

  reloadData() {
    this.eventData.target.pauseVideo();
    this.init();
    this.player.seekTo(0);
    this.playControl = false;
    this.position = 0;
  }

  endSynEx() {
    this.endSyncExecute = true;
  }

  copyUrl() {

  }

}
