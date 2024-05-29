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

  dataSource = new MatTableDataSource<any>([]);
  originalDataSource: any[] = [];
  filteredData : any[] = []
  TotalCount :any[];
  

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
      this.filteredData = this.dataSource.data;
    });
    // this.apiService.caseCount().subscribe(data =>{
    //   this.dataSource = data;
    //   console.log(this.dataSource);
    // });
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
    this.filteredData = this.dataSource.data.filter(item => {
      return Object.keys(item).some(key => {
        return item[key].toString().toLowerCase().includes(filterValue);
      });
    });
  }

  @ViewChild('TABLE') table: ElementRef;

  ExpoetExcel(){
    const personDetails = this.dataSource.data.map(({ id, fullName, city, languages }) => ({ fullName, city, languages }));
    const workSheet = XLSX.utils.json_to_sheet(personDetails);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Interpeters');
    XLSX.writeFile(workBook, 'Interpeters Data.xlsx');
  }

  getItemRating(rating: number) {
    let rate = [];
    for(let i=0; i<rating; i++) {
      rate.push("*")
    }
    return rate;
  }

  deactivate(item: any) {
    // const url = `https://yourapi.com/users/${item.id}`;
    console.log(item.personId);
    this.apiService.delete(item.personId).subscribe((data : any) => {
      alert('Interpeter DeActivated Successfully');
    })
  }
}
