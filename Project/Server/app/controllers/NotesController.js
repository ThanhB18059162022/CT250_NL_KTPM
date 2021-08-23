const joi = require("joi");
const { DAO } = require("../daos/daosContainer");

arr = [
  { id: 1, title: "Ghi chú 1", content: "Nội dung của ghi chú số 1" },

  { id: 2, title: "Ghi chú 2", content: "Nội dung của ghi chú số 2" },
];

module.exports = class NotesController {
  /* #region  Get */
  //Lấy danh sách
  getList = async (req, res) => {
    return res.send(arr);
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
