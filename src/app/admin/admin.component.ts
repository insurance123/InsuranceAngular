import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Policy } from '../policy';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service:AdminServiceService) { }
  policies:Array<Policy> = new Array<Policy>();
  ngOnInit(): void {
    //this.loadJsFile("../../assets/js/bootstrap.bundle.min.js.map"); 
    this.service.getPolicies().subscribe(
      fetchedPolicies=> {
       this.policies.push(fetchedPolicies);
       console.log(this.policies[0])
        
      }
    );
  }
  public loadJsFile(url) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }  

  logout() {
    localStorage.removeItem("adminId");
  }
  

}
