const axios = require('axios');
const BaseRequestService = require('./base-request-service');
class NSERequestService extends BaseRequestService{
    static session
    constructor(props){
        super(props);
        this.baseUrl = 'https://www.nseindia.com';
        this.headers = {
            cookie: {},
        }
    };
    async init(){
        if(NSERequestService.session){
            return;
        }
        await this.createSession();
    }
    async createSession(){
      NSERequestService.session = await axios.get(this.baseUrl,{timeout: 20000});
      this.headers.cookie = NSERequestService.session.headers['set-cookie'].join(';');
    }
    async get(uri){
        const response = await super.get(uri,{headers:this.headers});
        return response.data;
    }
};
module.exports = NSERequestService;