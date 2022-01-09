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