import express from "express";
import amul from "./amul.js";
import connectDB from "./db.js";
import nestle from "./nestle.js";
import cadbury from "./cadbury.js";
import bru from "./bru.js";

connectDB();
const app=express();
app.use(express.json());
app.use("/amul",amul);
app.use("/nestle",nestle);
app.use("/cadbury",cadbury);
app.use("/bru",bru);

const port=5000;
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
});

