import gobalErrorHandilers from "./app/middlewares/errorHandler";
import router from "./app/routes"
import cors from "cors";
const express = require('express')
const app = express()
app.use(express.json());
app.use(cors());
export const port=3000
app.use('/api',router)
app.use(gobalErrorHandilers)
app.get('/', function (req:any, res:any) {
  res.send('Hello World')
})

export default app