const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    
    shipping_address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip_code: { type: String, required: true }
    },

    national_id: { type: String, required: true },
    shipping_method: { type: String, required: true },
    shipping_deduction: { type: Number, default: 0.00 },
    total_amount: { type: Number, required: true },
    order_status: { type: String, default: 'Processing' },
    
    order_items:[{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        unit_price: { type: Number, required: true } 
    }]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);