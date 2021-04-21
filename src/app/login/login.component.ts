import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
          sessionStorage.setItem('customerId', String(fetchedData.userId));
          alert(Number(sessionStorage.getItem('customer')));
          this.router.navigate(['/buytravel']);
        }
      );
    }
    else{
      this.admin.adminEmail = this.userEmail;
      this.admin.password = this.userPassword;
      this.service.loginAdmin(this.admin).subscribe(
        fetchedData=>{
          console.log(fetchedData);
          alert("Admin Logged In Successful");
        }
      );
    }
  }

}
