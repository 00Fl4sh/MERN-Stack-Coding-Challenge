import React, { useState, useEffect } from 'react';
import axiosInstance from './components/axiosInstance'; 
import TransactionTable from './components/TransactionTable';
import MonthSelector from './components/MonthSelector';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';

const App = () => {
    const [transactions, setTransactions] = useState([]);
    const [month, setMonth] = useState('March');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchTransactions();
    }, [month, searchTerm, currentPage]);

    const fetchTransactions = async () => {
        try {
          const response = await axiosInstance.get(`/transactions/statistics/${month}`);
          // http://localhost:5000/transactions/statistics/January
            setTransactions(response.data.transactions);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    return (
        <div>
            <h1>Transactions Dashboard</h1>
            <MonthSelector month={month} setMonth={setMonth} />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <TransactionTable transactions={transactions} />
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
    );
};

export default App;
