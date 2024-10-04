import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { BudgetReponse, BudgetRequest } from '../model/budget.model';
import { BudgetService } from '../service/budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CurrencyPipe,
    MatSelectModule,
    CommonModule
  ]
})
export class BudgetComponent implements OnInit {

  categories: string[] = [
    "Housing",
    "Transportation",
    "Food",
    "Utilities",
    "Insurance",
    "Healthcare",
    "Entertainment",
    "Clothing",
    "Education",
    "Personal Care",
    "Miscellaneous"
  ];

  displayedColumns: string[] = ['category', 'amount', 'used', 'actions'];
  budgets: BudgetReponse[] = [];
  newBudget: BudgetRequest = { category: '', amount: 0 };


  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.getTBudgets();
  }



  getTBudgets() {
    this.budgetService.getAllBudget().subscribe(
      response => {
        this.budgets = response;
      },
      error => console.error('Error fetching transactions:', error)
    );
  }

  addBudget() {
    if (this.newBudget.category && this.newBudget.amount > 0) {
    }
  }

  deleteBudget(index: number) {
    this.budgets.splice(index, 1);
  }

  updateUsedAmount(index: number, amount: number) {
    if (amount >= 0) {
      this.budgets[index].amountUsed = amount;
    }
  }
}
