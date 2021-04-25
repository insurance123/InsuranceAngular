import { formatCurrency } from '@angular/common';
import { ngModuleJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {WOW} from "wowjs/dist/wow.min";
import { ContactUs } from '../contact-us';
import { HomeService } from '../home.service';
import { Policy } from '../policy';
import { VehicleInsuranceService } from '../vehicle-insurance.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contactus:ContactUs = new ContactUs();
  policy:Policy = new Policy();
  insuranceType:'Bike';
  userId;
  queryForm={userName:"", email:"", phone:""};
  constructor(private homeService:HomeService, private service:VehicleInsuranceService, private router: Router) { }

  ngOnInit(): void {
    
     // Check whether user is signed in
     this.userId = localStorage.getItem('customerId');
     const wow = new WOW({
      live: false
    });
    wow.init();
    wow.sync();
  }

  logout() {
    localStorage.removeItem("customerId");
  }
  public animate(){
    const wow = new WOW();
    wow.init();
    wow.sync();
  }

  addquery(queryform:NgForm){
    this.homeService.addNewQuery(this.contactus).subscribe(
      fetchedData => {
        //console.log(fetchedData);
        
        Swal.fire({
          title: "Query Submitted!",
          text: "Your query has been submitted successfully",
          icon: "success",
          confirmButtonText: "Okay"
        });
        this.router.navigate[('')];
      }
    );
    queryform.resetForm();
  }

  fetchPolicy() {
 
    this.service.getPolicyFor(this.insuranceType).subscribe(
      fetchedPolicy=> {
        console.log(fetchedPolicy);
        this.policy = fetchedPolicy[0];
        console.log(this.insuranceType);
      }
    )
  }
}
