const { response } = require('../utils/Response');
const connectionMangerInsert = require('../services/connectionManagerInsert');
const connectionServiceFetch = require('../services/connectionManagerFetch');
const { UserLanguageMessages } = require('../utils/UserLanguageMessages');
const buildQuery = require('../dbFunctions/queryBuilder');

//get our config file
const config = require('../config');

class NotesService {

    createNotes(userID, profileID, description) {
        console.log('inside create notes NotesService->createNotes');
        return new Promise(async (resolve, reject) => {
            try {
                
                let finalQuery = buildQuery._insertNotes(userID, profileID, description);

                let queryOutput = await connectionMangerInsert.masterInsert(finalQuery);

                if (!queryOutput.status) {
                    reject(response(false, UserLanguageMessages("QueryErr"), queryOutput.data, 1000));
                } else {
                    resolve(response(true, UserLanguageMessages("CreatedSuc"), "", 0));
                }
            } catch (e) {
                reject(response(false, UserLanguageMessages("QueryErr"), e.message, 1000));
            }
        });
    }

    updateNotes(userID, profileID, id, description) {
        console.log('inside update notes NotesService->updateNotes');
        return new Promise(async (resolve, reject) => {
            try {
                
                let finalQuery = buildQuery._updateNotes(userID, profileID, id, description);

                let queryOutput = await connectionServiceFetch.complexGetFromDB(finalQuery);

                if (!queryOutput.status) {
                    reject(response(false, UserLanguageMessages("QueryErr"), queryOutput.data, 1000));
                } else {
                    resolve(response(true, UserLanguageMessages("UpdateSuc"), "", 0));
                }
            } catch (e) {
                reject(response(false, UserLanguageMessages("QueryErr"), e.message, 1000));
            }
        });
    } 

    fetchNotes(userID, profileID, id, description) {
        console.log('inside fetch all notes NotesService->fetchNotes');
        return new Promise(async (resolve, reject) => {
            try {
                
                let finalQuery = buildQuery._fetchNotes(userID, profileID);

                let queryOutput = await connectionServiceFetch.getFromDB(finalQuery);

                if (!queryOutput.status) {
                    reject(response(false, UserLanguageMessages("QueryErr"), queryOutput.data, 1000));
                } else {
                    resolve(response(true, "", queryOutput.data, 0));
                }
            } catch (e) {
                reject(response(false, UserLanguageMessages("QueryErr"), e.message, 1000));
            }
        });
    }

    deleteNotes(id) {
        console.log('inside detele notes NotesService->deleteNotes');
        return new Promise(async (resolve, reject) => {
            try {
                
                let finalQuery = buildQuery._deleteNotes(id);

                let queryOutput = await connectionServiceFetch.complexGetFromDB(finalQuery);

                if (!queryOutput.status) {
                    reject(response(false, UserLanguageMessages("QueryErr"), queryOutput.data, 1000));
                } else {
                    resolve(response(true, UserLanguageMessages("DeletedSuc"), "", 0));
                }
            } catch (e) {
                reject(response(false, UserLanguageMessages("QueryErr"), e.message, 1000));
            }
        });
    }   
}

module.exports.Entry = NotesService;
