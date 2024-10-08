import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [priceRangeData, setPriceRangeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState("June"); // Default month

  // Fetch transactions, statistics, and price range data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch transactions data
        const transactionsResponse = await axios.get(
          `http://localhost:5000/transactions/`
        );
        console.log("Transactions API Response:", transactionsResponse.data);

        if (
          transactionsResponse.data &&
          Array.isArray(transactionsResponse.data.transactions)
        ) {
          setTransactions(transactionsResponse.data.transactions);
        } else {
          setTransactions([]);
        }

        // Fetch statistics data for the selected month
        const statisticsResponse = await axios.get(
          `http://localhost:5000/transactions/statistics/${month}`
        );
        console.log("Statistics API Response:", statisticsResponse.data);
        setStatistics(statisticsResponse.data);

        // Fetch bar chart data for the selected month
        const barChartResponse = await axios.get(
          `http://localhost:5000/transactions/bar-chart/${month}`
        );
        console.log("Bar Chart API Response:", barChartResponse.data);

        if (
          barChartResponse.data &&
          Array.isArray(barChartResponse.data.priceRanges)
        ) {
          setPriceRangeData(barChartResponse.data.priceRanges);
        } else {
          setPriceRangeData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setTransactions([]);
        setStatistics(null);
        setPriceRangeData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month]);

  // Handle month change
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  // Prepare data for the bar chart
  const barChartData = {
    labels: priceRangeData.map((range) => range.range),
    datasets: [
      {
        label: "Number of Items",
        data: priceRangeData.map((range) => range.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Bar Chart Stats - ${month} (Selected month name from dropdown)`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Price Range",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Items",
        },
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h2>Transactions</h2>
        {/* Dropdown for selecting month */}
        <div>
          <label htmlFor="month-select">Select Month: </label>
          <select id="month-select" value={month} onChange={handleMonthChange}>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{transaction._id}</td>
                  <td>{transaction.productTitle}</td>
                  <td>{transaction.productDescription}</td>
                  <td>{transaction.price}</td>
                  <td>{transaction.dateOfSale}</td>
                  <td>{transaction.sold ? "Yes" : "No"}</td>
                  <td>
                    {transaction.image ? (
                      <img src={transaction.image} alt="Product" width="50" height="50" />
                    ) : (
                      "No Image"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No transactions available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Statistics section */}
      {statistics && (
        <div className="stat">
          <h3>Statistics</h3>
          <p>Total Sales: {statistics.totalSaleAmount}</p>
          <p>Total Sold Items: {statistics.totalSoldItems}</p>
          <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
        </div>
      )}
      {/* Bar Chart */}
      <div>
        <Bar data={barChartData} options={barChartOptions} />
      </div>
    </>
  );
};

export default TransactionTable;
