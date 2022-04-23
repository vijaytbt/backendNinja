var finalQuery = '';
const { v4: uuidv4 } = require('uuid');

var self = module.exports = {

    _insertNotes: (userID, profileID, description) => {
        finalQuery = `Insert into notes (UserID, UserDetailsID, Description, CreatedBy, CreatedOn) values ('${userID}', '${profileID}', '${description}', '${userID}', UTC_TIMESTAMP());`;
        return finalQuery;
    },

    _updateNotes: (userID, profileID, id, description) => {
        finalQuery = `update notes set Description = '${description}',
                     ModifiedBy = ${userID}, 
                     ModifiedOn = UTC_TIMESTAMP()
                     WHERE NotesID = ${id} AND UserID = ${userID} AND UserDetailsID = ${profileID}`;
        return finalQuery;
    },

    _fetchNotes: (userID, profileID) => {
        finalQuery = `SELECT NotesID, UserID, UserDetailsID, Description FROM notes WHERE UserID = ${userID} AND UserDetailsID = ${profileID}`;
        return finalQuery;
    },

    _deleteNotes: (id) => {
        finalQuery = `DELETE FROM notes WHERE NotesID = ${id}`;
        return finalQuery;
    }
};
