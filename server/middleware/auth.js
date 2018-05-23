var jwt = require('jsonwebtoken');

exports.loginRequired = function(request, response, next) {
    try {
        if (!request.headers.authorization) {
            const error = new Error('Missing authorization header');
            error.status = 400;
            throw error;
        }
        const token = request.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function(error, decoded) {
            if (decoded) {
                next();
            } else {
                const error = new Error('Incorrect authorization token');
                error.status = 401;
                throw error;
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.ensureCorrectUser = function(request, response, next) {
    try {
        const token = request.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (decoded && decoded.id === request.params.id) {
                next();
            } else {
                const error = new Error('Unauthorized');
                error.status = 401;
                throw error;
            }
        });
    } catch (error) {
        next(error);
    }
};
