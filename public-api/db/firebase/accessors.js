const { FirebaseDB } = require('./firebase');
class FirebaseAccessors extends FirebaseDB{
    static keys = {
        historicalData: (symbol)=>`history${symbol}`,
    }
    async setHistoricalData(symbol,value){
        const key = FirebaseAccessors.keys.historicalData(symbol);
        await this.set(key,value);
    }
    async getHistoricalData(symbol){
        const key = FirebaseAccessors.keys.historicalData(symbol);
        return this.get(key);
    }
}
module.exports = { FirebaseAccessors };