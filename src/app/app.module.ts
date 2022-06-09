import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ClientRegisterComponent } from './client-register/client-register.component';
import { LoginClientComponent } from './login-client/login-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WishListComponent } from './wish-list/wish-list.component';
import { ProfileClientComponent } from './profile-client/profile-client.component';
import { PurchaseClientComponent } from './purchase-client/purchase-client.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductsListComponent,
    ProductDetailComponent,
    ClientRegisterComponent,
    LoginClientComponent,
    WishListComponent,
    ProfileClientComponent,
    PurchaseClientComponent
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
      {path: 'client/login', component : LoginClientComponent},
      {path: "wishlist", component:WishListComponent},
      {path: 'client/profile/:clientID', component : ProfileClientComponent},
      {path: 'client/purchase', component : PurchaseClientComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
