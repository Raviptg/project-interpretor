import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SessionStore } from 'src/app/model/User';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})
export class UserRequestComponent {

  personId: number;
  dataSource: MatTableDataSource<any>;
  filterData :any = [];
  filteredData : any[] =[];

  constructor(public auth: AuthService,  private apiService:ApiService,private _liveAnnouncer: LiveAnnouncer)
  {this.dataSource = new  MatTableDataSource<any>();
    this.filterData= this.dataSource.data;
    this.filteredData = this.dataSource.data;

  }

  ngOnInit(): void {
    const sessionData = sessionStorage.getItem('loggedInUser');
    if (sessionData) {
      const session: SessionStore = JSON.parse(sessionData);
      this.personId = session.personId;
      this.getData();
      this.filteredData = this.dataSource.data;
    }
  }


  public getData() {
    this.apiService.InterpeterRequest(this.personId).subscribe((data) => {
      this.dataSource.data = data;
      this.filteredData = this.dataSource.data;
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredData = this.dataSource.data.filter(item => {
      return Object.keys(item).some(key => {
        return item[key]?.toString().toLowerCase().includes(filterValue);
      });
    });
  }

  accept(element: any) {
    element.actions = 'Accepted';
    this.apiService.updaterequest(element).subscribe((data: any) => {
      console.log(data);
    });
  }

  deny(element: any) {
    element.actions = 'Denied';
    this.apiService.updaterequest(element).subscribe((data: any) => {
      console.log(data);
    });
  }

}
