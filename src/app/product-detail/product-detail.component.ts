
import { Component, OnInit } from '@angular/core';
import { Product } from '../products';
import { ActivatedRoute } from '@angular/router'
import axios from 'axios';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product| undefined;
  store:{};
  client:{};

  constructor(private route: ActivatedRoute) {
    this.store = {}
    this.client = {}
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productID'));
    this.getProduct(productIdFromRoute);
  }

  getProduct(id: number) {
    var instance = this;
    var config = {
      method: 'get',
      url: 'http://localhost:5236/product/getproduct/' + id,
      headers: {}
    };
    var instance = this;
    
    axios(config)
      .then(function (response: any) {
        instance.product = response.data;
        // instance.product?.unit_price = instance.product?.unit_price;
        if (instance.product != undefined){
          instance.product.unit_price = response.data.unit_price;
          if(instance.product.storeCNPJ != undefined){
            instance.getStore(instance.product.storeCNPJ);
          }
        }
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }

  AddProductToWishList(idStocks: number) {
    var data = JSON.stringify({
      id: idStocks,
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

  makePurchase() {
    var instance = this;
    let date_purchase = Date.now();


    var data = JSON.stringify({
      "date_purchase": date_purchase,
      "payment_type": 2,
      "purchase_status": 1,
      "purchase_value": this.product?.unit_price,
      "number_confirmation": Math.random().toString(36).slice(2),
      "number_nf": Math.random().toString(36).slice(2),
      "store": this.store,
      "productsDTO": [this.product]
    });
    var token = localStorage.getItem("authToken");

    console.log(data);

    var config = {
      method: 'post',
      url: 'http://localhost:5236/purchase/register',
      headers: {
        'Authorization': "Bearer " + token,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response: any) {
       
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }


  getStore(id:string){
    var instance = this;
    var config = {
      method: 'get',
      url: 'http://localhost:5236/store/get/' + id,
      headers: {}
    };
    var instance = this;
    
    axios(config)
      .then(function (response: any) {
        instance.store = response.data;
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }
}
