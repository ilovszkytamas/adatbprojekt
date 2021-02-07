const express = require('express');
const app = express();
const fs = require('fs-extra');
const mysql = require('mysql');
const bodyparser=require('body-parser');
app.use(express.static('public'));
app.use(bodyparser.json());

const tables = require('./routes/tablehandle');
app.use('/tablehandle', tables);

const queries = require('./routes/queries');
app.use('/queries', queries);

app.get('/', async(req,res)=>{
    const ind = await fs.readFile('index.html','utf-8');
    res.send(ind);
    console.log("index betöltve");
});

app.get('/tablehandle', async(req,res)=>{
    const tablepage = await fs.readFile('tables.html','utf-8');
    res.send(tablepage);
    console.log("tabla oldal betoltve");
});

app.get('/queries', async(req,res)=>{
    const querypage = await fs.readFile('lekérdezések.html','utf-8');
    res.send(querypage);
    console.log("lekerdezesek oldal betoltve");
});

app.listen(3000);