const express = require("express");
require("dotenv").config();
const bodyParser = require('body-parser');
const connectDB = require("./data/connect");
const errorHandler = require("./middlewares/error");
const asyncHandler = require("./middlewares/asyncHandler");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
connectDB();

app.use("/api/v2/user", userRouter);
app.use("/api/v2/product", productRouter);
app.use("/api/v2/category", categoryRouter);
app.use(errorHandler);

app.listen(process.env.PORT, ()=>{
    console.log(`server listen ${process.env.PORT} port`)
});