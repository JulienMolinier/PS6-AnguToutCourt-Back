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
  rates: Joi.array()
    .items(Joi.number())
    .required(),
  nbReviews: Joi.number()
    .required(),
  rate: Joi.number(),
  nbOldExp: Joi.number()
    .required(),
  semester: Joi.array()
    .items(Joi.number())
    .required(),
  campusDesc: Joi.string()
    .required(),
  campusImgs: Joi.array()
    .items(Joi.string())
    .required(),
  location: Joi.string()
    .required(),
  inscriptiondesc: Joi.string()
    .required(),
  contacts: Joi.string()
    .required(),
  recommended: Joi.boolean().required(),
  major: Joi.array()
    .items(Joi.string())
    .required(),
});
