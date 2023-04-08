const { createClient } = require('redis');
let client;
async function setUpRedis() {
    const clientConfig = {
        url: 'redis://default:fdPBvRxEE96t67BLLWcke0pG0BQUaoRZ@redis-19874.c264.ap-south-1-1.ec2.cloud.redislabs.com:19874'
    };

    client = createClient(clientConfig);

    client.on('error', err => console.log('Redis Client Error', err));

    return client.connect().then((data)=> console.log(`Redis Connected`));
};

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
    async get(keyEntry){
        const {key} = RedisKeys[keyEntry];
        const data = await client.get(key);
        if(data){
            return JSON.parse(data);
        }
        return null;
    }
    async set(keyEntry,value){
        const {key, ttl} = RedisKeys[keyEntry];
        const data = JSON.stringify(value);
        return client.set(key,data,ttl);
    }
}

module.exports = { setUpRedis, client, ttlMap, RedisKeys, Redis}