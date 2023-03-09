const express = require('express');
const User = require('../services/user');
const responseHandler = require('../../toolbox/helpers/response-handler');
const router = express.Router();

router.post('/signup', (req,res)=>{
    const userService = new User(req);
    return responseHandler(userService.signup(),res)
});


module.exports = router;