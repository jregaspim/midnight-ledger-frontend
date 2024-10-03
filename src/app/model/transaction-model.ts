export interface IncomeTransactionRequest {
    amount: number;
    transactionDate: string; // Corrected type to string
    category: string;
    description: string;
    transactionType: string;
}

export interface IncomeTransactionReponse {
    id: number;
    amount: number;
    transactionDate: string;
    category: string;
    description: string;
}