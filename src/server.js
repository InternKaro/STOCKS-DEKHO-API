const express = require('express');
const cors = require('cors')
const routes = require('./public-api/routes');
require('./scripts/mongo-setup');
const app = express();
const port = process.env.port || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.get('/health',(req,res)=>{
    res.json(req.body);
});
app.get('/',(req,res)=>{
    res.send("Server Started");
});

app.listen(port,()=>{
    console.log(`Server started on ${port}`)
});

// https://www.nseindia.com/api/corporates-corporateActions?index=equities
// INDEX( https://www.nseindia.com/api/equity-stockIndices?index=NIFTY AUTO )
// NIFTY AUTO
// NIFTY FINANCIAL SERVICES
// NIFTY BANK
// NIFTY ENERGY
// NIFTY FMCG
// NIFTY IT, MEDIA, METAL,PHARMA,REALTY,HEALTHCARE INDEX, OIL & GAS