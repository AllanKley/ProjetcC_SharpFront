import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import axios from 'axios';
import { Client } from '../client';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css']
})
export class ProfileClientComponent implements OnInit {

  client: Client;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.client = {
      name :  "",
      phone : "",
      email: "",
      passwd: "",
      login: "",
      date_of_birth: "",
      document: "",
    };
   }

  ngOnInit(): void {
    this.CheckTokenClient()
    this.getClient();
  }

  async getClient(){
    var data = JSON.stringify({});

    var config = {
      method: 'get',
      url: 'http://localhost:5236/client/get',
      headers: { 
        'Authorization': 'Bearer ' + localStorage.getItem("authTokenClient"),
        'Content-Type': 'application/json'
      },
      data : data
    };

    var response = await axios(config);

    this.client = response.data;

    this.client.date_of_birth = this.client.date_of_birth.substring(0, 10).toString();
  }

  CheckTokenClient() {
    var token = localStorage.getItem("authTokenClient")
    if (token == null) {
      this.router.navigate(["client/login"]);
    }
    // private router: Router
  }
}


