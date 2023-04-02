require('../../scripts/mongo-setup');
const { PriceTicksModel, HoldingsModel, PortfolioSnapshotModel } = require('../../public-api/models');
let currentPriceTicks;
let pageNumber = 0;

async function getCurrentSnapshotChunk(){
    const chunks =  await HoldingsModel.find({}).limit(5).skip(5 * pageNumber);
    pageNumber+=1;
    return chunks;
}

async function getCurrentPortfolioValuesForChunk(portfolioSnapshotsChunk){
    return portfolioSnapshotsChunk.map((portfolioEntry)=>{
        const { userId, holdings } = portfolioEntry;
        let value = 0;
        Object.keys(holdings).forEach(symbol => {
            if(!currentPriceTicks[symbol]?.lastPrice){
                console.error('Price not found',symbol);
            }
            value+= ((currentPriceTicks[symbol]?.lastPrice || 0)*parseInt(holdings[symbol]))
        });
        return { userId, value: value.toFixed(2) };
    });
}

async function SavePortfolioSnapshot(){
    console.debug('Saving Portfolio Snapshopt');
    currentPriceTicks = await PriceTicksModel.find();
    currentPriceTicks = currentPriceTicks.reduce(
        (acc, priceTick) => {return {...acc, [priceTick.symbol]: priceTick}},
        {}
    );
    let last = false;
    while(!last){
        const  portfolioSnapshotsChunk = await getCurrentSnapshotChunk();
        last = !Boolean(portfolioSnapshotsChunk.length);
        const currentPortfolioValuesForChunk =  await getCurrentPortfolioValuesForChunk(portfolioSnapshotsChunk);
        await PortfolioSnapshotModel.create(currentPortfolioValuesForChunk);
    }
}

module.exports = SavePortfolioSnapshot;