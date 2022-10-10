class StatusError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

const badRequest = (message = 'Bad Request') => {
    throw new StatusError(400, message);
};

const notFound = (message = 'Not Found') => {
    throw new StatusError(404, message);
};

module.exports = {
    StatusError,
    badRequest,
    notFound
};
