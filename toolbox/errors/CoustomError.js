class CoustomError extends Error{
    constructor(message,code){
        super(JSON.stringify({statement: message,code}));
    }
}
module.exports = CoustomError;