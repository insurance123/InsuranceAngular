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
        //console.log(UserDetails);
      }
    );
    this.service.getMotorClaims(this.userId).subscribe(
      motorclaims => {
        for(let i in motorclaims){
          this.vehicleclaims.push(motorclaims[i]);
        console.log(motorclaims[i]);
        }
      }
    );
    this.service.getTravelClaims(this.userId).subscribe(
      travelClaims => {
        for(let i in travelClaims){
          this.travelclaims.push(travelClaims[i]);
          console.log(this.travelclaims[i]);
        }
        
      }
    );
  }

  logout() {
    localStorage.removeItem("customerId");
  }

}
