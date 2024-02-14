import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watchfun',
  templateUrl: './watchfun.component.html',
  styleUrls: ['./watchfun.component.scss']
})
export class WatchfunComponent implements OnInit {

  public play = false;
  public lyricsDisplay = "...";
  public lyricsTraslateDisplay = "..."
  public volumeControl = false;
  public timeTotalMusic = '0:00';
  public timeCurrentMusic = '0:00';
  public volumeDefect = 100;
  public fullScreen = false;
  public playAction = false;

  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;
  public eventData: any;
  public nameVideo = "";

  public demoArrayData = ['0fnrNna6fuk','GTcM3qCeup0']
  public position = 0;


  constructor() { }

  ngOnInit(): void {
    this.video = this.demoArrayData[this.position];
    this.init();
    this.playSyncMusic();
  }

  dataLyricsSync = [[5, 'Fireworks', 8], [9, 'Shooting stars', 11], [11, 'Blinding lights', 13], [13, 'Wonder where', 14],
    [14, 'Where you are', 17], [17, 'You\'re in the leaves', 18], [18, 'You\'re in the rain', 20], [20, 'You\'re in the air', 23],
    [23, 'You\'re the one that I keep chasing everywhere', 29], [29, 'I will hunt you down', 34], [34, 'I will hunt you down (2)', 41],
    [41, 'Firefly', 122], [121, 'In the night', 122], [122, 'I see your trail', 125], [125, 'And I wish', 126], [127, 'That somehow', 128],
    [128, 'You could stay', 131], [131, 'But you keep flying', 132], [132, 'That\'s the way', 134], [134, 'That you are', 137],
    [137, 'You will always belong among the stars', 143], [143, 'Firefly', 240], [240, 'End ...', 244]]

  dataLyricsSyncTraslate = [[5, 'Fuegos artificiales', 8], [9, 'Estrellas fugaces', 11], [11, 'Luces cegadoras', 13],
    [13, 'Me pregunto donde', 14], [14, 'Dónde estás', 17], [17, 'Estas en las hojas', 18], [18, 'Estas en la lluvia', 20],
    [20, 'Estas en el aire', 23], [23, 'Eres la que sigo persiguiendo en todas partes', 29],
    [29, 'Te cazaré', 34], [34, 'Te cazaré (2)', 41], [41, 'Fuegos artificiales', 122], [121, 'En la noche', 122],
    [122, 'Veo tu rastro', 125], [125, 'Y deseo', 126], [127, 'Que de alguna manera', 128], [128, 'Podrías quedarte', 131],
    [131, 'Pero sigues volando', 132], [132, 'Esa es la manera', 134], [134, 'Eso eres', 137], [137, 'Siempre pertenecerás entre las estrellas', 143],
    [143, 'Fuegos artificiales', 240], [240, 'Fin ...', 244]]





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
    document.getElementById("body").classList.remove('bkg-alternative');
    this.eventData.target.playVideo();
    this.playAction = true;
    this.lyricsDisplay = "...";
    this.lyricsTraslateDisplay = "...";
  }

  volumeSlider() {
    var volumeslider;
    volumeslider = <HTMLVideoElement> document.getElementById('volume');
    this.player.setVolume(volumeslider.value);
    this.volumeDefect = volumeslider.value;
  }

  playSyncMusic() {
    document.getElementById("body").classList.remove('bkg-alternative');
    setTimeout(() => {
      this.syncLyrics();
    }, 1000);

  }

  syncLyrics() {
    var time = this.cleanTime();
    this.timeTotalMusic = this.timeCurrentPlay(this.player.getDuration());
    this.timeCurrentMusic = this.timeCurrentPlay(this.cleanTime());
    this.nameVideo = this.player.getVideoData().title;

    if (Math.round(time) == this.dataLyricsSync[this.dataLyricsSync.length - 1][2]) {
      this.playAction = false;
    }

    for (let i = 0; i < this.dataLyricsSync.length; i++) {
      if (Math.round(time) == this.dataLyricsSync[i][0]) {
        this.lyricsDisplay = this.dataLyricsSync[i][1] + '';
        this.lyricsTraslateDisplay = this.dataLyricsSyncTraslate[i][1] + '';
      }
      if (Math.round(time) == this.dataLyricsSync[i][2]) {
        this.lyricsDisplay = this.dataLyricsSync[i + 1][1] + '';
        this.lyricsTraslateDisplay = this.dataLyricsSyncTraslate[i + 1][1] + '';
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
      segundos = "0" + segundos;
    }

    if (segundos == "60") {
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
    window['onYouTubeIframeAPIReady'] = () =>  this.startVideo();
  }

  startVideo() {
    this.reframed = false;
    document.getElementById("main").classList.remove('bkg-alternative');
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
        };
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          // console.log('paused' + ' @ ' + this.cleanTime());
        };
        break;
      case window['YT'].PlayerState.ENDED:
        document.getElementById("body").classList.add('bkg-alternative');
        if (this.position <= this.demoArrayData.length-1){this.nextContent();}
        break;
    }
  }

  cleanTime() {
    return Math.round(this.player.getCurrentTime())
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
    this.playAction = !this.playAction;
    this.eventData.target.playVideo();
  }

  playOrPaused2() {
    this.playAction = !this.playAction;
    this.eventData.target.pauseVideo();
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

  backContent() {
    this.position--;
    this.coreContent();
  }

  nextContent() {
    this.position++;
    this.coreContent();
  }


  coreContent() {
    if (this.position <= this.demoArrayData.length -1) {
      this.player.loadVideoById(this.demoArrayData[this.position], 0, "default");
      this.eventData.target.playVideo();
      this.playAction = true;
      this.lyricsDisplay ="...";
      this.lyricsTraslateDisplay = "...";
      // @ts-ignore
      document.getElementById('audio-element').play();
    }
  }


}
