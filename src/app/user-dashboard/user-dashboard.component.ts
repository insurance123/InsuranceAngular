import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { UserDetailsDto } from '../user-details-dto';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  userId;
  user:User=new User();
  newUser:UserDetailsDto = new UserDetailsDto();
  minDate = new Date(1950,0,1);
  maxDate = new Date();
  aadharUpdated:boolean =true ;
  document;
  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('customerId');
    this.service.getUserDetails(this.userId).subscribe(
      UserDetails => {
        this.user = UserDetails;
        console.log(UserDetails);
        if(this.user.aadharCard!=null){
          this.aadharUpdated=true;
        }
        else 
          this.aadharUpdated=false;
      }
    );
  }

  logout() {
    localStorage.removeItem("customerId");
  }
  
  updateUser(updateform:NgForm){
    this.newUser.userId= Number(localStorage.getItem('customerId'));
    console.log(this.newUser);
    this.service.editUserDetails(this.newUser).subscribe(
      fetcehdData => {
        console.log(fetcehdData);
      }
    );
  }

  onFileChange(event){
    this.document = event.target.files[0];
  }
  
  // showPay() {
  //   console.log(this.document);
  //   let formData: FormData = new FormData();
  //   this.userId = localStorage.getItem('customerId');
  //   formData.append('userId', this.userId);
  //   formData.append('rcBook', this.document);
  //   for (var pair of formData.getAll("documentPath")) {
  //     console.log(pair); 
  // }
  //   console.log(JSON.stringify(formData));
  //   // this.userId = localStorage.getItem('customerId');
  //   // this.formData.append('userId', this.userId);
  //   // this.formData.append('documentPath', this.document);
  //   //console.log(this.formData);
  //   this.uploadForm = false;
  //   this.showPayment = true;
  //    this.documentService.uploadDocument(formData).subscribe(
  //    fetchedData=>{
  //       console.log(fetchedData);
  //     }
  //   );
  // }

  updateAadhar(){
    console.log(this.document);
    let formData: FormData = new FormData();
    this.userId = localStorage.getItem('customerId');
    formData.append('userId', this.userId);
    formData.append('aadharCard', this.document);
    
    // console.log(JSON.stringify(formData));
    // this.userId = localStorage.getItem('customerId');
    // this.formData.append('userId', this.userId);
    // this.formData.append('documentPath', this.document);
    //console.log(this.formData);
     this.service.updateAadhar(formData).subscribe(
     fetchedData=>{
        console.log(fetchedData);
        this.aadharUpdated=true;
      }
    );  
  }

}
