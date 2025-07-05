"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Transaction, Budget } from '@/lib/types';
import { getCategoryByName } from '@/lib/categories';
import { TrendingUp } from 'lucide-react';

interface BudgetVsActualChartProps {
  transactions: Transaction[];
  budgets: Budget[];
  currentMonth: string;
}

export function BudgetVsActualChart({ transactions, budgets, currentMonth }: BudgetVsActualChartProps) {
  const currentMonthBudgets = budgets.filter(b => b.month === currentMonth);
  
  if (currentMonthBudgets.length === 0) {
    return (
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <CardTitle className="text-xl font-semibold">Budget vs Actual</CardTitle>
          </div>
          <CardDescription>
            Compare your budgeted amounts with actual spending
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p>Set budgets to see comparison with actual spending</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = currentMonthBudgets.map(budget => {
    const actualSpent = transactions
      .filter(t => 
        t.type === 'expense' && 
        t.date.startsWith(currentMonth) && 
        t.category === budget.category
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const category = getCategoryByName(budget.category);
    
    return {
      category: budget.category,
      budgeted: budget.limit,
      actual: actualSpent,
      icon: category.icon,
      color: category.color,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const budgeted = payload.find((p: any) => p.dataKey === 'budgeted')?.value || 0;
      const actual = payload.find((p: any) => p.dataKey === 'actual')?.value || 0;
      const difference = budgeted - actual;
      const percentage = budgeted > 0 ? ((actual / budgeted) * 100).toFixed(1) : '0';
      
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{payload[0]?.payload?.icon}</span>
            <span className="font-medium">{label}</span>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-blue-600">Budgeted:</span>
              <span className="font-medium">${budgeted.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-orange-600">Actual:</span>
              <span className="font-medium">${actual.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4 pt-1 border-t">
              <span className={difference >= 0 ? 'text-green-600' : 'text-red-600'}>
                {difference >= 0 ? 'Under budget:' : 'Over budget:'}
              </span>
              <span className={`font-medium ${difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(difference).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between gap-4 text-xs text-muted-foreground">
              <span>Usage:</span>
              <span>{percentage}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex justify-center gap-6 mt-4">
        {payload?.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          <CardTitle className="text-xl font-semibold">Budget vs Actual</CardTitle>
        </div>
        <CardDescription>
          Compare your budgeted amounts with actual spending this month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="category" 
                axisLine={false}
                tickLine={false}
                className="text-sm"
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-sm"
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              <Bar 
                dataKey="budgeted" 
                name="Budgeted"
                fill="#3B82F6"
                radius={[2, 2, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
              <Bar 
                dataKey="actual" 
                name="Actual"
                fill="#F97316"
                radius={[2, 2, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}