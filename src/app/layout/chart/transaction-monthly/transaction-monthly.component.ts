import { Component, OnInit } from '@angular/core';
import { incomeVsExpensesData } from '../../../model/dashboard.model';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { TransactionService } from '../../../service/transaction.service';

Chart.register(...registerables);

@Component({
  selector: 'app-transaction-monthly',
  standalone: true,
  templateUrl: './transaction-monthly.component.html',
  styleUrls: ['./transaction-monthly.component.scss']
})
export class TransactionMonthlyComponent implements OnInit {
  userSettings = JSON.parse(localStorage.getItem('settings') || '{}');

  public config: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: incomeVsExpensesData,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: `Amount (${this.userSettings.currency})`
          }
        },
        x: {
          title: {
            display: true,
            text: 'Months'
          }
        }
      }
    }
  };

  chart!: Chart<'bar'>;  // Use definite assignment assertion
  monthlyIncome: number[] = [];
  monthlyExpenses: number[] = [];
  monthlySavings: number[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.fetchYearlyMonthlyData();
    this.initializeChart();
  }

  private initializeChart(): void {
    this.chart = new Chart('IncomeVsExpensesChart', this.config);
  }

  private fetchYearlyMonthlyData(): void {
    this.transactionService.getYearlyData('2024').subscribe(
      (response) => {
        this.updateChartData(response);
        this.chart.update();
      },
      (error) => {
        console.error('Error fetching monthly data:', error);
      }
    );
  }

  private updateChartData(response: any): void {
    this.monthlyIncome = response.income || [];
    this.monthlyExpenses = response.expenses || [];
    this.monthlySavings = response.savings || [];

    incomeVsExpensesData.datasets[0].data = this.monthlyIncome;
    incomeVsExpensesData.datasets[1].data = this.monthlyExpenses;
    incomeVsExpensesData.datasets[2].data = this.monthlySavings;
  }
}
