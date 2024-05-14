import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, debounce, debounceTime } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-interpeter-request',
  templateUrl: './interpeter-request.component.html',
  styleUrls: ['./interpeter-request.component.scss'],
})
export class InterpeterRequestComponent implements OnInit {
  requestForm: FormGroup;
  dataSource: any[] = [];
  private searchSubject = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private apiService: ApiService,
    public auth: AuthService
  ) {
    this.initForm();
    this.searchSubject
      .pipe(debounceTime(1000))
      .subscribe((searchValue: any) => {
        this.fetchDetails({
          str: searchValue[0],
          form: searchValue[1],
          index: searchValue[2],
        });
      });
  }

  dateControl = new FormControl(new Date());

  initForm(): void {
    this.requestForm = this.fb.group({
      newRequests: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      newForm: new FormArray([
        new FormGroup({
          courtId: new FormControl(''),
          courtLocation: new FormControl(''),
          caseId: new FormControl(''),
          caseName: new FormControl(''),
          personName: new FormControl(''),
          languages: new FormControl(''),
          CaseDate: new FormControl(''),
        }),
      ]),
    });
  }

  // onSubmit() {
  //   const personDetails = this.auth.getPersonDetails();
  //   if (personDetails) {
  //     const PersonId = personDetails.personId;
  //     const requestData = { ...this.requestForm.value, PersonId };
  //     this.apiService.request(requestData).subscribe(
  //       (response) => {
  //         console.log('Request submitted successfully:', response);
  //         // Optionally, you can reset the form after successful submission
  //         this.requestForm.reset();
  //       },
  //       (error) => {
  //         console.error('Error submitting request:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Failed to get person details.');
  //   }
  // }

  onSubmit() {
    const personDetails = this.auth.getPersonDetails();
    if (personDetails) {
      const PersonId = personDetails.personId;
      const requestData = { ...this.requestForm.value, PersonId };
      // Convert requestData into a list
      const requestDataList = [requestData];

      console.log(requestDataList);
      // this.apiService.request(requestDataList).subscribe(
      //   (response) => {
      //     console.log('Request submitted successfully:', response);
      //     // Optionally, you can reset the form after successful submission
      //     this.requestForm.reset();
      //   },
      //   (error) => {
      //     console.error('Error submitting request:', error);
      //   }
      // );
    } else {
      console.error('Failed to get person details.');
    }
  }
  
  
  
  

  get formattedDate(): string {
    const dateValue = this.dateControl.value;
    const formattedDateString =
      this.datePipe.transform(dateValue, 'yyyy-MM-ddTHH:mm') || '';
    return formattedDateString;
  }

  fetchDatas(e: any, form: any, index: number) {
    this.searchSubject.next([e.target.value, form, index]);
  }

  fetchDetails(data: any) {
    const caseId = data.str;
    this.apiService.getCaseData(caseId).subscribe(
      (datas) => {
        if (Array.isArray(datas) && datas.length > 0) {
          const firstCase = datas[0];
          data.form.patchValue({
            caseName: firstCase.caseName,
            courtId: firstCase.courtId,
            courtLocation: firstCase.courtLocation,
            personName: firstCase.personName,
            languages: firstCase.languages,
          });
        } else {
          console.error('Empty or invalid response data');
        }
      },
      (error) => {
        console.error('Error fetching case details:', error);
      }
    );
  }

  // fetchCaseDetails() {
  //   const caseId = this.requestForm.value.caseId;
  //   this.apiService.getCaseData(caseId).subscribe(
  //     (data) => {
  //       if (Array.isArray(data) && data.length > 0) {
  //         const firstCase = data[0];
  //         this.requestForm.patchValue({
  //           caseName: firstCase.caseName,
  //           courtId: firstCase.courtId,
  //           courtLocation: firstCase.courtLocation,
  //           personName: firstCase.personName,
  //           languages: firstCase.languages,
  //         });
  //       } else {
  //         console.error('Empty or invalid response data');
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching case details:', error);
  //     }
  //   );
  // }

  get newRequests(): FormGroup {
    // return this.requestForm.get('newRequests') as FormArray;
    return new FormGroup({
      courtId: new FormControl(''),
      courtLocation: new FormControl(''),
      caseId: new FormControl(''),
      caseName: new FormControl(''),
      personName: new FormControl(''),
      languages: new FormControl(''),
      CaseDate: new FormControl(''),
    });
  }

  newFormArray() {
    var newRequestsFormArray = this.requestForm.controls[
      'newForm'
    ] as FormArray;
    return newRequestsFormArray.controls;
  }

  addForm() {
    const newRequestsFormArray = this.requestForm.get('newForm') as FormArray;
    const newRequestFormGroup = this.newRequests;
    newRequestsFormArray.push(newRequestFormGroup);
  }

  remove(index: number) {
    const newRequestsFormArray = this.requestForm.get('newForm') as FormArray;
    if (
      newRequestsFormArray &&
      index >= 0 &&
      index < newRequestsFormArray.length
    ) {
      newRequestsFormArray.removeAt(index);
    }
  }
}
