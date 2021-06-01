import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
    confirmPassword: ''
  };
  constructor(private toast: MatSnackBar, private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.authService.register(this.credentials)
      .then(user => {
        this.toast.open('Account created, please log in!', '', { panelClass: 'toast-success' }),
        this.route.navigate(['/login'])
      })
      .catch(error => this.toast.open(error.message, '', { panelClass: 'toast-error' }));
  }

  login() {
    this.route.navigate(['/login']);
  }
}
