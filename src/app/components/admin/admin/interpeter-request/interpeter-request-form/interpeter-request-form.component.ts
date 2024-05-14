import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-interpeter-request-form',
  templateUrl: './interpeter-request-form.component.html',
  styleUrls: ['./interpeter-request-form.component.scss']
})
export class InterpeterRequestFormComponent implements OnInit {

  public requestForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  public ngOnInit() {
    this.requestForm = this.fb.group({
      newForm: new FormArray([
        new FormGroup({
          name: new FormControl('Ravi'),
          email: new FormControl('ravi.teja@ptg.com')
        })
      ])
    })
  }

  public newRequestForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('Ravi'),
      email: new FormControl('ravi.teja@ptg.com')
    });
  }

  newFormArray() {
    var newRequestsFormArray = this.requestForm.controls['newForm'] as FormArray;
    return newRequestsFormArray.controls;
  }

addNewRequest() {
    const newRequestsFormArray = this.requestForm.get('newForm') as FormArray;
    const newRequestFormGroup = this.newRequestForm();
    newRequestsFormArray.push(newRequestFormGroup);
}

remove(index: number) {
  const newRequestsFormArray = this.requestForm.get('newForm') as FormArray;
  if (newRequestsFormArray && index >= 0 && index < newRequestsFormArray.length) {
      newRequestsFormArray.removeAt(index);
  }
}

  onSubmit() {
    console.log(this.requestForm.value);
  }

}
