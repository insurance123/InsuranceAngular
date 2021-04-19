import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from './vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleInsuranceService {

  constructor(private httpClient:HttpClient) { }

  registerVehicle(vehicle: Vehicle,userId: number):Observable<Vehicle>{
    return this.httpClient.post<Vehicle>("http://localhost:9090/addVehicle?userId="+userId,vehicle);
 }

}
