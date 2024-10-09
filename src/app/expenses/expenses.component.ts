import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TransactionService } from '../service/transaction.service';
import { TransactionListComponent } from '../shared/component/transaction-list/transaction-list.component';
import { TransactionFormComponent } from "../shared/component/transaction-form/transaction-form.component";
import { TransactionResponse } from '../model/transaction.model';
import { expense_categories } from '../model/constants';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    FormsModule,
    CurrencyPipe,
    DatePipe,
    CommonModule,
    MatIconModule,
    TransactionListComponent,
    TransactionFormComponent
  ]
})
export class ExpensesComponent implements OnInit {
  userSettings = JSON.parse(localStorage.getItem('settings') || '{}');
  categories: string[] = expense_categories;
  expensesTransactions: TransactionResponse[] = [];
  filteredTransactions: TransactionResponse[] = [];
  totalExpenses: number = 0;
  selectedFilter: string = 'all';
  transactionType: string = 'Expenses';

  dailyIncomeExpenses = { expenses: 0, income: 0 };
  monthlyIncomeExpenses = { expenses: 0, income: 0 };
  yearlyIncomeExpenses = { expenses: 0, income: 0 };

  private now: Date = new Date(); // Cache current date

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  private loadTransactions() {
    this.getTransactions();
    this.getIncomeTransactions();
  }

  private getTransactions() {
    this.transactionService.getAllTransactionByType('EXPENSES').subscribe(
      response => {
        this.expensesTransactions = response;
        this.updateIncomeExpenseTotals(response, 'expenses');
        this.filterExpenses('all');
      },
      error => this.handleError('Error fetching expense transactions', error)
    );
  }

  private getIncomeTransactions() {
    this.transactionService.getAllTransactionByType('INCOME').subscribe(
      response => this.updateIncomeExpenseTotals(response, 'income'),
      error => this.handleError('Error fetching income transactions', error)
    );
  }

  private updateIncomeExpenseTotals(transactions: TransactionResponse[], type: string) {
    const total = this.getTotalTransaction(transactions);
    if (type === 'expenses') {
      this.dailyIncomeExpenses.expenses = total.daily;
      this.monthlyIncomeExpenses.expenses = total.monthly;
      this.yearlyIncomeExpenses.expenses = total.yearly;
    } else {
      this.dailyIncomeExpenses.income = total.daily;
      this.monthlyIncomeExpenses.income = total.monthly;
      this.yearlyIncomeExpenses.income = total.yearly;
    }
  }

  private getTotalTransaction(transactions: TransactionResponse[]): any {
    const totals = { daily: 0, monthly: 0, yearly: 0 };
    transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.transactionDate);
      if (this.isToday(transactionDate)) totals.daily += transaction.amount;
      if (this.isCurrentMonth(transactionDate)) totals.monthly += transaction.amount;
      if (this.isCurrentYear(transactionDate)) totals.yearly += transaction.amount;
    });
    return totals;
  }

  private isToday(date: Date): boolean {
    return date.toDateString() === this.now.toDateString();
  }

  private isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.now.getMonth() && date.getFullYear() === this.now.getFullYear();
  }

  private isCurrentYear(date: Date): boolean {
    return date.getFullYear() === this.now.getFullYear();
  }

  filterExpenses(period: string) {
    this.selectedFilter = period;
    this.filteredTransactions = this.expensesTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.transactionDate);
      return this.applyFilter(transactionDate, period);
    }).sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime());

    this.updateTotalExpenses();
  }

  applyFilter(transactionDate: Date, period: string): boolean {
    switch (period) {
      case 'day': return this.isToday(transactionDate);
      case 'week': return this.isDateInCurrentWeek(transactionDate);
      case 'month': return this.isCurrentMonth(transactionDate);
      case 'year': return this.isCurrentYear(transactionDate);
      default: return true;
    }
  }

  private isDateInCurrentWeek(transactionDate: Date): boolean {
    const weekStart = new Date(this.now);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return transactionDate >= weekStart && transactionDate <= weekEnd;
  }

  private updateTotalExpenses() {
    this.totalExpenses = this.filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  }

  private handleError(message: string, error: any) {
    console.error(message, error);
    // Optionally display user-friendly error messages in the UI
  }
}
