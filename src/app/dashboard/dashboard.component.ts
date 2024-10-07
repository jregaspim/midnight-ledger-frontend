import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { SidenavComponent } from '../layout/sidenav/sidenav.component';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MonthlyExpensesSummaryComponent } from "../layout/chart/monthly-expenses-summary/monthly-expenses-summary.component";
import { IncomeVsExpensesComponent } from "../layout/chart/income-vs-expenses/income-vs-expenses.component";
import { SavingProgressComponent } from "../layout/chart/saving-progress/saving-progress.component";
import { TopSpendingCategoriesComponent } from "../layout/chart/top-spending-categories/top-spending-categories.component";
import { MonthlyIncomeSummaryComponent } from '../layout/chart/monthly-income-summary/monthly-income-summary.component';
import { BudgetVsSpendingComponent } from "../layout/chart/budget-vs-spending/budget-vs-spending.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    NavbarComponent,
    SidenavComponent,
    RouterOutlet,
    MatCardModule, MonthlyExpensesSummaryComponent, MonthlyIncomeSummaryComponent, IncomeVsExpensesComponent, SavingProgressComponent, TopSpendingCategoriesComponent, BudgetVsSpendingComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

}
