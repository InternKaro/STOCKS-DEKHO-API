const csv = require('csv-parser');
const request = require('request');
var csv2json = require("csvtojson");
var path = require('path');
const allStocksModel = require('../public-api/models/all-stocks-model');

async function populateStockDetails(){
    const filePath =  path.join(__dirname, '../static/static.csv');
    const jsonArray= await csv2json().fromFile(filePath);
    const stockSymbolToCode = {};
    jsonArray.forEach((stock)=>{
      stockSymbolToCode[stock.name] = stock.code;
    });
    const stocks = []
    request.get('https://archives.nseindia.com/content/equities/EQUITY_L.csv')
    .pipe(csv())
    .on('data', (row) => {
      stocks.push({
        symbol: row.SYMBOL || 'default_symbol',
        name: row['NAME OF COMPANY'] || 'default_name',
        listingDate: row['DATE OF LISTING'] || 'default_date',
        meta: row,
        icon: `https://assets-netstorage.groww.in/stock-assets/logos/GSTK${stockSymbolToCode[row.SYMBOL]}.png`
      })
    })
    .on('end', async () => {
      try {
        await allStocksModel.insertMany(stocks);
      } catch (error) {
        console.log(error);
      }
      console.log('CSV file successfully processed');
    });
};
module.exports = populateStockDetails;