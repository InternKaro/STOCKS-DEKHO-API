const BaseService = require('./base-service');
const {generateFakePriceData} = require('../../toolbox/helpers');
class Graph extends BaseService{
    constructor(props){
        super(props);
    }

    priceHistory(){
        const {stockSymbol, timeFrame} = this.params;
        const graphHistory = {
            stockSymbol,
            prices: generateFakePriceData(timeFrame),
        };
        return graphHistory;
    }
}
module.exports = Graph;