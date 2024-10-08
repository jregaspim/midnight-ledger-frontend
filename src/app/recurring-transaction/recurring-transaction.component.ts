import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RecurringTransactionService } from '../service/recurring-transaction.service';
import { RecurringTransactionRequest, RecurringTransactionResponse } from '../model/recurring-transaction.model';
import { expense_categories, recurrence_type } from '../model/constants';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';


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
    DatePipe,
    MatSelectModule,
    CommonModule
  ]
})
export class RecurringTransactionComponent implements OnInit {
  userSettings = JSON.parse(localStorage.getItem('settings') || '{}');
  categories: string[] = expense_categories;
  frequencies: string[] = recurrence_type;

  constructor(private recurringTransactionService: RecurringTransactionService) { }

  ngOnInit(): void {
    this.getReccuringTransactions();
  }

  recurringTransactions: RecurringTransactionResponse[] = [];
  newRecurringTransaction: RecurringTransactionRequest = { transactionName: '', amount: 0, category: '', recurrenceType: '', description: '' };

  getReccuringTransactions() {
    this.recurringTransactionService.getAllRecurringTransaction().subscribe(
      response => {
        this.recurringTransactions = response;
      },
      error => console.error('Error fetching transactions:', error)
    );
  }

  addRecurringTransaction() {
    this.recurringTransactionService.saveRecurringTransaction(this.newRecurringTransaction).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.error('Error saving transaction:', error);
      }
    );
  }

  deleteRecurringTransaction(index: number): void {
    const transactionToDelete = this.recurringTransactions[index];

    if (transactionToDelete) {
      this.recurringTransactionService.deleteRecurringTransaction(transactionToDelete.id).subscribe({
        next: () => {
          this.recurringTransactions.splice(index, 1);
          window.location.reload();
        },
        error: (error) => {
          console.error('Error deleting transaction:', error);
        }
      });
    }
  }


}
