const jwt = require('jsonwebtoken');
const { authConfig } = require('../../../config').appConfig;

const log = require('../../../../logger');

const signToken = (payload, secret, expireIn, callback) => {
    log.info('Sign token');
    const ex = { expiresIn: expireIn };
    jwt.sign(payload, secret, ex, callback);

};

const verifyToken = (token, secret, callback) => {
    jwt.verify(token, secret, (error, decoded) => {
        let errMsg;
        if (error && !decoded) {
            errMsg = 'invalid token';
        }

        callback(errMsg, decoded);

    });
};

const isUserAuthenticated = (req, res, next) => {
    const header = req.get('Authorization');
    log.info('header : ', header);
    if (!header) {
        res.status(403).send('Not authenticated');
    } else {
        const token = header.replace('Bearer ', '');
        log.info('token : ' , token);

        verifyToken(token, authConfig.jwtSecret, (err, decoded) => {

            log.info('err in verifytoken:',err);
            if (err && err.message) {
                if (err.name === 'TokenExpiredError') {
                    res.status(403).send(err.message);
                } else {
                    res.status(403).send('invalid token');
                }
            } else if (err) {
                res.status(403).send(err);
            } else if (next) {
                log.info('calling next');
                next();
            }
        });
    }
};

const isUserAuthenticatedRouter = (req, res) => {

    return new Promise((resolve, reject) => {
        const header = req.get('Authorization');

        if (!header) {
            reject({
                message: 'Not authenticated',
                status: 403
            });
        } else {
            const token = header.replace('Bearer ', '');
            
            verifyToken(token, authConfig.jwtSecret, (err, decoded) => {

                log.info('err:',err);
                if (err) {

                    reject({
                        message: 'invalid token',
                        status: 403
                    });

                } else {
                    
                    resolve({
                        message: 'valid token',
                        status: 403
                    });
                }
            })
        }
    });

};

module.exports = {
    signToken,
    verifyToken,
    isUserAuthenticated,
    isUserAuthenticatedRouter
}