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

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

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

## 🎨 Customization

### Styling
The app uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.ts`
- Component styles in individual component files
- Global styles in `app/globals.css`

### Categories
Add or modify expense categories in `lib/categories.ts`:
```typescript
export const categories = [
  { name: "Food & Dining", icon: "🍽️", color: "#EF4444" },
  // Add more categories...
];
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `MONGODB_URI` environment variable
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Recharts](https://recharts.org/) for beautiful charts
- [Lucide React](https://lucide.dev/) for the icon library

## 📞 Support

If you have any questions or need help:
- Open an [issue](https://github.com/yourusername/spendly/issues)
- Contact: your.email@example.com

---

Made with ❤️ by [Your Name] 