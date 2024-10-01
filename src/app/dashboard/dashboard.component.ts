import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { SidenavComponent } from '../layout/sidenav/sidenav.component';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MonthlySummaryComponent } from "../layout/chart/monthly-summary/monthly-summary.component";
import { IncomeVsExpensesComponent } from "../layout/chart/income-vs-expenses/income-vs-expenses.component";
import { SavingProgressComponent } from "../layout/chart/saving-progress/saving-progress.component";
import { TopSpendingCategoriesComponent } from "../layout/chart/top-spending-categories/top-spending-categories.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    NavbarComponent,
    SidenavComponent,
    RouterOutlet,
    MatCardModule, MonthlySummaryComponent, IncomeVsExpensesComponent, SavingProgressComponent, TopSpendingCategoriesComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

}
