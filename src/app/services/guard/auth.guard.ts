import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private permissionService: NgxPermissionsService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(true) {
      const permissions: any = [];
      permissions.push('Admin');
      this.permissionService.loadPermissions(permissions);
      return true;
    }
    else {
      this.router.navigateByUrl('/');
      return false; 
    }
  }
  
}
