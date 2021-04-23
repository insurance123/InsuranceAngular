import { Component, OnInit } from '@angular/core';
import { Claims } from '../claims';
import { TravelClaims } from '../travel-claims';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-claims',
  templateUrl: './user-claims.component.html',
  styleUrls: ['./user-claims.component.css']
})
export class UserClaimsComponent implements OnInit {
  userId;
  user:User=new User();
  vehicleclaims:Array<Claims> = new Array<Claims>();
  travelclaims:Array<TravelClaims> = new Array<TravelClaims>();

  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('customerId');
    this.service.getUserDetails(this.userId).subscribe(
      UserDetails => {
        this.user = UserDetails;
        console.log(UserDetails);
      }
    );
    this.service.getMotorClaims(this.userId).subscribe(
      motorclaims => {
        this.vehicleclaims.push(motorclaims);
        console.log(this.vehicleclaims[0]);
      }
    );
    this.service.getTravelClaims(this.userId).subscribe(
      travelClaims => {
        this.travelclaims.push(travelClaims);
        console.log(this.travelclaims[0]);
      }
    );
  }

  logout() {
    localStorage.removeItem("customerId");
  }

}
