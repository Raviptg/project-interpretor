import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  profileForm: FormGroup;
  isEditMode: boolean = false;

  Language  = ['English', 'Telugu', 'Tamil', 'Hindi', 'Kanada','Malayalem'];

  constructor(public auth: AuthService, private apiService: ApiService) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.loadUserData();
    this.profileForm = new FormGroup({
      phone: new FormControl(''),
      languages: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      zip: new FormControl(''),
    })
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
    console.log('Edit profile');
  }

  deleteProfile(): void {
    this.apiService.delete(this.personId).subscribe((data : any) =>{
      console.log(data);
    })
  }

  editMode(ind: boolean) {
    this.isEditMode = ind;
  }

  save(): void {
    if (this.profileForm.valid) {
      const personId = this.personId;
      const editedValues = this.profileForm.value;
      editedValues.languages = editedValues.languages.toLocaleString();

      for (const key in editedValues) {
        if (editedValues.hasOwnProperty(key) && editedValues[key] === '') {
            editedValues[key] = null;
        }
    }

      const updateRequest = { ...editedValues, personId };
      
    console.log(updateRequest);
      this.apiService.update(updateRequest).subscribe(() => {
        this.isEditMode = false;
        this.fetchUserProfile(); 
      });
    }
  }

}
