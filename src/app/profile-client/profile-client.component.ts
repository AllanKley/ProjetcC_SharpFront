import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import axios from 'axios';
import { Client } from '../client';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css']
})
export class ProfileClientComponent implements OnInit {

  client: Client;

  constructor(private route: ActivatedRoute) {
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
    const clientId = Number(localStorage.getItem('clientId'));
    this.getClient(clientId);
  }

  async getClient(id:number){
   
    var config = {
      method: 'get',
      url: 'http://localhost:5236/client/get/' + id,
      headers: { }
    };

    var response = await axios(config);

    this.client = response.data;

    this.client.date_of_birth = this.client.date_of_birth.substring(0, 10).toString();
  }
}


