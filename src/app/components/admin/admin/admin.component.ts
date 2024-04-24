import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InterpeterRequestComponent } from './interpeter-request/interpeter-request.component';
// import { InterpeterRequestComponent } from './interpeter-request/interpeter-request.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  dataSource: MatTableDataSource<any>;
  originalDataSource: any[] = [];

  constructor(private __liveAnnouncer: LiveAnnouncer,
              private router: Router,
              public dialog: MatDialog,
              private apiService: ApiService,
              public auth: AuthService) {}

  displayedColumns: string[] = ['fullName', 'city', 'languages', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  ngOnInit(): void {
    this.apiService.AdminHome().subscribe(data => {
      this.dataSource = data;
      this.originalDataSource = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(element: any) {
    const dialogRef = this.dialog.open(InterpeterRequestComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.auth.setPersonDetails(element);
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.__liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.__liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    if (filterValue === '') {
      this.dataSource.data = this.originalDataSource.slice();
    } else {
      this.dataSource.filter = filterValue;
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
