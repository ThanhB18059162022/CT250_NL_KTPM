const ModelDAO = require("../ModelDAO");

module.exports = class FeedbackDAO extends ModelDAO {
  constructor(sqldao) {
    super(sqldao);
  }

  getFeedbacks = async () => {
    const feedbacks = await this.sqldao.query(
      `SELECT a.fb_no, a.fb_content, a.fb_time, b.rep_content, d.mod_name, c.prod_name, e.cus_name
            FROM feedbacks as a, replies as b, products as c, moderators as d, customers as e
            WHERE a.fb_no = b.fb_no 
                AND b.mod_no = d.mod_no
                AND a.prod_no = c.prod_no
                AND e.cus_no = a.cus_no;`
    );

    return feedbacks;
  };

  //#region GET

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

    return feedback;
  };

  //#endregion

  getFeedbacksByProdName = async (prod_name) => {
    const feedbacks = (
      await this.sqldao.query(
        `SELECT a.fb_no, a.fb_content, a.fb_time, b.rep_content, d.mod_name, c.prod_name, e.cus_name
                FROM feedbacks as a, replies as b, products as c, moderators as d, customers as e
                WHERE a.fb_no = b.fb_no 
                    AND b.mod_no = d.mod_no
                    AND a.prod_no = c.prod_no
                    AND e.cus_no = a.cus_no
                    AND c.prod_name = ?;`,
        [prod_name]
      )
    )[0];

    return feedbacks;
  };

  getFeedbackByCusName = async (cus_name) => {
    const feedbacks = (
      await this.sqldao.query(
        `SELECT a.fb_no, a.fb_content, a.fb_time, b.rep_content, d.mod_name, c.prod_name, e.cus_name
                FROM feedbacks as a, replies as b, products as c, moderators as d, customers as e
                WHERE a.fb_no = b.fb_no 
                    AND b.mod_no = d.mod_no
                    AND a.prod_no = c.prod_no
                    AND e.cus_no = a.cus_no
                    AND e.cus_name = ?;`,
        [cus_name]
      )
    )[0];

    return feedbacks;
  };

  getFeedbacksByNo = async (fb_no) => {
    const feedback = (
      await this.sqldao.query(
        `SELECT a.fb_no, a.fb_content, a.fb_time, b.rep_content, d.mod_name, c.prod_name, e.cus_name
                FROM feedbacks as a, replies as b, products as c, moderators as d, customers as e
                WHERE a.fb_no = b.fb_no 
                    AND b.mod_no = d.mod_no
                    AND a.prod_no = c.prod_no
                    AND e.cus_no = a.cus_no
                    AND a.fb_no = ?;`,
        [fb_no]
      )
    )[0];

    return feedback;
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

  replyFeedback = async (fb_no, rep_content, mod_no) => {
    const sql = `INSERT INTO replies(rep_content, mod_no, fb_no) VALUES(?, ?, ?);`;

    await this.handleExeError(
      async () => await this.sqldao.execute(sql, [rep_content, mod_no, fb_no])
    );
  };
};
