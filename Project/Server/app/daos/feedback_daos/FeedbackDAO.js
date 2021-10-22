const ModelDAO = require("../ModelDAO");

module.exports = class FeedbackDAO extends ModelDAO {
  constructor(sqldao) {
    super(sqldao);
  }

  getFeedback = async (startIndex, endIndex, order = "DESC") => {
    if (order != "DESC") {
      order = "";
    }
    //Cường đã chỉnh sửa lệnh select
    const sql = `SELECT fb_no, fb_content, fb_time, Feedbacks.cus_no, Feedbacks.prod_no, cus_name, prod_name
                FROM Feedbacks, Customers, Products
                WHERE Feedbacks.cus_no = Customers.cus_no
                  AND Products.prod_no = Feedbacks.prod_no
                ORDER BY fb_time ${order}
                LIMIT ${startIndex}, ${endIndex - startIndex};`;

    const feedback = await this.sqldao.query(sql);

    for (let i = 0; i < feedback.length; i++) {
      const fb = feedback[i];

      fb.replies = await this.getReplies(fb.fb_no);
    }

    return feedback;
  };

  getFeedbackByProductNo = async (prod_no, startIndex, endIndex, order) => {
    let sql = `SELECT * FROM Feedbacks AS fb, Customers AS c 
    WHERE fb.cus_no  = c.cus_no AND fb.prod_no = ?
    LIMIT ${startIndex}, ${endIndex - startIndex}; `;

    if (order == "DESC") {
      const desc = "ORDER BY fb.fb_time DESC";

      sql = sql.replace(
        `LIMIT ${startIndex}, ${endIndex - startIndex};`,
        `${desc} LIMIT ${startIndex}, ${endIndex - startIndex};`
      );
    }

    const feedback = await this.sqldao.query(sql, [prod_no]);

    for (let i = 0; i < feedback.length; i++) {
      const fb = feedback[i];

      fb.replies = await this.getReplies(fb.fb_no);
    }

    return feedback;
  };

  // Lấy trả lời của 1 đánh giá
  getReplies = async (fb_no) => {
    const sql = `SELECT r.rep_no, r.rep_content, m.mod_name 
                FROM Replies AS r, Moderators AS m 
                WHERE r.mod_no = m.mod_no AND r.fb_no = ?;`;

    return await this.sqldao.query(sql, [fb_no]);
  };

  //#region  ADD

  addFeedback = async (prod_no, newFeedback) => {
    const { customer, fb_content } = newFeedback;

    const cus_no = await this.saveCustomer(customer);

    const sqlIn = `INSERT INTO Feedbacks(fb_content, prod_no, cus_no) 
    VALUES(?, ?, ?);`;

    await this.sqldao.execute(sqlIn, [fb_content, prod_no, cus_no]);

    const sqlOut = `SELECT * FROM Feedbacks 
    WHERE fb_content = ? AND prod_no = ? AND cus_no = ?
    ORDER BY fb_time DESC LIMIT 1`;

    const feedback = (
      await this.sqldao.query(sqlOut, [fb_content, prod_no, cus_no])
    )[0];

    return feedback;
  };

  saveCustomer = async (customer) => {
    const dbCustomer = this.toDbCustomer(customer);
    const dbParmas = this.extractParams(dbCustomer);

    const sqlIn = `INSERT INTO Customers(cus_name, cus_email, cus_sex, cus_phoneNumber)
    VALUES (?, ?, ?, ?);`;

    await this.sqldao.execute(sqlIn, dbParmas);

    const sqlOut = `SELECT cus_no FROM Customers
    WHERE cus_name = ? 
    AND cus_email  = ?
    AND cus_sex = ?
    AND cus_phoneNumber = ?
    ORDER BY cus_no DESC LIMIT 1;`;

    const { cus_no } = (await this.sqldao.query(sqlOut, dbParmas))[0];

    return cus_no;
  };

  toDbCustomer = (customer) => {
    const { cus_name, cus_email, cus_sex, cus_phoneNumber } = customer;

    return {
      cus_name,
      cus_email,
      cus_sex,
      cus_phoneNumber,
    };
  };

  //#endregion

  addReply = async (fb_no, rep_content, mod_no) => {
    const sqlIn = `INSERT INTO replies(rep_content, mod_no, fb_no) 
                  VALUES(?, ?, ?);`;

    await this.handleExeError(
      async () => await this.sqldao.execute(sqlIn, [rep_content, mod_no, fb_no])
    );

    const sqlOut = `SELECT * FROM Replies 
                    WHERE rep_content = ? 
                    AND mod_no = ? 
                    AND  fb_no = ?
                    Order By rep_time DESC
                    LIMIT 1; `;

    return (await this.sqldao.query(sqlOut, [rep_content, mod_no, fb_no]))[0];
  };

  deleteFeedback = async (fb_no) => {
    const sql = `DELETE FROM Feedbacks  WHERE fb_no = ?`;

    await this.sqldao.execute(sql, [fb_no]);
  };

  deleteReply = async (rep_no) => {
    const sql = `DELETE FROM Replies  WHERE rep_no = ?`;

    await this.sqldao.execute(sql, [rep_no]);
  };
};
