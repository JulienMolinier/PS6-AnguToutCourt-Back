const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Review', {
  email: Joi.string()
    .required(),
  Description: Joi.string()
    .required(),
  universityId: Joi.number()
    .required(),
  Rate: Joi.number()
    .required(),
  Date: Joi.date()
    .required(),
});
