import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private permissionService: NgxPermissionsService, private router: Router, private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(sessionStorage !== undefined && this.auth.isUserLoggedIn || this.auth.isAdminLoggedIn) {
      const permissions: any = [];
      permissions.push(this.auth.userRole);
      this.permissionService.loadPermissions(permissions);
      return true;
    }
    else {
      this.router.navigateByUrl('/');
      return false; 
    }
  }
  
}
