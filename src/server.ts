import express from "express";
import {Request, Response, Router } from "express";
import routes from "./routes";


const app = express();

const route = Router();

app.use(express.json());



route.get('/', (req:Request, res:Response):any =>{
    return res.status(200).json({
        message:"server is running",
        status: 200
    })
})

// app.use("/", routes);

app.listen(3333, () => console.log("server is running"));