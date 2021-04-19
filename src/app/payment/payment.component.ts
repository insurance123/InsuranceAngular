import { Component, OnInit } from '@angular/core';
import { CustomerVehiclePolicy } from '../customer-vehicle-policy';
import { InsurancePaymentService } from '../insurance-payment.service';
import { User } from '../user';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private service:InsurancePaymentService) { }

  ngOnInit(): void {
  }


  // vehicle:Vehicle={
  //   vehicleId:4002,
  //   registrationNumber: "Mh14GV6354",
  //   registrationState: "Maharashtra",
  //   manufacturer:"Honda",
  //   model:"Activa",
  //   vehicleType:"Two wheeler",
  //   engineNumber:"EN5478",
  //   chassisNumber :"CH3547",
  //   fuelType:"Petrol",
  //   age: 20
  // }
  userId:number=1041;
  vehicleId:number=4041;
  
  // cvp:CustomerVehiclePolicy={
    
  //   startDate:"1999-08-22",
  //   endDate: "2002-07-23",
  //   coverageAmount: 100000,
  //   // user:this.user,
  //   // policy:this.policy,
  //   // vehicle:this.vehicle
  // }
  // policyId:number=2002;

  

   payservice(){
//     // this.service.addVehicle(this.vehicle,this.userId).subscribe(
//     //   fetchedData=>{
//     //     console.log(fetchedData);
    
//     //   }
//     // );
//     this.service.buymotorinsurance(this.cvp,this.userId,this.vehicleId,this.policyId).subscribe(
//       fetchedData=>{
//         console.log(fetchedData);
//       }
//     );
    
  }
 }
