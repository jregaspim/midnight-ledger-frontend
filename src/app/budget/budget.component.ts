import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

interface Budget {
  category: string;
  amount: number;
  used: number;
}

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
  ]
})
export class BudgetComponent {
  displayedColumns: string[] = ['category', 'amount', 'used', 'actions'];
  budgets: Budget[] = [];
  newBudget: Budget = { category: '', amount: 0, used: 0 };

  addBudget() {
    if (this.newBudget.category && this.newBudget.amount > 0) {
      this.budgets.push({ ...this.newBudget });
      this.newBudget = { category: '', amount: 0, used: 0 }; // Reset form
    }
  }

  deleteBudget(index: number) {
    this.budgets.splice(index, 1);
  }

  updateUsedAmount(index: number, amount: number) {
    if (amount >= 0) {
      this.budgets[index].used = amount;
    }
  }
}
