export interface BudgetRequest {
    amount: number;
    category: string;
}

export interface BudgetReponse {
    id: number;
    amount: number;
    category: string;
    amountUsed: number;
}