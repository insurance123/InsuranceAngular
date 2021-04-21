import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerTravelPolicy } from './customer-travel-policy';
import { Policy } from './policy';
import { Travel } from './travel';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class TravelInsuranceService {

  constructor(private httpClient: HttpClient) { }

  getUserById(userId:Number):Observable<User> {
    return this.httpClient.get<User>(`http://localhost:9090/getUserById?custId=${userId}`);
  }

  addTravel(travel:Travel):Observable<Travel>{
    return this.httpClient.post<Travel>("http://localhost:9090/addTravel",travel);
  }
  
  buytravelinsurance(ctp:CustomerTravelPolicy):Observable<CustomerTravelPolicy>{
    return this.httpClient.post<CustomerTravelPolicy>("http://localhost:9090/buyTravelInsurance",ctp);
  }

  getPolicyFor(policyFor:String):Observable<Policy[]> {
    return this.httpClient.get<Policy[]>(`http://localhost:9090/getPolicyFor?policyFor=${policyFor}`);
  }
}
