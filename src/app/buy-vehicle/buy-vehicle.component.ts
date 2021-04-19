import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerVehiclePolicy } from '../customer-vehicle-policy';
import { Policy } from '../policy';
import { User } from '../user';
import { Vehicle } from '../vehicle';
import { VehicleInsuranceService } from '../vehicle-insurance.service';

@Component({
  selector: 'app-buy-vehicle',
  templateUrl: './buy-vehicle.component.html',
  styleUrls: ['./buy-vehicle.component.css']
})
export class BuyVehicleComponent implements OnInit {
  age:number = 0;
  Step1:boolean = true;
  Step2:boolean = false;
  Step3:boolean = false;
  Step4:boolean = false;
  Step5:boolean = false;
  vehicle: Vehicle = new Vehicle();
  vehicleType:String;
  policies:Policy;
  user:User = {
    userId: 1042,
    userName: "John",
    userEmail: "john@gmail.com",
    password: "john@123",
    userPhone: "9876543210",
    dateOfBirth: "1996-02-19"
  };
  basePremium:number;
  policy:Policy = new Policy();
  displayPolicies:Array<Policy> = [];
  constructor(private service:VehicleInsuranceService, private router:Router) { }

  ngOnInit(): void {
  }

  public showForm1 () {
    this.Step2 = false;
    this.Step3 = false;
    this.Step1 = true;
  }

  public showForm2 () {
    this.Step1 = false;
    this.Step3 = false;
    this.Step2 = true;
    
  }

  public showForm3 () {
    this.Step1 = false;
    this.Step2 = false;
    this.Step3 = true;
  }

  public showForm4 () {
    this.Step1 = false;
    this.Step2 = false;
    this.Step3 = false;
    this.Step4 = true;
  }

  public showForm5() {
    this.Step1 = false;
    this.Step2 = false;
    this.Step3 = false;
    this.Step4 = false;
    this.Step5 = true;

  }

  userId:number=1041;
  policyId:number= 2041;
  
  cvp:CustomerVehiclePolicy = new CustomerVehiclePolicy();

  payservice(){
   if(sessionStorage.getItem("customerId") == null) {
     this.router.navigate(['/login']);
   }
   else {
    this.userId = Number(sessionStorage.getItem('customerId'));

    this.vehicle.customer = this.user;
    this.service.addVehicle(this.vehicle).subscribe(
      fetchedData=>{
      
        this.vehicle = fetchedData;
        console.log(this.vehicle);
        
      }
    );
    this.cvp.startDate = "2021-04-19";
    this.cvp.endDate = "2022-04-19";
    this.cvp.coverageAmount = 10000.0;
    this.cvp.premiumAmount = this.basePremium;
    this.cvp.customerId = 1042,
    this.cvp.policyId = this.policy.policyId;
    this.cvp.vehicleId = 4057;
    this.service.buymotorinsurance(this.cvp).subscribe(
      fetchedData=>{
        console.log(fetchedData);
      }
    );
    
   }
  
}

addInsurance() {
  
}

calculatePremium() {
  this.service.getPolicyFor("Bike").subscribe(
    fetchedPolicies=> {
      console.log(fetchedPolicies);
      this.policies = fetchedPolicies[0];
      this.policy.policyName = this.policies.policyName;
      this.policy.policyId = this.policies.policyId;
      this.policy.policyFor = this.policies.policyFor;
      this.basePremium = this.policies.premiumAmount;
      this.policy.duration = this.policies.duration;
      if(this.vehicle.fuelType == "Petrol") {
        if(this.vehicle.age >= 1 && this.vehicle.age <=5) {
          this.basePremium += 500;
        }
        else if(this.vehicle.age >= 6 && this.vehicle.age <=10) {
          this.basePremium += 1000;
        }
        else if(this.vehicle.age >= 11 && this.vehicle.age <=15) {
          this.basePremium += 1500;
        }
        this.policy.premiumAmount = this.basePremium;
      }
      else {
        if(this.vehicle.age >= 1 && this.vehicle.age <=5) {
          this.basePremium += 700;
        }
        else if(this.vehicle.age >= 6 && this.vehicle.age <=10) {
          this.basePremium += 1400;
        }
        else if(this.vehicle.age >= 11 && this.vehicle.age <=15) {
          this.basePremium += 2100;
        }
        this.policy.premiumAmount = this.basePremium;
      }
      // for(let i = 0; i < 3 ; i++) {
      //   this.displayPolicies[i] = this.policy;
      // }
       
      // this.displayPolicies[1].duration = 3;
      // this.displayPolicies[1].premiumAmount = this.basePremium * 3 - 500;
      // console.log(this.displayPolicies); 
      // console.log(this.displayPolicies[1]);
      // this.displayPolicies[2].duration =5;
      // this.displayPolicies[2].premiumAmount = this.basePremium * 5 - 1000;

    }
 
  )
}

}
