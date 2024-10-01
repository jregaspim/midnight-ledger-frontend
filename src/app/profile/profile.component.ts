import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    password: ''
  };

  updateProfile() {
    console.log('Profile updated:', this.user);
  }

  changePassword() {
    console.log('Password changed:', this.user.password);
  }

}
