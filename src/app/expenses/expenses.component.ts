import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TransactionService } from '../service/transaction.service';
import { TransactionListComponent } from '../shared/component/transaction-list/transaction-list.component';
import { TransactionFormComponent } from "../shared/component/transaction-form/transaction-form.component";
import { TransactionReponse } from '../model/transaction-model';

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

  categories: string[] = [
    "Housing",
    "Transportation",
    "Food",
    "Utilities",
    "Insurance",
    "Healthcare",
    "Entertainment",
    "Clothing",
    "Education",
    "Personal Care",
    "Miscellaneous"
  ];
  expensesTransactions: TransactionReponse[] = [];
  incomeTransactions: TransactionReponse[] = [];
  filteredTransactions: TransactionReponse[] = [];
  totalExpenses: number = 0;
  selectedFilter: string = 'all';
  transactionType: string = 'Expenses'

  dailyIncomeExpenses = { expenses: 0, income: 0 }
  monthlyIncomeExpenses = { expenses: 0, income: 0 };
  yearlyIncomeExpenses = { expenses: 0, income: 0 };

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getTransactions();
    this.getIncomeTransactions();
  }

  getTransactions() {
    this.transactionService.getAllTransaction('EXPENSES').subscribe(
      response => {
        this.expensesTransactions = response;
        this.dailyIncomeExpenses.expenses = this.getTotalTransaction(response, this.isToday);
        this.monthlyIncomeExpenses.expenses = this.getTotalTransaction(response, this.isCurrentMonth);
        this.yearlyIncomeExpenses.expenses = this.getTotalTransaction(response, this.isCurrentYear);
        this.filterExpenses('all');
      },
      error => console.error('Error fetching transactions:', error)
    );
  }

  getIncomeTransactions() {
    this.transactionService.getAllTransaction('INCOME').subscribe(
      response => {
        this.dailyIncomeExpenses.income = this.getTotalTransaction(response, this.isToday);
        this.monthlyIncomeExpenses.income = this.getTotalTransaction(response, this.isCurrentMonth);
        this.yearlyIncomeExpenses.income = this.getTotalTransaction(response, this.isCurrentYear);
      },
      error => console.error('Error fetching transactions:', error)
    );
  }

  private getTotalTransaction(transactions: TransactionReponse[], dateCondition: (date: Date) => boolean): number {
    return transactions.reduce((total, transaction) => {
      const transactionDate = new Date(transaction.transactionDate);
      return dateCondition(transactionDate) ? total + transaction.amount : total;
    }, 0);
  }

  // Condition Functions
  private isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  private isCurrentMonth(date: Date): boolean {
    const today = new Date();
    return date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  private isCurrentYear(date: Date): boolean {
    const today = new Date();
    return date.getFullYear() === today.getFullYear();
  }

  filterExpenses(period: string) {
    console.log(period)
    this.selectedFilter = period;
    const now = new Date();
    this.filteredTransactions = this.expensesTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.transactionDate);
      return this.applyFilter(transactionDate, period, now);
    }).sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime());

    this.updateTotalExpenses();
  }

  applyFilter(transactionDate: Date, period: string, now: Date): boolean {
    switch (period) {
      case 'day':
        return transactionDate.toDateString() === now.toDateString();
      case 'week':
        return this.isDateInCurrentWeek(transactionDate, now);
      case 'month':
        return transactionDate.getMonth() === now.getMonth() && transactionDate.getFullYear() === now.getFullYear();
      case 'year':
        return transactionDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  }

  isDateInCurrentWeek(transactionDate: Date, now: Date): boolean {
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return transactionDate >= weekStart && transactionDate <= weekEnd;
  }

  updateTotalExpenses() {
    this.totalExpenses = this.filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  }
}
