const csv = require('csv-parser');
const request = require('request');
request.get('https://archives.nseindia.com/content/equities/EQUITY_L.csv')
    .pipe(csv())
    .on('data', (row) => {
      console.log(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });