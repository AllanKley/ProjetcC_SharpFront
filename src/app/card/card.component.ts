import { Component, Input, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() productPicture: any | string
  @Input() productTitle: any | string
  @Input() productDescription: any | string
  @Input() productPrice: any | string
  @Input() productId: any | string
  @Input() idStocks:any | string
  @Input() idWishlist:any | string
  constructor() { }

  ngOnInit(): void {
  }
  
  AddProductToWishList() {
    var data = JSON.stringify({
      id: Number(this.idStocks),
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
