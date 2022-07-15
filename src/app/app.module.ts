import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ClientRegisterComponent } from './client-register/client-register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WishListComponent } from './wish-list/wish-list.component';
import { ProfileClientComponent } from './profile-client/profile-client.component';
import { PurchaseClientComponent } from './purchase-client/purchase-client.component';
import { OwnerRegisterComponent } from './owner-register/owner-register.component';
import { OwnerSalesComponent } from './owner-sales/owner-sales.component';
import { ProfileOwnerComponent } from './profile-owner/profile-owner.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductsListComponent,
    ProductDetailComponent,
    ClientRegisterComponent,
    LoginComponent,
    WishListComponent,
    ProfileClientComponent,
    PurchaseClientComponent,
    OwnerSalesComponent,
    ProfileOwnerComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot([
      {path: '', component: ProductsListComponent},
      {path: 'product/:productID', component: ProductDetailComponent},
      {path: 'client/register', component : ClientRegisterComponent},
      {path: 'client/login', component : LoginComponent},
      {path: "wishlist", component:WishListComponent},
      {path: 'client/profile', component : ProfileClientComponent},
      {path: 'client/purchase', component : PurchaseClientComponent},
      {path:'owner/register', component:OwnerRegisterComponent},
      {path:'owner/sales', component: OwnerSalesComponent},
      {path: 'owner/profile', component : ProfileOwnerComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
