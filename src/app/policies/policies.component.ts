import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Policy } from '../policy';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {
  policies:Array<Policy> = new Array<Policy>();
  constructor(private service:AdminServiceService) { }

  ngOnInit(): void {
    this.service.getPolicies().subscribe(
      fetchedPolicies=> {
       this.policies.push(fetchedPolicies);
       console.log(this.policies[0])
        
      }
    );
  }
  logout() {
    localStorage.removeItem("adminId");
  }

}
