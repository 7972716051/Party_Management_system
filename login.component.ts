import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NgForm } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
myform: any;
onSubmit(_t12: NgForm) {
throw new Error('Method not implemented.');
}
user = {
  username: '',
  password: ''
};
  loginForm: any;
  errorMsg="";

  constructor(private router: Router, private authService: AuthService) {}

  onLogin(form: NgForm): void {
    if (form.invalid) return;

    this.authService.login(this.user).subscribe({
      next: (response: User) => {
        
        console.log('Login Success', response);
        localStorage.setItem('loggedInUser', response.username); 
          this.authService.setUsername(this.user.username); 
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login Failed', err);
        this.errorMsg = 'Invalid username or password.';
      }
    });
  }
}
