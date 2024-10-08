import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Role, User, UserSettings } from '../model/user.model';
import { UserService } from '../service/user.service';
import { SettingsService } from '../service/settings.service';

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
export class SettingsComponent implements OnInit {

  userSettings: UserSettings = {
    currency: '₱',
    notificationPreferences: true,
  };

  user: User = {
    id: 0,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: Role.USER
  }

  constructor(private renderer: Renderer2, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings() {
    this.settingsService.getAppSettings().subscribe(
      response => {
        console.log(response)
        this.userSettings = response;
        localStorage.setItem('settings', JSON.stringify(this.userSettings));
      },
      error => console.error('Error fetching app settings:', error)
    );
  }

  saveSettings() {
    console.log(this.userSettings)
    this.settingsService.saveAppSettings(this.userSettings).subscribe(
      (response) => {
        localStorage.setItem('settings', JSON.stringify(this.userSettings));
        window.location.reload();
      },
      (error) => {
        console.error('Error saving transaction:', error);
      }
    );
  }

  // applyTheme(theme: string) {
  //   if (theme === 'dark') {
  //     this.renderer.addClass(document.body, 'dark-theme');
  //   } else {
  //     this.renderer.removeClass(document.body, 'dark-theme');
  //   }
  // }
}
