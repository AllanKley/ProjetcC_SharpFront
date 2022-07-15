import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import axios from 'axios';
import { Client } from '../client';


@Component({
  selector: 'app-profile-owner',
  templateUrl: './profile-owner.component.html',
  styleUrls: ['./profile-owner.component.css']
})
export class ProfileOwnerComponent implements OnInit {

  owner: Client;

  constructor(private route: ActivatedRoute) {
    this.owner = {
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
    this.getOwner();
  }

  async getOwner(){
    var data = JSON.stringify({});

    var config = {
      method: 'get',
      url: 'http://localhost:5236/owner/get',
      headers: { 
        'Authorization': 'Bearer ' + localStorage.getItem("authToken"),
        'Content-Type': 'application/json'
      },
      data : data
    };

    var response = await axios(config);

    this.owner = response.data;

    this.owner.date_of_birth = this.owner.date_of_birth.substring(0, 10).toString();
  }

}
