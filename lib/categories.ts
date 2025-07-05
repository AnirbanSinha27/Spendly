import { Category } from './types';

export const categories: Category[] = [
  { id: 'food', name: 'Food & Dining', icon: '🍽️', color: '#EF4444' },
  { id: 'transportation', name: 'Transportation', icon: '🚗', color: '#3B82F6' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#8B5CF6' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: '#F59E0B' },
  { id: 'bills', name: 'Bills & Utilities', icon: '💡', color: '#10B981' },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥', color: '#EC4899' },
  { id: 'education', name: 'Education', icon: '📚', color: '#6366F1' },
  { id: 'travel', name: 'Travel', icon: '✈️', color: '#14B8A6' },
  { id: 'fitness', name: 'Fitness', icon: '💪', color: '#F97316' },
  { id: 'other', name: 'Other', icon: '📦', color: '#6B7280' },
];

export const getCategoryByName = (name: string): Category => {
  return categories.find(cat => cat.name === name) || categories[categories.length - 1];
};