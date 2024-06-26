import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.scss']
})
export class AdminRequestComponent {

  constructor(private apiService: ApiService){}
  dataSource : MatTableDataSource<any>;
  originalDataSource: any[] = [];
  filteredData :any[] =[]

  // displayedColumns: string[] = ['fullName','courtId', 'courtLocation', 'caseId', 'caseDate', 'person', 'personLanguage', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.apiService.getAdminRequestData().subscribe(data => {
      this.dataSource = data;
      this.originalDataSource = data;
      this.dataSource = new MatTableDataSource(data); 
      this.dataSource.paginator = this.paginator; 
      this.dataSource.sort = this.sort; 
      this.filteredData= this.dataSource.data;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredData = this.dataSource.data.filter(item => {
      return Object.keys(item).some(key => {
        return item[key].toString().toLowerCase().includes(filterValue);
      });
    });
  }
}
