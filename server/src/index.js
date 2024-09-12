import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from './app.js'

dotenv.config({
    path: './.env'
})
const PORT=8080

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERR",error);
        throw error
    })
    app.listen(PORT, ()=>{
        console.log(`⚙️  server is running at PORT : ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONG db connection failed !!!", err)
})
