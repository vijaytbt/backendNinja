const { QueryTypes } = require('sequelize');
const db = require('../models');


var self = module.exports = {

	getFromDB: async (Query) => {
        let result = {};
		await db.sequelize.query(
			Query,
			{ type: QueryTypes.SELECT }
		).then(Details =>  {
			result.data = Details;
			result.status = true;
			return result;
		}).catch(error => {
			console.log("DB Query Error");
			console.log(error);
			result.data = error;
			result.status = false;
			return result;
		});
		return result;
	},

	complexGetFromDB: async (Query) => {
        let result = {};
	// console.log("inside complex get query connection");
		await db.sequelize.query( Query ).then(Details =>  {
			result.data = Details;
			result.status = true;
			return result;
		}).catch(error => {
			console.log("DB Query Error");
			console.log(error);
			result.data = error;
			result.status = false;
			return result;
		});
		return result;
	}
};
