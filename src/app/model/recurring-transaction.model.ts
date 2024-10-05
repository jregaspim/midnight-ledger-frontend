export interface RecurringTransactionRequest {
  transactionName: string;
  amount: number;
  category: string;
  recurrenceType: string; // e.g., 'Monthly', 'Weekly'
  description: string;
}


export interface RecurringTransactionResponse {
  id: number;
  transactionName: string;
  amount: number;
  category: string;
  recurrenceType: string; // e.g., 'Monthly', 'Weekly'
  description: string;
}