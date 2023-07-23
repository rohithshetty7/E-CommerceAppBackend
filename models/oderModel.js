const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.types.ObjectId,
            ref: "Products"
        },
        count: Number,
        color: String
    }]
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);