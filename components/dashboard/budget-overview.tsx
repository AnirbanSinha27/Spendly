"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Transaction, Budget } from '@/lib/types';
import { getCategoryByName } from '@/lib/categories';
import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

interface BudgetOverviewProps {
  transactions: Transaction[];
  budgets: Budget[];
  currentMonth: string;
}

export function BudgetOverview({ transactions, budgets, currentMonth }: BudgetOverviewProps) {
  const currentMonthBudgets = budgets.filter(b => b.month === currentMonth);
  
  if (currentMonthBudgets.length === 0) {
    return (
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">Budget Overview</CardTitle>
          <CardDescription>
            Set budgets to track your spending goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-40 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <div className="text-4xl mb-2">💰</div>
              <p>No budgets set for this month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const budgetData = currentMonthBudgets.map(budget => {
    const spent = transactions
      .filter(t => 
        t.type === 'expense' && 
        t.date.startsWith(currentMonth) && 
        t.category === budget.category
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const percentage = (spent / budget.limit) * 100;
    const category = getCategoryByName(budget.category);
    
    return {
      ...budget,
      spent,
      percentage: Math.min(percentage, 100),
      remaining: budget.limit - spent,
      status: percentage > 100 ? 'over' : percentage > 80 ? 'warning' : 'good',
      category: category,
    };
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'over':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <TrendingUp className="h-4 w-4 text-orange-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'over':
        return 'bg-red-500';
      case 'warning':
        return 'bg-orange-500';
      default:
        return 'bg-green-500';
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Budget Overview</CardTitle>
        <CardDescription>
          Track your spending against your monthly budgets
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgetData.map((budget, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{budget.category.icon}</span>
                <span className="font-medium">{budget.category.name}</span>
                {getStatusIcon(budget.status)}
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">
                  ${budget.spent.toLocaleString()} / ${budget.limit.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {budget.remaining >= 0 
                    ? `$${budget.remaining.toLocaleString()} remaining`
                    : `$${Math.abs(budget.remaining).toLocaleString()} over budget`
                  }
                </div>
              </div>
            </div>
            <div className="relative">
              <Progress 
                value={budget.percentage} 
                className="h-2"
              />
              <div 
                className={`absolute top-0 left-0 h-2 rounded-full transition-all ${getProgressColor(budget.status)}`}
                style={{ width: `${Math.min(budget.percentage, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}