$('document').ready(function () {
    $(".lekerdezes").click(function () {
        var number = $(this).attr("text");
        var heads = [];
        console.log(number);
        $.ajax({
            url: 'http://localhost:3000/queries/'+number,
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
                    table += "</tr>";
                };
                table += "</tbody>";
                table += "</table><br><br>";
                $(".list").append(table);
            },
            error: function (data) {

            }
        });
    })
});