const Validator = require("../Validator");

module.exports = class ModeratorsValidator extends Validator {
  // Kiểm tra mã hợp lệ
  validateNo = (mod_no) => {
    const schema = this.joi.object({
      mod_no: this.joi.number().integer().min(0).required(),
    });

    const result = this.getValidationResult(schema, { mod_no });

    return result;
  };

  // Kiểm tra số điện thoại hợp lệ
  validatePhoneNumber = (mod_phoneNumber) => {
    const schema = this.joi.object({
      mod_phoneNumber: this.joi
        .string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
    });

    const result = this.getValidationResult(schema, { mod_phoneNumber });

    return result;
  };

  // Kiểm tra CMND hợp lệ
  validateMod_Id = (mod_id) => {
    const schema = this.joi.object({
      mod_id: this.joi
        .string()
        .length(9)
        .pattern(/^[0-9]+$/)
        .required(),
    });

    const result = this.getValidationResult(schema, { mod_id });

    return result;
  };

  // Kiểm tra tài khoản hợp lệ
  validateUsername = (mod_username) => {
    const schema = this.joi.object({
      mod_username: this.joi.string().alphanum().min(5).max(70).required(),
    });

    const result = this.getValidationResult(schema, { mod_username });

    return result;
  };

  // Thêm quản trị
  validateAddModerator = (moderator = {}) => {
    const schema = this.joi.object({
      mod_name: this.joi.string().min(5).max(70).required(),
      mod_id: this.joi
        .string()
        .length(9)
        .pattern(/^[0-9]+$/)
        .required(),
      mod_phoneNumber: this.joi
        .string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      mod_sex: this.joi.boolean().required(),
      mod_address: this.joi.string().min(5).max(128).required(),
      mod_role: this.joi.number().integer().min(0).required(),
      mod_username: this.joi.string().alphanum().min(5).max(70).required(),
      mod_password: this.joi.string().min(5).max(64).required(),
    });

    const result = this.getValidationResult(schema, moderator);

    return result;
  };

  // Sửa thông tin quản trị
  validateUpdateModerator = (moderator = {}) => {
    const schema = this.joi.object({
      mod_name: this.joi.string().min(5).max(70).required(),
      mod_id: this.joi
        .string()
        .length(9)
        .pattern(/^[0-9]+$/)
        .required(),
      mod_phoneNumber: this.joi
        .string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      mod_sex: this.joi.boolean().required(),
      mod_address: this.joi.string().min(5).max(128).required(),
      mod_role: this.joi.number().integer().min(0).required(),
      mod_password: this.joi.string().min(5).max(64).required(),
    });

    const result = this.getValidationResult(schema, moderator);

    return result;
  };
};
