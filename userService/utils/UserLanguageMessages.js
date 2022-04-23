const EN = require("./UserTextMessages/EN");
const TA = require("./UserTextMessages/TA");

module.exports.UserLanguageMessages = (objKey)=>{
    let UserMessages = EN;

    if(GLOBALlangID.toLowerCase() == 'tn') {
        UserMessages = TA;
    }
    return Object.keys(UserMessages).find(k => UserMessages[k] === objKey);
}