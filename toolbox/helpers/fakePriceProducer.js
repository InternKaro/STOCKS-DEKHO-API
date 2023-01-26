const moment = require('moment');
// Accepts timeFrame in days
function generateFakePriceData(timeFrame){
    const fakeData = [];
    const oneYearAgo = moment().subtract(timeFrame - 1, 'days').startOf('day');
    const currentDate = moment().endOf('day');
    while (oneYearAgo.isBefore(currentDate)) {
      const midPrice = Math.floor(Math.random() * 10000) + 50;
      const date = moment(oneYearAgo);
      fakeData.push({ midPrice, date });
      oneYearAgo.add(1, 'day');
    }
    return fakeData;
};
module.exports = generateFakePriceData;