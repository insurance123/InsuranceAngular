import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BuyVehicleComponent } from './buy-vehicle/buy-vehicle.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RenewVehicleComponent } from './renew-vehicle/renew-vehicle.component';
import { BuyTravelComponent } from './buy-travel/buy-travel.component';
import { RenewTravelComponent } from './renew-travel/renew-travel.component';
import { PaymentComponent } from './payment/payment.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerComponent } from './customer/customer.component';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { UserPoliciesComponent } from './user-policies/user-policies.component';
import { UserClaimsComponent } from './user-claims/user-claims.component';
import { ClaimsComponent } from './claims/claims.component';
import { EditpoliciesComponent } from './editpolicies/editpolicies.component';
import { PoliciesComponent } from './policies/policies.component';
import { UserDetailsDtoComponent } from './user-details-dto/user-details-dto.component';

import { AuthguardServiceService } from './authguard-service.service';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BuyVehicleComponent,
    RenewVehicleComponent,
    BuyTravelComponent,
    RenewTravelComponent,
    PaymentComponent,
    AdminComponent,
    CustomerComponent,
    UserDashboardComponent,
    EditDetailsComponent,
    UserPoliciesComponent,
    UserClaimsComponent,
    ClaimsComponent,
    EditpoliciesComponent,
    PoliciesComponent,
    UserDetailsDtoComponent,
    ResetpasswordComponent,
    ForgotpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
   
  ],
  providers: [ AuthguardServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
