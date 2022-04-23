const controller_authenticate = require('../controllers/authenticate');

exports.api = (router) => {
    router.route('/user/v1/login').post(controller_authenticate.authenticate);
    router.route('/user/v1/register').post(controller_authenticate.register);
};

