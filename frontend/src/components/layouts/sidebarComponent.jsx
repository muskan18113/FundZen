import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CreditCard, BarChart2, Building2, User, Settings } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { label: 'Dashboard', path: '/app/dashboard', icon: Home },
    { label: 'Transactions', path: '/app/transactions', icon: CreditCard },
    { label: 'Budgets', path: '/app/budgets', icon: BarChart2 },
    { label: 'Accounts', path: '/app/accounts', icon: Building2 },
  ];
  
  const baseLinkClass = "w-full flex items-center space-x-3 p-3 rounded-lg transition-colors";
  const activeLinkClass = "bg-blue-700 text-white";
  const inactiveLinkClass = "text-gray-300 hover:bg-blue-700 hover:text-white";

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white fixed h-full flex-col hidden lg:flex">
      {/* Logo and App Name */}
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">F</span>
            </div>
            <span className="font-semibold text-xl">FinTrack</span>
        </div>
        <nav className="space-y-2">
          {navItems.map(item => (
            <NavLink 
              key={item.label} 
              to={item.path} 
              className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      {/* Bottom Nav Links */}
      <div className="mt-auto p-6 space-y-2">
          <NavLink 
            to="/app/profile" 
            className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
          >
            <User size={20} />
            <span>Profile</span>
          </NavLink>
          <NavLink 
            to="/app/settings" 
            className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
