import { Component, OnInit } from '@angular/core';
import { incomeVsExpensesData } from '../../../temp-db/db';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables)

@Component({
  selector: 'app-income-vs-expenses',
  standalone: true,
  imports: [],
  templateUrl: './income-vs-expenses.component.html',
  styleUrl: './income-vs-expenses.component.scss'
})
export class IncomeVsExpensesComponent implements OnInit {

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

  constructor() {

  }

  ngOnInit(): void {
    this.chart = new Chart('IncomeVsExpensesChart', this.config);
  }

}
