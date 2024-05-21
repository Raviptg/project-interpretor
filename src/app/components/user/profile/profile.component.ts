import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SessionStore } from 'src/app/model/User';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  PersonName: string;
  personId: number;
  dataSource: MatTableDataSource<any>;

  constructor(public auth: AuthService, private apiService: ApiService) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    const sessionData = sessionStorage.getItem('loggedInUser');
    if (sessionData) {
      const session: SessionStore = JSON.parse(sessionData);
      this.PersonName = session.firstName;
      this.personId = session.personId;
      this.fetchUserProfile();
    }
  }

  private fetchUserProfile(): void {
    this.apiService.profile(this.personId).subscribe((data: any) => {
      this.dataSource.data = data;
    });
  }

  getDataSourceValue(property: string): any {
    return this.dataSource.data?.[0]?.[property];
  }

  editProfile(): void {
    // Logic to edit the profile
    console.log('Edit profile');
  }

  deleteProfile(): void {
    // Logic to delete the profile
    console.log('Delete profile');
  }
}
