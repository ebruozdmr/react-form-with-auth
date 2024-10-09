const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database.js");
const Personnel = require("./routes/Personnel.js");
const Auth = require("./routes/Auth.js");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });
// console.log(process.env);
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/", Personnel);
app.use("/", Auth);

connectDB();

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
