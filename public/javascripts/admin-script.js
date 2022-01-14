$(document).ready(function(){
    $('.select2').select2();
})

$(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });







  $("#adminLoginForm").validate({
    rules: {
        email:{
            required: true,
            email : true
        },
        password:{
            required : true
        }
        
    }
});


$(document).ready( function () {
  $('.tb_datatable').DataTable();
} );


// Add Product Form Verification

$("#add-Product").validate({
  rules: {
    productTitle:
      {
          required: true,
              maxlength: 30,
              normalizer: function(value) {
                  return $.trim(value);
              }
      },
     
      productDescription :{
          required: true,
              maxlength: 100,
              normalizer: function(value) {
                  return $.trim(value);
              }
          
      },
      brand: {
          required: true,
          normalizer: function(value) {
              return $.trim(value);
          }
          
      },
      category:{
          required: true,
          
      },
      subCategory:{
          required: true,
          
      },
      color: {
          required: true,
          lettersonly: true,
              normalizer: function(value) {
                  return $.trim(value);
              }
          
      },
      material : {
          required : true,
          lettersonly : true,
          normalizer: function(value) {
              return $.trim(value);
          }
         
      },
      "size[]" :{
          required : true,
          normalizer: function(value) {
              return $.trim(value);
          }
          
      },
      quantity:{
          required : true,
          digits: true,
          
          normalizer: function(value) {
              return $.trim(value);
          }
         
      },
      price:{
          required : true,
          digits:true,
          normalizer: function(value) {
              return $.trim(value);
          }
          
      },
      image1:{
          required : true,
          
      },
      image2:{
        required : true,
        
    },
    image3:{
      required : true,
      
  },
  image4:{
    required : true,
    
},
  }
});

// Add Home page banner validation
$("#add-Banner").validate({
    rules:{
        image1:{
            required : true,
            
        },
        image2:{
          required : true,
          
      },
      image3:{
        required : true,
        
    },
    image4:{
      required : true,
      
  },
  title1 : {
      required : true,
      normalizer: function(value) {
        return $.trim(value);
    }
},
    title2 : {
        required : true,
        normalizer: function(value) {
          return $.trim(value);
        }
      },
      title3 : {
        required : true,
        normalizer: function(value) {
          return $.trim(value);
        }
      },
      title4 : {
        required : true,
        normalizer: function(value) {
          return $.trim(value);
        }
      }

  

    }})

    //Add Category form validation

    $("#manageCategoryForm").validate({
          rules:{
            category :{
              required : true,
              normalizer: function(value) {
                return $.trim(value);
              }

            }

          }
        });



        $("#manageSubCategoryForm").validate({
          rules:{
            subcategory :{
              required : true,
              normalizer: function(value) {
                return $.trim(value);
              }

            }

          }
        });



        $("#add-Brand").validate({
          rules:{
            logo :{
              required : true
            },
            brand :{

              required : true,
              normalizer: function(value) {
                return $.trim(value);
              }


            }

          }
        })
 




jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-z," "]+$/i.test(value);
}, "Only letters and spaces are allowed");