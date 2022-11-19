const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const multer = require('multer');
//const User = require('./models/user');
const Product = require('./models/product');
const CampaignList = require('./models/campaignList');

app.use(cors());
app.use(bodyParser.json());

//multer storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

app.post('/upload', upload.single('testImage'), (req, res, next) => {
    const Products = new Product({
        campaignName: req.body.campaignName,
        name: req.body.name,
        price: req.body.price,
        image:{
            data: fs.readFileSync("uploads/" + req.file.filename),
            contentType:"image/png"           
        },
    });

    Products.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));
    res.status(201).json({
        //message: 'Handling POST requests to /upload',
        createdProduct: Products
    });
});

app.get('/getProducts', (req, res, next) => {
    const allProducts = Product.find()
    .then(result => {
        res.status(200).json({
            //message: 'Handling GET requests to /getUsers',
            products: result
        });
    }).catch(err => console.log(err));
    });

app.post('/createCampaign', upload.single('testImages'), (req, res, next) => {
    const campaignLists = new CampaignList({
        _id: new mongoose.Types.ObjectId(),
        campaignName: req.body.campaignName,
        budget: req.body.budget,
        location: req.body.location,
        platform: req.body.platform,
        image:{
            data: fs.readFileSync("uploads/" + req.file.filename),
            contentType:"image/png"
            },
            });
            campaignLists.save().then(result => {
                console.log(result);
                }).catch(err => console.log(err));
                res.status(201).json({
                    //message: 'Handling POST requests to /campaigns',
                    createdCampaign: campaignLists
         });
    });

app.get('/getCampaigns', (req, res, next) => {
    const allCampaigns = CampaignList.find()
    .then(result => {
        res.status(200).json({
            //message: 'Handling GET requests to /campaigns',
            campaigns: result
        });
    }).catch(err => console.log(err));
    });
    
// Connect to DB
const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
  };

  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
  });

app.listen(8000, () => {
    connect()
    console.log('Server started on port 8000');
});
