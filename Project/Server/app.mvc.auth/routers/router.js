const authentication = require("./authentication");
const authentication_router = require("./authentication_router");
const notes_router = require("./notes_router");
const people_router = require("./people_router");


// Mỗi controller sẽ có mỗi router
module.exports = app => {
    app.use("/authentication", authentication_router)
    app.use(authentication.authenticate);
    app.use("/api/notes", notes_router);
    app.use("/api/people", people_router);
}
