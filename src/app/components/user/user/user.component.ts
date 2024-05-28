import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SessionStore } from 'src/app/model/User';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  personId: number;
  dataSource: MatTableDataSource<any>;
  filteredData : any[] =[];
  
  constructor(public auth: AuthService, private apiService:ApiService){
    this.dataSource = new MatTableDataSource<any>();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(); 
    const sessionData = sessionStorage.getItem('loggedInUser');
    if (sessionData) {
      const session: SessionStore = JSON.parse(sessionData);
      this.personId = session.personId;
      this.getData();
      this.filteredData = this.dataSource.data;
    }
  }


  public getData() {
    this.apiService.InterpreterHome(this.personId).subscribe((data) => {
      this.dataSource.data = data;
      this.filteredData= this.dataSource.data;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredData = this.dataSource.data.filter(item => {
      return Object.keys(item).some(key => {
        return item[key]?.toString().toLowerCase().includes(filterValue);
      });
    });
  }

  getStatusColor(status: string): string {
    return status === 'Completed' ? 'accepted-color' : 'orange-color';
  }
  @ViewChild('TABLE') table: ElementRef;

  ExpoetExcel(){
     const personDetails = this.dataSource.data.map(({ id,personId,courtId,courtLocation, caseId,caseName,person,personLanguage,status,payment }) => ({ courtId,courtLocation, caseId,caseName,person,personLanguage,status,payment }));
    const workSheet = XLSX.utils.json_to_sheet(personDetails);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Interpeters');
    XLSX.writeFile(workBook, 'Interpeters Data.xlsx');
  }
}
