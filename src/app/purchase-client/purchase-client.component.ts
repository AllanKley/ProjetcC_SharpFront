import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.LoadProducts();
  }


  LoadProducts(){

    var config = {
      method: 'get',
      url: 'http://localhost:5236/purchase/get/client',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("authToken"),
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






  

}
