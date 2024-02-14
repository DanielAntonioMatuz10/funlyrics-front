import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public active: boolean = true;

  constructor() { }

  public sign_in_btn = document.querySelector("#sign-in-btn");
  public sign_up_btn = document.querySelector("#sign-up-btn");
  public container = document.querySelector(".container");

  ngOnInit(): void {
  }

  sign_up() {
    setTimeout(() => {
      this.active = false;
    }, 1200);
    document.getElementById("container").classList.add('sign-up-mode');
  }

  sign_in() {
    setTimeout(() => {
      this.active = true;
    }, 1200);
    document.getElementById("container").classList.remove('sign-up-mode');
  }

}
