import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { IncomeComponent } from './income/income.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { BudgetComponent } from './budget/budget.component';
import { GoalsComponent } from './goals/goals.component';
import { ReportsComponent } from './reports/reports.component';
import { RecurringTransactionComponent } from './recurring-transaction/recurring-transaction.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'income', component: IncomeComponent },
    { path: 'expenses', component: ExpensesComponent },
    { path: 'budget', component: BudgetComponent },
    { path: 'goals', component: GoalsComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'recurring', component: RecurringTransactionComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
