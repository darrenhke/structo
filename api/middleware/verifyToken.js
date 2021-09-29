const jwt = require('jsonwebtoken');
const config = require('../../config').config();


module.exports = function verify (req,res,next){
    
    const token = req.header('structo-auth-token');

    if (!token) {
        //logger.error("Access Denied! Please login.")
        return res.status(401).json({status: "Error", message:"Access Denied! Please login."})
    };

    jwt.verify(token,config.secretjwt,(err,decoded) =>{
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            next(err.message);
        }        
    });
}
