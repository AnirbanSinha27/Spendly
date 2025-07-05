# 💰 Spendly - Personal Finance Tracker

A modern, intuitive personal finance management application built with Next.js 13+ and TypeScript. Track your expenses, set budgets, and visualize your financial data with beautiful charts and insights.

![Spendly Dashboard](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=for-the-badge&logo=mongodb)

## ✨ Features

### 📊 Dashboard & Analytics
- **Real-time financial overview** with summary cards
- **Monthly expenses chart** to track spending trends
- **Category-wise pie chart** for expense breakdown
- **Budget vs Actual comparison** charts
- **Interactive data visualization** with responsive design

### 💳 Transaction Management
- **Add, edit, and delete transactions** with ease
- **Categorize expenses** with predefined categories
- **Date-based filtering** and organization
- **Search and filter** functionality
- **Bulk operations** support

### 🎯 Budget Planning
- **Set monthly budgets** by category
- **Real-time budget tracking** with progress indicators
- **Budget overview** with visual progress bars
- **Over-budget alerts** and warnings
- **Budget vs actual spending** analysis

### 🎨 Modern UI/UX
- **Beautiful gradient design** with dark theme
- **Responsive layout** for all devices
- **Smooth animations** and transitions
- **Intuitive navigation** with tabbed interface
- **Accessible design** following WCAG guidelines

## 🚀 Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **UI Components**: Radix UI + Custom Components
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB database
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/spendly.git
   cd spendly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
spendly/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── dashboard/         # Dashboard components
│   ├── transactions/      # Transaction components
│   ├── budgets/           # Budget components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and types
├── public/               # Static assets
└── README.md            # This file
```

## 📱 Usage

### Adding Transactions
1. Navigate to the "Add Transaction" tab
2. Fill in the transaction details (amount, category, date, description)
3. Click "Add Transaction" to save

### Setting Budgets
1. Go to the "Budgets" tab
2. Select a category and set your monthly limit
3. Click "Set Budget" to save

### Viewing Analytics
- **Dashboard**: Overview of your financial data
- **Transactions**: List and manage all transactions
- **Charts**: Visual representation of spending patterns
- 

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Anirban Sinha] 
