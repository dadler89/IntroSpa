const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv");

const greetings = require("./routers/greetings");
const pizzas = require("./routers/pizzas");

dotenv.config();

const app = express();



const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};

// CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};



// Using the middleware functions
app.use(cors);
app.use(express.json());
app.use(logging);

app.use(greetings);
app.use(pizzas);



mongoose.connect(process.env.MONGODB, { useNewUrlParser: true }, { useUnifiedTopology: true })
const db = mongoose.connection

db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", console.log.bind(console,"Let me take you on that funky ride"));





// Configuring Express instance


app.get("/status", (request, response) => {
  response.send(JSON.stringify({ message: "Are you an Outkast? I know I am "}), 418)
});


app
  .route("/")
  .get((request, response) => {
    response.send(JSON.stringify({ message: "No GET routes available on root funky URI ride." }), 404);
  })
  .post((request, response) => {
    response.send(JSON.stringify({ message: "No POST routes available on root funky URI ride." }), 404);
  });





const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Andre 3k on the mic at ${port}`)
} );
