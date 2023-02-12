const csv = require('csv-parser');
const request = require('request');
const allStocksModel = require('../public-api/models/all-stocks-model');
async function populateStockDetails(){
    const stocks = [];
    request.get('https://archives.nseindia.com/content/equities/EQUITY_L.csv')
    .pipe(csv())
    .on('data', (row) => {
      stocks.push({
        symbol: row.SYMBOL || 'default_symbol',
        name: row['NAME OF COMPANY'] || 'default_name',
        listingDate: row['DATE OF LISTING'] || 'default_date',
        meta: row,
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