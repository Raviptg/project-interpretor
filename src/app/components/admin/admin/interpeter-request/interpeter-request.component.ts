import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-interpeter-request',
  templateUrl: './interpeter-request.component.html',
  styleUrls: ['./interpeter-request.component.scss']
})
export class InterpeterRequestComponent {


  requestForm :FormGroup;
  dataSource :any[]= [];

  constructor(private fb: FormBuilder,
              private datePipe: DatePipe,
              private apiService: ApiService,
              public auth: AuthService){
                this.requestForm = this.fb.group({
                  // caseId: this.fb.array([this.fb.control(null)]),
                  // caseName: this.fb.array([this.fb.control(null)]),
                  // courtId: this.fb.array([this.fb.control(null)]),
                  // courtLocation :this.fb.array([this.fb.control(null)]) ,
                  // personName : this.fb.array([this.fb.control(null)]),
                  // languages : this.fb.array([this.fb.control(null)]),
                  // CaseDate :this.fb.array([this.fb.control(null)])
                  newRequest : this.fb.array([]),
                })
              }

    dateControl = new FormControl(new Date());
    
  ngOnInit(): void {
    this.requestForm = this.fb.group({
      courtId: ['',[Validators.required]],
      courtLocation: ['',[Validators.required]],
      caseId: ['',[Validators.required]],
      caseName: ['',[Validators.required]],
      personName: ['', [Validators.required]],
      languages: ['', [Validators.required]],
      CaseDate: ['',[Validators.required,]],
    });

  }

  onSubmit() {
    const personDetails = this.auth.getPersonDetails();
    if (personDetails) {
      const PersonId = personDetails.personId;
      const requestData = { ...this.requestForm.value, PersonId }; // Merge personId with form data
      this.apiService.request(requestData).subscribe(
        (response) => {
          console.log('Request submitted successfully:', response);
          // Optionally, you can reset the form after successful submission
          this.requestForm.reset();
        },
        (error) => {
          console.error('Error submitting request:', error);
        }
      );
    } else {
      console.error('Failed to get person details.');
    }
  }

  get formattedDate(): string {
    const dateValue = this.dateControl.value;
    const formattedDateString = this.datePipe.transform(dateValue, 'yyyy-MM-ddTHH:mm') || '';
    return formattedDateString;
  }

 									
  fetchCaseDetails() {
    const caseId = this.requestForm.value.caseId;
    this.apiService.getCaseData(caseId).subscribe(
      (data) => {
        if (Array.isArray(data) && data.length > 0) {
          const firstCase = data[0]; // Assuming the first object contains the case details
          // Update form controls with fetched case details
          this.requestForm.patchValue({
            caseName: firstCase.caseName,
            courtId: firstCase.courtId,
            courtLocation: firstCase.courtLocation,
            personName: firstCase.personName,
            languages: firstCase.languages
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

  newRequest() {
    return this.requestForm.get("newRequest") as FormArray
  };
  newRequestForm() : FormGroup{
    return this.fb.group({
      caseId: '',
      caseName: '',
      courtId: '',
      courtLocation :'' ,
      personName : '',
      languages : '',
      CaseDate :''
      
    })
  }

  addForm() {
    this.newRequest().push(this.newRequestForm());
  }

}
