import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  client: boolean = true;
  owner: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  login() {
    let user = document.getElementById("username") as HTMLInputElement;
    let passwd = document.getElementById("password") as HTMLInputElement;

    var data = JSON.stringify({
      "login": user.value,
      "passwd": passwd.value
    });

    localStorage.clear();
    if (this.client) {

      var config = {
        method: 'post',
        url: 'http://localhost:5236/client/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      let instance = this;
      localStorage.removeItem('authToken');
      axios(config)
        .then(function (response) {
          localStorage.setItem('authTokenClient', response.data);

          instance.router.navigate(['']);
        })
        .catch(function (error) {
        })
    } else {

      var config = {
        method: 'post',
        url: 'http://localhost:5236/owner/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      let instance = this;
      localStorage.clear();
      axios(config)
        .then(function (response) {
          localStorage.setItem('authTokenOwner', response.data);

          instance.router.navigate(['']);
        })
        .catch(function (error) {
        })
    }




  }

  Cadatro() {
    if (this.client)
      this.router.navigate(["/client/register"]);
    else
      this.router.navigate(["/owner/register"]);
  }

  changeUser() {
    this.owner = !this.owner;
    this.client = !this.client;
  }

  

}
