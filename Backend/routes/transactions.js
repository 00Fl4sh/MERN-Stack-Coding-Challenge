const express = require('express');
const Transaction = require('../models/Transaction');
const axios = require('axios'); // Add this line


const router = express.Router();

// List transactions with search and pagination
router.get('/', async (req, res) => {
    const { page = 1, perPage = 10, search = '' } = req.query;

    try {
        // Build query for searching
        const query = {
            $or: [
                { productTitle: { $regex: search, $options: 'i' } },
                { productDescription: { $regex: search, $options: 'i' } }
            ]
        };

        // If search is a number, convert it and search on price too
        if (!isNaN(search) && search.trim() !== "") {
            query.$or.push({ price: parseFloat(search) });
        }

        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));

        const total = await Transaction.countDocuments(query);

        res.status(200).json({
            total,
            page: parseInt(page),
            perPage: parseInt(perPage),
            transactions
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch transactions.' });
    }
});

// Statistics for a selected month
router.get('/statistics/:month', async (req, res) => {
    const monthMap = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
    };

    const month = req.params.month;
    const monthNumber = monthMap[month];

    if (monthNumber === undefined) {
        return res.status(400).json({ error: 'Invalid month provided.' });
    }

    try {
        // Aggregate to get total sales amount and sold items
        const totalSales = await Transaction.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, monthNumber] // Match transactions from the specified month
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$price" }, // Sum of all prices
                    totalItems: { $sum: 1 } // Count of items sold
                }
            }
        ]);

        const totalSoldItems = totalSales[0]?.totalItems || 0; // Total sold items
        const totalSaleAmount = totalSales[0]?.totalAmount || 0; // Total sale amount

        // Count of not sold items
        const totalNotSoldItems = await Transaction.countDocuments({
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, monthNumber] // Match transactions from the specified month
            },
            sold: false // Only count items that are not sold
        });

        // Respond with the calculated statistics
        res.status(200).json({
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch statistics.' });
    }
});


// Bar chart data for a selected month
router.get('/bar-chart/:month', async (req, res) => {
    const monthMap = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
    };

    const month = req.params.month;
    const monthNumber = monthMap[month];

    // Check if the provided month is valid
    if (monthNumber === undefined) {
        return res.status(400).json({ error: 'Invalid month provided.' });
    }

    try {
        // Define the price ranges
        const priceRanges = [
            { range: "0-100", min: 0, max: 100 },
            { range: "101-200", min: 101, max: 200 },
            { range: "201-300", min: 201, max: 300 },
            { range: "301-400", min: 301, max: 400 },
            { range: "401-500", min: 401, max: 500 },
            { range: "501-600", min: 501, max: 600 },
            { range: "601-700", min: 601, max: 700 },
            { range: "701-800", min: 701, max: 800 },
            { range: "801-900", min: 801, max: 900 },
            { range: "901-above", min: 901, max: Infinity }
        ];

        // Prepare the aggregation pipeline
        const pipeline = [
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, monthNumber] // Match transactions from the specified month
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $cond: [
                            { $lte: ["$price", 100] }, "0-100",
                            { $cond: [
                                { $lte: ["$price", 200] }, "101-200",
                                { $cond: [
                                    { $lte: ["$price", 300] }, "201-300",
                                    { $cond: [
                                        { $lte: ["$price", 400] }, "301-400",
                                        { $cond: [
                                            { $lte: ["$price", 500] }, "401-500",
                                            { $cond: [
                                                { $lte: ["$price", 600] }, "501-600",
                                                { $cond: [
                                                    { $lte: ["$price", 700] }, "601-700",
                                                    { $cond: [
                                                        { $lte: ["$price", 800] }, "701-800",
                                                        { $cond: [
                                                            { $lte: ["$price", 900] }, "801-900",
                                                            "901-above"
                                                        ]}
                                                    ]}
                                                ]}
                                            ]}
                                        ]}
                                    ]}
                                ]}
                            ]}
                        ]
                    },
                    count: { $sum: 1 } // Count the number of items in each range
                }
            },
            {
                $sort: { "_id": 1 } // Sort by price range
            }
        ];

        // Execute the aggregation
        const results = await Transaction.aggregate(pipeline);

        // Prepare the response in the required format
        const chartData = priceRanges.map(range => {
            const found = results.find(res => res._id === range.range);
            return {
                range: range.range,
                count: found ? found.count : 0 // Default to 0 if no items found in this range
            };
        });

        res.status(200).json(chartData);
    } catch (error) {
        console.error('Error fetching bar chart data:', error);
        res.status(500).json({ error: 'Failed to fetch bar chart data.' });
    }
});


// Pie chart data for a selected month
router.get('/pie-chart/:month', async (req, res) => {
    const monthMap = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
    };

    const month = req.params.month;
    const monthNumber = monthMap[month];

    if (monthNumber === undefined) {
        return res.status(400).json({ error: 'Invalid month provided.' });
    }

    try {
        const results = await Transaction.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, monthNumber]
                    }
                }
            },
            {
                $group: {
                    _id: "$category", // Assuming you have a category field in your model
                    count: { $sum: 1 } // Count items in each category
                }
            }
        ]);

        // Format the response
        const pieChartData = results.map(item => ({
            category: item._id,
            count: item.count
        }));

        res.status(200).json(pieChartData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch pie chart data.' });
    }
});


// Combined API for statistics, bar chart, and pie chart
router.get('/combined/:month', async (req, res) => {
    const month = req.params.month;

    try {
        // Fetch statistics
        const statsResponse = await axios.get(`http://localhost:5000/transactions/statistics/${month}`);
        const stats = statsResponse.data;

        // Fetch bar chart data
        const barChartResponse = await axios.get(`http://localhost:5000/transactions/bar-chart/${month}`);
        const barChart = barChartResponse.data;

        // Fetch pie chart data
        const pieChartResponse = await axios.get(`http://localhost:5000/transactions/pie-chart/${month}`);
        const pieChart = pieChartResponse.data;

        // Combine responses
        const combinedResponse = {
            statistics: stats,
            barChart: barChart,
            pieChart: pieChart,
        };

        res.status(200).json(combinedResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch combined data.' });
    }
});







module.exports = router;
