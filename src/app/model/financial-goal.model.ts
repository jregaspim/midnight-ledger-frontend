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
}
