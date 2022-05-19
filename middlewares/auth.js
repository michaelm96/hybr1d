require('dotenv').config()
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

const authentication = async (req,res,next) => {
    const { authorization } = req.headers
    
    try{
        const splitAutho = authorization.split(" ");

        if(splitAutho[0] !== "Bearer"){
            return res.status(400).json({
                message:"Not Bearer token"
            });
        };

        if(!splitAutho[1]){
            return res.status(400).json({
                message:"Token not found"
            });
        };

        const decoded = jwt.verify(splitAutho[1], secretKey);
        req.userData = decoded
        next()
    }catch(err){
        console.log(err, "@29");
        return res.status(500).json(err)
    }
}

module.exports = authentication