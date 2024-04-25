import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser, SessionStore } from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup-login',
  templateUrl: './signup-login.component.html',
  styleUrls: ['./signup-login.component.scss'],
})
export class SignupLoginComponent {
  error!: string;
  loginForm!: FormGroup;
  isActive!: boolean;

  constructor(private fb: FormBuilder, private auth: AuthService, private router:Router) {}

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}'
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    
  }

  submit() {
    //  console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const user: LoginUser = new LoginUser();
      user.username = this.loginForm.value.username;
      user.password = this.loginForm.value.password;
      this.auth.authLogin(user)
    }
  }

  @Output() submitEM = new EventEmitter();

  showPassword: boolean = false;
  public PasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  register(){
    this.router.navigate(["register"]);
  }
}
