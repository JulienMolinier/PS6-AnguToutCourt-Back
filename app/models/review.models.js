const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Review', {
  StudentId: Joi.number()
    .required(),
  Description: Joi.string()
    .required(),
  Country: Joi.string()
    .required(),
  Major: Joi.string()
    .required(),
  City: Joi.string()
    .required(),
});
