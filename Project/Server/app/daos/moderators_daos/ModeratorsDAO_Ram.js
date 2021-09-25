const moderators = [];

module.exports = class ModeratorsDAO_Ram {
  constructor() {
    for (let i = 1; i <= 20; i++) {
      const mod = {
        mod_no: i,
        mod_name: "name" + i,
        mod_id: "55555555" + i,
        mod_phoneNumber: "000000000" + i,
        mod_sex: "male",
        mod_address: "3/2 NK, CT",
        mod_role: "admin",
        mod_username: "admin",
        mod_password: "1234",
      };

      moderators.push(mod);
    }
  }

  getModerators = async (page, limit) => {
    return moderators
      .slice(page, limit)
      .map(({ mod_password, ...m }) => ({ ...m }));
  };

  getModeratorByNo = async (mod_no) => {
    return moderators.filter((m) => m.mod_no === mod_no)[0];
  };

  getModeratorByPhoneNumber = async (mod_phoneNumber) => {
    return moderators.filter((m) => m.mod_phoneNumber === mod_phoneNumber)[0];
  };

  getModeratorByMod_Id = async (mod_id) => {
    return moderators.filter((m) => m.mod_id === mod_id)[0];
  };

  getModeratorByUsername = async (mod_username) => {
    return moderators.filter((m) => m.mod_username === mod_username)[0];
  };

  addModerator = async (mod) => {
    return { mod_no: moderators.length + 1, ...mod };
  };

  updateModerator = async () => {};

  lockModerator = async () => {};

  // Kiểm tra rỗng
  emptyModerator = (moderator) => moderator === undefined;
};
