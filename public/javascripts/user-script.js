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
    var productTotal = parseFloat($('.each_product' + proId).val()) * (parseInt($('.qty' + proId).html()) + count)
    changeQuantity(cartId, proId, count, userId, productTotal);
    e.preventDefault();
})

function changeQuantity(cartId, proId, count, userId, productTotal) {
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
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload()
                $.ajax({
                    url: '/change-product-quantity',
                    data: {
                        cart: cartId,
                        product: proId,
                        count: count,
                        quantity: quantity,
                        productTotal: productTotal
                    },
                    method: 'post',
                    success: (response) => {
                        if (response.removeProduct) {
                            location.reload();

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
                userId: userId,
                productTotal: productTotal
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
                        $('.product_total_val' + ele['item']).val(ele['total']);
                    })
                }

            }
        })
    }
}

// remove cart item

$('.cart__remove').click(function (e) {
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

function removeCartProduct(cartId, proId) {
    $.ajax({
        url: '/remove-cart-product',
        data: {
            cart: cartId,
            product: proId
        },
        method: 'post',
        success: (res) => {
            console.log(res)
            if (res.status) {
                $('#' + cartId + proId).remove();
                console.log('var ordebtndisable : ', res.ordebtndisable);
                if (res.ordebtndisable) {
                    $('.cart__footer').hide()
                    Swal.fire({
                        title: 'Your Cart Is Empty',
                        text: "Go To Home Page",
                        confirmButtonColor: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.href = '/'
                        }
                    })
                } else {
                    console.log(res.renderCartPage);
                    var element = $(res.renderCartPage)
                    var found = $('#sub_total_div', element)
                    $('#sub_total_div').html(found)
                }

            }
        }

    })
}

//wishlist
$('.add-to-wishlist').click(function (e) {
    var proId = $(this).data('proid');
    addtowishlist(proId)
    e.preventDefault()
})

function addtowishlist(proId) {
    $.ajax({
        url: '/add-to-wishlist',
        data: {
            proId
        },
        method: 'post',
        success: (response) => {
            if (response.status == true) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Add to Wishlist successfully'
                })
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,

                })

                Toast.fire({
                    icon: 'error',
                    title: response.errMsg
                })
            }
        }

    })
}

// remove items from wishlist

$('.wishlist_remove').click(function (e) {
    var proId = $(this).data('proid')
    var wishlistId = $(this).data('wishlistid')
    Swal.fire({
        title: 'Are you sure?',
        text: "Product will be removed from wishlist!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {

            removeWishlistProduct(wishlistId, proId)
        }
    });
    e.preventDefault()
})

function removeWishlistProduct(wishlistId, proId) {
    $.ajax({
        url: '/remove-wishlist-product',
        data: {
            wishlistId, proId
        },
        method: 'post',
        success: (response) => {
            if (response.status) {
                $('#' + wishlistId + proId).remove()
            }
        }
    })
}

// Address Confirm

function getComfirmAddress(addressId, userId) {
    $.ajax({
        url: '/get-confirm-address',
        data: {
            addressId: addressId,
            userId: userId
        },
        method: 'post',
        success: (response) => {
            // alert(response)
            // alert(response.address.state)
            $('#firstname').val(response.address.firstname);
            $('#lastname').val(response.address.lastname);
            $('#phone').val(response.address.phone);
            $('#pincode').val(response.address.pincode);
            $('#address').val(response.address.address);
            $('#district').val(response.address.district);
            $('#state').val(response.address.state);
            $('#landmark').val(response.address.landmark);
            $('#alternativePhone').val(response.address.alternativePhone);
            $('#addressType').val(response.address.addressType);
        }
    })
}

// apply coupons

$('#coupon-Form').submit((e) => {
    e.preventDefault()
    $.ajax({
        url: '/apply-coupon',
        method: 'post',
        data: $('#coupon-Form').serialize(),
        success: (response) => {
            if(response.CouponInvaliderrMsg){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.CouponInvaliderrMsg
                    
                  })
            }else{
                if(response.couponalreadyUserUsedErrMsg){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.couponalreadyUserUsedErrMsg
                        
                      })

                }
                else{
    
                    if(response.errMsg){
                        Swal.fire(response.errMsg)
                    }else{
                        $('.appliedCoupon').val('true')
                        $('.appliedgrandTotal').val(response.totalAmount)
                        $('.couponDiscount').val(response.discount)
                        $('.couponDiscountAmount').val(response.dis)
                        var table = document.getElementById('checkout_form');
                        var row = table.insertRow(1);
                        var cell = row.insertCell(0);
                        var cell1 = row.insertCell(1);
                        cell.setAttribute("colspan", "4");
                        cell.setAttribute("class", "text-right");
                        cell.innerHTML = "Coupon Applied "+response.discount + "% OFF";
                        cell1.innerHTML = "- ₹"+response.dis;
                        var row2 = table.insertRow(2);
                        var cell = row2.insertCell(0);
                        var cell1 = row2.insertCell(1);
                        cell.setAttribute("colspan", "4");
                        cell.setAttribute("class", "text-right");
                        cell.innerHTML = "Payable Amount";
                        cell1.innerHTML = "₹"+response.totalAmount;
        
                     
                    }
                }
            }
            
            
        }
    })
})

// order Placed from cart

$('#Checkout-form').submit((e) => {
    e.preventDefault()

    $.ajax({
        url: '/order-placed',
        method: 'post',
        data: $('#Checkout-form').serialize(),
        success: (response) => {
            if (response.codSuccess) {
                location.href = '/order-success'
            } else if (response.razorpay) {
                razorpayPayment(response.response)
            } else if (response.forwardLink) {
                location.href = response.forwardLink
            }
        }
    })

})
function razorpayPayment(order) {
    var options = {
        "key": "rzp_test_OEEvw6L8TUCHKd", // Enter the Key ID generated from the Dashboard
        "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "FootPrint",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response) {
            verifyPayment(response, order)
        },
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9999999999"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
}
function verifyPayment(payment, order) {

    $.ajax({
        url: '/verify_payment',
        data: {
            payment,
            order
        },
        method: 'post',
        success: (response) => {
            if (response.status) {
                location.href = '/order-success'
            } else {
                alert("payment failed")
            }
        }
    })
}

// refferal offer copy

function clickCopyLink() {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999); 
    navigator.clipboard.writeText(copyText.value);
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Successfully Link Copied'
      })
  }
