import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Target, FileText} from 'lucide-react';

const QuickActions = () => {
    const actions = [
        { to: '/app/transactions', icon: Plus, label: 'Add Transaction', color: 'text-blue-600' },
        { to: '/app/budgets', icon: Target, label: 'Set Budget', color: 'text-green-600' },
        { to: '/app/documents', icon: FileText, label: 'Upload Statement', color: 'text-purple-600' },
    ];
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {actions.map(action => (
                    <Link key={action.label} to={action.to} className="flex flex-col items-center p-4 border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <action.icon className={`w-8 h-8 mb-2 ${action.color}`} />
                        <span className="text-sm font-medium text-center">{action.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
