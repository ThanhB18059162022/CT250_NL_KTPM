// Tạo jwt token
const jwt = require("jsonwebtoken");
//Đọc file env
require("dotenv").config();

module.exports = class AuthenticationController {
    login = (req, res)=>{
        const secretToken = process.env.SECRET_TOKEN;
        const user = {
            id: 12,
            username: "alex",
            name: "alexander"
        };

        //Tạo token hết đát trong 30p
        const token = jwt.sign({user}, secretToken, {expiresIn : "30m"});

        return res.json({token});
    }

    loginAsync = (req, res)=>{
        const secretToken = process.env.SECRET_TOKEN;
        const user = {
            id: 12,
            username: "alex",
            name: "alexander"
        };

        //Tạo token hết đát trong 30p
        jwt.sign({user}, secretToken, {expiresIn : "1m"}, (err, token) => {
            return err ? 
            res.status(400).send() :
            res.json({token});
        });
    }
}