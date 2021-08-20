const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

//Thêm middleware cái này dùng xử lý body(JSON) của request
//app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());

// routes(app);
require("./routes")(app);
app.listen(port, ()=>{
  console.log("Server is listening on " + port);  
})