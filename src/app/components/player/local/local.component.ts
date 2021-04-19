import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss']
})
export class LocalComponent implements OnInit {

  title = 'MusicLetter';

  public play = false;
  public lyricsDisplay = "...";
  public lyricsTraslateDisplay = "..."
  public playControl = false;
  public volumeControl = false;
  public timeTotalMusic = '0:00';
  public timeCurrentMusic = '0:00';
  public volumeDefect = 100;

  constructor() {
  }

  ngOnInit(): void {
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

  /*  dataLyricsSync = [[7,'I\'d move to Tokyo',14],[14,'If that\'s where you want to go',18],[18,'Don\'t have to go alone',22],[22,'You can just let me know',26],
      [26,'I\'d move to Tokyo',30],[30,'To London or Mexico',34],[34,'I know that I said goodbye',38],[38,'But can I still change my mind?',40],
      [40,'I was just scared (it got heavy)',48],[48,'This time I swear (I\'m ready)',91],[91,'I\'d move to Tokyo',100]
      ,[100,'I know that I said goodbye',103],[103,'Can I still change my mind?',138],[138,'I\'d move to Tokyo',141],[141,'To London or Mexico',145],
      [145,'I know that I said goodbye',149],[149,'But can I still change my mind?',153],[153,'I was just scared',159],
      [159,'This time I swear (I\'m ready)',168],[168,'But can I still change my mind?',199],[199,'End...',286]]

    dataLyricsSyncTraslate = [[7,'Me mudaría a tokio',14],[14,'Si es ahí a donde quieres ir',18],[18,'No tienes que ir solo',22],[22,'Puedes dejarme saber',26],
      [26,'Me mudaría a tokio',30],[30,'A Londres o México',34],[34,'Yo se que dije adios',38],[38,'¿Pero todavía puedo cambiar de opinión?',40],
      [40,'Solo estaba asustado (se puso pesado)',48],[48,'Esta vez lo juro (estoy listo)',91],[91,'Me mudaría a tokio',100]
      ,[100,'Yo se que dije adios',103],[103,'¿Todavía puedo cambiar de opinión?',138],[138,'Me mudaría a tokio',141],[141,'A Londres o México',145],
      [145,'Yo se que dije adios',149],[149,'¿Pero todavía puedo cambiar de opinión?',153],[153,'Solo estaba asustada',159],
      [159,'Esta vez lo juro (estoy listo)',168],[168,'¿Pero todavía puedo cambiar de opinión?',199],[199,'Fin...',286]]*/


  playOrPaused() {
    this.playControl = !this.playControl;
  }

  btnVolume() {
    this.volumeControl = !this.volumeControl;
  }

  timeSlider() {
    var seekslider, seekto;
    seekslider = <HTMLVideoElement> document.getElementById('seekslider');
    let audio = <HTMLVideoElement> document.getElementById('audio-element');
    seekto = audio.duration * (seekslider.value / 100);
    audio.currentTime = seekto;
    seekslider.value = (100 / audio.duration) * audio.currentTime;
  }

  volumeSlider() {
    var volumeslider;
    volumeslider = <HTMLVideoElement> document.getElementById('volume');
    let audio = <HTMLVideoElement> document.getElementById('audio-element');
    audio.volume = volumeslider.value / 100;
    this.volumeDefect = volumeslider.value;
  }

  playSyncMusic() {
    setTimeout(() => {
      this.syncLyrics();
    }, 1000);

  }

  syncLyrics() {
    let audio = <HTMLVideoElement> document.getElementById('audio-element');

    var time = audio.currentTime;
    this.timeTotalMusic = this.timeCurrentPlay(audio.duration);
    this.timeCurrentMusic = this.timeCurrentPlay(audio.currentTime);

    var seekslider;
    seekslider = <HTMLVideoElement> document.getElementById('seekslider');
    seekslider.value = (100 / audio.duration) * audio.currentTime;

    if (Math.round(time) == this.dataLyricsSync[this.dataLyricsSync.length - 1][2]) {
      this.playControl = false;
      seekslider.value = 100;
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
}




