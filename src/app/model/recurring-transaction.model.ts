import { RecurrenceType } from "./constants";

export interface RecurringTransactionRequest {
  transactionName: string;
  amount: number;
  category: string;
  recurrenceType: RecurrenceType;
  description?: string;
}

export interface RecurringTransactionResponse {
  id: number;
  transactionName: string;
  amount: number;
  category: string;
  recurrenceType: RecurrenceType;
  description?: string;
}
