import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { generateColors, monthlyChartData } from '../../../model/dashboard.model';
import { TransactionService } from '../../../service/transaction.service';

Chart.register(...registerables);

@Component({
  selector: 'app-monthly-income-summary',
  standalone: true,
  imports: [CommonModule, MatButton, MatCardModule],
  templateUrl: './monthly-income-summary.component.html',
  styleUrls: ['./monthly-income-summary.component.scss'] // Corrected styleUrl to styleUrls
})
export class MonthlyIncomeSummaryComponent implements OnInit {
  transactionMap: Record<string, string> = {}; // Use Record for better type definition

  public config: ChartConfiguration<'pie'> = {
    type: 'pie',
    data: monthlyChartData,
    options: {
      aspectRatio: 1,
    }
  };

  private chart?: Chart<'pie'>; // Use optional chaining for chart declaration

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.chart = new Chart('MonthlyIncomeSummaryChart', this.config);
    this.loadTransactions();
  }

  private loadTransactions(): void {
    const year = 2024;
    const month = 10;

    this.transactionService.getMonthlyTransactionData('INCOME', year, month).subscribe({
      next: this.handleTransactionResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  private handleTransactionResponse(response: Record<string, string>): void {
    this.transactionMap = response;

    const data = Object.values(response).map(amount => parseFloat(amount));
    monthlyChartData.labels = Object.keys(response);
    monthlyChartData.datasets[0].data = data;
    monthlyChartData.datasets[0].backgroundColor = generateColors(data.length);

    this.chart?.update(); // Use optional chaining to avoid null reference
  }

  private handleError(error: any): void {
    console.error('Error fetching transactions:', error);
  }
}
