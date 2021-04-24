import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';
import { Claims } from '../claims';
import { TravelClaims } from '../travel-claims';
import { UpdateStatus } from '../update-status';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {

  claims:Array<Claims> = new Array();
  travelClaims: Array<TravelClaims> = new Array();
  claimStatus:UpdateStatus = new UpdateStatus();
  constructor(private service: AdminServiceService, private router:Router) { }

  ngOnInit(): void {
    this.service.fetchPendingClaims().subscribe(
      fetchedData=>{
        this.claims.push(fetchedData);
        console.log(this.claims[0]);
      }
      
    );

    this.service.fetchTravelClaims().subscribe(
      fetchedClaims=>{
        //console.log(fetchedClaims[0]);
        for(let i in fetchedClaims){
          console.log(fetchedClaims[i]);
          this.travelClaims.push(fetchedClaims[i]);
        }
        //this.travelClaims.push(fetchedClaims);
        console.log(this.travelClaims);
      }
    );
  }

  logout() {
    localStorage.removeItem("adminId");
    this.router.navigate(['']);
  }

  updateVehicleStatus(claimId:number, status:String){
    console.log(claimId,status);
    this.claimStatus.claimId = claimId;
    this.claimStatus.status = status;
    this.service.updateVehicleStatus(this.claimStatus).subscribe(
      fetchedData=>{
        console.log(fetchedData);
        this.router.navigate(['/dashboard']);
      }
    );
    
  }

  updateTravelStatus(claimId:number,status:String){
    this.claimStatus.claimId = claimId;
    this.claimStatus.status = status;
    this.service.updateTravelStatus(this.claimStatus).subscribe(
      fetchedData=>{
        console.log(fetchedData);
        this.router.navigate(['/dashboard']);
      }
    );
  }

}
