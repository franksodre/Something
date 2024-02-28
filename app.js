const express = require('express');
const mongoose = require('mongoose');

const cookie = require('cookie-parser');
const dotenv = require('dotenv');

const UserRoutes = require('./Routes/userRoutes')

const app = express();
app.use(express.json())
app.use(cookie())

dotenv.config()

app.set('view engine', 'ejs')

mongoose.connect(process.env.DB_Connect).then(() => {
    console.log("Db connected to mongoDB");
})
.catch((e) => {
    console.log(`error to connect in database ${e}`)
})


app.use('/api/users/', UserRoutes)

app.listen(5000,() => {
    console.log(`listen in port 5000`)
})
 