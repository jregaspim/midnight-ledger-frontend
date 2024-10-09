import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TransactionService } from '../service/transaction.service';
import { TransactionResponse } from '../model/transaction.model';
import { CommonModule } from '@angular/common';

interface UserSettings {
  currency: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    CurrencyPipe,
    DatePipe,
    CommonModule
  ]
})
export class ReportsComponent implements OnInit {
  userSettings: UserSettings = JSON.parse(localStorage.getItem('settings') || '{}');
  transactions: TransactionResponse[] = [];
  totalIncome: number = 0;
  totalExpenses: number = 0;
  netSavings: number = 0;
  errorMessage: string | null = null;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    this.transactionService.getAllTransaction().subscribe(
      response => {
        this.transactions = response;
        this.calculateTotals(); // Calculate totals after fetching transactions
        this.errorMessage = null; // Reset error message
      },
      error => {
        console.error('Error fetching transactions:', error);
        this.errorMessage = 'Failed to fetch transactions. Please try again later.'; // Show error message
      }
    );
  }

  calculateTotals() {
    this.totalIncome = this.transactions
      .filter(t => t.transactionType === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0);

    this.totalExpenses = this.transactions
      .filter(t => t.transactionType === 'EXPENSES')
      .reduce((sum, t) => sum + t.amount, 0);

    this.netSavings = this.totalIncome - this.totalExpenses;
  }
}
