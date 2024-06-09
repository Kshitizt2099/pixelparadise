import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { CartComponent } from './pages/cart/cart.component';
import { FavComponent } from './pages/fav/fav.component';
import { DetailsComponent } from './pages/details/details.component';
import { ProductsComponent } from './pages/products/products.component';
import { UploadformComponent } from './pages/uploadform/uploadform.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
   {
    path:"",
    component:LoginComponent
   },
   {
    path:"signIn",
    component:SignInComponent
   },
   {
    path:"Cart",
    component:CartComponent
   },
   {
    path:"Fav",
    component:FavComponent
   },
   {
    path:"details/:id",
    component:DetailsComponent
   },
   {
      path:"products",
      component:ProductsComponent

   }
   ,{
      path:"create",
      component:UploadformComponent
   },
   {
      path:"checkout/:total",
      component:CheckoutComponent
   }
];
