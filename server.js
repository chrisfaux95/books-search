const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true}));
app.use(expresss.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/books", {
    useCreateIndex: true,
    useNewUrlParser: true
});

app.listen(PORT, () => {
    console.log(`🌎 ~> SERVER LISTENING ON PORT ${PORT}!`)
})