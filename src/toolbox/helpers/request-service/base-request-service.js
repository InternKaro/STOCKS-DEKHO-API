const axios = require('axios');
const {Axios} = axios;
class BaseRequestService{
    async get(uri,config){
        return axios.get(uri,config)
    }
};
module.exports = BaseRequestService;