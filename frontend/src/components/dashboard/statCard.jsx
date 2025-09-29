import React from 'react';

const StatCard = ({ icon: Icon, title, value, color }) => {
    const colors = {
        green: 'text-green-600 bg-green-100 dark:bg-green-900/50 dark:text-green-400',
        blue: 'text-blue-600 bg-blue-100 dark:bg-blue-900/50 dark:text-blue-400',
        red: 'text-red-600 bg-red-100 dark:bg-red-900/50 dark:text-red-400',
        purple: 'text-purple-600 bg-purple-100 dark:bg-purple-900/50 dark:text-purple-400',
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors[color]}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold">₹{value?.toLocaleString() ?? '0'}</p>
            </div>
        </div>
    );
};

export default StatCard;
