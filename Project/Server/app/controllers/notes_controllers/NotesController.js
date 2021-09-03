const joi = require("joi");
const { getPaginatedResults } = require("../controllerHelper");

const arr = [];

module.exports = class NotesController {
  constructor() {
    for (let i = 1; i <= 100; i++) {
      const memo = {
        id: i,
        title: `Ghi chú ${i}`,
        content: `Nội dung của ghi chú số ${i}`,
      };

      arr.push(memo);
    }
  }

  /* #region  Get */
  //Lấy danh sách

  // Tham khảo https://www.youtube.com/watch?v=ZX3qt0UWifc
  getList = async (req, res) => {
    const { page, limit } = req.query;

    const rs = await getPaginatedResults(
      async (s, e) => arr.slice(s, e),
      page,
      limit
    );

    return res.json(rs);
  };

  //Lấy theo id
  getById = (req, res) => {
    const id = req.params.id;

    const note = arr.find((x) => x.id == id);

    if (note) return res.send(note);

    return res.status(404).send(id);
  };
  /* #endregion */

  /* #region  Post */
  //Thêm
  post = (req, res) => {
    const body = req.body;
    const rs = this.getValidateResult(body);

    if (rs.error) {
      return res.status(400).send(rs.error);
    }

    const newNote = {
      id: arr.length + 1,
      title: body.title,
      content: body.content,
    };
    arr.push(newNote);

    return res.send(newNote);
  };

  /* #endregion */

  /* #region  Put */
  //Sửa
  put = (req, res) => {
    const body = req.body;
    const rs = this.getValidateResult(body);

    if (rs.error) {
      return res.status(400).send(rs.error);
    }

    const id = req.params.id;
    const note = arr.find((x) => x.id == id);

    if (note == null) return res.status(404).send(id);

    note.title = body.title;
    note.content = body.content;

    return res.send(note);
  };
  /* #endregion */

  /* #region  Delete */
  //Xóa
  delete = (req, res) => {
    const id = req.params.id;

    const exist = arr.find((x) => x.id == id);

    if (!exist) return res.status(404).send(id);

    //Filter
    //arr = arr.filter(x => x.id != id);

    //Mix
    const i = arr.findIndex((x) => x.id == id);
    arr.splice(i, 1);

    //Classic
    // for (let i = 0; i < arr.length; i++) {
    //   if(arr[i].id == id){
    //     arr.splice(i, 1);
    //     break;
    //   }
    // }

    res.send();
  };
  /* #endregion */

  getValidateResult(body) {
    const schema = {
      title: joi.string().min(3).required(),
      content: joi.string().min(1).required(),
    };

    return joi.validate(body, schema);
  }
};
