import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from './admin';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  registerUser(user:User):Observable<User> {
    return this.httpClient.post<User>('http://localhost:9090/registercustomer', user);
  }

  loginUser(user:User):Observable<User>{
    return this.httpClient.post<User>("http://localhost:9090/logincustomer",user);
  }

  loginAdmin(admin:Admin):Observable<Admin>{
    return this.httpClient.post<Admin>("http://localhost:9090/loginadmin",admin);
  }
}
