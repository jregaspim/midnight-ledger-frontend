import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../service/transaction.service';
import { MatSelectModule } from '@angular/material/select';
import { IncomeTransactionReponse, IncomeTransactionRequest } from '../model/transaction-model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CurrencyPipe,
    DatePipe,
    CommonModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class IncomeComponent implements OnInit {
  displayedColumns: string[] = ['amount', 'date', 'category', 'description', 'actions'];
  incomeTransactions: IncomeTransactionReponse[] = [];
  filteredTransactions: IncomeTransactionReponse[] = [];
  newTransaction: IncomeTransactionRequest = {
    amount: 0,
    transactionDate: '',
    category: '',
    description: '',
    transactionType: 'INCOME'
  };

  totalIncome: number = 0;
  selectedFilter: string = 'all';

  selectedMonth: number | null = null;
  selectedYear: number | null = null;
  months = [
    { value: 1, viewValue: 'January' },
    { value: 2, viewValue: 'February' },
    { value: 3, viewValue: 'March' },
    { value: 4, viewValue: 'April' },
    { value: 5, viewValue: 'May' },
    { value: 6, viewValue: 'June' },
    { value: 7, viewValue: 'July' },
    { value: 8, viewValue: 'August' },
    { value: 9, viewValue: 'September' },
    { value: 10, viewValue: 'October' },
    { value: 11, viewValue: 'November' },
    { value: 12, viewValue: 'December' }
  ];

  // Example years from the current year to a specific past year
  years: number[] = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  monthlyIncome: { current: number; last: number } = { current: 0, last: 0 };
  yearlyIncome: { current: number; last: number } = { current: 0, last: 0 };

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getTransactions();

  }

  updateIncomeComparisons() {
    console.log(this.incomeTransactions);
    this.monthlyIncome.current = this.incomeTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.transactionDate);
      return transactionDate.getMonth() === new Date().getMonth() &&
        transactionDate.getFullYear() === new Date().getFullYear();
    }).reduce((sum, t) => sum + t.amount, 0);

    this.monthlyIncome.last = this.incomeTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.transactionDate);
      return transactionDate.getMonth() === new Date().getMonth() - 1 &&
        transactionDate.getFullYear() === new Date().getFullYear();
    }).reduce((sum, t) => sum + t.amount, 0);

    console.log(this.monthlyIncome);

    this.yearlyIncome.current = this.incomeTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.transactionDate);
      return transactionDate.getFullYear() === new Date().getFullYear();
    }).reduce((sum, t) => sum + t.amount, 0);

    this.yearlyIncome.last = this.incomeTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.transactionDate);
      return transactionDate.getFullYear() === new Date().getFullYear() - 1;
    }).reduce((sum, t) => sum + t.amount, 0);
  }

  calculateMonthlyComparison(): number {
    if (this.monthlyIncome.last > 0) {
      return parseFloat(((this.monthlyIncome.current - this.monthlyIncome.last) / this.monthlyIncome.last * 100).toFixed(2));
    } else if (this.monthlyIncome.current > 0) {
      return 100; // Gain compared to last month
    } else {
      return 0; // No income
    }
  }

  calculateYearlyComparison(): number {
    if (this.yearlyIncome.last > 0) {
      return parseFloat(((this.yearlyIncome.current - this.yearlyIncome.last) / this.yearlyIncome.last * 100).toFixed(2));
    } else if (this.yearlyIncome.current > 0) {
      return 100; // Gain compared to last year
    } else {
      return 0; // No income
    }
  }

  getTransactions() {
    this.transactionService.getAllTransaction('INCOME').subscribe(
      (response) => {
        console.log(response);
        this.incomeTransactions = response;
        this.updateIncomeComparisons();
        this.filterIncome('all');
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }

  filterIncome(period: string) {
    this.selectedFilter = period;  // Set the selected filter
    const now = new Date();

    this.filteredTransactions = this.incomeTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.transactionDate);

      switch (period) {
        case 'day':
          return transactionDate.toDateString() === now.toDateString();
        case 'week':
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - now.getDay()); // Start of the week
          const weekEnd = new Date(now);
          weekEnd.setDate(weekEnd.getDate() + (6 - now.getDay())); // End of the week
          return transactionDate >= weekStart && transactionDate <= weekEnd;
        case 'month':
          return transactionDate.getMonth() === now.getMonth() && transactionDate.getFullYear() === now.getFullYear();
        case 'year':
          return transactionDate.getFullYear() === now.getFullYear();
        default:  // 'all'
          return true;
      }
    }).sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime());  // Sort by date descending

    this.updateTotalIncome();
  }

  filterTransactions() {
    this.filteredTransactions = this.incomeTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.transactionDate);
      const isMonthMatch = this.selectedMonth !== null ? transactionDate.getMonth() + 1 === this.selectedMonth : true;
      const isYearMatch = this.selectedYear !== null ? transactionDate.getFullYear() === this.selectedYear : true;
      return isMonthMatch && isYearMatch;
    });

    this.updateTotalIncome();
  }

  addTransaction() {
    console.log(this.newTransaction)
    this.transactionService.saveTransaction(this.newTransaction).subscribe(
      (response) => {
        console.log('Transaction saved successfully:', response);
        window.location.reload();
      },
      (error) => {
        console.error('Error saving transaction:', error);
      }
    );
  }

  deleteTransaction(index: number): void {
    console.log("id: ", index)
    const transactionToDelete = this.filteredTransactions[index];

    if (transactionToDelete) {
      this.transactionService.deleteTransaction(transactionToDelete.id).subscribe({
        next: () => {
          this.filteredTransactions.splice(index, 1);
          this.updateTotalIncome();
          window.location.reload();
        },
        error: (error) => {
          console.error('Error deleting transaction:', error);
        }
      });
    }
  }

  updateTotalIncome() {
    this.totalIncome = this.filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  }

}
