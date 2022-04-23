const controller = require('../controllers/notes');

exports.authApi = (router) => {
    router.route('/user/v1/createNotes').post(controller.createNotes);
    router.route('/user/v1/updateNotes').put(controller.updateNotes);
    router.route('/user/v1/getNotes').get(controller.fetchNotes);
    router.route('/user/v1/deleteNotes').delete(controller.deleteNotes);
    
};
