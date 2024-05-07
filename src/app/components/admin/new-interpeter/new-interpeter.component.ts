import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-new-interpeter',
  templateUrl: './new-interpeter.component.html',
  styleUrls: ['./new-interpeter.component.scss']
})
export class NewInterpeterComponent { 

  dataSource = new MatTableDataSource<any>([]);
  originalDataSource: any[] = [];

  constructor(public dialog: MatDialog,
              private apiService: ApiService,
              public auth: AuthService) {}

 displayedColumns: string[] = ['fullName', 'city', 'languages', 'Actions'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit(): void {
      this.apiService.newInterpeter().subscribe(data => {
        this.dataSource = data;
        this.originalDataSource = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }

    accept(element: any) {
      element.isActive = 'Appeoved';
      // this.apiService.updaterequest(element).subscribe((data: any) => {
      //   console.log(data);
      // });
    }
  
    deny(element: any) {
      element.isActive = 'Denied';
      // this.apiService.updaterequest(element).subscribe((data: any) => {
      //   console.log(data);
      // });
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
}
