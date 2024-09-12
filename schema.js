const Joi = require('joi');

//joi is an npm package use to enforce serer side validations.
// we define a separate schema of required objects that must be filled for data to sent to server .

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0), // price must have a minimum value of 0 and nor any negative number.
        image: Joi.string().allow("", null), //image is allowed to have an empty string or null value for input

    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required
})
