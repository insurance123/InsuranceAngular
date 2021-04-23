import { Component, OnInit } from '@angular/core';
import { CustomerTravelPolicy } from '../customer-travel-policy';
import { CustomerVehiclePolicy } from '../customer-vehicle-policy';
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
  constructor(private service:UserService) { }
  vehiclepolicies:Array<CustomerVehiclePolicy> = new Array<CustomerVehiclePolicy>();
  travelpolicies:Array<CustomerTravelPolicy> = new Array<CustomerTravelPolicy>();
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
    policy.startDate="2021-04-23";
    policy.endDate="2022-04-22";
    policy.customerId=this.userId;
    
    this.service.renewMotor(policy.customerVehiclePolicyId).subscribe(
      renew => {
        console.log(renew);
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
