$('document').ready(function () {
    var table;
    var heads;
    $('.tablebutton').click(function () {
        table = $(this).attr("text");
        $.ajax({
            url: 'http://localhost:3000/tablehandle/list/'+table,
            type: 'get',
            contentType: 'application/json',
            success: function (data) {
                var table = '<table id="list">';
                table += "<thead>";
                table += "<tr>";
                heads = data[0];
                console.log(heads);
                for (var i = 0; i < data[0].length; i++){
                    table += "<th>"+data[0][i]+"</th>";
                }
                table += "</tr>";
                table += "</thead>";
                table += "<tbody>";
                for (var i = 1; i < data.length; i++){
                    table += "<tr>"
                    for (var j = 0; j < data[i].length; j++){
                        console.log(data[i][j]);
                        table += "<td>"+ data[i][j] + "</td>";
                    }
                    table += '<td><button id="del">Törlés</button></td>';
                    table += '<td><button id="mod">Módosítás</button></td>';
                    table += "</tr>";
                };
                table += "</tbody>";
                table += "</table><br><br>";
                table += '<td><button id="add">Hozzáadás</button></td>';
                $(".list").append(table);
            },
            error: function (data) {

            }
        });
    });

    $('.list').on('click','#del', function () {
        var currentrow = $(this).parent().parent();
        console.log("sor"+currentrow);
        var id = currentrow.find('td:eq(0)').text();
        console.log("id"+id);
        $.ajax({
            url: 'http://localhost:3000/tablehandle/delete/'+table+"&"+id,
            type: 'get',
            contentType: 'application/json',
            success: function (data) {
                console.log(data);
            },
            error: function (data) {

            }
        });
    });

    $('.list').on('click','#add', function () {
        var inputs = "";
        var add = [];
        for (var i = 0; i < heads.length; i++){
            inputs += '<input type="text" class="inputs" placeholder="'+heads[i]+'" >';
        }
        inputs += "<br><button id='send'>Hozzáadom</button>";
        $(".add").append(inputs);
        $("#send").click(function () {
            var count = $(".inputs").length;
            var i = 0;
            $('.inputs').each(function () {
                add.push($(this).val());
                i++;
            });
            if (i === count){
                var data = {"array":add};
                console.log(data)
                console.log("done");
                $.ajax({
                    url: 'http://localhost:3000/tablehandle/add/'+table,
                    type: 'post',
                    dataType: 'JSON',
                    data: JSON.stringify({
                        arr: add
                    }),
                    success: function (data) {
                        console.log(add);
                    },
                    error: function (data) {
                        console.log(add);
                    }
                });
            }
        });
    });

    $('.list').on('click','#mod', function () {
        var inputs = "";
        var currentrow = $(this).parent().parent();
        console.log("sor"+currentrow);
        var id = currentrow.find('td:eq(0)').text();
        console.log("id"+id);
        var add = [];
        for (var i = 0; i < heads.length; i++){
            inputs += '<input type="text" class="inputs" placeholder="'+heads[i]+'" >';
        }
        inputs += "<br><button id='send'>Hozzáadom</button>";
        $(".add").append(inputs);
        $("#send").click(function () {
            var count = $(".inputs").length;
            var i = 0;
            $('.inputs').each(function () {
                add.push($(this).val());
                i++;
            });
            if (i === count){
                var data = {"array":add};
                console.log(data)
                console.log("done");
                $.ajax({
                    url: 'http://localhost:3000/tablehandle/modify/'+table+"&"+id,
                    type: 'post',
                    dataType: 'JSON',
                    data: JSON.stringify({
                        arr: add
                    }),
                    success: function (data) {
                        console.log(add);
                    },
                    error: function (data) {
                        console.log(add);
                    }
                });
            }
        });
    });



});