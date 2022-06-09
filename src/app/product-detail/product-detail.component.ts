
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

  constructor(private route: ActivatedRoute) {
    this.store = {}
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
        instance.product = response.data.product;
        instance.store = response.data.store;
        if (instance.product != undefined)
          instance.product.unit_price = response.data.unit_price;
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }



  makePurchase() {
    var instance = this;
    let date_purchase = Date.now();
    //await this.getStore(cnpj);

    var data = JSON.stringify({
      "date_purchase": date_purchase,
      "payment_type": 2,
      "purchase_status": 1,
      "purchase_values": this.product?.unit_price,
      "number_confirmation": Math.random().toString(36).slice(2),
      "number_nf": Math.random().toString(36).slice(2),
      "store": this.store,
      "product": this.product
    });
    var token = localStorage.getItem("authToken");

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
        instance.product = response.data.product;
        if (instance.product != undefined)
          instance.product.unit_price = response.data.unit_price;
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }
}
