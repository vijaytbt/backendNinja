require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const models = require('./models');
const routes = require('./routes/index.js')
const app = module.exports = express();
const router = express.Router();
const {response} = require('./utils/Response');
const {UserLanguageMessages} = require('./utils/UserLanguageMessages');
var jwt = require('jsonwebtoken');
const config = require('./config');//get our config file

//middleware used in application
app.use(fileUpload());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false, limit: "50mb", parameterLimit: 50000}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use("/Images",express.static('Images'));
app.use(cors({credentials: true}));

app.set('superSecret', config.secret);
app.set('jwt', jwt);

//Sync Databases
//Establish connection with the DB
//Sync Database
models.sequelize.sync().then(function() {
  console.log('Good! with DB connection')
}).catch(function (err) {
  console.log(err);
  console.log('Something went wrong with DB connection')
});


global.GLOBALlangID = 'en';

//Token validation
router.use(function (req, res, next) {
    req.decodedToken = {};
    let token = req.headers.authorization;
    GLOBALlangID = req.headers.language ? req.headers.language : 'en';
    if (token) {
        bearerToken = token.split(" ");
        if (bearerToken.length === 2) {
            jwt.verify(bearerToken[1], app.get('superSecret'), function (err, decodedToken) {
                if (err) {
                    console.log("BEnd Validation Error, InvalidTokenErr");
                    return res.json(response(false, UserLanguageMessages("InvalidTokenErr"), "", 0));
                } else {
                    req.decodedToken = decodedToken;
                    req.tokenOnly = bearerToken[1];
                    next();
                }
            });
        } else {
            console.log("BEnd Validation Error, InvalidTokenErr");
            return res.json(response(false, UserLanguageMessages("InvalidTokenErr"), "", 100));
        }
    } else {
        console.log("No Bearer Token");
        req.decodedToken = null;
        next();
    }
});

//api routes
app.use('/api', routes.api(router));

//starting server
let port = process.env.PORT || 9001;
app.listen(port, () => {
    console.log(`Server started at port ${port}...`);
});

module.exports = app;