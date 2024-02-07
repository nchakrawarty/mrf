import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LoginComponent {
  // @ts-ignore
  loginForm: FormGroup;
  username = '';
  password = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.createForm();
  }
  createForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(result => {
        // console.log(this.username, this.password)
        if (result) {
          this.authService.setIsLoggedIn(true);
          window.location.reload()
          // Navigate to the home page or perform any other action on successful login
        } else {
          // Handle login failure
          alert(Error)
        }
      });
    }
  }

  // login(): void {
  //   this.authService.login(this.username, this.password).subscribe(result => {
  //     if (result) {
  //       this.authService.setIsLoggedIn(true);
  //       // Navigate to the home page or perform any other action on successful login
  //     } else {
  //       // Handle login failure
  //     }
  //   });
  // }
}
