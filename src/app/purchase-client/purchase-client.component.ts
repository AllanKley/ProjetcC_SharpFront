import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { elementAt } from 'rxjs';
import { Product } from '../products';

@Component({
  selector: 'app-purchase-client',
  templateUrl: './purchase-client.component.html',
  styleUrls: ['./purchase-client.component.css']
})
export class PurchaseClientComponent implements OnInit {

  purchases : [any] |undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.CheckTokenClient();
    this.LoadProducts();
  }


  LoadProducts(){

    var config = {
      method: 'get',
      url: 'http://localhost:5236/purchase/get/client',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("authTokenClient"),
        'Content-Type': 'application/json'
      }
    };
    let instance = this
    axios(config)
    .then(function (response) {
      
      console.log(response.data)
      instance.purchases = response.data
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  CheckTokenClient() {
    var token = localStorage.getItem("authTokenClient")
    if (!token) {
      this.router.navigate(["client/login"]);
    }
    // private router: Router
  }



  

}
