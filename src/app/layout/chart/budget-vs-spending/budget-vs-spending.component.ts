import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { radarChartData } from '../../../model/db';
import { BudgetService } from '../../../service/budget.service';
import { BudgetReponse } from '../../../model/budget.model';

@Component({
  selector: 'app-budget-vs-spending',
  standalone: true,
  imports: [],
  templateUrl: './budget-vs-spending.component.html',
  styleUrl: './budget-vs-spending.component.scss'
})
export class BudgetVsSpendingComponent implements OnInit {

  budgets: BudgetReponse[] = [];
  highestBudgetAmount: number = 0;

  public config: ChartConfiguration<'radar'> = {
    type: 'radar',
    data: radarChartData,
    options: {
      responsive: true,
      scales: {
        r: {
          beginAtZero: true,
          suggestedMax: this.highestBudgetAmount,
          ticks: {
            stepSize: 5000
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          enabled: true
        }
      }
    }
  };

  chart: Chart<'radar'> | undefined;

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.getALlBudgets();
    this.chart = new Chart('BudgetVsSpendingChart', this.config);
  }


  getALlBudgets() {
    this.budgetService.getAllBudget().subscribe(
      response => {
        this.budgets = response;

        this.highestBudgetAmount = Math.max(...this.budgets.map(budget => budget.amount));
        radarChartData.labels = this.budgets.map(budget => budget.category);
        radarChartData.datasets[0].data = this.budgets.map(budget => budget.amountUsed);
        radarChartData.datasets[1].data = this.budgets.map(budget => budget.amount);

        console.log(this.budgets)

        this.chart?.update();
      },
      error => console.error('Error fetching transactions:', error)
    );
  }

}
