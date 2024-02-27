const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


app.get('/', (req,res)=>{
    res.send('Hello from Node API');
});

app.post('/api/products', (req, res)=>{
    console.log(req.body);
    res.send(req.body);
})


mongoose.connect("mongodb+srv://mahajanaakash108:Qe9Z5hTptpNtsjE3@cluster0.quljzpd.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to Database");
    app.listen(3000, ()=>{
        console.log('Server is running on port 3000');
    });
})
.catch(()=>{
    console.log("Connection Failed!")
})