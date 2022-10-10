const { StatusError } = require("./StatusError");

function handleError(err, res) {
    if(err instanceof StatusError) {
        res.status(err.statusCode);
        res.json({ message: err.message });
    } else if(err.name === 'SequelizeValidationError') {
        res.status(400);
        const errors = err.errors;
        if(errors.length === 1) {
            res.json({ message: errors[0].message });
        } else {
            res.json({ message: errors.map(error => error.message) });
        }
    } else {
        console.log(err);
        res.sendStatus(500);
    }
}

module.exports = handleError;
