import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-owner-sales',
  templateUrl: './owner-sales.component.html',
  styleUrls: ['./owner-sales.component.css']
})
export class OwnerSalesComponent implements OnInit {

  Sales: [any] | undefined;
  SalesDetails: any | undefined;
  constructor() { }

  ngOnInit(): void {
    this.LoadData();
  }

  LoadDetails(IdSale: number) {
    var config = {
      method: 'get',
      url: 'http://localhost:5236/purchase/get/purchase/' + IdSale,
      headers: {}
    };
    var instance = this;
    axios(config)
      .then(function (response) {
        instance.SalesDetails = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });


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
