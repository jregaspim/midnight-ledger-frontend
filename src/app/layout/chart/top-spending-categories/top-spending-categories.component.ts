import { Component, OnInit } from '@angular/core';
import { topSpendingCategories } from '../../../temp-db/db';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables)

@Component({
  selector: 'app-top-spending-categories',
  standalone: true,
  imports: [],
  templateUrl: './top-spending-categories.component.html',
  styleUrl: './top-spending-categories.component.scss'
})
export class TopSpendingCategoriesComponent implements OnInit {


  public config: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: topSpendingCategories,
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
    this.chart = new Chart('TopSpendingCategoriesChart', this.config);
  }

}
