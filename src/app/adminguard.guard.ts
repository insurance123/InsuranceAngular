import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardServiceService } from './authguard-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
  constructor(private Authguardservice: AuthguardServiceService, private router: Router) {}  
canActivate(): boolean {  
    if (!this.Authguardservice.getAdminToken()) {  
        this.router.navigateByUrl("/login");  
    }  
    return this.Authguardservice.getAdminToken();  
}  
  
}
