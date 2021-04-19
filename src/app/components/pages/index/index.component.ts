import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor() { }

  public menuList:any;

  ngOnInit(): void {
    this.menuList = document.getElementById("menuList");
    this.menuList.style.maxHeight = "0px";
  }

  menuOpen() {


    if (this.menuList.style.maxHeight == "0px") {
      this.menuList.style.maxHeight = "130px";
    } else {
      this.menuList.style.maxHeight = "0px";
    }
  }

}
