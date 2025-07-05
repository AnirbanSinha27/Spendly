import { Transaction, Budget } from './types';

const TRANSACTIONS_KEY = 'finance_transactions';
const BUDGETS_KEY = 'finance_budgets';

export const storage = {
  getTransactions: (): Transaction[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(TRANSACTIONS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveTransactions: (transactions: Transaction[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  },

  getBudgets: (): Budget[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(BUDGETS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveBudgets: (budgets: Budget[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
  }
};