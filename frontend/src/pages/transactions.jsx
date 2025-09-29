import React, { useState, useEffect } from 'react';
import apiService from '../api/apiService.js';
import Spinner from '../components/common/spinner.jsx';

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Corrected API call
        apiService.get('/transactions')
            .then(res => {
                if(res.data.success) {
                    setTransactions(res.data.data.transactions)
                }
            })
            .catch(err => console.error("Failed to fetch transactions:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="flex justify-center items-center h-full"><Spinner size="lg" /></div>;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h1 className="text-xl font-bold mb-4">All Transactions</h1>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(tx => (
                            <tr key={tx._id} className="border-b dark:border-gray-700">
                                <td className="px-6 py-4 font-medium">{tx.name}</td>
                                <td className="px-6 py-4">{tx.category}</td>
                                <td className="px-6 py-4">{new Date(tx.date).toLocaleDateString()}</td>
                                <td className={`px-6 py-4 text-right font-medium ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                    {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionsPage;