import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionTable = () => {
  const [priceRangeData, setPriceRangeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState("June"); // Default month

  // Fetch price range data for the selected month
  useEffect(() => {
    const fetchPriceRangeData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/transactions/pricerange/${month}`);
        setPriceRangeData(response.data.priceRanges); // Assuming response contains 'priceRanges'
      } catch (error) {
        console.error("Error fetching price range data:", error);
        setPriceRangeData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceRangeData();
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
    <div>
      <h2>Price Range Distribution</h2>
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

      {/* Bar Chart */}
      <Bar data={barChartData} options={barChartOptions} />
    </div>
  );
};

export default TransactionTable;
