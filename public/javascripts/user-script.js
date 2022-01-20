$("#userSignupForm").validate({
    rules: {
        firstname:
        {
            required: true,
            maxlength: 30,
            lettersonly: true,
            normalizer: function (value) {
                return $.trim(value);
            }
        },

        lastname: {
            required: true,
            maxlength: 30,
            lettersonly: true,
            normalizer: function (value) {
                return $.trim(value);
            }

        },
        email: {
            required: true,
            email: true,
            normalizer: function (value) {
                return $.trim(value);
            }

        },
        username: {
            required: true,
            maxlength: 30,
            normalizer: function (value) {
                return $.trim(value);
            }

        },
        phone: {
            required: true,
            digits: true,
            minlength: 10,
            maxlength: 10

        },
        address: {
            required: true,
            normalizer: function (value) {
                return $.trim(value);
            }

        },
        townCity: {
            required: true,
            normalizer: function (value) {
                return $.trim(value);
            }

        },
        state: {
            required: true,
            normalizer: function (value) {
                return $.trim(value);
            }

        },
        pincode: {
            required: true,
            digits: true,
            maxlength: 10,
            normalizer: function (value) {
                return $.trim(value);
            }

        },
        password: {
            required: true,
            minlength: 4,
            normalizer: function (value) {
                return $.trim(value);
            }

        },
        confirmpassword: {
            required: true,

            equalTo: "#CustomerNewPassword"

        },
    }
});



$("#userLoginForm").validate({
    rules:
    {
        username: {
            required: true

        },
        password: {
            required: true
        }
    }


});


$("#userOtpMobile").validate({
    rules:
    {
        phone: {
            required: true,
            normalizer: function (value) {
                return $.trim(value);
            }

        }
    }


});


$("#userOtp").validate({
    rules:
    {
        otp: {
            required: true,
            normalizer: function (value) {
                return $.trim(value);
            }

        }
    }


});

jQuery.validator.addMethod("lettersonly", function (value, element) {
    return this.optional(element) || /^[a-z," "]+$/i.test(value);
}, "Only letters and spaces are allowed");



// otp timmer SignUp

$(document).ready(function () {
    timmerCountDown()
});

function timmerCountDown() {
    var deadline = new Date();
    deadline.setMinutes(deadline.getMinutes() + 2)
    deadline = deadline.getTime()
    var x = setInterval(function () {
        var now = new Date().getTime();
        var t = deadline - now;
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
        $("#demo").html(minutes + "m " + seconds + "s ")
        if (t < 0) {
            clearInterval(x);
            $("#demo").html("EXPIRED");
            $('.btn_resend').show();
            $('.btn_verify').hide();
        }
    }, 1000);
}

$("#otpResend").on("click", () => {
    $.ajax({
        url: "/signup/resendOtp",
        type: "post",
        dataType: "json",
        success: function (res) {
            if (res) {
                timmerCountDown()
                $('.btn_resend').hide();
                $('.btn_verify').show();
            } else {
                alert("otpSending failed")
            }
        }
    })
})




// otp timmer Login

$(document).ready(function () {
    timmerCountDown1()
});

function timmerCountDown1() {
    var deadline = new Date();
    deadline.setMinutes(deadline.getMinutes() + 2)
    deadline = deadline.getTime()
    var x = setInterval(function () {
        var now = new Date().getTime();
        var t = deadline - now;
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((t % (1000 * 60)) / 1000);
        $("#demo").html(minutes + "m " + seconds + "s ")
        if (t < 0) {
            clearInterval(x);
            $("#demo").html("EXPIRED");
            $('.btn_resend').show();
            $('.btn_verify').hide();
        }
    }, 1000);
}

$("#loginOtpResend").on("click", () => {
    $.ajax({
        url: "/login/resendOtp",
        type: "post",
        dataType: "json",
        success: function (res) {
            if (res) {
                timmerCountDown1()
                $('.btn_resend').hide();
                $('.btn_verify').show();
            } else {
                alert("otpSending failed")
            }
        }
    })
})


// change quantity increment and decrement in cart
$('.btn_chng_qty').click(function (e) {
    var cartId = $(this).data('id');
    var proId = $(this).data('productid')
    var count = parseInt($(this).data('type'))
    var userId = parseInt($(this).data('userid'))
    changeQuantity(cartId, proId, count, userId);
    e.preventDefault();
})

function changeQuantity(cartId, proId, count, userId) {
    let quantity = parseInt(document.getElementById(proId).innerHTML)
    count = parseInt(count)
    if (quantity == 1 && count == -1) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Product will be removed from cart!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '/change-product-quantity',
                    data: {
                        cart: cartId,
                        product: proId,
                        count: count,
                        quantity: quantity
                    },
                    method: 'post',
                    success: (response) => {
                        if (response.removeProduct) {
                            location.reload()
                        } else {
                            $('.qty_' + proId).html(quantity + count)
                        }

                    }
                })
            }
        })
    } else {
        $.ajax({
            url: '/change-product-quantity',
            data: {
                cart: cartId,
                product: proId,
                count: count,
                quantity: quantity,
                userId : userId
            },
            method: 'post',
            success: (response) => {
                if (response.removeProduct) {
                    location.reload()
                } else {
                    document.getElementById(proId).innerHTML = quantity + count
                    $('.cart_sub_total').html(response.subtotal.total)
                    $('.cart_sub_total').val(response.subtotal.total)
                    response.productsTotal.forEach((ele) => {
                        $('.product_total' + ele['item']).html(ele['total']);
                    })
                }

            }
        })
    }
}

// remove cart item

$('.cart__remove').click(function(e){
    var cartId = $(this).data('cartid');
    var proId = $(this).data('productid');
    Swal.fire({
        title: 'Are you sure?',
        text: "Product will be removed from cart!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            removeCartProduct(cartId, proId)
        }
    });
    e.preventDefault()
});

function removeCartProduct(cartId, proId){
    $.ajax({
        url: '/remove-cart-product',
        data:{
            cart:cartId,
            product:proId
        },
        method:'post',
        success:(res)=>{
            if(res){
                $('#'+ cartId+proId).remove();
            }
        }

    })
}