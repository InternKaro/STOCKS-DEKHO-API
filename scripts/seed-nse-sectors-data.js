const NSERequestService = require('../toolbox/helpers/request-service/nse-request-service');
const { SectorModel } = require('../public-api/models');
const sectorsArray = ['NIFTY AUTO','NIFTY FINANCIAL SERVICES','NIFTY BANK','NIFTY ENERGY','NIFTY FMCG','NIFTY IT','NIFTY MEDIA','NIFTY METAL','NIFTY PHARMA','NIFTY REALTY','NIFTY HEALTHCARE INDEX', 'NIFTY OIL & GAS'];
const nseRequestService = new NSERequestService();
require('./mongo-setup');
(async function seedSectorData(){
    await nseRequestService.init();
    for(const sector of sectorsArray){
        const nseResponse = await nseRequestService.get(`https://www.nseindia.com/api/equity-stockIndices?index=${sector}`);
        if(nseResponse.data && nseResponse.data.length){
            console.log('inserting',sector);
            await SectorModel.create({name: sector, stocks: nseResponse.data.map((stock)=>stock.symbol)});
        }
    }
})();