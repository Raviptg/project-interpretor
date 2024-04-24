import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CommonModule as CommonUtils } from 'src/app/common/common-module';
import { AdminRoutingModule } from './admin-routing.module';
import { InterpeterRequestComponent } from './interpeter-request/interpeter-request.component';


@NgModule({
  declarations: [
  
  
    InterpeterRequestComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    // CommonUtils
  ]
})
export class AdminModule { }
