import { Injectable } from '@angular/core';
import { LoginUser, SessionStore } from 'src/app/model/User';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService, private router: Router) {}

  public authLogin(data: LoginUser) {
    this.api.login(data).subscribe((result: any) => {
      const session: SessionStore = new SessionStore();
      session.userName = result.person.userName;
      session.userRole = result.person.roles;
      session.firstName = result.person.firstName;
      session.personId = result.person.personId
      console.log(result.person);
      sessionStorage.setItem('loggedInUser', JSON.stringify(session));
      if(this.isUserLoggedIn || this.isAdminLoggedIn) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  public get isUserLoggedIn(): boolean {
    if(sessionStorage !== undefined) {
      const result: any = sessionStorage.getItem('loggedInUser');
      const user: any = JSON.parse(result);
      return user.userRole == 'User';
    }
    return false;
  }

  public get isAdminLoggedIn(): boolean {
    if(sessionStorage !== undefined) {
      const result: any = sessionStorage.getItem('loggedInUser');
      const user: any = JSON.parse(result);
      return user.userRole == 'Admin';
    }
    return false;
  }

  public get userRole(): string {
    if(sessionStorage !== undefined) {
      const result: any = sessionStorage.getItem('loggedInUser');
      const user: any = JSON.parse(result);
      return user.userRole;
    }
    return '';
  }

  public logout() {
    sessionStorage.removeItem('loggedInUser');
    this.router.navigateByUrl('/');
  }
}
