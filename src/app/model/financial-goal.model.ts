export interface FinancialGoalRequest {
    goalName: string;
    targetAmount: number;
    currentAmount: number;
    deadline: Date;
}

export interface FinancialGoalReponse {
    id: number;
    goalName: string;
    targetAmount: number;
    currentAmount: number;
    deadline: Date;
    savingProgresses: SavingProgress[];
}

export interface SavingProgress {
    id: number;              // corresponds to Long id
    dateAdded: string;       // corresponds to LocalDate dateAdded (use ISO string format)
    amount: number;          // corresponds to BigDecimal amount
    financialGoalId: number; // You can include this to reference the FinancialGoal
}

export interface SavingProgressResponse {
    [financialGoalName: string]: { [monthYear: string]: number }
}
