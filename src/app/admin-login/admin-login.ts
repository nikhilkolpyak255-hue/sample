import { Component,inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss',
})
export class AdminLogin {
  
  

  username: string = '';
  password: string = '';
  loginError: boolean = false;

  // Hardcoded credentials
  correctUsername = 'admin';
  correctPassword = '123456';
  private router = inject(Router);
  login(form: any) {

    if (form.valid) {

      if (
        this.username === this.correctUsername &&
        this.password === this.correctPassword
      ) {
        this.loginError = false;
        sessionStorage.setItem('id', '123')
        this.router.navigate(["/admin/"])

        // You can redirect here if needed
      } else {
        this.loginError = true;
      }

    }
  }


}
