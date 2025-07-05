"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Transaction } from '@/lib/types';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';

interface SummaryCardsProps {
  transactions: Transaction[];
  currentMonth: string;
}

export function SummaryCards({ transactions, currentMonth }: SummaryCardsProps) {
  const currentMonthTransactions = transactions.filter(t => 
    t.date.startsWith(currentMonth)
  );

  const totalIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netIncome = totalIncome - totalExpenses;
  const transactionCount = currentMonthTransactions.length;

  const cards = [
    {
      title: 'Total Income',
      value: `$${totalIncome.toLocaleString()}`,
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-400',
      bgGlow: 'shadow-emerald-500/20',
    },
    {
      title: 'Total Expenses',
      value: `$${totalExpenses.toLocaleString()}`,
      icon: TrendingDown,
      gradient: 'from-red-500 to-pink-600',
      textColor: 'text-red-400',
      bgGlow: 'shadow-red-500/20',
    },
    {
      title: 'Net Income',
      value: `$${netIncome.toLocaleString()}`,
      icon: DollarSign,
      gradient: netIncome >= 0 ? 'from-blue-500 to-indigo-600' : 'from-orange-500 to-red-600',
      textColor: netIncome >= 0 ? 'text-blue-400' : 'text-orange-400',
      bgGlow: netIncome >= 0 ? 'shadow-blue-500/20' : 'shadow-orange-500/20',
    },
    {
      title: 'Transactions',
      value: transactionCount.toString(),
      icon: Calendar,
      gradient: 'from-purple-500 to-violet-600',
      textColor: 'text-purple-400',
      bgGlow: 'shadow-purple-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <Card key={index} className={`relative overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 group hover:shadow-xl ${card.bgGlow}`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {card.title}
                </p>
                <p className="text-2xl font-bold tracking-tight text-foreground">
                  {card.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}