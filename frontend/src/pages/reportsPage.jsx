import React, { useState, useEffect } from 'react';
import apiService from '../api/apiService'; // Import the new axios instance

const ReportsPage = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month'); // 'week', 'month', or 'year'

  useEffect(() => {
    const fetchReportData = async () => {
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
        console.error("Failed to fetch report data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [period]);

  const income = reportData?.incomeExpenseStats?.find(s => s._id === 'income');
  const expense = reportData?.incomeExpenseStats?.find(s => s._id === 'expense');

  if (loading) {
    return <div className="text-center p-10">Generating report...</div>;
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Reports</h1>
        <div className="flex items-center space-x-2">
          <button onClick={() => setPeriod('week')} className={`px-4 py-2 text-sm rounded-lg ${period === 'week' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700'}`}>Week</button>
          <button onClick={() => setPeriod('month')} className={`px-4 py-2 text-sm rounded-lg ${period === 'month' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700'}`}>Month</button>
          <button onClick={() => setPeriod('year')} className={`px-4 py-2 text-sm rounded-lg ${period === 'year' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700'}`}>Year</button>
        </div>
      </div>

      {/* Report Summary */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 capitalize">Report Summary for this {period}</h2>
        <div className="grid md:grid-cols-2 gap-y-4 gap-x-8">
          <div>
            <h3 className="font-medium text-green-600 mb-1">Income</h3>
            <p className="text-gray-700 dark:text-gray-300"><strong>Total:</strong> ₹{income?.total.toLocaleString() || 0}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Transactions:</strong> {income?.count || 0}</p>
          </div>
          <div>
            <h3 className="font-medium text-red-600 mb-1">Expenses</h3>
            <p className="text-gray-700 dark:text-gray-300"><strong>Total:</strong> ₹{expense?.total.toLocaleString() || 0}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Transactions:</strong> {expense?.count || 0}</p>
          </div>
        </div>
      </div>

      {/* Expense Breakdown Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        <h2 className="text-lg font-semibold p-6">Expense Breakdown by Category</h2>
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr className="border-b border-t dark:border-gray-600">
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold text-right">Total Amount</th>
              <th className="p-4 font-semibold text-right">Transactions</th>
            </tr>
          </thead>
          <tbody>
            {reportData?.categoryBreakdown?.length > 0 ? reportData.categoryBreakdown.map(cat => (
              <tr key={cat._id} className="border-b dark:border-gray-600">
                <td className="p-4">{cat._id}</td>
                <td className="p-4 text-right">₹{cat.total.toLocaleString()}</td>
                <td className="p-4 text-right">{cat.count}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-500">No expense data for this period.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;