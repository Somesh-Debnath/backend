const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    campaignName: {
        type: String,
        required: true        
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true       
    },
    date: {
        type: Date,
        default: Date.now
    },
    image:{
        contentType: String,
        data: Buffer,
    }    
});

module.exports = mongoose.model('Product',ProductSchema);
