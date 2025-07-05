"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/lib/categories';
import { Target, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface BudgetFormProps {
  onSubmit: (category: string, limit: number, month: string) => void;
  currentMonth: string;
}

export function BudgetForm({ onSubmit, currentMonth }: BudgetFormProps) {
  const [formData, setFormData] = useState({
    category: '',
    limit: '',
    month: currentMonth,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.limit || isNaN(Number(formData.limit)) || Number(formData.limit) <= 0) {
      newErrors.limit = 'Please enter a valid budget amount greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    onSubmit(formData.category, Number(formData.limit), formData.month);
    
    setFormData(prev => ({
      ...prev,
      category: '',
      limit: '',
    }));
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          <CardTitle className="text-xl font-semibold">Set Budget</CardTitle>
        </div>
        <CardDescription>
          Set monthly spending limits for each category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="month">Month</Label>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {format(new Date(formData.month + '-01'), 'MMMM yyyy')}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, category: value }));
                if (errors.category) setErrors(prev => ({ ...prev, category: '' }));
              }}
            >
              <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    <div className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="limit">Budget Limit</Label>
            <Input
              id="limit"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.limit}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, limit: e.target.value }));
                if (errors.limit) setErrors(prev => ({ ...prev, limit: '' }));
              }}
              className={errors.limit ? 'border-red-500' : ''}
            />
            {errors.limit && <p className="text-sm text-red-500">{errors.limit}</p>}
          </div>

          <Button type="submit" className="w-full">
            Set Budget
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}