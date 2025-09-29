import React from 'react';
import { useTheme } from '../hooks/themeContext.js';

const SettingsPage = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-lg mx-auto">
            <h1 className="text-xl font-bold mb-6">Settings</h1>
            <div className="flex items-center justify-between py-4 border-b dark:border-gray-700">
                <span className="font-medium">Dark Mode</span>
                <button onClick={toggleTheme} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDarkMode ? 'bg-blue-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
