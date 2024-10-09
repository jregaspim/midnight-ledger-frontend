import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FinancialGoalService } from '../service/financial-goal.service';
import { FinancialGoalRequest, FinancialGoalResponse } from '../model/financial-goal.model';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../service/transaction.service';
import { TransactionResponse } from '../model/transaction.model';
import { TransactionListComponent } from '../shared/component/transaction-list/transaction-list.component';

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
    DatePipe,
    CommonModule,
    TransactionListComponent
  ]
})
export class GoalsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'targetAmount', 'currentAmount', 'deadline', 'progress', 'actions'];
  savingsTransactions: TransactionResponse[] = [];
  goals: FinancialGoalResponse[] = [];
  newGoal: FinancialGoalRequest = { goalName: '', targetAmount: 0, currentAmount: 0, deadline: new Date() };
  isEditing: boolean[] = [];

  constructor(private financialGoalService: FinancialGoalService, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.loadFinancialGoals();
    this.loadTransactions();
  }

  loadFinancialGoals() {
    this.financialGoalService.getAllFinancialGoals().subscribe(
      goals => {
        this.goals = goals;
        this.isEditing = new Array(goals.length).fill(false); // Initialize editing state
      },
      error => console.error('Error fetching financial goals:', error)
    );
  }

  loadTransactions() {
    this.transactionService.getAllTransactionByType('SAVINGS').subscribe(
      transactions => this.savingsTransactions = transactions,
      error => console.error('Error fetching transactions:', error)
    );
  }

  addGoal() {
    this.financialGoalService.saveFinancialGoal(this.newGoal).subscribe(
      (goal: FinancialGoalResponse) => {
        this.goals.push(goal); // Update the goals list without reloading
        this.resetNewGoal(); // Reset form fields
      },
      error => console.error('Error saving goal:', error)
    );
  }

  deleteGoal(index: number) {
    const goalId = this.goals[index].id;
    // this.financialGoalService.deleteFinancialGoal(goalId).subscribe(
    //   () => this.goals.splice(index, 1), // Remove goal from the list
    //   error => console.error('Error deleting goal:', error)
    // );
  }

  startEdit(index: number) {
    this.isEditing[index] = true;
  }

  saveEdit(index: number) {
    const goal = this.goals[index];
    this.financialGoalService.updateCurrentAmount(goal.id, goal.currentAmount).subscribe(
      () => this.isEditing[index] = false,
      error => console.error('Error updating goal:', error)
    );
  }

  cancelEdit(index: number) {
    this.isEditing[index] = false; // Simply exit edit mode
  }

  calculateProgress(goal: FinancialGoalResponse): string {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    return `${isNaN(progress) ? 0 : progress.toFixed(2)}%`; // Handle division by zero
  }

  resetNewGoal() {
    this.newGoal = { goalName: '', targetAmount: 0, currentAmount: 0, deadline: new Date() };
  }
}
