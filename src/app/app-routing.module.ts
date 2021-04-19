import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyVehicleComponent } from './buy-vehicle/buy-vehicle.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RenewVehicleComponent } from './renew-vehicle/renew-vehicle.component';

const routes: Routes = [
  {
    path:"", component:HomeComponent
  },
  {
    path:"login", component:LoginComponent
  },
  {
    path: "register", component:RegisterComponent
  },
  {
    path: "buyvehicle", component:BuyVehicleComponent
  },
  {
    path: "renewvehicle", component:RenewVehicleComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
