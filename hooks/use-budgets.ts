"use client";

import { useState, useEffect } from 'react';
import { Budget } from '@/lib/types';

export function useBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch budgets from API
  const fetchBudgets = async () => {
    try {
      const response = await fetch('/api/budgets');
      if (!response.ok) throw new Error('Failed to fetch budgets');
      const data = await response.json();
      setBudgets(data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Set budget (create or update)
  const setBudget = async (category: string, limit: number, month: string) => {
    try {
      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, limit, month }),
      });

      if (!response.ok) throw new Error('Failed to set budget');
      
      const savedBudget = await response.json();
      
      // Update local state
      setBudgets(prev => {
        const existingIndex = prev.findIndex(b => b.category === category && b.month === month);
        if (existingIndex >= 0) {
          // Update existing budget
          const updated = [...prev];
          updated[existingIndex] = savedBudget;
          return updated;
        } else {
          // Add new budget
          return [...prev, savedBudget];
        }
      });
    } catch (error) {
      console.error('Error setting budget:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const getBudget = (category: string, month: string): Budget | undefined => {
    return budgets.find(b => b.category === category && b.month === month);
  };

  return {
    budgets,
    isLoading,
    setBudget,
    getBudget,
    refetch: fetchBudgets,
  };
}