const ModelDAO = require("../ModelDAO");

module.exports = class FeedbackDAO extends ModelDAO{
    constructor(sqldao){
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
    }

    getFeedbacksByProdName = async (prod_name) =>{
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
    }

    getFeedbackByCusName = async (cus_name) =>{
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
    }

    getFeedbacskByNo = async (fb_no) =>{
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
    }

    replyFeedback = async (fb_no, rep_content, mod_no) => {
        const sql = `INSERT INTO replies(rep_content, mod_no, fb_no) VALUES(?, ?, ?);`;

        await this.handleExeError(
            async () => await this.sqldao.execute(sql, [rep_content, mod_no, fb_no])
          );
    }
}