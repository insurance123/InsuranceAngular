import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Admin } from '../admin';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = new User();
  admin:Admin = new Admin();
  userType:String;
  userEmail:String = "";
  userPassword:String = "";
  hide:boolean = true;
  constructor(private service:UserService, private router:Router) { }

  onItemChange(value){
    this.userType=value;
 }

  ngOnInit(): void {
  }

  login(loginForm:NgForm){
    if(this.userType == "customer"){
      this.user.userEmail = this.userEmail;
      this.user.password = this.userPassword;
      this.service.loginUser(this.user).subscribe(
        fetchedData=>{
          console.log(fetchedData);
          if(fetchedData.userStatus == "Failed")
          {
            Swal.fire({
                 title: "Login Failed",
                  text:"Please check your credentials",
                  icon: "error",
                  confirmButtonText: "Okay"
              });
              loginForm.resetForm();
          }
          else{
            localStorage.setItem('customerId', String(fetchedData.userId));
            Swal.fire({
              title: "Login Success",
               text:"Please avail services",
               icon: "success",
               confirmButtonText: "Okay"
           });
           this.router.navigate(['']);
          }
          
        }
      );
     
    }
    else{
      this.admin.adminEmail = this.userEmail;
      this.admin.password = this.userPassword;
      this.service.loginAdmin(this.admin).subscribe(
        fetchedData=>{
          console.log(fetchedData);
          //alert("Admin Logged In Successful");
          if(fetchedData.adminStatus == "Failed"){
            Swal.fire({
              title: "Login Failed",
               text:"Please check your credentials",
               icon: "error",
               confirmButtonText: "Okay"
           });
           loginForm.resetForm();
          }
          else{
            localStorage.setItem('adminId', String(fetchedData.adminId));
            console.log(fetchedData.adminId);
            Swal.fire({
              title: "Login Success",
               text:"Successfully logged in!",
               icon: "success",
               confirmButtonText: "Okay"
             
           });
           this.router.navigate(['/admindashboard']);
          }
        }
      );
    }
  }

}
