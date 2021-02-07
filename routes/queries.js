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

router.get("/:id", async(req,res)=>{
    var id = req.params.id;//melyik táblát listázzuk
    var con = mysql.createConnection(db);//csatlakozás
    if(id == 1){
        sql = "SELECT COUNT(*) AS diákszám, tanár.tanár_név FROM osztály, osztály_diák, tanulók, tanár WHERE osztály.osztalyfonok_id = tanár.id AND osztály_diák.osztály_id = osztály.id AND osztály_diák.diák_id = tanulók.id GROUP BY tanár.tanár_név"
    }
    else if (id == 2){
        sql = 'SELECT COUNT(*) AS diákszám, tanár_név, óra.óranév FROM osztály, osztály_diák, tanulók, tanár, óra WHERE osztály.osztalyfonok_id = tanár.id AND osztály_diák.osztály_id = osztály.id AND osztály_diák.diák_id = tanulók.id AND óra.tanár_id = tanár.id AND tanár.id = (SELECT tanár_id FROM óra WHERE órakezdet_nap = "Péntek")'
    }
    else sql = "SELECT COUNT(*) AS diákszám, tanterem.melyiképület FROM osztály, osztály_diák, tanulók, tanár, óra, tanterem WHERE osztály.osztalyfonok_id = tanár.id AND osztály_diák.osztály_id = osztály.id AND osztály_diák.diák_id = tanulók.id AND óra.tanár_id = tanár.id AND óra.terem_id = tanterem.id GROUP BY tanterem.melyiképület"
    console.log(sql);
    con.connect(function(err){
        if (err) throw err;
        con.query(sql, function (err, results) {//lekérdezés
            var rows = JSON.parse(JSON.stringify(results));
            var arr = [];
            arr[0] = [];
            j = 0;
            Object.keys(rows[0]).forEach(function (key) {//kiszedjük a táblák neveit a visszaküldendő tömb első sorába
                arr[0][j] = key;
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
            console.log(arr);
            con.destroy();
            res.send(arr);
        })
    })
});

module.exports = router;