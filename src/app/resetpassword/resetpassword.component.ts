import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Resetpassword } from '../resetpassword';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private service:UserService,private router:Router) { }
  reset:Resetpassword=new Resetpassword();
  userEmail:string
  password:string
  ngOnInit(): void {
  }
  user:User=new User();

 

  updatePassword(){
  this.userEmail=sessionStorage.getItem("userEmail");

 

  this.reset.userEmail=this.userEmail;
  //this.reset.password=this.password;
  console.log(this.reset.userEmail);
  console.log(this.reset.password);
  
  this.service.resetPassword(this.reset).subscribe(
       update=>{
           console.log(this.reset);
           alert(" Password updated");
           this.router.navigate(['/login']);
         }
       )
     }

 


}

