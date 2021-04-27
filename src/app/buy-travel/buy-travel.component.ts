import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Policy } from '../policy';
import { Travel } from '../travel';
import { TravelInsuranceService } from '../travel-insurance.service';
import {WOW} from "wowjs/dist/wow.min";
import { CustomerTravelPolicy } from '../customer-travel-policy';
import Swal from 'sweetalert2';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-buy-travel',
  templateUrl: './buy-travel.component.html',
  styleUrls: ['./buy-travel.component.css']
})
export class BuyTravelComponent implements OnInit {

  Step1:boolean = true;
  Step2:boolean = false;
  Step3:boolean = false;
  //Step4:boolean = false;

  travel:Travel = new Travel();
  //policies:Policy;
  userId:any;
  travelId:number;
  basePremium:number;
  policy:Policy = new Policy();
  calculatedCoverage:number = 100000;
  ctp:CustomerTravelPolicy = new CustomerTravelPolicy();
  user:User = new User();

  start_date = new Date();
  // getYear = this.start_date.getFullYear()-18;
  // date2 = this.getYear + "-01-01";
  // minDate= new Date(this.date2);
  //maxDate=new Date(2030, 6, 20);
  currentTimeStamp = this.start_date.getTime();
  minEndDate = new Date(this.currentTimeStamp + (86400000));
  maxEndDate= new Date(this.minEndDate.getTime() + (86400000 * 60));
  minDateofBirth=new Date(1950, 0, 1);
  maxDateofBirth=new Date(2002, 11, 25);

  
  constructor( private service:TravelInsuranceService, private router:Router, private userService:UserService) { }

