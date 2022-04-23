module.exports = {
  "test": {

  },
  "development": {
      "database": process.env.RDS_DATABASE,
      "username": process.env.RDS_USERNAME,
      "password":  process.env.RDS_PASSWORD,
      "host": process.env.RDS_HOSTNAME,
      "port": process.env.RDS_PORT,
      "dialect": "mysql",
      "dialectOptions": {
        "multipleStatements": true
      }
  },
    "production": {
      "username": "MASTERrw",
      "password": "dbAdminAll",
      "database": "db1",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
};
