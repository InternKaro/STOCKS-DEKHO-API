class BaseService{
    constructor(props){
        this.body = props.body || {},
        this.query = props.query || {},
        this.params = props.params || {},
        this.headers = props.rawHeaders || {}
    }
}
module.exports = BaseService