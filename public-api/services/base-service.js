class BaseService{
    constructor(props){
        this.body = props.body || {},
        this.query = props.query || {},
        this.params = props.params || {}
    }
}
module.exports = BaseService