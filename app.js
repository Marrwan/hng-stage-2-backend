require("dotenv").config();
require('events').EventEmitter.prototype._maxListeners = 70;
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressLayout = require("express-layouts");
const expressEjsLayout = require('express-ejs-layouts');
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");





const app = express();


//db
let db 
if (process.env.NODE_ENV == "development") {
  db = require("./config/config").mongoURI;
} else {
  db = process.env.mongoURI;
}


mongoose
  .connect(db, {  
     useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false})
  .then(process.env.NODE_ENV == "development" ? () => console.log("server connected") : "")
  .catch((error)=>{
     new AppError(error.message, error.status)
  })
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout extractScripts", true) // This is to extract all script tags and place them wherever you like
app.set("layout extractStyles",  true) // This is to extract all style tags and place them wherever you like

// app.use(expressLayout);
app.use(expressEjsLayout);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "AbdulbasitAlabi",
    saveUninitialized: false,
    resave: false,
  
  })
);
app.use(flash());



// Message handler
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.User = req.user;
  res.locals.path = req.path;
  next();
});


app.use(require("./routes/index"));
// HANDLING UNHANDLED ROUTES
app.all("*", (req, res, next) => {
  res.status(404).send( `Can't find ${req.originalUrl} on this server`);
 
  next()
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  const { status = 500, message = "Something went wrong!" } = err;
  res.locals.error = req.app.get("env") === "development" ? err : {};
 
     res.status(status).send(message);

});

module.exports = app;
