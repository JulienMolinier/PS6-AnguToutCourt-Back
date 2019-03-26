const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('University', {
  imgPath: Joi.string()
    .required(),
  name: Joi.string()
    .required(),
  country: Joi.string()
    .required(),
  city: Joi.string()
    .required(),
  program: Joi.string()
    .required(),
  placesNumber: Joi.number()
    .required(),
  description: Joi.string()
    .required(),
});
