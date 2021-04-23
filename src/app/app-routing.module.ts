import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BuyTravelComponent } from './buy-travel/buy-travel.component';
import { BuyVehicleComponent } from './buy-vehicle/buy-vehicle.component';
import { ClaimsComponent } from './claims/claims.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { EditpoliciesComponent } from './editpolicies/editpolicies.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { PoliciesComponent } from './policies/policies.component';
import { RegisterComponent } from './register/register.component';
import { RenewVehicleComponent } from './renew-vehicle/renew-vehicle.component';
import { UserClaimsComponent } from './user-claims/user-claims.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserPoliciesComponent } from './user-policies/user-policies.component';

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
  },
  {
    path: "payment", component:PaymentComponent
  },
  {
    path: "buytravel", component: BuyTravelComponent
  },
  {
    path: "userdashboard", component: UserDashboardComponent
  },
  {
    path: "editdetails", component: EditDetailsComponent
  },
  {
    path: "userpolicies", component: UserPoliciesComponent
  },
  {
    path: "userclaims", component: UserClaimsComponent
  },
  {
    path: "admindashboard",component:AdminComponent
  },
  {
    path: "policies", component: PoliciesComponent
  },
  {
    path: "editpolicies", component: EditpoliciesComponent
  },
  {
    path: "claims", component: ClaimsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
