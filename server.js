const express = require('express');
const path = require('path');
const userRoute = require('./routes/routes');
const searchRoute = require('./routes/Searchroute')
const jobapp = require('./routes/JobApproute')

const connection = require('./connection');

const app = express();

app.use("/public" , express.static(path.join(__dirname , '/public')));
// app.use("/public" , express.static(path.join(__dirname , '/public/search')));
// app.use("/public" , express.static(path.join(__dirname , '/public/JobApp')));


app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use("/" , userRoute);
app.use("/" , searchRoute);
app.use("/" , jobapp);


app.set("view engine" , "ejs");
app.set("views" , "./views");
// app.set("views" , "./views/Search");
// app.set("views" , "./views/JobApp");

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