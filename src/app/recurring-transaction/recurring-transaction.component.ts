import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe, DatePipe } from '@angular/common';

interface RecurringTransaction {
  amount: number;
  category: string;
  frequency: string; // e.g., 'Monthly', 'Weekly'
  description: string;
}

@Component({
  selector: 'app-recurring-transaction',
  templateUrl: './recurring-transaction.component.html',
  styleUrls: ['./recurring-transaction.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    CurrencyPipe,
    DatePipe
  ]
})
export class RecurringTransactionComponent {
  recurringTransactions: RecurringTransaction[] = [];
  newTransaction: RecurringTransaction = { amount: 0, category: '', frequency: '', description: '' };

  addTransaction() {
    if (this.newTransaction.amount > 0 && this.newTransaction.category) {
      this.recurringTransactions.push({ ...this.newTransaction });
      this.resetForm();
    }
  }

  deleteTransaction(index: number) {
    this.recurringTransactions.splice(index, 1);
  }

  resetForm() {
    this.newTransaction = { amount: 0, category: '', frequency: '', description: '' };
  }
}
