const { QueryTypes } = require('sequelize');
const db = require('../models');


const self = module.exports = {
	masterInsert: async (Query) => {
		let result = {};
		await db.sequelize.query(
			Query,
			{type: QueryTypes.INSERT}
		).then(Details => {
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

