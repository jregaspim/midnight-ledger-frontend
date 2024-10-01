import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { savingsProgressData } from '../../../temp-db/db';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables)


@Component({
  selector: 'app-saving-progress',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './saving-progress.component.html',
  styleUrl: './saving-progress.component.scss'
})
export class SavingProgressComponent implements OnInit {

  public config: ChartConfiguration<'line'> = {
    type: 'line',
    data: savingsProgressData,
  };

  chart: Chart<'line'> | undefined;

  ngOnInit(): void {
    this.chart = new Chart('SavingProgressChart', this.config);
  }

}
