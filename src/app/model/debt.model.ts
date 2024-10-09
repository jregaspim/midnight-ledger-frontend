export interface Debt {
    id?: number;
    accountId: number;
    amount: number;
    interestRate: number;
    dueDate: string;
    category: string;
    lender: string;
    repaymentSchedule: string;
    remainingBalance: number;
    description?: string;
}
