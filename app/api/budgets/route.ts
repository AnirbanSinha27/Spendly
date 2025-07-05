import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Budget from '@/lib/models/Budget';

export async function GET() {
  try {
    await dbConnect();
    const budgets = await Budget.find({}).sort({ month: -1, category: 1 });
    return NextResponse.json(budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    // Return empty array if database connection fails
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Use upsert to create or update budget for the same category and month
    const budget = await Budget.findOneAndUpdate(
      { category: body.category, month: body.month },
      body,
      { new: true, upsert: true, runValidators: true }
    );
    
    return NextResponse.json(budget, { status: 201 });
  } catch (error) {
    console.error('Error creating/updating budget:', error);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 503 });
  }
} 