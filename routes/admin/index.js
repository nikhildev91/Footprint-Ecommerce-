
const { response } = require('express');
var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')
var adminHelper = require('../../helpers/admin-helper')
var productHelper = require('../../helpers/product-helpers')



const isadmin = true

/* GET users listing. */

router.get('/', function(req, res, next) {
  if(req.session.isadminLoggedin){

    res.render('admin/index',{isadmin});
  }else{
    res.redirect('/admin/login');
  }
});

router.get('/login', function(req, res, next) {
  if(req.session.isadminLoggedin){
    res.redirect('/admin');
  }else{

    res.render('admin/login',{isadmin, adminLogin : true});
  }
  });

  router.post('/login',(req, res, next)=>{
    var adminLoginData = req.body;
    adminHelper.findAdmin(adminLoginData).then((adminResponse)=>{

      if(adminResponse){
        req.session.admin = adminResponse.admin;
        req.session.isadminLoggedin = adminResponse.status;

        res.redirect('/admin')
      }else{
        res.redirect('/admin/login')
      }

    })

  });

  router.get('/logout',(req,res,next)=>{
    console.log("admin Logout");
    req.session.isadminLoggedin =null;
    req.session.admin =null;
    res.redirect('/admin/login')
  })

// Start products Section

router.get('/add-product', function(req, res, next) {

  if(req.session.isadminLoggedin){

    res.render('admin/add-product',{isadmin});
  }else{
    res.redirect('/admin/login')
  }


  });

  
      
        router.post('/add-product',(req, res, next)=>{

          console.log(req.body);
          console.log(req.files.image1);

          productHelper.addproduct(req.body).then((response)=>{

            console.log(response.Id);
            var productID =response.Id

            if(response.status){

              var image1 = req.files.image1
              image1.mv('./public/product-images/'+productID+".jpg", (err, done)=>{
                if(!err){
                  res.redirect('/admin/manage-products')
                } 
              }) 
            }else{
              res.redirect('/admin/add-product')
            }

            
          })
        })

  router.get('/edit-product/:id', function(req, res, next) {
    if(req.session.isadminLoggedin){
      
      productHelper.findUpdatingProduct(req.params.id).then((foundProduct)=>{
        
        res.render('admin/edit-product',{isadmin, foundProduct});
      })
    }else{
      res.redirect('/admin/login')
    }
    
    
  });
  router.post('/edit-product/:id', function(req, res, next) {
    
    console.log(req.body);
     console.log(req.files.image1);

  productHelper.updateProduct(req.params.id,req.body).then((response)=>{

    console.log(response.status);
    console.log(response.id);
    var productID=response.id

    if(response.status){

      var image1 = req.files.image1
      image1.mv('./public/product-images/'+productID+".jpg", (err, done)=>{
        if(!err){
          res.redirect('/admin/manage-products')
        } 
      }) 
    }else{
      res.redirect('/admin/edit-product')
    }


    // if(response){

    //   res.redirect('/admin/manage-products');
    // }
  })
  });
  
  router.get('/delete-product/:id', (req, res)=>{
    productHelper.deleteProduct(req.params.id).then((respose)=>{
      if(response){
        res.redirect('/admin/manage-products')
      }
    })
  })

  router.get('/manage-products', function(req, res, next) {

    if(req.session.isadminLoggedin){

      productHelper.getAllProducts().then((allProducts)=>{
        res.render('admin/manage-products',{isadmin, allProducts});
  
      })
    }else{
      res.redirect('/admin/login')
    }


  //   if(req.session.isadminLoggedin){
  //     adminHelper.getAllProducts().then((allProducts)=>{
  //       res.render('admin/manage-products',{isadmin, allProducts});
  //     })
  // }else{
  //   res.redirect('/admin/login')
  // }
  });

  //end Product Section

  router.get('/manage-users', function(req, res, next) {

    if(req.session.isadminLoggedin){

      adminHelper.allusers().then((userData)=>{
       
        res.render('admin/manage-user',{isadmin,userData});
      })
    }else{
      res.redirect('/admin/login')
    }
  });

  router.get('/block/:id', function(req, res, next) {

    var userID = req.params.id
    adminHelper.blockUser(userID).then((response)=>{

      if (response){
        
        res.redirect('/admin/manage-users');
      }
     
      
    })
  });

  router.get('/unblock/:id', function(req, res, next) {

    var userID = req.params.id
    adminHelper.unblockUser(userID).then((response)=>{

      if (response){
        
        res.redirect('/admin/manage-users');
      }
     
      
    })
  });






module.exports = router;