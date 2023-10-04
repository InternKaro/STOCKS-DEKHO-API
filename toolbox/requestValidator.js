const CoustomError = require('./errors/CoustomError');
const validateRequest = (schema,reqPart) =>
    (req,res,next) =>{
        const {value,error} = schema.validate(req[reqPart],{abortEarly: false});
        if(error){
            res.status(422).json({message: error.message});
        }
        else{
            next();
        }
    }
module.exports = { validateRequest };