var finalQuery = '';

var self = module.exports = {

    _getUser: (username) => {
        finalQuery = `SELECT ur.UserID, uid.UserDetailsID, ur.Email, ur.Password, ur.CreatedOn, CONCAT(IFNULL(uid.FirstName,''), ' ', IFNULL(uid.LastName,'')) AS Name FROM user AS ur INNER JOIN user_details uid ON uid.UserID = ur.UserID WHERE ur.Email = '${username}' AND ur.UserStatus = 1 LIMIT 1;`;
        return finalQuery;
    },

    _insertUser: (Email, password) => {
        finalQuery = `Insert into user (Email, Password, CreatedOn) values ('${Email}', '${password}', UTC_TIMESTAMP());`;
        return finalQuery;
    },

    _insertUserDetails: (userID, firstName, lastName, address) => {
        finalQuery = `Insert into user_details (UserID, FirstName, LastName, Address, CreatedBy, CreatedOn) values ('${userID}', '${firstName}', '${lastName}', '${address}', '${userID}', UTC_TIMESTAMP());`;
        return finalQuery;
    }
};
