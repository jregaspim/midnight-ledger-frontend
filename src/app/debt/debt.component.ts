import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Debt } from '../model/debt.model';
import { MatTableModule } from '@angular/material/table';
import { DebtService } from '../service/debt.service';


@Component({
  selector: 'app-debt',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './debt.component.html',
  styleUrl: './debt.component.scss'
})
export class DebtComponent implements OnInit {
  debtForm!: FormGroup;
  debts: Debt[] = [];

  displayedColumns: string[] = ['amount', 'interestRate', 'dueDate', 'category', 'lender', 'repaymentSchedule', 'remainingBalance'];

  constructor(private fb: FormBuilder, private debtService: DebtService) {
    this.debtForm = this.fb.group({
      amount: [''],
      interestRate: [''],
      dueDate: [''],
      category: [''],
      lender: [''],
      repaymentSchedule: ['monthly'],
      remainingBalance: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadDebts();
  }


  loadDebts(): void {
    this.debtService.getDebts().subscribe(debts => {
      this.debts = debts;
    });
  }

  onSubmit(): void {
    console.log(this.debtForm)

    const newDebt: Debt = this.debtForm.value;
    this.debtService.createDebt(newDebt).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.error('Error saving debt:', error);
      }
    );
  }

  deleteDebt(id: number): void {
    this.debtService.deleteDebt(id).subscribe(() => {
      this.debts = this.debts.filter(debt => debt.id !== id); // Remove the deleted debt from the list
    });
  }

}
