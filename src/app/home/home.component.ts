import { Component, OnInit } from '@angular/core';
import {WOW} from "wowjs/dist/wow.min";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    const wow = new WOW({
      live: false
    });
    wow.init();
    wow.sync();
  }

  public animate(){
    const wow = new WOW();
    wow.init();
    wow.sync();
  }

}
