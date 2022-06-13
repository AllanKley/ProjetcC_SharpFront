// import { products, Product } from './../products';
import { Component, OnInit } from '@angular/core';
import { Product } from '../products';
//const axios = require('axios');
import axios from 'axios';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: [Product] | undefined;
  constructor() {
    this.getAllProducts();
  }

  ngOnInit(): void {}

  getAllProducts() {
    var config = {
      method: 'get',
      url: 'http://localhost:5236/product/getall',
      headers: {},
    };
    var instance = this;

    axios(config)
      .then(function (response: any) {
        instance.products = response.data;
        console.log(response.data.name);
      })
      .catch(function (error: any) {});
  }

  AddProductToWishList(IdStocks: Number) {
    var data = JSON.stringify({
      id: IdStocks,
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5236/wishList/register',
      headers: {
        Authorization:'Bearer '+ localStorage.getItem("authToken"),
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
