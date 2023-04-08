const { client } = require('.');

const ttlMap = {
    OneHour : 60 * 60,
    OneDay : 60 * 60 * 24,
}

const RedisKeys = {
    MostActive: { key: 'most-active', ttl: ttlMap.OneHour },
    TopGainers: { key: 'top-gainers', ttl: ttlMap.OneHour },
    TopLoosers: { key: 'top-loosers', ttl: ttlMap.OneHour }, 
};

class Redis {
    constructor(){
        this.client = client;
    };
    async get(keyEntry){
        const {key} = RedisKeys[keyEntry];
        console.log(this.client);
        return this.client.get(key);
    }
    async set(keyEntry,value){
        const {key, ttl} = RedisKeys[keyEntry];
        return this.client.set(key,value,ttl);
    }
}

module.exports = { Redis, RedisKeys };