require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .catch((e) => console.log(e));

const authRoutes = require("./routes/authRoutes");
const overviewRoutes = require("./routes/overviewRoutes");
const transactionsRoutes = require("./routes/transactionsRoutes");
const investmentsRoutes = require("./routes/investmentRoutes");
const lendBorrowRoutes = require("./routes/lendBorrowRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/overview", overviewRoutes);
app.use("/transactions", transactionsRoutes);
app.use("/investments", investmentsRoutes);
app.use("/lendBorrow", lendBorrowRoutes);

app.listen(
  process.env.PORT || 8000,
  console.log(
    `Server Started http://192.168.99.104:${process.env.PORT || 8000}`
  )
);
