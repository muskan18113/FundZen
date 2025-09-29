    import React from 'react';
import { Link } from 'react-router-dom';

const RecentTransactions = ({ transactions }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <Link to="/app/transactions" className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</Link>
        </div>
        <div className="space-y-4">
            {transactions?.map((tx) => (
                <div key={tx._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div>
                        <p className="font-medium">{tx.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(tx.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                        <p className={`font-medium ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                        </p>
                    </div>
                </div>
            ))}
            {!transactions?.length && <p className="text-center text-gray-500 py-4">No recent transactions.</p>}
        </div>
    </div>
);

export default RecentTransactions;
