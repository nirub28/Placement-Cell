const express = require("express");
const app = express();
const port = 8000;

// to render ejs layouts
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");

// flash messages
const flash = require("connect-flash");
const customMware = require("./config/middleware"); // getting custom middleware

//authentication
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-stratergy");
const MongoStore = require("connect-mongo"); // to store session data in mongodb

app.use(express.static("./assets")); // to use asset folders

//use layouts, should be before routes
app.use(expressLayouts);

// take all css/script files in subpages and put it in layout header, else it will in body tag
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//middleware to parse the request body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//create session
app.use(
  session({
    name: "cdnPlacement",
    secret: "E1EQr55QqbYbyyTJEboFzVRfRMngtf0E",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },

    store: new MongoStore(
      {
        mongoUrl: "mongodb+srv://nirub:nirub283@cluster0.ye8q8b0.mongodb.net/demoDB?retryWrites=true&w=majority",
        autoremove: "disabled",
      },
      function (err) {
        console.log(
          "error at mongo store",
          err || "connection established to store cookie"
        );
      }
    ),
  })
);

//authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.SetAuthenticatedUser);

//set view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//flash messages
app.use(flash());
app.use(customMware.setFlash);

//use express routes
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`The error in runng server ${err}`);
  }
  console.log(`The server is running on port: ${port}`);
});
