const LocalCache = require('../../toolbox/local-cache');
module.exports = ()=>{
    const cache = new LocalCache();
    cache.evict();
}