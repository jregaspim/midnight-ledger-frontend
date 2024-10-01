import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';

interface Goal {
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
}

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    CurrencyPipe,
    DatePipe
  ]
})
export class GoalsComponent {
  displayedColumns: string[] = ['name', 'targetAmount', 'currentAmount', 'deadline', 'progress', 'actions'];
  goals: Goal[] = [];
  newGoal: Goal = { name: '', targetAmount: 0, currentAmount: 0, deadline: new Date() };

  addGoal() {
    if (this.newGoal.name && this.newGoal.targetAmount > 0) {
      this.goals.push({ ...this.newGoal });
      this.newGoal = { name: '', targetAmount: 0, currentAmount: 0, deadline: new Date() }; // Reset form
    }
  }

  deleteGoal(index: number) {
    this.goals.splice(index, 1);
  }

  updateCurrentAmount(index: number, amount: number) {
    if (amount >= 0) {
      this.goals[index].currentAmount = amount;
    }
  }

  calculateProgress(goal: Goal): string {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    return `${progress.toFixed(2)}%`;
  }
}
