const notes = require('./notes');
const {verifyToken} = require('../middleware/Authorization');

exports.api = (router) => {

    //Authorization required
    router.use(verifyToken);
    notes.authApi(router);

    return router;
};