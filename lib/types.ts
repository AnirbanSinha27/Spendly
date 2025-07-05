export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

export interface Budget {
  category: string;
  limit: number;
  month: string; // YYYY-MM format
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}