  ngOnInit(): void {
     // Check whether user is signed in
     this.userId = localStorage.getItem('customerId');
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
  
  showPayment:boolean=false;
  showPlans:boolean=true;

  showPay(policy) {
    // this.showPlans = false;
    // this.showPayment = true;
    // this.addTravel();
    this.checkLogin();
  }

  logout() {
    localStorage.removeItem("customerId");
  }
 
  userEmail:String;
  userPassword:String;
  checkUser:User = new User();
  checkLogin(){
    
      if(this.userId == null){
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
                this.travel.userId = this.userId;
                this.service.addTravel(this.travel).subscribe(
                  fetchedData=>{
                    this.travelId = fetchedData.travelId;
                  }
                );
              }
              )

            ]
      }
    }).then(()=>{
      Swal.fire('Logged In', '', 'success');
    })
    this.showPlans = false;
    this.showPayment = true;
  }
  else{
    this.addTravel();
    this.showPlans = false;
    this.showPayment = true;
   }
     
  }

  addTravel(){
    console.log(this.userId);
    this.travel.userId = this.userId;
    this.service.addTravel(this.travel).subscribe(
      fetchedData=>{
        this.travelId = fetchedData.travelId;
      }
    );
  }

  addInsurance(){
    this.ctp.startDate = this.travel.startDate;
    this.ctp.endDate = this.travel.endDate;
    this.ctp.coverageAmount = 10000;
    //this.ctp.coverageAmount = this.calculatedCoverage;
    this.ctp.premiumAmount = this.policy.premiumAmount;
    this.ctp.customerId = this.userId;
    this.ctp.policyId = this.policy.policyId;
    this.ctp.travelId = this.travelId;
    this.service.buytravelinsurance(this.ctp).subscribe(
      fetchedData=>{
        Swal.fire({
          title: "Successful",
          text: "Insurance bought successfully.",
          icon: "success",
          confirmButtonText: "Okay"
        });
        this.router.navigate(['/']);
      }
    );
  }

  age: number;
  noOfDays: number;
  Difference_In_Days:number;
  userAge:number;
  mindob = new Date().getFullYear()-78;
  maxdob = new Date().getFullYear()-18;
  startDOB = new Date(this.mindob-1,12,1);
  endDOB = new Date(this.maxdob,11,31);
  //getYear:Date;
  calculatePremium(){
    let d1 = new Date(this.travel.endDate);
    let d2 = new Date(this.travel.startDate);
    let DOB = new Date(this.user.dateOfBirth);
    let date1 = new Date(Date.now());
    this.age = date1.getFullYear() - DOB.getFullYear();
    //this.userAge = this.age / (1000 * 3600 * 24);
    this.noOfDays = d1.getTime() - d2.getTime();
    this.Difference_In_Days = this.noOfDays / (1000 * 3600 * 24);
    //this.userAge = Math.floor(this.userAge);
    //console.log(this.age);
    
    console.log(this.startDOB);
    console.log(this.endDOB);
    this.service.getPolicyFor("Travel").subscribe(
      fetchedPolicy=>{
        this.policy = fetchedPolicy[0];
        this.basePremium = this.policy.premiumAmount;
        if(this.age >= 18 && this.age <= 28){
           if(this.Difference_In_Days >=1 && this.Difference_In_Days<=10){
            this.basePremium += 500;
          }
          else if(this.Difference_In_Days >=11 && this.Difference_In_Days<=20){
            this.basePremium += 700;
          }
          else if(this.Difference_In_Days >=21 && this.Difference_In_Days<=30){
            this.basePremium += 900;
          }
          else if(this.Difference_In_Days >=31 && this.Difference_In_Days<=40){
            this.basePremium += 1000;
          }
          else if(this.Difference_In_Days >=41 && this.Difference_In_Days<=50){
            this.basePremium += 1300;
          }
          else if(this.Difference_In_Days >=51 && this.Difference_In_Days<=60){
            this.basePremium += 1500;
          }
        }

        else if(this.age >= 29 && this.age <= 38){
          if(this.Difference_In_Days >=1 && this.Difference_In_Days<=10){
            this.basePremium += 600;
          }
          else if(this.Difference_In_Days >=11 && this.Difference_In_Days<=20){
            this.basePremium += 800;
          }
          else if(this.Difference_In_Days >=21 && this.Difference_In_Days<=30){
            this.basePremium += 1000;
          }
          else if(this.Difference_In_Days >=31 && this.Difference_In_Days<=40){
            this.basePremium += 1100;
          }
          else if(this.Difference_In_Days >=41 && this.Difference_In_Days<=50){
            this.basePremium += 1400;
          }
          else if(this.Difference_In_Days >=51 && this.Difference_In_Days<=60){
            this.basePremium += 1600;
          }
        }

        else if(this.age >= 39 && this.age <= 48){
          if(this.Difference_In_Days >=1 && this.Difference_In_Days<=10){
            this.basePremium += 800;
          }
          else if(this.Difference_In_Days >=11 && this.Difference_In_Days<=20){
            this.basePremium += 1000;
          }
          else if(this.Difference_In_Days >=21 && this.Difference_In_Days<=30){
            this.basePremium += 1200;
          }
          else if(this.Difference_In_Days >=31 && this.Difference_In_Days<=40){
            this.basePremium += 1400;
          }
          else if(this.Difference_In_Days >=41 && this.Difference_In_Days<=50){
            this.basePremium += 1600;
          }
          else if(this.Difference_In_Days >=51 && this.Difference_In_Days<=60){
            this.basePremium += 1800;
          }
        }

        else if(this.age >= 49 && this.age <= 58){
          if(this.Difference_In_Days >=1 && this.Difference_In_Days<=10){
            this.basePremium += 1000;
          }
          else if(this.Difference_In_Days >=11 && this.Difference_In_Days<=20){
            this.basePremium += 1200;
          }
          else if(this.Difference_In_Days >=21 && this.Difference_In_Days<=30){
            this.basePremium += 1400;
          }
          else if(this.Difference_In_Days >=31 && this.Difference_In_Days<=40){
            this.basePremium += 1600;
          }
          else if(this.Difference_In_Days >=41 && this.Difference_In_Days<=50){
            this.basePremium += 1800;
          }
          else if(this.Difference_In_Days >=51 && this.Difference_In_Days<=60){
            this.basePremium += 2000;
          }
        }

        else if(this.age >= 59 && this.age <= 68){
          if(this.Difference_In_Days >=1 && this.Difference_In_Days<=10){
            this.basePremium += 1200;
          }
          else if(this.Difference_In_Days >=11 && this.Difference_In_Days<=20){
            this.basePremium += 1400;
          }
          else if(this.Difference_In_Days >=21 && this.Difference_In_Days<=30){
            this.basePremium += 1600;
          }
          else if(this.Difference_In_Days >=31 && this.Difference_In_Days<=40){
            this.basePremium += 1800;
          }
          else if(this.Difference_In_Days >=41 && this.Difference_In_Days<=50){
            this.basePremium += 2000;
          }
          else if(this.Difference_In_Days >=51 && this.Difference_In_Days<=60){
            this.basePremium += 2200;
          }
        }

        else if(this.age >= 69 && this.age <= 78){
          if(this.Difference_In_Days >=1 && this.Difference_In_Days<=10){
            this.basePremium += 1400;
          }
          else if(this.Difference_In_Days >=11 && this.Difference_In_Days<=20){
            this.basePremium += 1600;
          }
          else if(this.Difference_In_Days >=21 && this.Difference_In_Days<=30){
            this.basePremium += 1800;
          }
          else if(this.Difference_In_Days >=31 && this.Difference_In_Days<=40){
            this.basePremium += 2000;
          }
          else if(this.Difference_In_Days >=41 && this.Difference_In_Days<=50){
            this.basePremium += 2200;
          }
          else if(this.Difference_In_Days >=51 && this.Difference_In_Days<=60){
            this.basePremium += 2400;
          }
        }
        this.policy.premiumAmount = this.basePremium;
        this.policy.duration = this.Difference_In_Days;
        console.log(this.basePremium);
      }
    );
  }

}
