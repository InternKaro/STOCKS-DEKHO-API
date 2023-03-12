class LocalCache {
    static objectStore = {};
    get(key){
        return LocalCache.objectStore[key];
    }
    set(key,value){
        LocalCache.objectStore[key] = value;
    }
    evict(){
        LocalCache.objectStore = {};
    }
}
module.exports = LocalCache;