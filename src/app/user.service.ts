import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from './admin';
import { Claims } from './claims';
import { CustomerTravelPolicy } from './customer-travel-policy';
import { CustomerVehiclePolicy } from './customer-vehicle-policy';
import { LoginStatus } from './login-status';
import { Resetpassword } from './resetpassword';
import { TravelClaims } from './travel-claims';
import { User } from './user';
import { UserDetailsDto } from './user-details-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }


  registerUser(user:User):Observable<User> {
    return this.httpClient.post<User>('http://localhost:9090/registercustomer', user);
  }

  loginUser(user:User):Observable<LoginStatus>{
    return this.httpClient.post<LoginStatus>("http://localhost:9090/logincustomer",user);
  }

  loginAdmin(admin:Admin):Observable<LoginStatus>{
    return this.httpClient.post<LoginStatus>("http://localhost:9090/loginadmin",admin);
  }

  getUserDetails(userId:number):Observable<User> {
    return this.httpClient.get<User>('http://localhost:9090/getUserById?custId='+userId);
  }

  editUserDetails(uDto:UserDetailsDto):Observable<User> {
    return this.httpClient.post<User>('http://localhost:9090/updateUser', uDto);
  }

  getMotorPolicies(userId:number):Observable<CustomerVehiclePolicy> {
    return this.httpClient.get<CustomerVehiclePolicy>('http://localhost:9090/getVehiclePolicies?userId='+userId);
  }

  getTravelPolicies(userId:number):Observable<CustomerTravelPolicy> {
    return this.httpClient.get<CustomerTravelPolicy>('http://localhost:9090/getTravelPolicies?userId='+userId);
  }

  updateAadhar(formData:FormData):Observable<User> {
    return this.httpClient.post<User>('http://localhost:9090/aadhar-upload',formData);
  }

  getMotorClaims(userId:number):Observable<Claims> {
    return this.httpClient.get<Claims>('http://localhost:9090/viewMotorClaims?userId='+userId);
  }
  getTravelClaims(userId:number):Observable<TravelClaims> {
    return this.httpClient.get<TravelClaims>('http://localhost:9090/viewTravelClaims?userId='+userId);
  }

  applyMotorClaim(formData:FormData):Observable<Claims> {
    return this.httpClient.post<Claims>('http://localhost:9090/applyMotorClaim',formData);
  }

  applyTravelClaim(formData:FormData):Observable<TravelClaims> {
    return this.httpClient.post<TravelClaims>('http://localhost:9090/applyTravelClaim',formData);
  }

  renewMotor(policyId:number):Observable<any> {
    return this.httpClient.post<any>('http://localhost:9090/renewMotorInsurance?cvpId='+policyId,policyId);
  }
  generateotp(userEmail:String){
    return this.httpClient.get("http://localhost:9090/forgotpassword?userEmail="+userEmail, {responseType:'text'});
  }
  
  resetPassword(userEmail:Resetpassword){
    return this.httpClient.put("http://localhost:9090/updatecustomerpassword", userEmail, {responseType:'text'})
  
  }
  
  findcustomerbyemail(userEmail:String): Observable<User>{
    return this.httpClient.get<User>("http://localhost:9090/findcustomerbyemail?userEmail="+userEmail);
  
  }

  
}
