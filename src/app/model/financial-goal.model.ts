export interface FinancialGoalRequest {
    goalName: string;
    targetAmount: number;
    currentAmount: number;
    deadline: Date;
}

export interface FinancialGoalResponse {
    id: number;
    goalName: string;
    targetAmount: number;
    currentAmount: number;
    deadline: Date;
    savingProgresses: SavingProgress[];
}

export interface SavingProgress {
    id: number;
    dateAdded: string;
    amount: number;
    financialGoalId: number;
}

export interface SavingProgressResponse {
    [goalName: string]: {
        [monthYear: string]: number;
    };
}
