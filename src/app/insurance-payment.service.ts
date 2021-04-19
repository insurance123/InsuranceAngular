import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerVehiclePolicy } from './customer-vehicle-policy';
import { Vehicle } from './vehicle';

@Injectable({
  providedIn: 'root'
})
export class InsurancePaymentService {

  constructor(private httpClient:HttpClient) { }

  addVehicle(vehicle:Vehicle,userId:number):Observable<Vehicle>
  {
    return this.httpClient.post<Vehicle>('http://localhost:9090/addVehicle?userId='+userId,vehicle);
  }
  buymotorinsurance(cvp:CustomerVehiclePolicy):Observable<CustomerVehiclePolicy>{
    return this.httpClient.post<CustomerVehiclePolicy>(`http://localhost:9090/buyMotorInsurance`,cvp)
  }

}
