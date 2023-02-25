async function responseHandler(arg,res){
    let response;
    try {
        response = await arg;
    } catch (error) {
        console.log(error.message);
        let message = 'Something Wrong';
        let code = 500;
        try {
            message = JSON.parse(error?.message)?.statement;
            code = JSON.parse(error?.message)?.code;
        } catch (e) {
            message = error?.message || message;
            code =  message.code || code;
        }
        return res.status(code).json({message});
    }
    return res.json(response)
}
module.exports = responseHandler;