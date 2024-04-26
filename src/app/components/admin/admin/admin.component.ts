import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InterpeterRequestComponent } from './interpeter-request/interpeter-request.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  dataSource: MatTableDataSource<any>;
  originalDataSource: any[] = [];

  constructor(private __liveAnnouncer: LiveAnnouncer,
              public dialog: MatDialog,
              private apiService: ApiService,
              public auth: AuthService,
              // private excelService: ExcelService
            ) {}

  displayedColumns: string[] = ['FullName', 'City', 'Languages', 'Action'];

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

  @ViewChild('TABLE') table: ElementRef;

  ExpoetExcel(){
    const personDetails = this.dataSource.data.map(({ id, fullName, city, languages }) => ({ fullName, city, languages }));
    const workSheet = XLSX.utils.json_to_sheet(personDetails);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Interpeters');
    XLSX.writeFile(workBook, 'Interpeters Data.xlsx');
  }
}
