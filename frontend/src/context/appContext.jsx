import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth.js'; // Import the useAuth hook

// Import Page Components
import Dashboard from './pages/Dashboard.jsx';
import Analytics from './pages/analyticsPage.jsx';
import Documents from './pages/documentsPage.jsx';
import Reports from './pages/reportsPage.jsx';
import Transactions from './pages/transactions.jsx';
import Budgets from './pages/budgets.jsx';
import Accounts from './pages/accounts.jsx';
import Profile from './pages/profile.jsx';
import Settings from './pages/settings.jsx';

// Import Layout Components
import Sidebar from './components/sidebarComponent.jsx';
import Header from './components/headerComponent.jsx';

// Main App Content Container
const AppContent = () => {
  // Use the hook to get live user data
  const { user } = useAuth(); 

  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to render the correct page component based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'analytics':
        return <Analytics />;
      case 'documents':
        return <Documents />;
      case 'reports':
        return <Reports />;
      case 'transactions':
        return <Transactions />;
      case 'budgets':
        return <Budgets />;
      case 'accounts':
        return <Accounts />;
      case 'profile':
        return <Profile user={user} />;
      case 'settings':
        return <Settings isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 ml-64 bg-gray-50 dark:bg-gray-900">
        {/* Pass the live user object to the Header */}
        <Header user={user} /> 
        <main className="p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default AppContent;