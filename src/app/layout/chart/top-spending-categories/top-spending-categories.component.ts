import { Component, OnInit } from '@angular/core';
import { generateColors, topSpendingCategories } from '../../../model/dashboard.model';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { TransactionService } from '../../../service/transaction.service';

Chart.register(...registerables);

@Component({
  selector: 'app-top-spending-categories',
  standalone: true,
  templateUrl: './top-spending-categories.component.html',
  styleUrls: ['./top-spending-categories.component.scss']
})
export class TopSpendingCategoriesComponent implements OnInit {
  userSettings = JSON.parse(localStorage.getItem('settings') || '{}');
  spendingData: any = {};
  totalAmount = 0;

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
    }
  };

  chart!: Chart<'bar'>;  // Use definite assignment assertion

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.initializeChart();
    this.loadBudgetData();
  }

  private initializeChart(): void {
    this.chart = new Chart('TopSpendingCategoriesChart', this.config);
  }

  private loadBudgetData(): void {
    this.transactionService.getTopTransaction("EXPENSES").subscribe(
      response => this.updateChartData(response),
      error => console.error('Error fetching budget data:', error)
    );
  }

  private updateChartData(response: any): void {
    this.spendingData = response;
    const labels = Object.keys(response);
    const data = Object.values(response);

    topSpendingCategories.labels = labels;
    topSpendingCategories.datasets[0].data = data as number[];
    topSpendingCategories.datasets[0].backgroundColor = generateColors(data.length);

    this.chart.update();
  }
}
