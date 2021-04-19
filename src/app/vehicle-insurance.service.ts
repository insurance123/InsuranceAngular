import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerVehiclePolicy } from './customer-vehicle-policy';
import { Policy } from './policy';
import { User } from './user';
import { Vehicle } from './vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleInsuranceService {

  constructor(private httpClient:HttpClient) { }

  getUserById(userId:Number):Observable<User> {
    return this.httpClient.get<User>(`http://localhost:9090/getUserById?custId=${userId}`);
  }
  addVehicle(vehicle:Vehicle):Observable<Vehicle>
  {
    return this.httpClient.post<Vehicle>('http://localhost:9090/addVehicle',vehicle);
  }
  buymotorinsurance(cvp:CustomerVehiclePolicy):Observable<CustomerVehiclePolicy>{
    return this.httpClient.post<CustomerVehiclePolicy>(`http://localhost:9090/buyMotorInsurance`,cvp)
  }

  getPolicyFor(policyFor:String):Observable<Policy[]> {
    return this.httpClient.get<Policy[]>(`http://localhost:9090/getPolicyFor?policyFor=${policyFor}`);
  }

}
