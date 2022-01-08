
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

