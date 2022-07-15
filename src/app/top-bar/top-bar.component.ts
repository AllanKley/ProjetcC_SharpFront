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

  profile(){
    if(localStorage.getItem('authToken') != null)
      this.router.navigate(['client/profile']);
    else
      this.router.navigate(['client/login'])  
  }


  
  sair(){
    var instance = this;
    localStorage.clear();
    instance.router.navigate(['client/login']);
  }



  checkUser(){
    
    if(localStorage.getItem('authToken') == null){
      console.log("não logado");
      this.logado = false;
      this.client = false;
      this.owner = false;
    }else{
      var data = JSON.stringify({});
      console.log(data)
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
    }

    
    
  }


}




