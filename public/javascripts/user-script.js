
$("#userSignupForm").validate({
    rules: {
        firstname:
        {
            required: true,
                maxlength: 30,
                lettersonly: true,
                normalizer: function(value) {
                    return $.trim(value);
                }
        },
       
        lastname :{
            required: true,
                maxlength: 30,
                lettersonly: true,
                normalizer: function(value) {
                    return $.trim(value);
                }
            
        },
        email: {
            required: true,
            email: true,
            normalizer: function(value) {
                return $.trim(value);
            }
            
        },
        username:{
            required: true,
            maxlength: 30,
            normalizer: function(value) {
                return $.trim(value);
            }
            
        },
        phone:{
            required: true,
            digits: true,
            minlength: 10,
            maxlength:10
            
        },
        address: {
            required: true,
                normalizer: function(value) {
                    return $.trim(value);
                }
            
        },
        townCity : {
            required : true,
            normalizer: function(value) {
                return $.trim(value);
            }
           
        },
        state :{
            required : true,
            normalizer: function(value) {
                return $.trim(value);
            }
            
        },
        pincode:{
            required : true,
            digits: true,
            maxlength: 10,
            normalizer: function(value) {
                return $.trim(value);
            }
           
        },
        password:{
            required : true,
            minlength : 4,
            normalizer: function(value) {
                return $.trim(value);
            }
            
        },
        confirmpassword:{
            required : true,
            
            equalTo :"#CustomerNewPassword"
            
        },
    }
});



$("#userLoginForm").validate({
    rules: 
    {
        username:{
            required: true
        
        },
        password:{
            required : true
        }
        }
            
        
    });


    $("#userOtpMobile").validate({
        rules: 
        {
            phone:{
                required: true,
                normalizer: function(value) {
                    return $.trim(value);
                }
            
            }
            }
                
            
        });


        $("#userOtp").validate({
            rules: 
            {
                otp:{
                    required: true,
                    normalizer: function(value) {
                        return $.trim(value);
                    }
                
                }
                }
                    
                
            });

jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-z," "]+$/i.test(value);
}, "Only letters and spaces are allowed");



// otp timmer SignUp

$( document ).ready(function() {
    timmerCountDown()
});

function timmerCountDown(){
    var deadline = new Date();
    deadline.setMinutes(deadline.getMinutes()+2)
    deadline=deadline.getTime()
var x = setInterval(function() {
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

$("#otpResend").on("click",()=>{
    $.ajax({
        url:"/signup/resendOtp",
        type:"post",
        dataType:"json",
        success:function(res){
            if(res){
                timmerCountDown()
                $('.btn_resend').hide();
                $('.btn_verify').show();
            }else{
                alert("otpSending failed")
            }
        }
    })
})




// otp timmer Login

$( document ).ready(function() {
    timmerCountDown1()
});

function timmerCountDown1(){
    var deadline = new Date();
    deadline.setMinutes(deadline.getMinutes()+2)
    deadline=deadline.getTime()
var x = setInterval(function() {
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

$("#loginOtpResend").on("click",()=>{
    $.ajax({
        url:"/login/resendOtp",
        type:"post",
        dataType:"json",
        success:function(res){
            if(res){
                timmerCountDown1()
                $('.btn_resend').hide();
                $('.btn_verify').show();
            }else{
                alert("otpSending failed")
            }
        }
    })
})