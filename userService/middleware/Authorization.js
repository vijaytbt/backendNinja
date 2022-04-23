const { UserLanguageMessages } = require('../utils/UserLanguageMessages');
const {response} = require('../utils/Response');

module.exports = {
    verifyToken: async (req, res, next) => {
        console.log("Request received, ensureAuthorization");
        if (req.decodedToken == null) {
            console.log("user not authenticated");
            console.log("BEnd Validation Error, NoTokenErr");
            console.log("Authorization failed");
            res.status(401).send(response(false, UserLanguageMessages("NoTokenErr"), '',1000));
            res.end();
        } else {
            console.log("user authorized");
            next();
        }
    }
};