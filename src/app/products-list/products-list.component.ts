// import { products, Product } from './../products';
import { Component, OnInit } from '@angular/core';
import { Product } from '../products';
import axios from 'axios';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {

  products: [Product] | undefined;

  client: boolean = false;
  owner: boolean = false;
  logado: boolean = false;
  
  constructor() {
    this.getAllProducts();
  }

  ngOnInit(): void {
    this.checkUser();
  }




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
      })
      .catch(function (error: any) {});
  }





  AddProductToWishList(idStocks: number) {
    var data = JSON.stringify({
      id: idStocks,
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5236/wishList/register',
      headers: {
        Authorization:'Bearer '+ localStorage.getItem("authTokenClient"),
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

  checkUser() {
    if (localStorage.getItem('authTokenClient') && localStorage.getItem('authTokenOwner') != null) {
      console.log("não logado");
      this.logado = false;
      this.client = false;
      this.owner = false;
    } else {
      if (localStorage.getItem('authTokenClient')) {
        this.client = true;
        this.owner = false;
        this.logado = true;
      } else {
        this.client = false;
        this.owner = true;
        this.logado = true;
      }
    }
  }
}
