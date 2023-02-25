const CoustomError = require('./CoustomError');
class BadRequest extends CoustomError{
    constructor(message){
        super(message,400);
    }
}
module.exports = BadRequest;