const express = require('express');
const router = express.Router();
const mysql = require('mysql');
router.use(require('body-parser').json({ type : '*/*' }));

const db = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "orarend"
};

var columns = [];

router.get("/list/:table", async(req,res)=>{
    var table = req.params.table;//melyik táblát listázzuk
    var con = mysql.createConnection(db);//csatlakozás
    columns = [];
    con.connect(function(err){
        if (err) throw err;
        con.query("SELECT * FROM "+table, function (err, results) {//lekérdezés
            var rows = JSON.parse(JSON.stringify(results));
            var arr = [];
            arr[0] = [];
            j = 0;
            Object.keys(rows[0]).forEach(function (key) {//kiszedjük a táblák neveit a visszaküldendő tömb első sorába
                arr[0][j] = key;
                columns[j] = arr[0][j];
                j++;
            });
            for (var i = 0; i < rows.length; i++){//a listázáskor kapott adatokat beletöltjük egy tömbbe
                arr[i+1] = [];
                var j = 0;
                Object.keys(rows[i]).forEach(function (key) {
                    var current = rows[i][key];
                    arr[i+1][j] = current;
                    //console.log(arr[i][j]);
                    j++;
                })
            }
            con.destroy();
            res.send(arr);
        })
    })
});

router.get("/delete/:table&:id", async(req,res)=>{
    var table = req.params.table;//tábla
    var id = req.params.id;//id
    console.log(table,id);
    var con = mysql.createConnection(db);
    con.query("DELETE FROM "+table+" WHERE id="+id, function (err, results) {//lekérdezés összeállítása és elküldése
        if (err) throw err;
        con.destroy();
        res.send("okés");
    });
});

router.post("/add/:table", async(req,res)=>{
    var table = req.params.table;//kiszedjük a tábla nevét az urlből ahova hozzáadunk
    console.log(table);
    console.log(req.body.arr);//beírt adatok
    var con = mysql.createConnection(db);//kapcsolódás
    var sql = "INSERT INTO "+table+" VALUES (?)";
    var values = req.body.arr;
    con.query(sql, [values],function (err, results) {
        if (err) throw err;
        con.destroy();
        res.send("okés");
    });
});

router.post("/modify/:table&:id", async(req,res)=>{
    var table = req.params.table;//
    var id = req.params.id;// két adat kiszedési az url-ből
    console.log(table);
    console.log(req.body.arr);//beírt adatok kiszedése request bodyból tömbként
    var arr = req.body.arr;
    var con = mysql.createConnection(db); //adatbázisra kapcsolódás
    var sql = "UPDATE "+table+" SET ";
    for (var i = 0; i < columns.length; i++){
        if(columns.length - i > 1){
            sql += columns[i] + "=" +"'"+arr[i]+"'" + ",";
        }
        else sql += columns[i] + "=" +"'"+arr[i]+"'";
    }
    sql += " WHERE id = "+id;
    console.log(sql)
    con.query(sql,function (err, results) {
        if (err) throw err;
        con.destroy();
        res.send("okés");
    });
});

module.exports = router;