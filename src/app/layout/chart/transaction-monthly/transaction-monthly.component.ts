import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { incomeVsExpensesData } from '../../../model/dashboard.model';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { TransactionService } from '../../../service/transaction.service';
import { TransactionReponse } from '../../../model/transaction.model';

Chart.register(...registerables)

@Component({
  selector: 'app-transaction-monthly',
  standalone: true,
  imports: [],
  templateUrl: './transaction-monthly.component.html',
  styleUrl: './transaction-monthly.component.scss'
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
    },
  };

  chart: Chart<'bar'> | undefined;

  monthlyIncome = [];
  monthlyExpenses = [];
  monthlySavings = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.fetchYearlyMonthlyData();
    this.chart = new Chart('IncomeVsExpensesChart', this.config);
  }


  fetchYearlyMonthlyData(): void {
    this.transactionService.getYearlyData('2024').subscribe(
      (data) => {
        this.monthlyIncome = data.INCOME;
        this.monthlyExpenses = data.EXPENSES;
        this.monthlySavings = data.SAVINGS;

        incomeVsExpensesData.datasets[0].data = this.monthlyIncome
        incomeVsExpensesData.datasets[1].data = this.monthlyExpenses
        incomeVsExpensesData.datasets[2].data = this.monthlySavings

        this.chart?.update();

      },
      (error) => {
        console.error('Error fetching monthly data:', error);
      }
    );
  }

}
