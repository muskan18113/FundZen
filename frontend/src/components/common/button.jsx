import React from 'react';
import  Spinner from './spinner.jsx';

const Button = ({ children, type = 'button', loading = false, ...props }) => (
  <button type={type} disabled={loading} {...props}
    className={`w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg flex justify-center items-center transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed`}>
    {loading ? <Spinner /> : children}
  </button>
);

export default Button;
