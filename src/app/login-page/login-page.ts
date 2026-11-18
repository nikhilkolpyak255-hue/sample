import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage { username: string = '';
  password: string = '';
  role: string = '';
  loginError: string = ''; // stores error if credentials don't match

  // Hardcoded demo credentials
  private readonly correctUsername = 'farmer';
  private readonly correctPassword = '123456';

  constructor(private router: Router) { }

  login(form: NgForm) {
    this.loginError = ''; // reset previous error

    if (form.valid) {
      // Check credentials
      if (this.username === this.correctUsername && this.password === this.correctPassword) {
        // Navigate to homepage
        this.router.navigate(['/farmer/hompage']);
        form.resetForm();
      } else {
        // Show error inside the form
        this.loginError = "Username or password doesn't match";
      }
    } else {
      // Mark all fields touched to show validation
      form.control.markAllAsTouched();
    }
  }}
