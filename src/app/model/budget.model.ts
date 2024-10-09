interface BaseBudget {
    amount: number;
    category: string;
}

export interface BudgetRequest extends BaseBudget { }

export interface BudgetResponse extends BaseBudget {
    id: number;
    amountUsed?: number;
}
