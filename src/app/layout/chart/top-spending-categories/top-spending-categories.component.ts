import { Component, OnInit } from '@angular/core';
import { generateColors, topSpendingCategories } from '../../../model/dashboard.model';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { TransactionService } from '../../../service/transaction.service';

Chart.register(...registerables)

@Component({
  selector: 'app-top-spending-categories',
  standalone: true,
  imports: [],
  templateUrl: './top-spending-categories.component.html',
  styleUrl: './top-spending-categories.component.scss'
})
export class TopSpendingCategoriesComponent implements OnInit {

  userSettings = JSON.parse(localStorage.getItem('settings') || '{}');
  spendingData: any = {};
  totalAmount: number = 0;

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
            text: `Amount (${this.userSettings.currency})`
          }
        },
        x: {
          title: {
            display: true,
            text: 'Categories'
          }
        }
      }
    },
  };

  chart: Chart<'bar'> | undefined;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.loadBudgetData();
    this.chart = new Chart('TopSpendingCategoriesChart', this.config);
  }

  loadBudgetData(): void {
    this.transactionService.getTopTransaction("EXPENSES").subscribe(
      (response) => {
        this.spendingData = response;
        const labels = Object.keys(response);
        const data: number[] = Object.values(response);

        topSpendingCategories.labels = labels;
        topSpendingCategories.datasets[0].data = data;
        topSpendingCategories.datasets[0].backgroundColor = generateColors(topSpendingCategories.datasets[0].data.length);

        this.chart?.update();
      },
      (error) => {
        console.error('Error fetching budget data', error);
      }
    );
  }

}
