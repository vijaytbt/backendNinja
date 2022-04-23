const {Entry} = require("../services/authenticateService");


module.exports = {
    //authenticates using given LoginName and Password
    authenticate: async function(req, res){
        console.log('Inside authenticate');
        let {username,password} = req.body, finalResponse;
        await new Entry().login(username, password)
            .then(loginResponse => {
                finalResponse = loginResponse;
            })
            .catch(error => {
                finalResponse = error;
            });
        res.json(finalResponse);
    },

    //user registration
    register:async (req, res) => {
        let userData = req.body, finalResponse;
        await new Entry().register(userData)
            .then(registerResponse => {
                finalResponse = registerResponse
            })
            .catch(err => {
                finalResponse = err
            })
        res.json(finalResponse);
    }

}