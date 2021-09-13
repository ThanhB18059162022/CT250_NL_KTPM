// Tham khảo https://joi.dev/api/?v=17.4.2
//https://stackoverflow.com/questions/57993305/how-can-i-validate-number-of-digits-from-joi-using-nodejs

const joi = require("joi");
const { getValidationResult } = require("../validatorHelper");

module.exports = class ModeratorsValidator {
  getResult = (schema, data) => getValidationResult(schema, data);

  validateNo = (mod_no) => {
    const schema = joi.object({
      mod_no: joi.number().integer().min(0).required(),
    });

    const result = this.getResult(schema, { mod_no });

    return result;
  };

  validatePhoneNumber = (mod_phoneNumber) => {
    const schema = joi.object({
      mod_phoneNumber: joi
        .string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
    });

    const result = this.getResult(schema, { mod_phoneNumber });

    return result;
  };

  validateMod_Id = (mod_id) => {
    const schema = joi.object({
      mod_id: joi
        .string()
        .length(9)
        .pattern(/^[0-9]+$/)
        .required(),
    });

    const result = this.getResult(schema, { mod_id });

    return result;
  };

  // Thêm quản trị
  validateAddModerator = (moderator = {}) => {
    const schema = joi.object({
      mod_name: joi.string().min(5).max(70).required(),
      mod_id: joi
        .string()
        .length(9)
        .pattern(/^[0-9]+$/)
        .required(),
      mod_phoneNumber: joi
        .string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      mod_sex: joi.boolean().required(),
      mod_address: joi.string().min(5).max(128).required(),
      mod_role: joi.number().integer().min(0).required(),
      mod_username: joi.string().alphanum().min(5).max(70).required(),
      mod_password: joi.string().min(5).max(64).required(),
    });

    const result = this.getResult(schema, moderator);

    return result;
  };

  // Sửa thông tin quản trị
  validateUpdateModerator = (moderator = {}) => {
    const schema = joi.object({
      mod_name: joi.string().min(5).max(70).required(),
      mod_id: joi
        .string()
        .length(9)
        .pattern(/^[0-9]+$/)
        .required(),
      mod_phoneNumber: joi
        .string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      mod_sex: joi.boolean().required(),
      mod_address: joi.string().min(5).max(128).required(),
      mod_role: joi.number().integer().min(0).required(),
      mod_password: joi.string().min(5).max(64).required(),
    });

    const result = this.getResult(schema, moderator);

    return result;
  };

  existModerator = (moderator) => moderator?.mod_no > 0;
};
