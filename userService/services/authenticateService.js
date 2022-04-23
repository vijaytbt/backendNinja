const { response } = require('../utils/Response');
const connectionMangerInsert = require('../services/connectionManagerInsert');
const connectionServiceFetch = require('../services/connectionManagerFetch');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserLanguageMessages } = require('../utils/UserLanguageMessages');
const buildQuery = require('../dbFunctions/queryBuilder');

//get our config file
const config = require('../config');

class AuthenticateService {

    login(username, password) {
        console.log('inside login authenticateService->authenticate');
        return new Promise(async (resolve, reject) => {
            try {
                if (!username && !password) {
                    reject(response(false, UserLanguageMessages("MandatoryFieldErr"), "", 1000));
                }

                let finalQuery = buildQuery._getUser(username);

                let queryOutput = await connectionServiceFetch.getFromDB(finalQuery);

                if (!queryOutput.status) {
                    reject(response(false, UserLanguageMessages("QueryErr"), queryOutput.data, 1000));
                } else {
                    let userRetrieved = queryOutput.data;
                    userRetrieved = JSON.parse(JSON.stringify(userRetrieved[0]));

                    // console.log(userRetrieved);
                    
                    const match = await bcrypt.compare(password, userRetrieved["Password"]);

                    if (match) {
                        console.log("authentication success");
                        let payload = {
                            'id': userRetrieved.UserID,
                            'profileID':userRetrieved.UserDetailsID,
                            'name': userRetrieved.Name,
                            'email': userRetrieved.Email,
                            'createdOn': userRetrieved.CreatedOn
                        };
                        const token = jwt.sign(payload, config.secret, {
                            expiresIn: 60 * 50000 // "1h"
                        });

                        let userData = {
                            "token": token,
                            "name": userRetrieved.Name,
                            "id": userRetrieved.UserID,
                            'profileID':userRetrieved.UserDetailsID,
                            "createdOn": userRetrieved.CreatedOn,
                            "email": userRetrieved.Email
                        };
                        let message = UserLanguageMessages("LoginSuc") + ' ' + userRetrieved.Name;
                        resolve(response(true, message, userData, 0));
                    } else {
                        console.log("authentication failed due to wrong password");
                        reject(response(false, UserLanguageMessages("FailedAttemptErr"), '', 1000));
                    }
                }
            } catch (e) {
                reject(response(false, UserLanguageMessages("QueryErr"), e.message, 1000));
            }
        });
    }

    register(body) {
        return new Promise(async (resolve, reject) => {
            try {
                let passwordEncrypt = await bcrypt.hash(body.password, 10);
                connectionMangerInsert.masterInsert(buildQuery._insertUser(body.email, passwordEncrypt)
                ).then(
                    result => {
                        // console.log(result);
                        var userID = result.data[0];
                        // console.log(userID);
                        connectionMangerInsert.masterInsert(buildQuery._insertUserDetails(userID, body.firstName, body.lastName, body.address)
                        ).then(
                            result => {
                                resolve(response(true, UserLanguageMessages('CreatedSuc'), "", 1000));
                            }
                        ).catch(err => {
                            reject(response(false, UserLanguageMessages('RegisterErr'), { errorMsg: err.message }, 1000));
                        });
                    }
                ).catch(err => {
                    reject(response(false, UserLanguageMessages('RegisterErr'), { errorMsg: err.message }, 1000));
                });

            } catch (e) {
                reject(reject(response(false, UserLanguageMessages('FunctionErr'), e.message, 1000)));
            }
        });
    }
}

module.exports.Entry = AuthenticateService;
