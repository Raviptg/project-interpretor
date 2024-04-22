import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { SessionStore } from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent {

  firstName: string;
  
  constructor(public auth: AuthService,
              private route:Router){}

  ngOnInit(): void {
    const sessionData = sessionStorage.getItem('loggedInUser');
    if (sessionData) {
      const session: SessionStore = JSON.parse(sessionData);
      this.firstName = session.firstName;
    }
  }
}

