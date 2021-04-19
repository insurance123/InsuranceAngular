import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vehicle } from '../vehicle';
import { VehicleInsuranceService } from '../vehicle-insurance.service';

@Component({
  selector: 'app-buy-vehicle',
  templateUrl: './buy-vehicle.component.html',
  styleUrls: ['./buy-vehicle.component.css']
})
export class BuyVehicleComponent implements OnInit {

  Step1:boolean = true;
  Step2:boolean = false;
  Step3:boolean = false;
  Step4:boolean = false;

  vehicle: Vehicle = new Vehicle();

  constructor(private service:VehicleInsuranceService) { }

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

  userId:number=1021;

  register(vehicleForm:NgForm){
    this.service.registerVehicle(this.vehicle, this.userId).subscribe(
      fetchedData=>{
        console.log(fetchedData);
      }
    );
 }

}
