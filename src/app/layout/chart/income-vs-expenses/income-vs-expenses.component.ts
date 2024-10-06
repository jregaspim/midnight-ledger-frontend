import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { incomeVsExpensesData } from '../../../model/db';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { TransactionService } from '../../../service/transaction.service';
import { TransactionReponse } from '../../../model/transaction.model';

Chart.register(...registerables)

@Component({
  selector: 'app-income-vs-expenses',
  standalone: true,
  imports: [],
  templateUrl: './income-vs-expenses.component.html',
  styleUrl: './income-vs-expenses.component.scss'
})
export class IncomeVsExpensesComponent implements OnInit, OnChanges {


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
            text: 'Amount ($)'
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

  constructor(private transactionService: TransactionService) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['monthlyIncome'] && changes['monthlyExpenses']) {
      this.fetchYearlyMonthlyData();
    }
  }

  ngOnInit(): void {
    this.fetchYearlyMonthlyData();
    this.chart = new Chart('IncomeVsExpensesChart', this.config);
  }


  fetchYearlyMonthlyData(): void {
    this.transactionService.getYearlyData('2024').subscribe(
      (data) => {
        this.monthlyIncome = data.INCOME;
        this.monthlyExpenses = data.EXPENSES;

        incomeVsExpensesData.datasets[0].data = this.monthlyIncome
        incomeVsExpensesData.datasets[1].data = this.monthlyExpenses

      },
      (error) => {
        console.error('Error fetching monthly data:', error);
      }
    );
  }

}
