import express from "express"
import bodyParser from "body-parser"
import path from "path"
import cors from "cors"
import { fileURLToPath } from "url"
import initializeRoutes from "./service/appRoute.js"
import dotenv from "dotenv"
dotenv.config();

const app=express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

initializeRoutes(app);
export default app;
app.listen(process.env.PORT,()=>{
    console.log(`server started ${process.env.PORT}`)
});
