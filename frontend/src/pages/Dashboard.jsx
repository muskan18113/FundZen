import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import apiService from '../api/apiService.js';
import  Spinner  from '../components/common/spinner.jsx';
import StatCard from '../components/dashboard/statCard.jsx';
import RecentTransactions from '../components/dashboard/recentTransactions.jsx';
import BudgetOverview from '../components/dashboard/budgetOverview.jsx';
import QuickActions from '../components/dashboard/quickActions.jsx';
import { DollarSign, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Corrected API call
    apiService.get('/users/dashboard')
      .then(res => {
        if (res.data.success) {
            setData(res.data.data)
        }
      })
      .catch(err => console.error("Failed to fetch dashboard data:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center items-center h-full"><Spinner size="lg" /></div>;

  const savings = (data?.monthlyIncome || 0) - (data?.monthlyExpenses || 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Welcome back, {user?.firstName}!</h1>
        <p className="text-gray-500 dark:text-gray-400">Here's your financial overview.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={DollarSign} title="Total Balance" value={data?.totalBalance} color="green" />
        <StatCard icon={TrendingUp} title="Monthly Income" value={data?.monthlyIncome} color="blue" />
        <StatCard icon={TrendingDown} title="Monthly Expenses" value={data?.monthlyExpenses} color="red" />
        <StatCard icon={PiggyBank} title="Monthly Savings" value={savings} color="purple" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3"><RecentTransactions transactions={data?.recentTransactions} /></div>
        <div className="lg:col-span-2"><BudgetOverview budgets={data?.budgets} /></div>
      </div>
      <QuickActions />
    </div>
  );
};

export default DashboardPage;