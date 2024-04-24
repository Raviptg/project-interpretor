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

  displayedColumns: string[] = ['fullName','courtId', 'courtLocation', 'caseId', 'caseDate', 'person', 'personLanguage', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.apiService.getAdminRequestData().subscribe(data => {
      this.dataSource = data;
      this.originalDataSource = data;
      this.dataSource = new MatTableDataSource(data); // Initialize as MatTableDataSource
      this.dataSource.paginator = this.paginator; // Set paginator
      this.dataSource.sort = this.sort; 
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    if (filterValue === '') {
      this.dataSource.data = this.originalDataSource.slice(); // Update data array
    } else {
      this.dataSource.filter = filterValue;
    }
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
