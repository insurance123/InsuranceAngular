import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Forgotpassword } from '../forgotpassword';
import { User } from '../user';
import { UserService } from '../user.service';
import {WOW} from "wowjs/dist/wow.min";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private service:UserService,private router:Router) { }

  ngOnInit(): void {
    const wow = new WOW({
      live: false
    });
    wow.init();
    wow.sync();
  }
  public animate(){
    const wow = new WOW();
    wow.init();
    wow.sync();
  }
//fg:ForgotPassword=new ForgotPassword();
user1:User = new User();
userEmail:String;
otp:string="";
otpr:string="";
//customer:Customer=new Customer();
user:Forgotpassword=new Forgotpassword();

 

  // updatePassword(){
  //   this.service.forgotPassword(this.fg).subscribe(
  //     update=>{
  //       console.log(this.fg);
  //       alert("upadted");
  //     }
  //   )
  // }

 


  generate(userEmail:String){
    console.log(userEmail);
    sessionStorage.setItem("userEmail",userEmail.toString());
    this.service.generateotp(userEmail).subscribe(
      fetchedOtp=>{
        this.otp=fetchedOtp;
       console.log(this.otp);
       alert("Please enter the generated OTP")
  
      //   if(this.customer!=null){
      //     if(this.customer.approved==false){
            
      //       this.adminService.aprroveCustomerbyId(custId).subscribe(
      //         approval=>{
      //           console.log(approval);
      //           alert("Customer Approved!! :)")
      //         }
      //       )
      //     }
      //     else{
      //       alert("Already Approved Customer!! :)")
      //     }
  
      // }
      }
    );
  }
  
  verifyotp(){
  if(this.otpr!=""&&this.otp==this.otpr){
    this.router.navigate(['/resetpassword']);
  
  }else{
    alert("Wrong OTP");
  
  }
  }
}

