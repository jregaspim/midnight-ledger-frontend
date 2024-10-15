import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../service/authentication.service';
import { User, Role } from '../../model/user.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  currentUser: User = {
    id: 0,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: Role.ADMIN
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService, private router: Router) {
    localStorage.removeItem('token');
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.authService.authenticate(this.loginForm.value).subscribe(response => {
      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('token', response.token);
      this.getCurrentUser();
      this.router.navigate(['/dashboard']);
    }, error => {
      console.error('Login error:', error);
    });
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      response => {
        this.currentUser = response;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
      },
      error => console.error('Error fetching current user:', error)
    );
  }
}
