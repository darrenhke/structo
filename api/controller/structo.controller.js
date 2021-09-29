'Use Strict';

const config = require('../../config').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const authenticate = async function (req,res,next) {
            //check if user is valid
            const validUser = req.body.user === config.devuser;
            if (!validUser) return res.status(400).send("Invalid User!");

            //check if password is valid
             const validPass =  await bcrypt.compare(req.body.password,config.devpassword);
             console.log('Valid Pass : '+validPass+" Request Password :"+req.body.password);
             if (!validPass) return res.status(400).send("Invalid Password!!!");

            const token = jwt.sign({username:validUser},config.secretjwt);
            res.status(200).json({token:{accessToken:token}});
     };


const token_exp = async function (req,res,next) {
    try {
         //check if user is valid
         const validUser = req.body.user === config.devuser;
         if (!validUser) return res.status(400).send("Invalid User!");
         //check if password is valid
          const validPass = await bcrypt.compare(req.body.password,config.devpassword);
          console.log('Valid Pass : '+validPass+" Request Password :"+req.body.password);
          if (!validPass) return res.status(400).send("Invalid Password!!!");
        const payload = {username:validUser}
        
        const access_token = jwt.sign(payload,config.secretjwt,{
            expiresIn: config.accesssTokenExpireJWTDuration,
        });

        const refresh_token = jwt.sign(payload,config.secretjwt,{
            expiresIn: config.refreshTokenExpireJWTDuration,
        });
          
         res.status(200).json(
             {token:
                {accessToken: access_token, expiresIn: config.accesssTokenExpireJWTDuration,
                refreshToken: refresh_token, expiresIn: config.refreshTokenExpireJWTDuration}
             });
  
     } catch (error) {
         return res.status(401).json({status: "Error", message:`User ${req.body.user} is not authorized!`});
     }

};

const about = async function(req,res,next){
    try{
        return res.status(200).send("Hello World");
    }
    catch{
        return res.status(401);
    }
    
}


const salt = async function(req,res,next){
   //Hash Password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password,salt); 
   res.status(200).send({hashedPassword:hashedPassword,plainPassword:req.body.password,secret:config.secretjwt});
    
}


module.exports.about = about;
module.exports.authenticate = authenticate;
module.exports.token_exp = token_exp;
module.exports.salt = salt;
