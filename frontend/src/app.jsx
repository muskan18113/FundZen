import React from 'react';
import AppRoutes from './routes/routesConfig.jsx';
import { useTheme }  from './hooks/themeContext.js';

function App() {
  const { isDarkMode } = useTheme();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;