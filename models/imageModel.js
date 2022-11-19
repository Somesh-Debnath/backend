const mongoose = require('mongoose');
const ImageSchema = new mongoose.Schema({
    image:{
        contentType: String,
        data: Buffer,
       
    },
    name:{
        type: String,
        required: true
    }
}
);

module.exports = mongoose.model('Image', ImageSchema);