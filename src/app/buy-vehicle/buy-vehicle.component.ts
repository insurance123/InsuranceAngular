import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerVehiclePolicy } from '../customer-vehicle-policy';
import { Policy } from '../policy';
import { User } from '../user';
import { Vehicle } from '../vehicle';
import { VehicleInsuranceService } from '../vehicle-insurance.service';
import Swal from 'sweetalert2';
import {WOW} from "wowjs/dist/wow.min";
import { UserService } from '../user.service';
import { Document } from '../document';
import { DocumentUploadService } from '../document-upload.service';

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
  vehicleType = 'Bike';
  fuelType = 'Petrol'
  policies:Policy;
  userId:any;
  vehicleId:number;
  basePremium:number;
  policy:Policy = new Policy();
  policy1:Policy = new Policy();
  policy2:Policy = new Policy();
  displayPolicies:Array<Policy> = [];
  selectedPolicy:Policy = new Policy();
  calculatedCoverage:number = 100000;
  document;
  aClass:string = "hide";

  constructor(private service:VehicleInsuranceService, private router:Router, private userService:UserService, private documentService: DocumentUploadService) { }

  ngOnInit(): void {
    // Check whether user is signed in
    this.userId = localStorage.getItem('customerId');
    
   
  }

  public showForm1 () {
    this.Step2 = false;
    this.Step3 = false;
    this.Step1 = true;
    this.Step4 = false;
    this.Step5 = false;
    
  }
  showState(){
    this.vehicle.registrationState = this.vehicle.registrationNumber.slice(0,4);
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
  uploadForm:boolean = false;
  showPayment:boolean=false;
  showPlans:boolean=true;

  public showDocument(policy){
    this.checkLogin();
    this.selectedPolicy = policy;
    this.uploadForm = true;
    this.showPlans = false;
    this.showPayment = false;
  }
  onFileChange(event){
    this.document = event.target.files[0];
  }
  uploadDocument(formData:FormData) {
    this.documentService.uploadDocument(formData).subscribe(
      fetchedData=>{
         console.log(fetchedData);
       }
     );
  }
  showPay() {
  //   console.log(this.document);
  //   let formData: FormData = new FormData();
  //   this.userId = localStorage.getItem('customerId');
  //   formData.append('userId', this.userId);
  //   formData.append('rcBook', this.document);
  //   for (var pair of formData.getAll("documentPath")) {
  //     console.log(pair); 
  // }
  //   console.log(JSON.stringify(formData));
    // this.userId = localStorage.getItem('customerId');
    // this.formData.append('userId', this.userId);
    // this.formData.append('documentPath', this.document);
    //console.log(this.formData);
    
    // this.uploadDocument(formData);
    // console.log("--------------------")
    this.showPaymentPage();
  }
  showPaymentPage() {
    this.uploadForm = false;
    this.showPayment = true;
  }

  logout() {
    localStorage.removeItem("customerId");
  }
  
  // policyId:number= 2041;
  cvp:CustomerVehiclePolicy = new CustomerVehiclePolicy();
  
  userEmail:String;
  userPassword:String;
  checkUser:User = new User();

  checkLogin(){
   if(this.userId == null) {
    Swal.fire({
      title: 'Please Log In to continue',
      html:
        '<input type="email" id="swal-input1" class="swal2-input" placeholder="Enter Email Id">' +
        '<input type="password" id="swal-input2" class="swal2-input" placeholder="Enter Password">',
      focusConfirm: false,
      confirmButtonText: `Log In`,
      preConfirm: () => {
        return [
          this.userEmail = (<HTMLInputElement><unknown>document.getElementById('swal-input1')).value,
          this.userPassword = (<HTMLInputElement><unknown>document.getElementById('swal-input2')).value,
          this.checkUser.userEmail = this.userEmail,
          this.checkUser.password = this.userPassword,
          this.userService.loginUser(this.checkUser).subscribe(
            fetchedUser=> {
              localStorage.setItem('customerId', String(fetchedUser.userId));
              this.userId = Number(localStorage.getItem('customerId'));
              
              console.log(this.userId);
              this.vehicle.fuelType = this.fuelType;
              this.vehicle.vehicleType = this.vehicleType;
              this.vehicle.userId = this.userId;
              
              this.service.addVehicle(this.vehicle).subscribe(
                fetchedData=>{
                  if(fetchedData == null) {
                    Swal.fire({
                      title: "Registration Number already exist",
                      text: "Don't buy a new policy, renew it from Dashboard",
                      icon: "error",
                      showCloseButton : true
                    });
                  }
                    this.vehicleId = fetchedData.vehicleId;
                }
              );
            }
            
          )
        ]
      }
    }).then(() => {
      Swal.fire('Logged In','', 'success');
      // this.addVehicle();
    })
    
    this.showPlans = false;
    //this.showPayment = true;
   }
   else {
    
    this.addVehicle();
    this.showPlans = false;
    this.showPayment = true;
    
   }
  
}

addVehicle() {
    
    // this.userId = localStorage.getItem('customerId');
    // console.log(Number(localStorage.getItem('customerId')));
    console.log(this.userId);
    this.vehicle.fuelType = this.fuelType;
    this.vehicle.vehicleType = this.vehicleType;
    this.vehicle.userId = this.userId;
    
    this.service.addVehicle(this.vehicle).subscribe(
      fetchedData=>{
        this.vehicleId = fetchedData.vehicleId;
      }
    );
}

// year = new Date(). getFullYear();
// month = new Date(). getMonth();
// day = new Date(). getDate();
addInsurance() {
  console.log(this.document);
    let formData: FormData = new FormData();
    this.userId = localStorage.getItem('customerId');
    formData.append('userId', this.userId);
    formData.append('rcBook', this.document);
    for (var pair of formData.getAll("documentPath")) {
      console.log(pair); 
  }
    console.log(JSON.stringify(formData));
    // this.userId = localStorage.getItem('customerId');
    // this.formData.append('userId', this.userId);
    // this.formData.append('documentPath', this.document);
    //console.log(this.formData);
    
    this.uploadDocument(formData);






  this.vehicle.vehicleId = this.vehicleId;
  // this.addVehicle();
  this.cvp.startDate = new Date(); //Get today's date
  //this.cvp.endDate = new Date(year+1, month, day);
    if(this.selectedPolicy.duration == 1) {
      var year = new Date(this.cvp.startDate).getFullYear();
      var month = new Date(this.cvp.startDate).getMonth();
      var day = new Date(this.cvp.startDate).getDate();
      var date = new Date(year + 1, month, day);
      this.cvp.endDate = date;
      console.log(this.cvp.endDate);
      this.calculatedCoverage = 100000;
    }
    else if(this.selectedPolicy.duration == 3) {
      var year = new Date(this.cvp.startDate).getFullYear();
      var month = new Date(this.cvp.startDate).getMonth();
      var day = new Date(this.cvp.startDate).getDate();
      var date = new Date(year + 3, month, day);
      this.cvp.endDate = date;
      this.calculatedCoverage = 300000;
    }
    else if(this.selectedPolicy.duration == 5) {
      var year = new Date(this.cvp.startDate).getFullYear();
      var month = new Date(this.cvp.startDate).getMonth();
      var day = new Date(this.cvp.startDate).getDate();
      var date = new Date(year + 5, month, day);
      this.cvp.endDate = date;
      this.calculatedCoverage = 500000;
    }
    this.cvp.coverageAmount = this.calculatedCoverage;
    this.cvp.premiumAmount = this.selectedPolicy.premiumAmount;
    this.cvp.customerId = this.userId,
    this.cvp.policyId = this.selectedPolicy.policyId;
    this.cvp.vehicleId = this.vehicleId;
    this.service.buymotorinsurance(this.cvp).subscribe(
      fetchedData=>{
        Swal.fire({
          title: "Successful",
          text: "Insurance bought successfully. Check your E-Mail for details.",
          icon: "success",
          confirmButtonText: "Okay"
        });
        this.router.navigate(['/']);
      }
  
    );
  
}

calculatePremium() {
  this.service.getPolicyFor(this.vehicleType).subscribe(
    fetchedPolicies=> {
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
      
      this.displayPolicies[0] = this.policy;
      this.policy1.policyId = this.policy.policyId;
      this.policy1.policyName = this.policy.policyName;
      this.policy1.policyFor = this.policy1.policyFor;
      this.policy1.duration = 3;
      this.policy1.premiumAmount = this.basePremium * 3 - 500;
      this.displayPolicies[1] = this.policy1;

      this.policy2.policyId = this.policy.policyId;
      this.policy2.policyName = this.policy.policyName;
      this.policy2.policyFor = this.policy1.policyFor;
      this.policy2.duration = 5;
      this.policy2.premiumAmount = this.basePremium * 5 - 1000;
      this.displayPolicies[2] = this.policy2;



    }
 
    
  )
  
}

}
