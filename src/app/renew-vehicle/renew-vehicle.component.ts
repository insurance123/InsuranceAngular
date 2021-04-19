import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-renew-vehicle',
  templateUrl: './renew-vehicle.component.html',
  styleUrls: ['./renew-vehicle.component.css']
})
export class RenewVehicleComponent implements OnInit {

  Step1:boolean = true;
  Step2:boolean = false;
  Step3:boolean = false;
  Step4:boolean = false;

  constructor() { }

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


}
