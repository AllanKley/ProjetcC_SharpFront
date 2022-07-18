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
    if (localStorage.getItem('authTokenClient') && localStorage.getItem('authTokenOwner') != null) {
      console.log("não logado");
      this.logado = false;
      this.client = false;
      this.owner = false;
<<<<<<< HEAD
    }else{
      var data = JSON.stringify({});
     
      var config = {
        method: 'get',
        url: 'http://localhost:5236/client/test',
        headers: { 
          'Authorization': 'Bearer ' + localStorage.getItem("authToken"),
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      let instance = this;
      axios(config)
      .then(function (response) {
        if(response.data){
          instance.client = true;
          instance.owner = false;
          instance.logado = true;
          
        }else{
          instance.client = false;
          instance.owner = true;
          instance.logado = true;
          
        }
      })
      .catch(function (error) {
      })
=======
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
>>>>>>> 02bbf8f869b958c5907584c00d4dd4a52a8c8cf9
    }
  }
}




