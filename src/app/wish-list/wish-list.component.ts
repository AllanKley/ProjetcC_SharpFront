import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from '../products';
import axios from 'axios';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  products : [Product] |undefined;

  ngOnInit(): void {
    this.LoadProducts();
  }


  LoadProducts(){
    var data = JSON.stringify({});

    var config = {
      method: 'get',
      url: 'http://localhost:5236/wishlist/getwishlist',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("authToken"),
        'Content-Type': 'application/json'
      },
      data : data
    };
    let instance = this
    axios(config)
    .then(function (response) {
      instance.products = response.data
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  RemoveWishList(WishListId:number){
    console.log("teste")
  }



}
