import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserComponent } from '../user/user/user.component';
import { AdminComponent } from '../admin/admin/admin.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public auth: AuthService){}
}

