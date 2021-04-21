import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service:UserService, private router:Router) { }

  user:User= new User();
  ngOnInit(): void {
  }

  register(regform:NgForm){
    this.service.registerUser(this.user).subscribe(
      fetchedData=>{
        Swal.fire({
          title: "Registration Successful",
          text: "Please login to continue.",
          icon: "success",
          confirmButtonText: "Okay"
        });
        this.router.navigate[('/login')];
      }
    );
  }

}
