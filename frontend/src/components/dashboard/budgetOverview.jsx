import React from 'react';
import { Link } from 'react-router-dom';

const BudgetOverview = ({ budgets }) => {
    const getProgressBarColor = (p) => p > 90 ? 'bg-red-500' : p > 75 ? 'bg-yellow-500' : 'bg-blue-500';

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Budget Overview</h2>
                <Link to="/app/budgets" className="text-blue-600 hover:text-blue-700 text-sm font-medium">Manage</Link>
            </div>
            <div className="space-y-4">
                {budgets?.map((budget) => {
                    const percentage = Math.min((budget.spent / budget.allocated) * 100, 100);
                    return (
                        <div key={budget._id}>
                            <div className="flex justify-between mb-1 text-sm">
                                <span className="font-medium">{budget.category}</span>
                                <span>₹{budget.spent.toLocaleString()} / ₹{budget.allocated.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div className={`h-2 rounded-full ${getProgressBarColor(percentage)}`} style={{ width: `${percentage}%` }}></div>
                            </div>
                        </div>
                    );
                })}
                {!budgets?.length && <p className="text-center text-gray-500 py-4">No active budgets.</p>}
            </div>
        </div>
    );
};

export default BudgetOverview;
