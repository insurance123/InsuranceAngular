import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claims } from './claims';
import { Policy } from './policy';
import { PolicyDto } from './policy-dto';
import { TravelClaims } from './travel-claims';
import { UpdateStatus } from './update-status';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private httpClient:HttpClient) { }

  getPolicies():Observable<Policy> {
    return this.httpClient.get<Policy>('http://localhost:9090/viewAllPolicies')
  }

  addPolicy(policy:Policy):Observable<Policy> {
    return this.httpClient.post<Policy>('http://localhost:9090/addPolicy', policy);
  }

  updatePolicy(policy:PolicyDto):Observable<Policy> {
    return this.httpClient.post<Policy>('http://localhost:9090/updatePolicy', policy);
  }
  fetchPendingClaims():Observable<Claims>{
    return this.httpClient.get<Claims>('http://localhost:9090/viewpendingmotorclaims');
  }
  fetchTravelClaims():Observable<TravelClaims>{
    return this.httpClient.get<TravelClaims>('http://localhost:9090/viewpendingtravelclaims');
  }
  updateVehicleStatus(updateStatus:UpdateStatus):Observable<Claims>{
    return this.httpClient.put<Claims>('http://localhost:9090/updateStatus',updateStatus);
  }
  updateTravelStatus(updateStatus:UpdateStatus):Observable<TravelClaims>{
    return this.httpClient.put<TravelClaims>('http://localhost:9090/travelstatus',updateStatus);
  }
}
