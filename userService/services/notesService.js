const fetch = require( 'node-fetch');
const { response } = require('../utils/Response');
const { UserLanguageMessages } = require('../utils/UserLanguageMessages');

class NotesService {

    createNotes(token, description) {
        console.log('inside create notes NotesService->createNotes');
        return new Promise(async (resolve, reject) => {
            try {
              fetch("http://localhost:9002/api/user/v1/createNotes", {
                method: "post",
                body: JSON.stringify({ description: description }),
                headers: { "Content-Type": "application/json",
                          "authorization": token
                 },
              })
                .then((res) => res.json())
                .then((json) => {
                  // console.log(json);
                  resolve(json);
                })
                .catch((e) => {
                  reject(response(false, UserLanguageMessages("QueryErr"), e.message, 1000));
              });
            } catch (e) {
                reject(response(false, UserLanguageMessages("QueryErr"), e.message, 1000));
            }
        });
    }

    updateNotes(token, id, description) {
        console.log('inside update notes NotesService->updateNotes');
        return new Promise(async (resolve, reject) => {
            try {
              fetch("http://localhost:9002/api/user/v1/updateNotes", {
                method: "put",
                body: JSON.stringify({ id: id, description: description }),
                headers: { "Content-Type": "application/json",
                          "authorization": token
                 },
              })
                .then((res) => res.json())
                .then((json) => {
                  // console.log(json);
                  resolve(json);
                })
                .catch((e) => {
                  reject(response(false, UserLanguageMessages("QueryErr"), e.message, 1000));
              });
            } catch (e) {
                reject(response(false, UserLanguageMessages("QueryErr"), e.message, 1000));
            }
        });
    }
   
   fetchNotes(token, id, description) {
        console.log('inside fetch all notes NotesService->fetchNotes');
        return new Promise(async (resolve, reject) => {
            try {
              fetch("http://localhost:9002/api/user/v1/getNotes", {
                method: "get",
                headers: { "Content-Type": "application/json",
                          "authorization": token
                 },
              })
                .then((res) => res.json())
                .then((json) => {
                  // console.log(json);
                  resolve(json);
                })
                .catch((e) => {
                  reject(response(false, UserLanguageMessages("QueryErr"), e.message, 1000));
              });
            } catch (e) {
                reject(response(false, UserLanguageMessages("QueryErr"), e.message, 1000));
            }
        });
    }

    deleteNotes(token, id) {
        console.log('inside detele notes NotesService->deleteNotes');
        return new Promise(async (resolve, reject) => {
            try {
              fetch("http://localhost:9002/api/user/v1/deleteNotes", {
                method: "delete",
                body: JSON.stringify({ id: id }),
                headers: { "Content-Type": "application/json",
                          "authorization": token
                 },
              })
                .then((res) => res.json())
                .then((json) => {
                  // console.log(json);
                  resolve(json);
                })
                .catch((e) => {
                  reject(response(false, UserLanguageMessages("QueryErr"), e.message, 1000));
              });
            } catch (e) {
                reject(response(false, UserLanguageMessages("QueryErr"), e.message, 1000));
            }
        });
    }
}

module.exports.Entry = NotesService;
