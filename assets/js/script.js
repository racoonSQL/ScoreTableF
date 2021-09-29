
$(document).ready(function(){

    // hàm nhập giá trị vào bảng
    var testScore = { 
        name: "",
        math: 0,
        physical: 0,
        chemistry: 0
    };

    var stt = 1;

    $("#add").click(function() {

        // biến để xác định có lỗi hay không
        var coLoi = false;

        // khai báo biến giá trị nhận được từ ô input
        var ten = $("#ten").val();
        if (/\d/.test(ten) || ten.length == 0 || ten.replace(/\s/g, "").length == 0) {
            $("#ten_err").html("Tên không hợp lệ!");
            $("#ten_err").css("color", "red");
            $("#ten").focus();
            coLoi = true;
        } else {
            $("#ten_err").html("");
        }
        var toan = $("#toan").val();
        if (isNaN(toan) || toan.replace(/\s/g, "").length == 0 || toan < 0 || toan > 10) {
            $("#toan_err").html("Số không hợp lệ!");
            $("#toan_err").css("color", "red");
            if(!coLoi) {
                $("#toan").focus();
            }
            coLoi = true;
        } else {
            $("#toan_err").html("");
        }
        var ly = $("#ly").val();
        if (isNaN(ly) || ly.replace(/\s/g, "").length == 0 || ly < 0 || ly > 10) {
            $("#ly_err").html("Số không hợp lệ!");
            $("#ly_err").css("color", "red");
            if(!coLoi) {
                $("#ly").focus();
            }
            coLoi = true;
        } else {
            $("#ly_err").html("");
        }
        var hoa = $("#hoa").val();
        if (isNaN(hoa) || hoa.replace(/\s/g, "").length == 0 || hoa < 0 || hoa > 10) {
            $("#hoa_err").html("Số không hợp lệ!");
            $("#hoa_err").css("color", "red");
            if(!coLoi) {
                $("#hoa").focus();
            }
            coLoi = true;
        } else {
            $("#hoa_err").html("");
        }

        // chuyển dữ liệu sang dạng số
        var toanF = parseFloat(toan);
        var lyF = parseFloat(ly);
        var hoaF = parseFloat(hoa);

        // làm tròn số thập phân về một số sau dấu phẩy
        var toanX = toanF.toFixed(1);
        var lyX = lyF.toFixed(1);
        var hoaX = hoaF.toFixed(1);

        // lưu giá trị vào đỐi tượng testScore
        testScore.name = ten;
        testScore.math = toanX;
        testScore.physical = lyX;
        testScore.chemistry = hoaX;

        // thực hiện thêm hàng vào bảng
        if (coLoi == false){

            // kiểm tra thẻ tbody
            if ($("#myTable tbody").length == 0) {
                $("#myTable").append("<tbody></tbody>");
            }
        
            // chèn giá trị vào bảng
            $("#myTable tbody").append("<tr>" +
                "<td>" + stt + "</td>" +
                "<td>" + ten + "</td>" +
                "<td>" + toanX + "</td>" +
                "<td>" + lyX + "</td>" +
                "<td>" + hoaX + "</td>" +
                "<td>" + "?" + "</td>" +
                "</tr>");

            // xoá giá trị ở ô input
            $("#ten").val("");
            $("#toan").val("");
            $("#ly").val("");
            $("#hoa").val("");

            // tăng giá trị stt
            stt++;

            // focus lại vào ô nhập tên
            $("#ten").focus();
        }
    });


    // hàm tính điểm trung bình
    $("#average").click(function() {

        $("#myTable tbody tr").each(function() {

            var toanC = $(this.cells[2]).text();
            var lyC = $(this.cells[3]).text();
            var hoaC = $(this.cells[4]).text();
            
            var mathC = parseFloat(toanC);
            var physC = parseFloat(lyC);
            var chemC = parseFloat(hoaC);
            
            var average = ((mathC + physC + chemC) / 3).toFixed(1);
            
            $(this.cells[5]).text(average);
            
        })




    });


    // hàm xác định học sinh giỏi
    $("#specify").click(function() {

        $("#myTable tbody tr").each(function() {
            if($(this.cells[5]).text() >= 8) {
                $(this).css("color", "red");
            }
        });
        
    });


    // hàm tìm kiếm
    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tbody tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});