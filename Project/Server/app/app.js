const express = require("express");

const app = express();
const router = require("./routers/router");
const port = process.env.PORT || 8080;

//Thêm middleware cho Post vớ1i Put cái này dùng xử lý body(JSON) của request
// Request Object as a JSON Object
app.use(express.json());
// Request Object as strings or arrays
app.use(express.urlencoded({ extended: true }));

router(app);

app.listen(port, () => {
  console.log("Server is listening on " + port);
});


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

