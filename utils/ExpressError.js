//separate error handling class created that gets  a custom value , status and message from predefined Error class of Express.

class ExpressError extends Error{
    constructor(statusCode, message){
        super();
        this.statusCode = statusCode ;
        this.message = message;
    }
}

module.exports = ExpressError;