import { Request } from 'express';
export default class BaseService{
    body : Record<string,unknown>;
    query : Record<string,unknown>;
    params : Record<string,unknown>;
    constructor(props){
        this.body = props.body || {},
        this.query = props.query || {},
        this.params = props.params || {}
    }
}