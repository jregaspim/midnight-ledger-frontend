import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { generateColors, monthlyChartData } from '../../../model/dashboard.model';
import { TransactionService } from '../../../service/transaction.service';

Chart.register(...registerables);

@Component({
  selector: 'app-monthly-expenses-summary',
  standalone: true,
  imports: [CommonModule, MatButton, MatCardModule],
  templateUrl: './monthly-expenses-summary.component.html',
  styleUrls: ['./monthly-expenses-summary.component.scss'] // Corrected styleUrl to styleUrls
})
export class MonthlyExpensesSummaryComponent implements OnInit {
  transactionMap: Record<string, string> = {}; // Using Record for better type definition
  private chart?: Chart<'pie'>; // Use optional chaining for chart declaration

  public config: ChartConfiguration<'pie'> = {
    type: 'pie',
    data: monthlyChartData,
    options: {
      aspectRatio: 1,
    }
  };

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.chart = new Chart('MonthlyExpensesSummaryChart', this.config);
    this.loadTransactions();
  }

  private loadTransactions(): void {
    const year = 2024;
    const month = 10;

    this.transactionService.getMonthlyTransactionData('EXPENSES', year, month).subscribe({
      next: this.handleTransactionResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  private handleTransactionResponse(response: Record<string, string>): void {
    this.transactionMap = response;

    const labels = Object.keys(response);
    const data = Object.values(response).map(amount => parseFloat(amount));

    monthlyChartData.labels = labels;
    monthlyChartData.datasets[0].data = data;
    monthlyChartData.datasets[0].backgroundColor = generateColors(data.length); // Use data.length for correct sizing

    this.chart?.update(); // Use optional chaining to avoid null reference
  }

  private handleError(error: any): void {
    console.error('Error fetching transactions:', error);
  }
}
