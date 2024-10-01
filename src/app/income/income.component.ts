import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';

interface IncomeTransaction {
  amount: number;
  date: Date;
  category: string;
  description: string;
}

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
    DatePipe
  ]
})
export class IncomeComponent {
  displayedColumns: string[] = ['amount', 'date', 'category', 'description', 'actions'];
  incomeTransactions: IncomeTransaction[] = [];
  newTransaction: IncomeTransaction = { amount: 0, date: new Date(), category: '', description: '' };

  // New property to hold total income
  totalIncome: number = 0;

  addTransaction() {
    if (this.newTransaction.amount > 0 && this.newTransaction.category) {
      this.incomeTransactions.push({ ...this.newTransaction });
      this.updateTotalIncome(); // Update total income after adding
      this.newTransaction = { amount: 0, date: new Date(), category: '', description: '' }; // Reset form
    }
  }

  deleteTransaction(index: number) {
    this.incomeTransactions.splice(index, 1);
    this.updateTotalIncome(); // Update total income after deleting
  }

  // Method to calculate total income
  updateTotalIncome() {
    this.totalIncome = this.incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  }
}
