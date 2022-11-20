const mongoose=require('mongoose');
const campaignListSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
     startDate:Date,
     endDate:Date,
    image:{
        contentType: String,
        data: Buffer,
    },
    campaignName: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
    required: true
    },
    location:{
        type: String,
        required: true
    },
    platform:{
        type: String,
        required: true
    },
});


module.exports=mongoose.model('CampaignList',campaignListSchema);