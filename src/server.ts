import express from "express";
import {Request, Response, Router } from "express";
import cors from 'cors'
import routes from "./routes";
import ensureUploadsDirectoryExists from "./utils/fileDirectory";


const app = express();
const port = 3333;

const route = Router();

ensureUploadsDirectoryExists()

app.use(express.json());

app.use(cors());
app.use("/files", express.static("/uploads"));
app.use(express.urlencoded({extended: true}));


route.get('/', (_:Request, res:Response):any =>{
    return res.status(200).json({
        message:"server is running",
        status: 200
    })
})

app.use("/", route);
app.use("/", routes);

app.listen(port, () => console.log(`server is running on port ${port}`));


export default app;