async function responseHandler(arg,res){
    let response;
    try {
        response = await arg;
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message || 'Something Wrong'});
    }
    return res.json(response)
}
module.exports = responseHandler;