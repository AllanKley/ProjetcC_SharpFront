import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
//import { Client } from '../client';
import {Product} from "../products";
import axios from 'axios';

export interface Owner {
  id: number;
  document: string;
  
}

export interface Store {
  id: number;
  cnpj: string;
  owner: Owner;
}



@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit {

  constructor(private router: Router) { }

  product: Product | undefined;
  stores: Array<Store> | undefined;

  ngOnInit(): void {
    this.getStores();
  }

  RegisterProduct(){
    let QtdInput = document.getElementById('product') as HTMLInputElement;
    let barCodeInput = document.getElementById('barCode') as HTMLInputElement;
    let descriptionInput = document.getElementById('description') as HTMLInputElement;
    let imageInput = document.getElementById('image') as HTMLInputElement;
    
    var data = JSON.stringify({
      "name": QtdInput.value,
      "bar_code": barCodeInput.value,
      "description": descriptionInput.value,
      "image": imageInput.value,
    });
  
    
    var config = {
      method: 'post',
      url: 'http://localhost:5236/product/create',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    let instance = this;
    axios(config)
    .then(function (response) {
      instance.getProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getProduct(){
    let barCodeInput = document.getElementById('barCode') as HTMLInputElement;

    var config = {
      method: 'get',
      url: 'http://localhost:5236/product/getproductBarCode/'+ barCodeInput.value,
      headers: { 
        'Content-Type': 'application/json'
      },
    };

    let instance = this;
    axios(config)
    .then(function (response) {
      instance.product = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  getStores(){
    var config = {
      method: 'get',
      url: 'http://localhost:5236/store/get/all',
      headers: { 
        'Content-Type': 'application/json'
      },
    };

    let instance = this;
    axios(config)
    .then(function (response) {
      instance.stores = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  RegisterStock(){
    this.RegisterProduct()
    let QtdInput = document.getElementById('Qtd') as HTMLInputElement;
    let priceInput = document.getElementById('price') as HTMLInputElement;
    
    let product = this.product;
    let storeInput = document.getElementById('store') as HTMLInputElement;

    
    var data = JSON.stringify({
      "quantity": QtdInput.value,
      "unit_price": priceInput.value,
      "product": product,
      "store": storeInput.value,
    });
    
    // var config = {
    //   method: 'post',
    //   url: 'http://localhost:5236/Stocks/addproduct',
    //   headers: { 
    //     'Content-Type': 'application/json'
    //   },
    //   data : data
    // };
    
    // axios(config)
    // .then(function (response) {
    //   console.log("Aqui tbm")
    //   console.log(JSON.stringify(response.data));
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }
  
  
  Cancel(){
    window.location.reload();
  }
}
