const express = require('express');
const path = require('path');
const userRoute = require('./routes/routes');
const searchRoute = require('./routes/Searchroute');
const delimited = require('./routes/delimited');
const jobapp = require('./routes/JobApproute');
const ajax = require('./routes/ajax');
const dynamicgrid = require('./routes/dynamicgrid');
const attendance = require('./routes/attendance');
const result = require('./routes/result');
const pagination = require('./routes/pagination');
const register = require('./routes/registration');
const jsonplaceholder = require('./routes/jsonplaceholder')
const jstask = require('./routes/JsTasks')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
require('dotenv').config();


const app = express();
app.use(cors({origin:'*'}))
app.use("/public" , express.static(path.join(__dirname , '/public')));

const port = process.env.PORT;

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use("/" , userRoute);
app.use("/" , searchRoute);
app.use("/delimited" , delimited);
app.use("/" , jobapp);
app.use("/ajax" , ajax);
app.use("/grid" , dynamicgrid);
app.use("/attendance" , attendance);
app.use("/result" , result);
app.use("/pagination" , pagination);
app.use("/" , register);
app.use("/json" , jsonplaceholder);
app.use("/jstask" , jstask)

app.set("view engine" , "ejs");
app.set("views" , "./views");

app.get("/" , (req , res) => {
    res.render("registration/register")
});


app.listen(port , () => {
    console.log(`Listening on Port: ${port}`);
});

