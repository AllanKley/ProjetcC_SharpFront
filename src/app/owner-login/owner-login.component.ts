import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-login',
  templateUrl: './owner-login.component.html',
  styleUrls: ['./owner-login.component.css']
})
export class OwnerLoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  login() {
    let user = document.getElementById("username") as HTMLInputElement;
    let passwd = document.getElementById("password") as HTMLInputElement;

    var data = JSON.stringify({
      "login": user.value,
      "passwd": passwd.value
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5236/owner/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    // METODO ENCAPSULADO
    let instance = this;
    localStorage.removeItem('authToken');
    axios(config)
      .then(function (response) {
        localStorage.setItem('authToken', response.data);
        instance.router.navigate(['']);
      })
      .catch(function (error) {
        alert("testeee")
      })


    // METODO DESENCAPSULADO
    // let response = await axios(config);

    // localStorage.setItem('authToken', response.data);

    // if(JSON.stringify(localStorage.getItem('authToken')) != '""'){
    //   this.router.navigate(['/']);
    // }
  }

  Cadatro(){
    this.router.navigate(["/owner/register"]);
  }
}


