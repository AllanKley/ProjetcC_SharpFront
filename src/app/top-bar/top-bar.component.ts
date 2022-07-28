import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {


  @Input() titulo = ""

  client: boolean = false;
  owner: boolean = false;
  logado: boolean = false;
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.checkUser();
  }

  profile() {
    if (localStorage.getItem('authTokenOwner') || localStorage.getItem('authTokenClient') != null) {
      if (localStorage.getItem('authTokenClient')) {
        this.router.navigate(['client/profile']);
      } else {
        
        this.router.navigate(['owner/profile']);
      }
    }
    else
      this.router.navigate(['client/login'])
  }



  sair() {
    var instance = this;
    localStorage.clear();
    instance.router.navigate(['client/login']);
  }



  checkUser() {
    
    if ((localStorage.getItem('authTokenClient') == null) && (localStorage.getItem('authTokenOwner') == null)) {

      this.logado = false;
      this.client = false;
      this.owner = false;
    } else {
      if (localStorage.getItem('authTokenClient')) {
        this.client = true;
        this.owner = false;
        this.logado = true;
      } else {
        this.client = false;
        this.owner = true;
        this.logado = true;
      }
    }
  }
}




