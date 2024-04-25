import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registrationForm :FormGroup;
  Language  = ['English', 'Telugu', 'Tamil', 'Hindi', 'Kanada','Malayalem'];
  Languages : string[]=[]
  error: string = '';

  selectedOption : string [];
  constructor(private fb: FormBuilder,
              private apiService: ApiService,
            private router:Router) { }

    ngOnInit(): void {
      this.registrationForm = this.fb.group({
        FirstName: ['',[Validators.required]],
        MiddleName: ['',[Validators.required]],
        LastName: ['',[Validators.required]],
        Username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['',[Validators.required,]],
        Country:['', [Validators.required]],
        Region:['', Validators.required],
        State:['', [Validators.required]],
        City: ['',[Validators.required]],
        Zip: ['',[Validators.required]],
        Company_Id: [''],
        Phone: ['',[Validators.required]],
        NativeLanguage: ['', [Validators.required]],
        Languages : ['', [Validators.required]]
      },{ 
        validators: this.password.bind(this)
      });
    }

    showPassword: boolean = false;
    showconfirmPassword : boolean = false;
    public PasswordVisibility(): void {
      this.showPassword = !this.showPassword;
    }

    public confirmPasswordVisibility(): void {
      this.showconfirmPassword  = !this.showconfirmPassword ;
    }
    
  onSubmit(){
   if(this.registrationForm.valid){
    const details = this.registrationForm.value;
    details.Languages = details.Languages.toLocaleString();
    console.log(details);
      this.apiService.registration(details).subscribe(
        (response) => {
          if (response || response.Success){
            alert ('Registration is Completed')
            this.router.navigate(["login"]);
          }else{
            alert("Registration is Failed")
          }
        },
        (error) => {
          console.error("Error occurred:", error);
          this.error = 'An error occurred during login. Please try again later.';
        }
      )      
   }
    this.reset();
  }

  goToLogin(){
    this.router.navigate(["signupLogin"])
  }

  reset(){
    this.registrationForm.reset();
  }

  password(formGroup: FormGroup): ValidationErrors | null {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
  
    if (!passwordControl || !confirmPasswordControl) {
      return null; 
    }
    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
}
