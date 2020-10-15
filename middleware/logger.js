const moment = require('moment'); // import moment

const logger = (req,res,next) => {
    // console log the protocol and url with the time we accessed
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
};

module.exports = logger; 