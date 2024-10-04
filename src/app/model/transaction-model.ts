export interface TransactionRequest {
    amount: number;
    transactionDate: string; // Corrected type to string
    category: string;
    description: string;
    transactionType: string;
}

export interface TransactionReponse {
    id: number;
    amount: number;
    transactionDate: string;
    category: string;
    description: string;
}