module.exports = class ModeratorConverter {
  toDbModerator = (moderator) => {
    const {
      mod_name,
      mod_id,
      mod_phoneNumber,
      mod_sex,
      mod_address,
      mod_role,
      mod_username,
      mod_password,
    } = moderator;

    return {
      mod_name,
      mod_id,
      mod_phoneNumber,
      mod_sex,
      mod_address,
      mod_role,
      mod_username,
      mod_password,
    };
  };
};
