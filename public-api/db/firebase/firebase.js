const  { initializeApp } = require('firebase/app');
const { getDatabase, set, ref, onValue } = require('firebase/database');
class FirebaseDB {
    static firebaseConfig = {
        apiKey: 'AIzaSyDNvt2AcKj_AdEK0yn0DyTcdNPq0dSLi1U',
        authDomain: 'stock-dekho-b417c.firebaseapp.com',
        projectId: 'stock-dekho-b417c',
        storageBucket: 'stock-dekho-b417c.appspot.com',
        messagingSenderId: '381179867033',
        appId: '1:381179867033:web:0ce66819ca655b0d1e2d08',
        measurementId: 'G-7NY1YG3QR4'
    };
    constructor(){
        if(!FirebaseDB.app){
            FirebaseDB.app = initializeApp(FirebaseDB.firebaseConfig);       
        }
        if(!FirebaseDB.db){
            FirebaseDB.db = getDatabase(); 
        }
    }
    getApp(){
        return FirebaseDB.app;
    }
    async set(key,value){
        await set(ref(FirebaseDB.db, key), JSON.stringify(value));
    }
    async get(key){
        let data;
        await new Promise(resolve => {
        onValue(ref(FirebaseDB.db, key), (snapshot) => {
            data = snapshot.val()
            resolve();
        })
      })
        return JSON.parse(data);
    }
}
module.exports = { FirebaseDB };

