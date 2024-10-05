import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TransactionService } from '../service/transaction.service';
import { TransactionReponse } from '../model/transaction.model';

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
    DatePipe
  ]
})
export class ReportsComponent implements OnInit {

  transactions: TransactionReponse[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getTransactions();
  }


  getTransactions() {
    this.transactionService.getAllTransaction().subscribe(
      response => {
        console.log(response);
        this.transactions = response;
      },
      error => console.error('Error fetching transactions:', error)
    );
  }

  getTotalIncome(): number {
    return this.transactions
      .filter(t => t.transactionType === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getTotalExpenses(): number {
    return this.transactions
      .filter(t => t.transactionType === 'EXPENSES')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getNetSavings(): number {
    return this.getTotalIncome() - this.getTotalExpenses();
  }
}
