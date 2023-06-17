const express = require("express");
const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRouter");
const categoryRouter = require("./routes/Productcategory");


const morgan=require("morgan")
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const cookieParser = require("cookie-parser");
app.use(morgan("dev"))//gives you tokens like the client's user agent, the requested url, and the response time, among other things.
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//cookie miidleware added
app.use(cookieParser());
dbConnect();

//for user
app.use("/api/user", authRouter);
//Prodct 
app.use("/api/product", productRouter);
//Blog
app.use("/api/blog", blogRouter);

//Category
app.use("/api/category", categoryRouter);



app.listen(3001, () => {
  console.log(`Server is running  at PORT ${3001}`);
});

// const express = require("express");
// const dbConnect = require("./config/dbConnect");
// const { notFound, errorHandler } = require("./middlewares/errorHandler");
// const app = express();
// const dotenv = require("dotenv").config();
// const PORT = process.env.PORT||4000;
// const authRouter = require("./routes/authRoute");
// const cors = require("cors");
// dbConnect();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/api/user", authRouter);
// app.listen(PORT, () => {
//   console.log(`Server is running  at PORT ${PORT}`);
// });
