import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { TransactionReponse } from '../../../model/transaction.model';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TransactionService } from '../../../service/transaction.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    CurrencyPipe,
    DatePipe,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule
  ]
})
export class TransactionListComponent implements OnInit, OnChanges {

  @Input() transactions: TransactionReponse[] = [];
  @Input() transactionType: string = '';

  userSettings = JSON.parse(localStorage.getItem('settings') || '{}');

  filteredTransactions: TransactionReponse[] = [];

  displayedColumns: string[] = ['amount', 'date', 'category', 'description', 'actions'];
  totalIncome: number = 0;

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

  constructor(private transactionService: TransactionService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions'] && changes['transactions'].currentValue) {
      this.filterTransactions();
    }
  }

  ngOnInit(): void {
    this.filterTransactions();
    this.updateDisplayedColumns();
  }

  filterTransactions() {
    this.filteredTransactions = this.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.transactionDate);
      const isMonthMatch = this.selectedMonth !== null ? transactionDate.getMonth() + 1 === this.selectedMonth : true;
      const isYearMatch = this.selectedYear !== null ? transactionDate.getFullYear() === this.selectedYear : true;
      return isMonthMatch && isYearMatch;
    });

    this.updateTotalIncome();
  }

  deleteTransaction(index: number): void {
    const transactionToDelete = this.transactions[index];

    if (transactionToDelete) {
      this.transactionService.deleteTransaction(transactionToDelete.id).subscribe({
        next: () => {
          this.transactions.splice(index, 1);
          // this.updateTotalIncome();
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

  updateDisplayedColumns(): void {
    if (this.transactionType === 'Savings') {
      this.displayedColumns = ['amount', 'date', 'category', 'description'];
    } else {
      this.displayedColumns = ['amount', 'date', 'category', 'description', 'actions'];
    }
  }

}
