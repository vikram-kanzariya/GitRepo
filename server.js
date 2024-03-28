const express = require('express');
const path = require('path');
const userRoute = require('./routes/routes');
const searchRoute = require('./routes/Searchroute');
const delimited = require('./routes/delimited');
const jobapp = require('./routes/JobApproute');
const dynamicgrid = require('./routes/dynamicgrid');
const ajax = require('./routes/ajax');
const cors = require('cors');
const connection = require('./connection');
const attendance = require('./routes/attendance');
const result = require('./routes/result');
const pagination = require('./routes/pagination');
const register = require('./routes/registration')

const app = express();
app.use(cors({origin:'*'}))
app.use("/public" , express.static(path.join(__dirname , '/public')));


app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use("/" , userRoute);
app.use("/" , searchRoute);
app.use("/" , delimited);
app.use("/" , jobapp);
app.use("/ajax" , ajax);
app.use("/grid" , dynamicgrid);
app.use("/attend" , attendance);
app.use("/" , result);
app.use("/" , pagination);
app.use("/" , register);



app.set("view engine" , "ejs");
app.set("views" , "./views");

app.get("/" , (req , res) => {
    // res.send("Home Page");
    res.render("registration/register")
});

app.get("/dynamic" , (req , res) => {
    res.sendFile(__dirname  + '/views/01Feb_TableTask.html');
});

app.get("/kukucube" , (req , res) => {
    res.sendFile(__dirname  + '/views/cubeTask.html');
});

app.get("/tictactoe" , (req , res) => {
    res.sendFile(__dirname  + '/views/TicToe.html');
});

app.get("/sort" , (req , res) => {
    res.sendFile(__dirname  + '/views/sorting.html');
});




app.listen(4000 , () => {
    console.log('Listening on Port: 4000');
});