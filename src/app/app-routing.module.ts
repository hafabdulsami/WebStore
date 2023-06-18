import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { CartComponent } from './Pages/cart/cart.component';

const routes: Routes = [{
  path:'home',
  component:HomeComponent
},
{
  path:'',
  redirectTo:'home',
  pathMatch:'full'
},
{
  path:'Cart',
  component:CartComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
