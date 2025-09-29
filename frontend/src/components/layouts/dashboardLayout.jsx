    import React from 'react';
    import { Outlet } from 'react-router-dom';
    import Sidebar from './sidebarComponent.jsx'; // Corrected import path
    import Header from './headerComponent.jsx';   // Corrected import path
    
    const DashboardLayout = () => {
      return (
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col lg:ml-64">
            <Header />
            <main className="flex-1 p-4 sm:p-6 bg-gray-100 dark:bg-gray-900">
              <Outlet />
            </main>
          </div>
        </div>
      );
    };

    export default DashboardLayout;
