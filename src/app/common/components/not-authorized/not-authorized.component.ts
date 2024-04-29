import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
type AOA = any[][];


@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.scss']
})
export class NotAuthorizedComponent {
  data: AOA;

  // constructor(private router:Router){}
  // sign(){
  //  this.router.navigate(["signupLogin"])
  // }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      
      // console.log("data:",this.data);
      // this.data.map((res: any[])=>{
      //   // if(res[0] === "no"){
      //   //   console.log(res[0]);
      //   // }else{
      //   //   console.log(res[0]);
      //   // }
      // })
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
