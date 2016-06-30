var config = require('../../config');
var moment = require('moment');
var jwt    = require('jsonwebtoken');

module.exports.refreshToken = function(decoded,username) {
    var token_exp,
        now,
        newToken;

    token_exp = decoded.exp;
    now = moment().unix().valueOf();

    if((token_exp - now) < config.TOKEN_REFRESH_EXPIRATION) {
        console.log("Generating new token");
    
       if(username != null){ 
           newToken = jwt.sign({name: username}, config.secret, {
                                expiresIn : config.TOKEN_EXPIRATION
           });
       }

        if(newToken) {
            return newToken;
        }
    } else {
       return null;
    }
};