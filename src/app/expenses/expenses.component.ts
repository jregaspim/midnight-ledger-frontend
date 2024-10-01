import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';

interface ExpenseTransaction {
  amount: number;
  date: string; // Use string for input and formatting
  category: string;
  description: string;
}

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
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
export class ExpensesComponent {
  displayedColumns: string[] = ['amount', 'date', 'category', 'description', 'actions'];
  expenseTransactions: ExpenseTransaction[] = [];
  newTransaction: ExpenseTransaction = { amount: 0, date: '', category: '', description: '' };

  totalExpenses: number = 0;

  addTransaction() {
    if (this.newTransaction.amount > 0 && this.newTransaction.category) {
      this.expenseTransactions.push({ ...this.newTransaction });
      this.updateTotalExpenses(); // Update total expenses after adding
      this.newTransaction = { amount: 0, date: '', category: '', description: '' }; // Reset form
    }
  }

  deleteTransaction(index: number) {
    this.expenseTransactions.splice(index, 1);
    this.updateTotalExpenses(); // Update total expenses after deleting
  }

  updateTotalExpenses() {
    this.totalExpenses = this.expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
  }
}
