export interface Debt {
    id?: number;
    accountId: number;
    amount: number;
    interestRate: number;
    dueDate: string; // Adjust to the correct date format if needed
    category: string;
    lender: string;
    repaymentSchedule: string;
    remainingBalance: number;
    description?: string;
}
