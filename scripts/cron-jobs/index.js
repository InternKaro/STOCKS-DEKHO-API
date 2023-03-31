const cron = require('node-cron');
const FetchLivePrices = require('./fetch-live-prices');
const EvictLocalCache = require('./evict-local-cache');
const SavePortfolioSnapshot = require('./save-portfolio-snapshot');
const cronJobs = [
    {
        name: 'fetch-live-prices',
        callback: FetchLivePrices,
        schedule: '*/15 * * * *'
    },
    {
        name:'evict-local-cache',
        callback: EvictLocalCache,
        schedule: '0 0 * * *',
    },
    {
        name: 'save-portfolio-snapshot',
        callback: SavePortfolioSnapshot,
        schedule: '0 0 * * *'
    }
];
(()=>{
    cronJobs.forEach((cronEntry)=>{
        cron.schedule(cronEntry.schedule,cronEntry.callback);
    });
})();
