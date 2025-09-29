import React from 'react';
import ReactDOM from 'react-dom/client';
// Import the generated CSS file instead of the source file
import './output.css'; 
import App from './app.jsx'; 
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext.jsx';
import { ThemeProvider } from './context/themeContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);