import React, { useState, useEffect } from 'react';
import apiService from '../api/apiService'; // Import the new axios instance
import { TrendingUp, TrendingDown, PieChart } from 'lucide-react';

const AnalyticsPage = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month'); // 'month' or 'year'

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        // Use apiService.get() with params for the query string
        const response = await apiService.get('/reports/overview', {
          params: { period }
        });

        if (response.data.success) {
          setReportData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [period]);

  const income = reportData?.incomeExpenseStats?.find(s => s._id === 'income')?.total || 0;
  const expense = reportData?.incomeExpenseStats?.find(s => s._id === 'expense')?.total || 0;
  const totalCategorySpending = reportData?.categoryBreakdown?.reduce((sum, cat) => sum + cat.total, 0) || 1;

  if (loading) {
    return <div className="text-center p-10">Loading analytics...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Analytics</h1>
        <div className="flex items-center space-x-2">
          <button onClick={() => setPeriod('month')} className={`px-4 py-2 text-sm rounded-lg ${period === 'month' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 dark:text-gray-200'}`}>
            This Month
          </button>
          <button onClick={() => setPeriod('year')} className={`px-4 py-2 text-sm rounded-lg ${period === 'year' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 dark:text-gray-200'}`}>
            This Year
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard icon={TrendingUp} title="Total Income" value={income} color="green" />
        <StatCard icon={TrendingDown} title="Total Expenses" value={expense} color="red" />
        <StatCard icon={PieChart} title="Net Savings" value={income - expense} color="blue" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Category Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Expense Breakdown by Category</h2>
          <div className="space-y-4">
            {reportData?.categoryBreakdown?.map(category => (
              <div key={category._id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-300">{category._id}</span>
                  <span className="font-medium text-gray-800 dark:text-white">₹{category.total.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(category.total / totalCategorySpending) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Income vs Expense Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
           <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Income vs. Expenses</h2>
           <div className="flex items-end h-64 space-x-8">
                <div className="flex flex-col items-center flex-1">
                    <div className="w-full bg-green-500 rounded-t-lg" style={{ height: `${(income / (income + expense || 1)) * 100}%` }}></div>
                    <span className="text-sm mt-2">Income</span>
                </div>
                <div className="flex flex-col items-center flex-1">
                    <div className="w-full bg-red-500 rounded-t-lg" style={{ height: `${(expense / (income + expense || 1)) * 100}%` }}></div>
                    <span className="text-sm mt-2">Expense</span>
                </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex items-center space-x-4">
    <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/50`}>
      <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        ₹{value.toLocaleString()}
      </p>
    </div>
  </div>
);

export default AnalyticsPage;
