import { TransactionType } from "./constants";

export interface TransactionRequest {
    amount: number;
    transactionDate: string;
    category: string;
    description?: string;
    transactionType: TransactionType;
}

export interface TransactionResponse {
    id: number;
    amount: number;
    transactionDate: string;
    category: string;
    description?: string;
    transactionType: TransactionType;
}

// Adjust as necessary

export interface MonthlyData {
    expenses: number[];
    income: number[];
    savings: number[];
}
