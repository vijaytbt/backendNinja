const { response } = require("../utils/Response");
const { Entry } = require("../services/notesService");

module.exports = {

    // create new notes
    createNotes: async (req, res) => {
        let finalResponse;
        console.log("Request received to create notes");
        await new Entry().createNotes(req.headers.authorization, req.body.description)
            .then(result => finalResponse = result)
            .catch(error => finalResponse = error);
        res.json(finalResponse);
    },

    // update notes
    updateNotes: async (req, res) => {
        let finalResponse;
        console.log("Request received to update notes");
        await new Entry().updateNotes(req.headers.authorization, req.body.id, req.body.description)
            .then(result => finalResponse = result)
            .catch(error => finalResponse = error);
        res.json(finalResponse);
    },

    // fetch Notes
    fetchNotes: async (req, res) => {
        let finalResponse;
        console.log("Request received to fetch notes");
        await new Entry().fetchNotes(req.headers.authorization)
            .then(result => finalResponse = result)
            .catch(error => finalResponse = error);
        res.json(finalResponse);
    },

    // delete notes
    deleteNotes: async (req, res) => {
        let finalResponse;
        console.log("Request received to delete notes");
        await new Entry().deleteNotes(req.headers.authorization, req.body.id)
            .then(result => finalResponse = result)
            .catch(error => finalResponse = error);
        res.json(finalResponse);
    }
}
