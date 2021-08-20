const joi = require("joi");

arr = [
  { id: 1, title: "Ghi chú 1", content: "Nội dung của ghi chú số 1" },

  { id: 2, title: "Ghi chú 2", content: "Nội dung của ghi chú số 2" },
];
module.exports = function (app, db) {
  app.get("/", (req, res) => {
    return res.send("hello word!!");
  });

  //Lấy danh sách
  app.get("/notes", (req, res) => {
    return res.send(arr);
  });

  //Lấy theo id
  app.get("/notes/:id", (req, res) => {
    const id = req.params.id;
    const note = arr.find((x) => x.id == id);

    if (note) return res.send(note);

    return res.status(404).send(id);
  });

  //Thêm
  app.post("/notes", (req, res) => {
    const body = req.body;
    const rs = getValidateResult(body);

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
  });

  //Sửa
  app.put("/notes/:id", (req, res) => {
    const body = req.body;
    const rs = getValidateResult(body);

    if (rs.error) {
      return res.status(400).send(rs.error);
    }

    const id = req.params.id;
    const note = arr.find((x) => x.id == id);

    if (note == null) return res.status(404).send(id);

    note.title = body.title;
    note.content = body.content;

    return res.send(note);
  });

  //Xóa
  app.delete("/notes/:id", (req, res) => {
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
  });

  function getValidateResult(body) {
    const schema = {
      title: joi.string().min(3).required(),
      content: joi.string().min(1).required(),
    };

    return joi.validate(body, schema);
  }
};
