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
import { FinancialGoalRequest, FinancialGoalReponse } from '../model/financial-goal.model';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../service/transaction.service';
import { TransactionReponse } from '../model/transaction.model';
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
  savingsTransactions: TransactionReponse[] = [];
  goals: FinancialGoalReponse[] = [];
  newGoal: FinancialGoalRequest = { goalName: '', targetAmount: 0, currentAmount: 0, deadline: new Date() };
  isEditing: boolean[] = [];
  transactionType: string = 'Savings'


  constructor(private financialGoalService: FinancialGoalService, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getFinancialGoal();
    this.getTransactions();
    this.isEditing = this.goals.map(() => false);
  }

  getFinancialGoal() {
    this.financialGoalService.getAllFinancialGoal().subscribe(
      response => {
        this.goals = response;
      },
      error => console.error('Error fetching transactions:', error)
    );
  }

  getTransactions() {
    this.transactionService.getAllTransactionByType('SAVINGS').subscribe(
      response => {
        this.savingsTransactions = response;
      },
      error => console.error('Error fetching transactions:', error)
    );
  }

  addGoal() {
    this.financialGoalService.saveFinancialGoal(this.newGoal).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.error('Error saving transaction:', error);
      }
    );
  }

  deleteGoal(index: number) {
    this.goals.splice(index, 1);
  }

  updateCurrentAmount(index: number, amount: number) {
    if (amount >= 0) {
      this.goals[index].currentAmount = amount;
    }
  }

  // Trigger when editing begins
  startEdit(index: number) {
    this.isEditing[index] = true;
  }

  // Save the changes and exit editing mode
  saveEdit(index: number) {
    this.isEditing[index] = false;

    const goal = this.goals[index];

    this.financialGoalService.updateCurrentAmount(goal.id, goal.currentAmount)
      .subscribe(
        (response) => {
          this.isEditing[index] = false;
        },
        (error) => {
          console.error('Error updating goal:', error);
        }
      );
  }

  // Cancel the changes and exit editing mode
  cancelEdit(index: number) {
    this.isEditing[index] = false;
    // Optionally, you can reset the input field value here
  }

  calculateProgress(goal: FinancialGoalReponse): string {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    return `${progress.toFixed(2)}%`;
  }
}
