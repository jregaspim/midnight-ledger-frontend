import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { transformedChartData } from '../../../temp-db/db';

Chart.register(...registerables)


@Component({
  selector: 'app-monthly-summary',
  standalone: true,
  imports: [CommonModule, MatButton, MatCardModule],
  templateUrl: './monthly-summary.component.html',
  styleUrl: './monthly-summary.component.scss'
})
export class MonthlySummaryComponent implements OnInit {

  public config: ChartConfiguration<'pie'> = {
    type: 'pie',
    data: transformedChartData,
    options: {
      aspectRatio: 1,
    }
  };


  chart: Chart<'pie'> | undefined;

  constructor() {

  }

  ngOnInit(): void {
    this.chart = new Chart('MonthlyExpensesSummaryChart', this.config);
  }

}
