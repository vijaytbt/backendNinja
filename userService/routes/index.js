const authenticate = require('./authenticate');
const user = require('./user');

const notes = require('./Notes')
const {verifyToken} = require('../middleware/Authorization');

exports.api = (router) => {

    //No authorization required
    authenticate.api(router);
    user.api(router);

    //Authorization required
    router.use(verifyToken);
    user.authApi(router);
    notes.authApi(router);

    return router;
};