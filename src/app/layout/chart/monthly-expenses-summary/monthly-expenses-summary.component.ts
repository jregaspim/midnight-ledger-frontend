import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { generateColors, monthlyChartData } from '../../../model/dashboard.model';
import { TransactionService } from '../../../service/transaction.service';

Chart.register(...registerables)


@Component({
  selector: 'app-monthly-expenses-summary',
  standalone: true,
  imports: [CommonModule, MatButton, MatCardModule],
  templateUrl: './monthly-expenses-summary.component.html',
  styleUrl: './monthly-expenses-summary.component.scss'
})
export class MonthlyExpensesSummaryComponent implements OnInit {

  transactionMap: { [key: string]: string } = {};

  public config: ChartConfiguration<'pie'> = {
    type: 'pie',
    data: monthlyChartData,
    options: {
      aspectRatio: 1,
    }
  };

  chart: Chart<'pie'> | undefined;

  constructor(private transactionService: TransactionService) {

  }

  ngOnInit(): void {

    this.loadTransactions();
    this.chart = new Chart('MonthlyExpensesSummaryChart', this.config);
  }

  loadTransactions() {
    this.transactionService.getMonthlyTransactionData('EXPENSES', 2024, 10)
      .subscribe(
        (response: { [key: string]: string }) => {
          this.transactionMap = response;

          const labels = Object.keys(response);
          const data = Object.values(response).map(amount => parseFloat(amount));

          monthlyChartData.labels = labels;
          monthlyChartData.datasets[0].data = data
          monthlyChartData.datasets[0].backgroundColor = generateColors(monthlyChartData.datasets[0].data.length);

          this.chart?.update();

        },
        (error) => {
          console.error('Error fetching transactions:', error);
        }
      );
  }

}
