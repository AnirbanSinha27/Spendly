"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTransactions } from '@/hooks/use-transactions';
import { useBudgets } from '@/hooks/use-budgets';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { MonthlyExpensesChart } from '@/components/dashboard/monthly-expenses-chart';
import { CategoryPieChart } from '@/components/dashboard/category-pie-chart';
import { BudgetOverview } from '@/components/dashboard/budget-overview';
import { BudgetVsActualChart } from '@/components/dashboard/budget-vs-actual-chart';
import { TransactionForm } from '@/components/transactions/transaction-form';
import { TransactionList } from '@/components/transactions/transaction-list';
import { BudgetForm } from '@/components/budgets/budget-form';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MonthCalendar } from '@/components/ui/month-calendar';
import { Transaction } from '@/lib/types';
import { TrendingUp, Plus, Target, BarChart3, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';

// Dynamic imports to prevent SSR issues
const DynamicSummaryCards = dynamic(() => import('@/components/dashboard/summary-cards').then(mod => ({ default: mod.SummaryCards })), { ssr: false });
const DynamicMonthlyExpensesChart = dynamic(() => import('@/components/dashboard/monthly-expenses-chart').then(mod => ({ default: mod.MonthlyExpensesChart })), { ssr: false });
const DynamicCategoryPieChart = dynamic(() => import('@/components/dashboard/category-pie-chart').then(mod => ({ default: mod.CategoryPieChart })), { ssr: false });
const DynamicBudgetOverview = dynamic(() => import('@/components/dashboard/budget-overview').then(mod => ({ default: mod.BudgetOverview })), { ssr: false });
const DynamicBudgetVsActualChart = dynamic(() => import('@/components/dashboard/budget-vs-actual-chart').then(mod => ({ default: mod.BudgetVsActualChart })), { ssr: false });

function HomePage() {
  const { transactions, isLoading: transactionsLoading, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const { budgets, isLoading: budgetsLoading, setBudget } = useBudgets();
  
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [currentMonth, setCurrentMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      await addTransaction(transaction);
      setActiveTab('transactions'); // Navigate back to transactions list after adding
    } catch (error) {
      console.error('Failed to add transaction:', error);
      // You might want to show a toast notification here
    }
  };

  const handleUpdateTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    if (editingTransaction) {
      try {
        await updateTransaction(editingTransaction.id, transaction);
        setEditingTransaction(null);
        setActiveTab('transactions'); // Navigate back to transactions list after updating
      } catch (error) {
        console.error('Failed to update transaction:', error);
        // You might want to show a toast notification here
      }
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setActiveTab('add-transaction'); // Switch to the form tab when editing
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
    setActiveTab('transactions'); // Navigate back to transactions list when canceling
  };

  const handleSetBudget = async (category: string, limit: number, month: string) => {
    try {
      await setBudget(category, limit, month);
    } catch (error) {
      console.error('Failed to set budget:', error);
      // You might want to show a toast notification here
    }
  };

  if (!isClient || transactionsLoading || budgetsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">Loading your financial data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-primary to-purple-500 rounded-3xl animate-glow">
                  <Image 
                    src="/logo.jpg" 
                    alt="Spendly Logo" 
                    width={48} 
                    height={48} 
                    className="rounded-full"
                  />
                </div>
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Spendly.
                </h1>
              </div>
              <p className="text-md text-muted-foreground font-medium">
                Your smart companion for tracking spending and achieving financial goals.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <MonthCalendar 
                  value={currentMonth} 
                  onValueChange={setCurrentMonth}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <DynamicSummaryCards transactions={transactions} currentMonth={currentMonth} />

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex flex-wrap w-full bg-card/50 backdrop-blur-sm border border-primary/20">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-1 min-w-0">
              <BarChart3 className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Dash</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-1 min-w-0">
              <TrendingUp className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Transactions</span>
              <span className="sm:hidden">Txns</span>
            </TabsTrigger>
            <TabsTrigger value="add-transaction" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-1 min-w-0">
              <Plus className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">{editingTransaction ? 'Edit Transaction' : 'Add Transaction'}</span>
              <span className="sm:hidden">{editingTransaction ? 'Edit' : 'Add'}</span>
            </TabsTrigger>
            <TabsTrigger value="budgets" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-1 min-w-0">
              <Target className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Budgets</span>
              <span className="sm:hidden">Budget</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DynamicMonthlyExpensesChart transactions={transactions} />
              <DynamicCategoryPieChart transactions={transactions} currentMonth={currentMonth} />
            </div>
            <DynamicBudgetVsActualChart 
              transactions={transactions} 
              budgets={budgets} 
              currentMonth={currentMonth} 
            />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionList
              transactions={transactions}
              onEdit={handleEditTransaction}
              onDelete={deleteTransaction}
            />
          </TabsContent>

          <TabsContent value="add-transaction">
            <div className="max-w-2xl mx-auto">
              <TransactionForm
                onSubmit={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
                editingTransaction={editingTransaction || undefined}
                onCancel={editingTransaction ? handleCancelEdit : undefined}
              />
            </div>
          </TabsContent>

          <TabsContent value="budgets" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BudgetForm
                onSubmit={handleSetBudget}
                currentMonth={currentMonth}
              />
              <DynamicBudgetOverview 
                transactions={transactions} 
                budgets={budgets} 
                currentMonth={currentMonth} 
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default HomePage;