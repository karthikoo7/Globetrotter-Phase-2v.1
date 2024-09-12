//this is a wrapAsync function used to specifiaclly handle async function error.
//used in place of the try and catch block.

module.exports = (fn) =>{
    return (req, res, next) => {
        fn(req, res, next) .catch(next);
    }
}