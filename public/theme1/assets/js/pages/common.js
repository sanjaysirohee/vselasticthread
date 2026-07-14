$(document).ready(function() {
    $('.popup-youtube').magnificPopup({
        type: 'iframe',
    });
    $('.popup-images').magnificPopup({
        type: 'image',
        closeBtnInside: true,
        mainClass: 'mfp-img',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
    });

    $('.one-time').slick({
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        pauseOnHover: false,
        pauseOnFocus: false,
        arrows: true,
        fade: true
    });

    $(".my-class").slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: true,
        pauseOnHover: true,
        responsive: [{
                breakpoint: 992, // Adjust breakpoint as needed
                settings: {
                    slidesToShow: 1 // Adjust the number of slides to show for smaller screens
                }
            },
            {
                breakpoint: 768, // Adjust breakpoint as needed
                settings: {
                    slidesToShow: 1 // Adjust the number of slides to show for even smaller screens
                }
            }
        ]
    });

    $('.update').slick({
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        pauseOnHover: false,
        pauseOnFocus: false,
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }
        }]
    });
});

/**
 * Save enquiry modal form data
 */
$("#sendMsg").click(function() {
    $(".validation").remove();
    let flag = true;
    let name = $.trim($("#name").val());
    let number = $.trim($("#number").val());
    let message = $.trim($("#message").val());
    let enqEmail = $.trim($("#enqEmail").val());
    if (name == "") {
        flag = false;
        $("#name").parent().append("<span class='text-danger validation'>Please enter your name.</span>");
    }
    if (number == "") {
        flag = false;
        $("#number").parent().append("<span class='text-danger validation'>Please enter your number.</span>");
    }
    if ($("#checkError").val() == "1") {
        flag = false;
        $("#number").parent().append("<span class='text-danger validation'>Please enter valid number.</span>");
    }
    if (message == "") {
        flag = false;
        $("#message").parent().append("<span class='text-danger validation'>Please enter your message.</span>");
    }
    if (enqEmail == "") {
        flag = false;
        $("#enqEmail").parent().append("<span class='text-danger validation'>Please enter your email.</span>");
    }
    if (enqEmail != "") {
        if (!ValidateEmail(enqEmail)) {
            flag = false;
            $("#enqEmail").parent().append("<span class='text-danger validation'>Please enter valid email.</span>");
        }
    }

    if (flag && $("#checkError").val() == "0") {
        let url = $("#baseUrl").val() + "/contact/send-inquiry";
        $.ajax({
            url: url,
            type: "post",
            data: {
                "name": name,
                "number": number,
                "message": message,
                "email": enqEmail,
            },
            success: function(data) {
                data = JSON.parse(data);
                if (data.status) {
                    $("#name").val("");
                    $("#number").val("");
                    $("#message").val("");
                    $("#enqEmail").val("");
                    $("#message").parent().append("<span class='text-success validation'>" + data.msg + "</span>");
                }
            },
            error: function() {

            }
        });
    }
});


/**
 * Save contact page form data
 */
//$("#sendMessage").click(function(){
function sendMessage(id) {

    $(".validation").remove();
    let flag = true;
    var userName = "userName" + id;
    var userPhone = "userPhone" + id;
    var userEmail = "userEmail" + id;
    var userMessage = "userMessage" + id;

    let name = $("#" + userName).val();
    let number = $("#" + userPhone).val();
    let email = $("#" + userEmail).val();
    let message = $("#" + userMessage).val();
    if (name == "") {
        flag = false;
        $("#" + userName).parent().append("<span class='text-danger validation'>Please enter your name.</span>");
    }
    if (number == "") {
        flag = false;
        $("#" + userPhone).parent().append("<span class='text-danger validation'>Please enter your number.</span>");
    }
    if ($("#checkError").val() == "1") {
        flag = false;
        $("#" + userPhone).parent().append("<span class='text-danger validation'>Please enter valid number.</span>");
    }
    if (message == "") {
        flag = false;
        $("#" + userMessage).parent().append("<span class='text-danger validation'>Please enter your message.</span>");
    }
    if (email == "") {
        flag = false;
        $("#" + userEmail).parent().append("<span class='text-danger validation'>Please enter your email.</span>");
    }
    if (email != "") {
        if (!ValidateEmail(email)) {
            flag = false;
            $("#" + userEmail).parent().append("<span class='text-danger validation'>Please enter valid email.</span>");
        }
    }
    if (flag && $("#checkError").val() == "0") {
        $("#sendMessage" + id).prop("disabled", true);
        let url = $("#baseUrl").val() + "/contact/inquiry";
        $.ajax({
            url: url,
            type: "post",
            data: {
                "name": name,
                "number": number,
                "email": email,
                "message": message,
            },
            success: function(data) {
                $("#sendMessage" + id).prop("disabled", false);
                data = JSON.parse(data);
                if (data.status) {

                    $("#userName" + id).val("");
                    $("#userPhone" + id).val("");
                    $("#userEmail" + id).val("");
                    $("#userMessage" + id).val("");
                    $("#sendMessage" + id).parent().parent().append("<div class='text-center'><span class='text-success validation'>" + data.msg + "</span></div>");
                }
            },
            error: function() {
                $("#sendMessage" + id).prop("disabled", false);
            }
        });
    }
}
// });

//Key erro message on keyup for message inquiry modal
$("#name").keyup(function() {
    $(this).parent().find('.validation').remove();
});

$("#message").keyup(function() {
    $(this).parent().find('.validation').remove();
});

$("#enqEmail").keyup(function() {
    $(this).parent().find('.validation').remove();
});
$("#number").keyup(function() {
    //$(this).parent().find('.validation').remove();
    var phone = $("#number").val().replace(/ /g, '');
    phonenumber(phone, this, 'number');
});

//Key erro message on keyup for message contact form
$(".userName").keyup(function() {
    $(this).parent().find('.validation').remove();
});

$("#userPhone").keyup(function() {
    var phone = $("#userPhone").val().replace(/ /g, '');
    phonenumber(phone, this, 'userPhone');
});

//Email validation function
function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
    return false;
}

//Phone number validation
function phonenumber(phone, e, id) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    $(e).parent().find('.validation').remove();
    if ((phone.match(phoneno))) {
        $("#checkError").val("0");
        $(e).parent().find('.validation').remove();
    } else {
        $("#checkError").val("1");
        $("#" + id).parent().append("<span class='text-danger validation'>Please valid phone number.</span>");
    }
}

function testimonialModal(val) {
    $("#modalBody").append(atob(val));
    $("#testimonialModalShow").modal("show");
}

$(document).on('click', '.testimonialModalClose', function() {
    $("#testimonialModalShow").modal("hide");
});

$(document).ready(function() {
    var current_path = window.location.href;
    var base_url = window.location.origin;
    // let y =  new Date().getFullYear();


    $.ajax({
        url: base_url + "/hit-clicks",
        type: "get",
        data: {
            'current_path': current_path
        },
        success: function(result) {

        }
    });


});