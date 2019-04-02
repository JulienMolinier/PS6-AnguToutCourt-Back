const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Profile', {
  firstName: Joi.string()
    .required(),
  lastName: Joi.string()
    .required(),
  password: Joi.string()
    .required(),
  username: Joi.string()
    .required(),
});
