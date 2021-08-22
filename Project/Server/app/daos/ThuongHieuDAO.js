module.exports = class ThuongHieuDAO {
  constructor(sqldao) {
    this.sqldao = sqldao;
  }

  layDanhSach = async () =>
    await this.sqldao.query("SELECT * FROM THUONG_HIEU");

  layTheoMa = async (th_ma) =>
    await this.sqldao.query("SELECT * FROM THUONG_HIEU WHERE th_ma=?", [th_ma]);

  //Boolean
  them = async (th_ten) =>
    (await this.sqldao.execute("INSERT INTO THUONG_HIEU(TH_TEN) VALUES(?);", [
      th_ten,
    ])) > 0;

  //Boolean
  sua = async (th_ma, th_ten) =>
    (await this.sqldao.execute(
      "UPDATE THUONG_HIEU SET TH_TEN=? WHERE th_ma = ?",
      [th_ten, th_ma]
    )) > 0;

  //Boolean
  xoa = async (th_ma) =>
    (await this.sqldao.execute("DELETE FROM THUONG_HIEU WHERE th_ma = ?", [
      th_ma,
    ])) > 0;
};
