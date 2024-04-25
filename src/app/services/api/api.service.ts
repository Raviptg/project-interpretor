import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`https://localhost:7013/api/login`, credentials);
  };

  registration(data: any): Observable<any>{
    return this.http.post<any>(`https://localhost:7013/api/Registration`,data);
};

  InterpreterHome(personId: any): Observable<any> {
    return this.http.get<any>(`https://localhost:7013/api/interpeterHome/${personId}`);
  };    

  InterpeterRequest(personId: any) :Observable<any> {
    return this.http.get<any>(`https://localhost:7013/api/InterpeterRequst/${personId}`)
  }

  updaterequest(element : any){
    return this.http.post(`https://localhost:7013/api/InterpeterRequst/UpdateAction`,element)
  }

  AdminHome(): Observable<any>{
    return this.http.get<any>(`https://localhost:7013/api/AdminHome`)
  }; 

  getAdminRequestData(): Observable<any>{
    return this.http.get<any>(`https://localhost:7013/api/InterpeterRequst/adminrequest`)
  };

  request(element : any){
    return this.http.post(`https://localhost:7013/api/InterpeterRequst/RequestAction`,element)
  }

  getCaseData(caseId:string): Observable<any>{
    return this.http.get(`https://localhost:7013/api/CaseDetailes/${caseId}`)
  };

  newInterpeter(): Observable<any> {
    return this.http.get(`https://localhost:7013/api/CaseDetailes/NewInterpeter`)
  };
}
