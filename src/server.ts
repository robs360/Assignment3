import app, { port } from "./app";
const mongoose = require('mongoose');
import dotenv from 'dotenv'
dotenv.config();
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.Database_Url as string);
}
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});