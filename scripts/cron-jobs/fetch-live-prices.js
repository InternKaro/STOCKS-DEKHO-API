// const populateStockDetails = require('../populate-stock-details');
const PriceService = require('../../public-api/services/price')
module.exports = async ()=>{
    try {
        const priceServiceInstance = new PriceService({})
        await priceServiceInstance.populateStockDetails();
    } catch (error) {
        console.log(error)
    }
   
};