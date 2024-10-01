import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';

interface Transaction {
  amount: number;
  date: Date;
  category: string;
  type: 'income' | 'expense';
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
    DatePipe
  ]
})
export class ReportsComponent {
  transactions: Transaction[] = [
    // Sample data (replace this with actual data)
    { amount: 1000, date: new Date('2024-09-01'), category: 'Salary', type: 'income' },
    { amount: 200, date: new Date('2024-09-05'), category: 'Food', type: 'expense' },
    { amount: 150, date: new Date('2024-09-10'), category: 'Transport', type: 'expense' },
    { amount: 500, date: new Date('2024-09-15'), category: 'Investment', type: 'income' },
    { amount: 300, date: new Date('2024-09-20'), category: 'Entertainment', type: 'expense' },
  ];

  getTotalIncome(): number {
    return this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getTotalExpenses(): number {
    return this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getNetSavings(): number {
    return this.getTotalIncome() - this.getTotalExpenses();
  }
}
