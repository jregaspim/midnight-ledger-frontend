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
import { authGuard } from './auth.guard';
import { guestGuard } from './guest-guard.guard';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'income', component: IncomeComponent, canActivate: [authGuard] },
    { path: 'expenses', component: ExpensesComponent, canActivate: [authGuard] },
    { path: 'budget', component: BudgetComponent, canActivate: [authGuard] },
    { path: 'goals', component: GoalsComponent, canActivate: [authGuard] },
    { path: 'reports', component: ReportsComponent, canActivate: [authGuard] },
    { path: 'recurring', component: RecurringTransactionComponent, canActivate: [authGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
