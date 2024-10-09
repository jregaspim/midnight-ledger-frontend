import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { radarChartData } from '../../../model/dashboard.model';
import { BudgetService } from '../../../service/budget.service';
import { BudgetResponse } from '../../../model/budget.model';

@Component({
  selector: 'app-budget-vs-spending',
  standalone: true,
  imports: [],
  templateUrl: './budget-vs-spending.component.html',
  styleUrls: ['./budget-vs-spending.component.scss'] // Corrected styleUrl to styleUrls
})
export class BudgetVsSpendingComponent implements OnInit {
  budgets: BudgetResponse[] = [];
  highestBudgetAmount: number = 0;
  private chart?: Chart<'radar'>; // Use optional chaining for chart declaration

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

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.initializeChart();
    this.fetchBudgets();
  }

  private initializeChart(): void {
    this.chart = new Chart('BudgetVsSpendingChart', this.config);
  }

  private fetchBudgets(): void {
    this.budgetService.getAllBudget().subscribe({
      next: this.handleBudgetResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  private handleBudgetResponse(response: BudgetResponse[]): void {
    this.budgets = response;

    const amountsUsed = this.budgets.map(budget => budget.amountUsed ?? 0);
    const amounts = this.budgets.map(budget => budget.amount ?? 0);

    this.highestBudgetAmount = Math.max(...this.budgets.map(budget => budget.amount ?? 0));

    radarChartData.labels = this.budgets.map(budget => budget.category);
    radarChartData.datasets[0].data = amountsUsed;
    radarChartData.datasets[1].data = amounts;

    this.chart?.update(); // Use optional chaining to avoid null reference
  }

  private handleError(error: any): void {
    console.error('Error fetching budgets:', error);
  }
}
