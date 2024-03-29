//nodemon run start
//npm run server
//npm run start
const express = require("express");
const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRouter");
const categoryRouter = require("./routes/Productcategory");
const blogCategoryRouter = require("./routes/blogCatRoute");
const brandRouter = require("./routes/brandRoute");
const couponRouter = require("./routes/coupon");
const colorRouter = require("./routes/colorRoute");
const enquiryRouter = require("./routes/enquiry");



const morgan = require("morgan")
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const cookieParser = require("cookie-parser");
const { errorHandler, notFound } = require("./middlewares/errorHandler");
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
//Caterggey blog categerry
app.use("/api/blogcategory", blogCategoryRouter);
//Brand
app.use("/api/brand", brandRouter);
//Coupon
app.use("/api/coupon", couponRouter);
//brand
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enquiryRouter);
app.use(notFound)
app.use(errorHandler)
app.listen(3001, () => {
  console.log(`Server is running  at PORT ${3001}`);
});


