import React from 'react';

const Spinner = ({ size = 'md' }) => {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8'
    };
    
    // This creates a spinning circle with a blue border
    return (
        <div 
            className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-500 ${sizes[size]}`}
            role="status"
            aria-label="Loading..."
        ></div>
    );
};

export default Spinner;
