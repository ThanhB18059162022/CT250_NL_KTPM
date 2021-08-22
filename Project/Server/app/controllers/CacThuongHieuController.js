const { DAO, ThuongHieuDAO } = require("../daos/daoContainer");

module.exports = class CacThuongHieuController {
  constructor() {
    this.dao = new ThuongHieuDAO(new DAO());
  }

  layDanhSach = async (req, res) => {
    const cacThuongHieu = await this.dao.layDanhSach();

    return res.json(cacThuongHieu);
  };

  layTheoMa = async (req, res) => {
    const { ma } = req.params;

    const thuongHieu = await this.dao.layTheoMa(ma);

    return res.json(thuongHieu);
  };

  them = async (req, res) => {
    const { ten } = req.body;

    if (ten) {
      const thanhCong = await this.dao.them(ten);

      return res.status(201).json(thanhCong);
    }

    return res.status(401).send([]);
  };

  sua = async (req, res) => {
    const { ma } = req.params;
    const { ten } = req.body;

    if (ma && ten) {
      const thanhCong = await this.dao.sua(ma, ten);

      return res.status(201).json(thanhCong);
    }

    return res.status(401).send([]);
  };

  xoa = async (req, res) => {
    const { ma } = req.params;

    if (ma) {
      const thanhCong = await this.dao.xoa(ma);

      return res.status(204).json({ thanhCong });
    }

    return res.status(401).send([]);
  };
};
