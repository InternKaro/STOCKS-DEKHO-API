const  { initializeApp } = require('firebase/app');
const firebaseConfig = {
  apiKey: 'AIzaSyDNvt2AcKj_AdEK0yn0DyTcdNPq0dSLi1U',
  authDomain: 'stock-dekho-b417c.firebaseapp.com',
  projectId: 'stock-dekho-b417c',
  storageBucket: 'stock-dekho-b417c.appspot.com',
  messagingSenderId: '381179867033',
  appId: '1:381179867033:web:0ce66819ca655b0d1e2d08',
  measurementId: 'G-7NY1YG3QR4'
};

const app = initializeApp(firebaseConfig);
module.exports = app
