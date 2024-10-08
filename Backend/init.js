const axios = require('axios');
const mongoose = require('mongoose');
const Transaction = require('./models/Transaction');
require('dotenv').config();

const initializeDatabase = async () => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data.transactions || response.data; // Adjust based on the actual response structure

        const validTransactions = transactions.map(transaction => ({
            productTitle: transaction.productTitle || 'Unknown Title', 
            productDescription: transaction.productDescription || 'No Description', 
            price: (transaction.price && !isNaN(transaction.price)) ? parseFloat(transaction.price) : 0,
            dateOfSale: transaction.dateOfSale ? new Date(transaction.dateOfSale) : new Date(),
            sold: typeof transaction.sold === 'boolean' ? transaction.sold : false 
        }));

        console.log('Valid Transactions:', validTransactions); // Log valid transactions before insertion

        await Transaction.deleteMany({});
        await Transaction.insertMany(validTransactions);
        console.log('Database initialized successfully!');
    } catch (error) {
        console.error('Failed to initialize the database:', error);
    } finally {
        await mongoose.connection.close();
    }
};


// Connect to MongoDB and initialize the database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        initializeDatabase();
    })
    .catch(err => console.error('MongoDB connection error:', err));
