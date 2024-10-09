import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { colors, ChartData, noDataPlugin } from '../../../model/dashboard.model';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { SavingProgressResponse } from '../../../model/financial-goal.model';
import { FinancialGoalService } from '../../../service/financial-goal.service';

Chart.register(...registerables)


@Component({
  selector: 'app-saving-progress',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './saving-progress.component.html',
  styleUrl: './saving-progress.component.scss'
})
export class SavingProgressComponent implements OnInit {

  savingProgress: SavingProgressResponse | null = null;
  errorMessage: string | null = null;

  savingsProgressData: ChartData = {
    labels: [],
    datasets: []
  };

  public config: ChartConfiguration<'line'> = {
    type: 'line',
    data: this.savingsProgressData,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
        }
      }
    },
    plugins: [noDataPlugin]
  };

  chart: Chart<'line'> | undefined;

  constructor(private financialGoalService: FinancialGoalService) { }

  ngOnInit(): void {
    this.loadSavingProgress();
    this.chart = new Chart('SavingProgressChart', this.config);
  }

  loadSavingProgress(): void {
    this.financialGoalService.getAllFinancialGoalSavingProgressTotalPerMonth().subscribe(
      (response: SavingProgressResponse) => {
        this.savingProgress = response;

        this.mapFinancialGoalsToSavingsProgress(this.savingProgress);

        this.chart?.update();

      },
      (error) => {
        this.errorMessage = 'Error fetching savings progress';
        console.error('Error:', error);
      }
    );
  }

  mapFinancialGoalsToSavingsProgress(savingProgress: SavingProgressResponse): ChartData {

    let counter = 0;
    Object.entries(savingProgress).forEach(([goalName, progress]) => {
      // Populate the labels if they are not already added
      Object.keys(progress).forEach(monthYear => {
        if (!this.savingsProgressData.labels.includes(monthYear)) {
          this.savingsProgressData.labels.push(monthYear);
        }
      });

      this.savingsProgressData.labels.sort((a, b) => {
        const [monthA, yearA] = a.split(' ');
        const [monthB, yearB] = b.split(' ');

        const monthIndexA = new Date(Date.parse(monthA + " 1, " + yearA)).getMonth();
        const monthIndexB = new Date(Date.parse(monthB + " 1, " + yearB)).getMonth();

        if (yearA === yearB) {
          return monthIndexA - monthIndexB; // Sort by month if years are the same
        }
        return parseInt(yearA) - parseInt(yearB); // Sort by year otherwise
      });

      // Prepare dataset for the current goal
      const dataset = {
        label: goalName,
        data: this.savingsProgressData.labels.map(monthYear => progress[monthYear] || 0), // Fill with 0 if no data
        borderColor: colors[counter], // Line color for current savings
        backgroundColor: colors[counter], // Fill color
        fill: false, // Fill the area under the line
        tension: 0.1, // Smoothness of the line
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 10
      };

      counter++;
      this.savingsProgressData.datasets.push(dataset);
    });

    return this.savingsProgressData;
  }


}
