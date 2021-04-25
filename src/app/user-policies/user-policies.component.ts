import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Claims } from '../claims';
import { CustomerTravelPolicy } from '../customer-travel-policy';
import { CustomerVehiclePolicy } from '../customer-vehicle-policy';
import { TravelClaims } from '../travel-claims';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-policies',
  templateUrl: './user-policies.component.html',
  styleUrls: ['./user-policies.component.css']
})
export class UserPoliciesComponent implements OnInit {
  userId;
  document;
  policy;
  policy1;
  reasonOfClaim;
  claimstatus:String;
  ifClicked;
  user:User =new User();
  constructor(private service:UserService, private router:Router) { }
  vehiclepolicies:Array<CustomerVehiclePolicy> = new Array<CustomerVehiclePolicy>();
  travelpolicies:Array<CustomerTravelPolicy> = new Array<CustomerTravelPolicy>();
  vehicleclaims:Array<Claims> = new Array<Claims>();
  travelclaims:Array<TravelClaims> = new Array<TravelClaims>();
  ngOnInit(): void {

    this.userId = localStorage.getItem('customerId');
    this.service.getUserDetails(this.userId).subscribe(
      UserDetails => {
        this.user = UserDetails;
        console.log(UserDetails);
      }
    );
    this.service.getMotorPolicies(this.userId).subscribe(
      motorPolicies => {
        this.service.getMotorClaims(this.userId).subscribe(
          motorclaims => {
            for(let i in motorclaims){
              this.vehicleclaims.push(motorclaims[i]);
              for(let j in this.vehiclepolicies){
                if(motorclaims[i].customerVehiclePolicyId == motorPolicies[j].customerVehiclePolicyId){
                  motorPolicies[j].claimStatus = true;
                  console.log(motorPolicies)
                }
              }
            console.log(motorclaims[i]);
            }
          }
        );
        this.vehiclepolicies.push(motorPolicies);
        console.log(this.vehiclepolicies[0]);
      }
    );
    this.service.getTravelPolicies(this.userId).subscribe(
      travelPolicies => {
        this.travelpolicies.push(travelPolicies);
        console.log(this.travelpolicies[0]);
      }
    );

    
    this.service.getTravelClaims(this.userId).subscribe(
      travelClaims => {
        for(let i in travelClaims){
          this.travelclaims.push(travelClaims[i]);
          console.log(this.travelclaims[i]);
        }
        
      }
    );

  }

  logout() {
    localStorage.removeItem("customerId");
  }

  onFileChange(event){
    this.document = event.target.files[0];
  }

  renewMotor(policy:CustomerVehiclePolicy){
    this.userId = localStorage.getItem('customerId');
    console.log(policy);
    policy.startDate=new Date();
    policy.endDate=new Date();
    policy.customerId=this.userId;
    
    this.service.renewMotor(policy.customerVehiclePolicyId).subscribe(
      renew => {
        console.log(renew);
        Swal.fire(
          {
            title: "Policy Renewed",
            text: "Your policy has been successfully renewed",
            icon: "success",
            confirmButtonText: "Okay"
          }
        );
        this.router.navigate(['/userpolicies']);
      }
    );
  }

  applyMotorClaim(policy:CustomerVehiclePolicy){
    let cvpId = String(policy.customerVehiclePolicyId);
    console.log(policy);
    let formData: FormData = new FormData();
    // formData.append("claimDate", "2021-04-23");
    formData.append("reasonOfClaim",this.reasonOfClaim);
    formData.append("proofOfClaim", this.document);
    formData.append("customerVehiclePolicyId",cvpId);
    console.log(this.document);

    this.service.applyMotorClaim(formData).subscribe (
      motorClaim => {
        console.log(motorClaim);
        this.ifClicked=false;
        if(motorClaim.claimStatus=="ACCEPTED")
          this.claimstatus="ACCEPTED";
        else if(motorClaim.claimStatus=="REJECTED")
          this.claimstatus="REJECTED";
        else (motorClaim.claimStatus=="PENDING")
          this.claimstatus="PENDING";

          Swal.fire(
            {
              title: "Policy Claimed",
              text: "Policy Claimed Successfully",
              icon: "success",
              confirmButtonText: "Okay"
            }
          );
      }
    );
  }
  
  applyTravelClaim(policy1:CustomerTravelPolicy){
    let ctpId = String(policy1.customerTravelPolicyId);
    console.log(policy1);
    let formData: FormData = new FormData();
    // formData.append("claimDate", "2021-04-23");
    formData.append("reasonOfClaim",this.reasonOfClaim);
    formData.append("proofOfClaim", this.document);
    formData.append("customerTravelPolicyId",ctpId);
    console.log(this.document);

    this.service.applyTravelClaim(formData).subscribe (
      travelClaim => {
        console.log(travelClaim);
        this.ifClicked=false;
        if(travelClaim.claimStatus=="ACCEPTED")
          this.claimstatus="ACCEPTED";
        else if(travelClaim.claimStatus=="REJECTED")
          this.claimstatus="REJECTED";
        else (travelClaim.claimStatus=="PENDING")
          this.claimstatus="PENDING";
      }
    );
  }

}
