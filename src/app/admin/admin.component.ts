import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Claims } from '../claims';
import { Policy } from '../policy';
import { TravelClaims } from '../travel-claims';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service:AdminServiceService) { }
  policies:Array<Policy> = new Array<Policy>();
  claims:Array<Claims> = new Array<Claims>();
  travelClaims:Array<TravelClaims> = new Array();
  ngOnInit(): void {
    this.service.getVehicleClaims().subscribe(
      fetchedClaims=>{
        this.claims.push(fetchedClaims);
      }
    );

    this.service.getTravelClaims().subscribe(
      fetchedClaims=>
     {
       for(let i in fetchedClaims){
         console.log(fetchedClaims[i]);
         this.travelClaims.push(fetchedClaims[i]);
       }
       //this.travelClaims.push(fetchedClaims);
     }
    );
    //this.loadJsFile("../../assets/js/bootstrap.bundle.min.js.map"); 
    this.service.getPolicies().subscribe(
      fetchedPolicies=> {
       this.policies.push(fetchedPolicies);
       console.log(this.policies[0])
        
      }
    );
  
  }
  public loadJsFile(url) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }  

  logout() {
    localStorage.removeItem("adminId");
  }
  

}
