import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service:UserService) { }

  user:User= new User();
  ngOnInit(): void {
  }

  register(regform:NgForm){
    this.service.registerUser(this.user).subscribe(
      fetchedData=>{
        console.log(fetchedData);
        alert("Successfully registered");
      }
    );
  }

}
