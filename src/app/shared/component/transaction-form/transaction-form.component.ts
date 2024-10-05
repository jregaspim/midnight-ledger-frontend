import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { TransactionRequest } from '../../../model/transaction.model';
import { TransactionService } from '../../../service/transaction.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    CurrencyPipe,
    DatePipe,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss'
})
export class TransactionFormComponent implements OnInit {

  @Input() transactionType: string = '';
  @Input() categories: string[] = [];

  isFormVisible: boolean = true;

  newTransaction: TransactionRequest = {
    amount: 0,
    transactionDate: '',
    category: '',
    description: '',
    transactionType: ''
  };

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.newTransaction.transactionDate = new Date().toISOString().split('T')[0];
    this.newTransaction.transactionType = this.transactionType.toUpperCase();
  }

  addTransaction() {
    console.log(this.newTransaction);
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

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

}
