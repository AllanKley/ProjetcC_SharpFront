import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../client';
import {Product} from "../products";
import axios from 'axios';

export interface Owner {
  id: number;
  document: string;

}

export interface Store {
  id: number;
  cnpj: string;
  name: string
  owner: Owner;
}



@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit {

  constructor(private router: Router) { 
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

  owner: Client;
  product: Product | undefined;
  stores: Array<Store> | undefined;
  store: Store | undefined;

  ngOnInit(): void {
    this.CheckTokenOwner();
    this.getStores();

    
  }

  async RegisterProduct(){
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
    var response = await axios(config);
    
   
  }

  async getProduct(){
    await this.RegisterProduct();
    
    
    let barCodeInput = document.getElementById('barCode') as HTMLInputElement;

    var config = {
      method: 'get',
      url: 'http://localhost:5236/product/getproductBarCode/'+ barCodeInput.value,
      headers: { 
        'Content-Type': 'application/json'
      },
    };

    

    var response = await axios(config);
   
    this.product = response.data;
  
  }




  async RegisterStock(){
    await this.getProduct()
    
    let QtdInput = document.getElementById('Qtd') as HTMLInputElement;
    let priceInput = document.getElementById('price') as HTMLInputElement;
    let storeInput = document.getElementById('store') as HTMLInputElement;

    
    await this.getStore(storeInput.value);
    
    let product = this.product;
    let store = this.store;
  
    var data = JSON.stringify({
      "quantity": QtdInput.value,
      "unit_price": priceInput.value,
      "product": product,
      "store": store,
    });

  

    var config = {
      method: 'post',
      url: 'http://localhost:5236/Stocks/addproduct',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    console.log(data);
    
    var response = await axios(config);
    console.log(JSON.stringify(response.data));
  
  }



  


  async getOwner(){
    var data = JSON.stringify({});

    var config = {
      method: 'get',
      url: 'http://localhost:5236/owner/get',
      headers: { 
        'Authorization': 'Bearer ' + localStorage.getItem("authTokenOwner"),
        'Content-Type': 'application/json'
      },
      data : data
    };
    var response = await axios(config);
    return response.data;
  }

  async getStore(cnpj:string){
    var config = {
      method: 'get',
      url: 'http://localhost:5236/store/get/'+ cnpj,
      headers: { 
        'Content-Type': 'application/json'
      },
    };

    var response = await axios(config); 
    this.store = response.data;
    
    
  }

  async getStores(){
    let owner = await this.getOwner();
    
    var config = {
      method: 'get',
      url: 'http://localhost:5236/store/get/allByOwner/' + owner.document,
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
  
  
  Cancel(){
    window.location.reload();
  }
  activeVisibleSpan(id: string) {
    var span = document.querySelector(id);
    span?.classList.remove('invisible');
  }

  desactiveVisibleSpan(id: string) {
    var span = document.querySelector(id);
    span?.classList.add('invisible');
  }

  getInputField(id: string) {
    let response = document.querySelector(id) as HTMLInputElement;
    return response;
  }

  VerifyInputFieldIsNull(input: HTMLInputElement) {
    let prop = '#' + input.id + '-none';
    if (input.value.length == 0) {
      this.activeVisibleSpan(prop);
      return false;
    } else {
      this.desactiveVisibleSpan(prop);
      return true;
    }
  }

  VerifyInputFieldSize(size: number, input: HTMLInputElement) {
    let prop = '#' + input.id + '-lenght';
    if (input.value.length >= size) {
      this.desactiveVisibleSpan(prop);
      return true;
    } else {
      this.activeVisibleSpan(prop);
      return false;
    }
  }

  VerifyPhoneSize(input: HTMLInputElement) {
    let prop = '#' + input.id + '-lenght';
    if (input.value.length == 15) {
      this.desactiveVisibleSpan(prop);
      return true;
    } else {
      this.activeVisibleSpan(prop);
      return false;
    }
  }

  VerifyEmailIsValidy(Input: HTMLInputElement) {
    let prop = '#' + Input.id + '-valid';
    if (Input.value.includes('@') && Input.value.length > 3) {
      this.desactiveVisibleSpan(prop);
      return true;
    } else {
      this.activeVisibleSpan(prop);
      return false;
    }
  }

  VerifyPasswordIsValid(Input: HTMLInputElement) {
    let value = Input.value;
    let prop = '#' + Input.id + '-valid';
    let ALPHA = /[A-Z]/;
    let alpha = /[a-z]/;
    let number = /[0-9]/;
    let spec = /[\!\$\@\#\$\¨\(\*\_\).]/;
    if (
      ALPHA.test(value) &&
      number.test(value) &&
      alpha.test(value) &&
      spec.test(value)
    ) {
      this.desactiveVisibleSpan(prop);
      return true;
    } else {
      this.activeVisibleSpan(prop);
      return false;
    }
  }

  PhoneMaskField(event: KeyboardEvent) {
    var key = event.keyCode || event.charCode;
    let phoneField = this.getInputField('#phone') as HTMLInputElement;
    let phoneValue = phoneField.value;
    let number = /[0-9]/;
    if (key != 8 && key != 46) {
      if (!number.test(phoneValue[phoneValue.length - 1])) {
        let alpha = /[a-zA-Z]/;
        phoneValue = phoneValue.replace(alpha, '');
      } else if (phoneValue.length == 1) {
        phoneValue = '(' + phoneValue;
      } else if (phoneValue.length == 3) {
        phoneValue = phoneValue + ') ';
      } else if (phoneValue.length == 10) {
        phoneValue += '-';
      }
    }
    phoneField.value = phoneValue;
  }

  CheckTokenOwner() {
    var token = localStorage.getItem("authTokenOwner")
    if (!token) {
      this.router.navigate(["client/login"]);
    }
  }
}
