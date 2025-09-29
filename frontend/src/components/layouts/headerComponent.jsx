import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const userInitials = user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : '';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="shadow-sm border-b bg-white dark:bg-gray-800 dark:border-gray-700 p-4 flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex items-center space-x-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search..." className="border-0 outline-none bg-transparent" />
            </div>

            {/* Profile and Notifications */}
            <div className="flex items-center space-x-6">
                <button className="relative text-gray-500 dark:text-gray-400">
                    <Bell className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                </button>
                <div className="relative">
                    <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2">
                        <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">{userInitials}</div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg py-1 z-50">
                            <Link to="/app/profile" onClick={() => setDropdownOpen(false)} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2">
                                <User size={16} /><span>Profile</span>
                            </Link>
                            <Link to="/app/settings" onClick={() => setDropdownOpen(false)} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2">
                                <Settings size={16} /><span>Settings</span>
                            </Link>
                            <hr className="my-1 border-gray-200 dark:border-gray-600" />
                            <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2 text-red-500">
                                <LogOut size={16} /><span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
