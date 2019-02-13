const jwt = require('jsonwebtoken');
const { authConfig } = require('../../../config').appConfig;

// handler to compare password
const comparePassword = (givenPW, savedPW, cb) => {
    if (givenPW === savedPW) {
        cb(null, true);
    } else {
        cb({ error: "invalid password" });
    }
};

const generateJSONToken = (payload, done) => {
    jwt.sign(payload, authConfig.jwtSecret, { expiresIn: '10h' }, done);
};

const verifyJSONToken = (token, done) => {
    jwt.verify(token, authConfig.jwtSecret, done);
};

const isUserAuthenticated = (req, res, next) => {
    const header = req.get('Authorization');
    //console.log('header : ', header);
    if (!header) {
        res.status(401).json({ isAuthenticated: false });
    }

    const token = header.replace('Bearer ', '');
    //console.log('token : ' , token);

    verifyJSONToken(token, (err, decoded) => {
        if (err) {
            res.status(401).json({ isAuthenticated: false });
        } else {
            req.userId = decoded.userId;
            next();
        }
    })

};

module.exports = {
    comparePassword,
    generateJSONToken,
    verifyJSONToken,
    isUserAuthenticated
}
