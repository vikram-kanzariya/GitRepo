const express = require('express');
const app = express();

exports.dynamic = (req , res) => {
    res.render('jstask/01Feb_TableTask');
};

exports.kukucube =  (req , res) => {
    res.render('jstask/cubeTask');
};

exports.tictactoe =  (req , res) => {
    res.render('jstask/TicToe');
};

exports.sort = (req , res) => {
    res.render('jstask/sorting');
};

exports.events = (req , res) => {
    res.render('jstask/Events');
};