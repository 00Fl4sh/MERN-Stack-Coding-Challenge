// MonthSelector.js
import React from 'react';

const MonthSelector = ({ month, setMonth }) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
            {months.map((m) => (
                <option key={m} value={m}>
                    {m}
                </option>
            ))}
        </select>
    );
};

export default MonthSelector;
