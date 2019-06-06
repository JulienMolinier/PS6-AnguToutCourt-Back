const jwt = require('jsonwebtoken');
const fs = require('fs');

class JWTServices {

    constructor() {
        this.privateKey = fs.readFileSync(`${__dirname}/../../mocks/private.key`, "utf-8");
        this.publicKey = fs.readFileSync(`${__dirname}/../../mocks/public.key`, "utf-8");
        console.log(">> " + this.privateKey);
    }

    sign(subject) {
        return jwt.sign({}, this.privateKey, {
            algorithm : 'RS256',
            subject : subject
          }
        );
    }

    verify(token) {
        try {
          var verif = jwt.verify(token, this.publicKey);
          return verif;
        }
        catch(ex) {
          return undefined;
        }
    }
}

module.exports = new JWTServices(); // 15 minutes par exemple
