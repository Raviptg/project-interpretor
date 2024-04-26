import { Injectable } from '@angular/core';
import { LoginUser, SessionStore } from 'src/app/model/User';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  error: string;
  isInvalid$ = new Subject();
  notAuthoraised$ = new Subject();

  constructor(private api: ApiService, private router: Router,public toastr: ToastrService) {}

  public authLogin(data: LoginUser) {
    this.api.login(data).subscribe((result: any) => {
      console.log(result);
      if (result.message == 'Success') {
        const session: SessionStore = new SessionStore();
        session.userName = result.person.userName;
        session.userRole = result.person.roles;
        session.firstName = result.person.firstName;
        session.personId = result.person.personId;
        session.isActive = result.person.isActive;
        // console.log(session.isActive);
        sessionStorage.setItem('loggedInUser', JSON.stringify(session));
        if (this.isUserLoggedIn || this.isAdminLoggedIn) {
          this.router.navigateByUrl(
            `/dashboard/${session.userRole.toLocaleLowerCase()}`
          );
        }
      } else if(result.message == 'Authentication Failed') {
        // this.router.navigateByUrl('/not-authorized');
        this.notAuthoraised$.next(true);
      }
      else if(result.message == 'Invalid Credentials') {
        this.isInvalid$.next(true);
      }
    });
  }

  public get isUserLoggedIn(): boolean {
    if (sessionStorage !== undefined) {
      const result: any = sessionStorage.getItem('loggedInUser');
      const user: any = JSON.parse(result);
      return user.userRole == 'User';
    }
    return false;
  }

  public get isAdminLoggedIn(): boolean {
    if (sessionStorage !== undefined) {
      const result: any = sessionStorage.getItem('loggedInUser');
      const user: any = JSON.parse(result);
      return user.userRole == 'Admin';
    }
    return false;
  }

  public get userRole(): string {
    if (sessionStorage !== undefined) {
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

  private personDetails: any;

  setPersonDetails(details: any) {
    this.personDetails = details;
  }

  getPersonDetails() {
    return this.personDetails;
  }
}
