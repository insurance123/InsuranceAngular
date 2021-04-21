import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactUs } from './contact-us';
import { HomeComponent } from './home/home.component';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient:HttpClient) { }

  addNewQuery(contactus:ContactUs):Observable<ContactUs>{
    return this.httpClient.post<ContactUs>("http://localhost:9090/addnewquery", contactus);
}
}
