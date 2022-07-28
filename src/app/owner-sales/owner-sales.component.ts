import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-sales',
  templateUrl: './owner-sales.component.html',
  styleUrls: ['./owner-sales.component.css']
})
export class OwnerSalesComponent implements OnInit {

  Sales: [any] | undefined;
  SalesDetails: any | undefined;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.CheckTokenOwner();
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
      url: 'http://localhost:5236/purchase/get/store/sales',
      headers: {
        'Authorization': "Bearer "+localStorage.getItem('authTokenOwner')
      }
    };
    var instance = this;
    axios(config)
      .then(function (response) {
        console.log(response.data)
        instance.Sales = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    
  }

  CheckTokenOwner(){
    var token = localStorage.getItem("authTokenOwner")
    if(!token){
      this.router.navigate(["client/login"]);
    }
  }

}
