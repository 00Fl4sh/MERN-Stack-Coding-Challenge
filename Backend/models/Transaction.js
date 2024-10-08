const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    productTitle: { type: String, required: true },
    productDescription: { type: String, required: true },
    price: { type: Number, required: true },
    dateOfSale: { type: Date, required: true },
    sold: { type: Boolean, required: true },
    category: { type: String, required: true },
    image: { type: String } // Assuming you want to store the image as a URL or path
});

module.exports = mongoose.model('Transaction', transactionSchema);
