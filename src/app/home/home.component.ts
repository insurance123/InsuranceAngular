import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  userId:any;
  constructor(private homeService:HomeService, private service:VehicleInsuranceService) { }

  ngOnInit(): void {
    
     // Check whether user is signed in
     this.userId = localStorage.getItem('customerId');
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
        console.log(fetchedData);
      }
    );
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
