import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule
  ]
})
export class SettingsComponent {
  userSettings = {
    username: '',
    email: '',
    notificationPreferences: true,
    theme: 'light', // Options could be 'light', 'dark', etc.
  };

  saveSettings() {
    // Logic to save the settings, such as updating the user profile
    console.log('Settings saved', this.userSettings);
  }

  resetSettings() {
    // Logic to reset to default settings
    this.userSettings = {
      username: '',
      email: '',
      notificationPreferences: true,
      theme: 'light',
    };
  }
}
