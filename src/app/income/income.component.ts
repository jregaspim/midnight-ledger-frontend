import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TransactionService } from '../service/transaction.service';
import { TransactionListComponent } from '../shared/component/transaction-list/transaction-list.component';
import { TransactionFormComponent } from "../shared/component/transaction-form/transaction-form.component";
import { TransactionReponse } from '../model/transaction.model';
import { income_categories } from '../model/constants';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
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
export class IncomeComponent implements OnInit {

  categories: string[] = income_categories;
  incomeTransactions: TransactionReponse[] = [];
  filteredTransactions: TransactionReponse[] = [];
  totalIncome: number = 0;
  selectedFilter: string = 'all';
  transactionType: string = 'Income'

  monthlyIncome = { current: 0, last: 0 };
  yearlyIncome = { current: 0, last: 0 };

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  updateIncomeComparisons() {
    const now = new Date();
    this.monthlyIncome.current = this.calculateIncomeByDateRange(now, 'month', 0);
    this.monthlyIncome.last = this.calculateIncomeByDateRange(now, 'month', -1);
    this.yearlyIncome.current = this.calculateIncomeByDateRange(now, 'year', 0);
    this.yearlyIncome.last = this.calculateIncomeByDateRange(now, 'year', -1);
  }

  calculateIncomeByDateRange(date: Date, period: 'month' | 'year', offset: number): number {
    return this.incomeTransactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.transactionDate);
        if (period === 'month') {
          return transactionDate.getMonth() === (date.getMonth() + offset) && transactionDate.getFullYear() === date.getFullYear();
        }
        if (period === 'year') {
          return transactionDate.getFullYear() === (date.getFullYear() + offset);
        }
        return false;
      })
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }

  calculateComparison(current: number, last: number): number {
    return last > 0
      ? parseFloat(((current - last) / last * 100).toFixed(2))
      : (current > 0 ? 100 : 0);
  }

  calculateMonthlyComparison(): number {
    return this.calculateComparison(this.monthlyIncome.current, this.monthlyIncome.last);
  }

  calculateYearlyComparison(): number {
    return this.calculateComparison(this.yearlyIncome.current, this.yearlyIncome.last);
  }

  getTransactions() {
    this.transactionService.getAllTransactionByType('INCOME').subscribe(
      response => {
        this.incomeTransactions = response;
        this.updateIncomeComparisons();
        this.filterIncome('all');
      },
      error => console.error('Error fetching transactions:', error)
    );
  }

  filterIncome(period: string) {
    this.selectedFilter = period;
    const now = new Date();
    this.filteredTransactions = this.incomeTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.transactionDate);
      return this.applyFilter(transactionDate, period, now);
    }).sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime());
    this.updateTotalIncome();
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

  updateTotalIncome() {
    this.totalIncome = this.filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  }
}
