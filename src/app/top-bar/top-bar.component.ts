import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkUser();
  }

  profile(){
    var instance = this;
    if(localStorage.getItem('authToken') != null){
      instance.router.navigate(['client/profile']);
    }else{
      instance.router.navigate(['client/login'])
    }
  }

  sair(){
    var instance = this;
    localStorage.clear();
    instance.router.navigate(['client/login']);
  }

  checkUser(){
    if(localStorage.getItem('authToken') != null){
      this.logado = true;
      this.client = true;
    }
    console.log(this.logado);

  }
}




