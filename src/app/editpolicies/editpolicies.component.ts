import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminServiceService } from '../admin-service.service';
import { Policy } from '../policy';
import { PolicyDto } from '../policy-dto';

@Component({
  selector: 'app-editpolicies',
  templateUrl: './editpolicies.component.html',
  styleUrls: ['./editpolicies.component.css']
})
export class EditpoliciesComponent implements OnInit {
  policy:Policy = new Policy();
  newPolicy:PolicyDto = new PolicyDto();
  constructor(private service:AdminServiceService, private router:Router) { }

  ngOnInit(): void {
  }
  logout() {
    localStorage.removeItem("adminId");
  }


  addPolicy(policyForm:NgForm) {
    console.log(this.policy)
    this.service.addPolicy(this.policy).subscribe(
      fetchedData=> {
        console.log(fetchedData);
        Swal.fire({
          title: "Successful",
          text: "Policy added successfully",
          icon: "success",
          confirmButtonText: "Okay"
        });
        this.router.navigate(['/policies']);
      }
    )
  }

  updatePolicy(policyForm:NgForm) {
    this.service.updatePolicy(this.newPolicy).subscribe(
      fetchedData=> {
        console.log(fetchedData);
        Swal.fire({
          title: "Successful",
          text: "Policy updated successfully",
          icon: "success",
          confirmButtonText: "Okay"
        });
        this.router.navigate(['/policies']);
      }
    );
  }
}
