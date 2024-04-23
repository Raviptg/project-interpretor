import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SessionStore } from 'src/app/model/User';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  personId: number;
  dataSource: MatTableDataSource<any>;
  
  displayedColumns: string[] = [
    'Court Id',
    'Court Location',
    'Case Id',
    'Case Name',
    'Case Date',
    'Person',
    'Person Language',
    'Status',
    'Payment',
  ];
  
  constructor(public auth: AuthService, private apiService:ApiService,private _liveAnnouncer: LiveAnnouncer){
    this.dataSource = new MatTableDataSource<any>();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    const sessionData = sessionStorage.getItem('loggedInUser');
    if (sessionData) {
      const session: SessionStore = JSON.parse(sessionData);
      this.personId = session.personId;
      this.getData();
    }
  }


  public getData() {
    this.apiService.InterpreterHome(this.personId).subscribe((data) => {
      this.dataSource.data = data; // Assign data to MatTableDataSource
    });
  }

  // announceSortChange(sortState: Sort) {
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStatusColor(status: string): string {
    return status === 'Completed' ? 'accepted-color' : 'orange-color';
  }
}
