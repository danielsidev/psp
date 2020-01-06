import * as jwt from 'jsonwebtoken';

class Jwt{
    constructor(){
        this.token = null;
        this.timeExpire = (3600*24);  /* 24 hours -  86400 seconds */
        this.verifyRes= {auth:false, message:'', decoded:null};
    }
    sign(dataUser){
        return new Promise((resolve, reject) => {
            this.token = jwt.sign({data:dataUser}, process.env.SECRET, {expiresIn:this.timeExpire});
            resolve(this.token);
        });
    }

    
    verify(token){
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if(err){
                    this.verifyRes.auth = false;
                    this.verifyRes.message = err;
                    this.verifyRes.decoded = null;
                    reject(this.verifyRes);
                }else{
                    this.verifyRes.auth = true;
                    this.verifyRes.message = 'Token valid!'
                    this.verifyRes.decoded = decoded;
                    resolve(this.verifyRes);
                }
            });
        });

    }
}

module.exports = Jwt;