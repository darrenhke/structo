const jwt = require('jsonwebtoken');
const config = require('../../config').config();

//Create and assign token
function generateToken(data){
    return jwt.sign(data,config.securityKey);
} 

module.exports.generateToken = generateToken;