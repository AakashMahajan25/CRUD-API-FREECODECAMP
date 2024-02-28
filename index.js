const express = require('express');
const mongoose = require('mongoose');

const Product = require('./models/product.model.js');

const app = express();
app.use(express.json());


app.get('/', (req,res)=>{
    res.send('Hello from Node API');
});

app.get('/api/products', async (req, res)=> {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.post('/api/products', async (req, res)=>{
    try {
        const createdProduct = await Product.create(req.body);
        res.status(200).json(createdProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


mongoose.connect("mongodb+srv://mahajanaakash108:Qe9Z5hTptpNtsjE3@cluster0.quljzpd.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to Database");
    app.listen(3000, ()=>{
        console.log('Server is running on port 3000');
    });

    app.post('/api/products', async (req, res)=>{
    try {
        const Product = await Product.create(req.body);
        res.status(200).json(Product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

})
.catch(()=>{
    console.log("Connection Failed!")
})