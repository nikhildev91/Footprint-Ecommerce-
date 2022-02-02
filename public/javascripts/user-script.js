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
            confirmButtonText: 'Yes, delete it!'
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
            if (res) {
                $('#' + cartId + proId).remove();
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

function addtowishlist(proId){
    $.ajax({
        url : '/add-to-wishlist',
        data : {
            proId
        },
        method : 'post',
        success : (response)=>{
          if(response.status == true){
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
          }else{
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
        data :{
            wishlistId, proId
        },
        method:'post',
        success : (response)=>{
           if(response.status){
               $('#'+wishlistId+proId).remove()
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
            alert(response)
            document.getElementById('normalbill').style.visibility = 'hidden'
            $('.applyCoupon').show();
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



// index page tabs Products

function getAllProducts() {
    $.ajax({
        url: '/get-tab-products',
        method: 'get',
        success: (response) => {
            $('.all_products').html('')
            console.log(response)
            response.forEach((ele) => {
                $('.slick-slide .slick-current .slick-active').append(`<div class="col-12 item">
                                    <!-- start product image -->
                                    <div class="product-image">
                                        <!-- start product image -->
                                        <a href="product-layout1.html" class="product-img">
                                            <!-- image -->
                                            <img class="primary blur-up lazyload" data-src="user-assets/images/product-images/product9-2.jpg" src="user-assets/images/product-images/product9-2.jpg" alt="" title="">
                                            <!-- End image -->
                                            <!-- Hover image -->
                                            <img class="hover blur-up lazyload" data-src="user-assets/images/product-images/product9-1.jpg" src="user-assets/images/product-images/product9-1.jpg" alt="" title="">
                                            <!-- End hover image -->
                                            <!-- product label -->
                                            <div class="product-labels"><span class="lbl on-sale">Sale</span></div>
                                            <!-- End product label -->
                                        </a>
                                        <!-- end product image -->

                                        
                                        <div class="button-set style2">
                                            <ul>
                                                <li>
                                                    <form class="add" action="https://www.annimexweb.com/items/avone/cart-variant1.html" method="post">
                                                        <button class="btn-icon btn btn-addto-cart" type="button" tabindex="0">
                                                            <i class="icon anm anm-cart-l"></i>
                                                            <span class="tooltip-label">Add to Cart</span>
                                                        </button>
                                                    </form>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" title="Quick View" class="btn-icon quick-view-popup quick-view" data-toggle="modal" data-target="#content_quickview">
                                                        <i class="icon anm anm-search-plus-l"></i>
                                                        <span class="tooltip-label">Quick View</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <div class="wishlist-btn">
                                                        <a class="btn-icon wishlist add-to-wishlist" href="my-wishlist.html">
                                                            <i class="icon anm anm-heart-l"></i>
                                                            <span class="tooltip-label">Add To Wishlist</span>
                                                        </a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="compare-btn">
                                                        <a class="btn-icon compare add-to-compare" href="compare-style2.html" title="Add to Compare">
                                                            <i class="icon icon-reload"></i>
                                                            <span class="tooltip-label">Add to Compare</span>
                                                        </a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="product-details text-center">
                                        <div class="product-name">
                                            <a href="product-layout1.html">Martha Knit Top</a>
                                        </div>
                                        <div class="product-price">
                                            <span class="price">$399.01</span>
                                        </div>
                                        <div class="product-review">
                                            <i class="font-13 fa fa-star"></i>
                                            <i class="font-13 fa fa-star"></i>
                                            <i class="font-13 fa fa-star"></i>
                                            <i class="font-13 fa fa-star"></i>
                                            <i class="font-13 fa fa-star-o"></i>
                                        </div>
                                        <ul class="swatches">
                                            <li class="swatch small rounded navy"><span class="tooltip-label">Navy</span></li>
                                            <li class="swatch small rounded green"><span class="tooltip-label">Green</span></li>
                                            <li class="swatch small rounded gray"><span class="tooltip-label">Gray</span></li>
                                            <li class="swatch small rounded aqua"><span class="tooltip-label">Aqua</span></li>
                                            <li class="swatch small rounded orange"><span class="tooltip-label">Orange</span></li>
                                        </ul>
                                    </div>
                                </div>`)
                                                
            })

            }
    })
}