import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-owner-sales',
  templateUrl: './owner-sales.component.html',
  styleUrls: ['./owner-sales.component.css']
})
export class OwnerSalesComponent implements OnInit {

  Sales: [any] | undefined;
  constructor() { }

  ngOnInit(): void {
    this.LoadData();
  }

  LoadData() {


    var config = {
      method: 'get',
      url: 'http://localhost:5236/purchase/get/store/sales/719',
      headers: {}
    };
    var instance = this;
    axios(config)
      .then(function (response) {
        instance.Sales = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

  }

}
