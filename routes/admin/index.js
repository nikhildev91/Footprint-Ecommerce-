
const { response } = require('express');
var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')
var adminHelper = require('../../helpers/admin-helper')
var productHelper = require('../../helpers/product-helpers')
var bannerHelper = require('../../helpers/banner-helper')



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

    productHelper.takeCategory().then((categories)=>{
      productHelper.takeSubCategory()
      
          res.render('admin/add-product',{isadmin, categories});

    })
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
              var image2 = req.files.image2
              var image3 = req.files.image3
              var image4 = req.files.image4
              image1.mv('./public/product-images/'+productID+"first.jpg", (err)=>{
                if(!err){
                  
                  image2.mv('./public/product-images/'+productID+"second.jpg", (err)=>{
                    if(!err){

                      image3.mv('./public/product-images/'+productID+"third.jpg", (err)=>{
                        if(!err){
                          image4.mv('./public/product-images/'+productID+"fourth.jpg", (err)=>{
                            if(!err){
                              res.redirect('/admin/manage-products')

                            }
                          }) 

                        }
                      }) 
                    }
                  }) 
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

  router.get('/manage-category', (req, res, next)=>{

    productHelper.getAllCategory().then((category)=>{
      let CategoryErr = req.session.ExistingCategoryErr;
      req.session.ExistingCategoryErr = null;

      
      res.render('admin/manage-category', {isadmin , category, CategoryErr})
    })
  })


  router.post('/manage-category', (req, res, next)=>{
  let value = req.body
  let category = value.category.toUpperCase()

  console.log(category);

  productHelper.checkCategory(category).then((response)=>{
    if(response){
      req.session.ExistingCategoryErr = "This Category Already Exist"
      res.redirect('/admin/manage-category')

    }else{
      productHelper.insertCategory(category).then((response)=>{
        if(response){
          res.redirect('/admin/manage-category')
        }
      })

    }
  })
 
  });

  router.get('/delete-category/:id', (req, res, next)=>{

    productHelper.deleteCategory(req.params.id).then((response)=>{
      if(response){
        res.redirect('/admin/manage-category')
      }
    })

  });

  router.get('/manage-sub-category/:id', (req, res, next)=>{
    let CatID = req.params.id;
    console.log(CatID);
    let subcategoryErr = req.session.subCategoryErr;
    req.session.subCategoryErr = null;
    productHelper.findSubCategory(CatID).then((Subcategory)=>{

      res.render('admin/manage-sub-category', {isadmin, categoryId : CatID, subcategoryErr, Subcategory})
    })

  });

  router.post('/manage-sub-category/:id', (req, res, next)=>{
    let categoryID = req.params.id;
    let value = req.body;
    let subCategory = value.subcategory.toUpperCase()
    
    console.log(subCategory);
    productHelper.checkSubCategory(subCategory, categoryID).then((response)=>{
      if(response){
        req.session.subCategoryErr = "This Sub Category is already Existed"
        res.redirect('/admin/manage-sub-category/'+categoryID)
      }else{
        productHelper.insertSubCategory(subCategory, categoryID).then((response)=>{
          if(response){
            res.redirect('/admin/manage-sub-category/'+categoryID)
          }
        })

      }
    })

    
    

  });


  router.get('/deletesubcategory/:id',(req, res)=>{

    productHelper.deleteSubCategory(req.params.id).then((response)=>{
      if(response.status){
        res.redirect('/admin/manage-sub-category/' + response.categoryID)
      }
    })
  })





  router.get('/manage-banners', (req, res, next)=>{
    bannerHelper.getMainBanner().then((banner)=>{
      bannerHelper.getCategoryBanner().then((CategoryBanner)=>{
        bannerHelper.getProductListBanner().then((productBanner)=>{
          
          res.render('admin/manage-banner',{isadmin, banner, CategoryBanner, productBanner});
        })
        
      })
    })
  });

  router.get('/add-banner', (req, res, next)=>{
    res.render('admin/add-banners',{isadmin});
  });
  router.post('/add-banner', (req, res, next)=>{
    console.log(req.body);
  console.log(req.files.image1);
  let place = "homemainbanner"
  bannerHelper.checkThisBanner(place).then((response)=>{
    if(response){
      bannerHelper.deleteExistingMainBanner(place).then((response)=>{
        if(response){
          bannerHelper.addHomePageMainBanner(req.body).then((response)=>{
    if(response.status){
      var bannerID = response.bannerID
      var image1 = req.files.image1
              var image2 = req.files.image2
              var image3 = req.files.image3
              var image4 = req.files.image4
              image1.mv('./public/banner-images/'+bannerID+"first.jpg", (err)=>{
                if(!err){
                  
                  image2.mv('./public/banner-images/'+bannerID+"second.jpg", (err)=>{
                    if(!err){

                      image3.mv('./public/banner-images/'+bannerID+"third.jpg", (err)=>{
                        if(!err){
                          image4.mv('./public/banner-images/'+bannerID+"fourth.jpg", (err)=>{
                            if(!err){
                              res.redirect('/admin/manage-banners')

                            }
                          }) 

                        }
                      }) 
                    }
                  }) 
                }
              }) 
              
    }

  })


        }
      })
    }else{
      bannerHelper.addHomePageMainBanner(req.body).then((response)=>{
        if(response.status){
          var bannerID = response.bannerID
          var image1 = req.files.image1
                  var image2 = req.files.image2
                  var image3 = req.files.image3
                  var image4 = req.files.image4
                  image1.mv('./public/banner-images/'+bannerID+"first.jpg", (err)=>{
                    if(!err){
                      
                      image2.mv('./public/banner-images/'+bannerID+"second.jpg", (err)=>{
                        if(!err){
    
                          image3.mv('./public/banner-images/'+bannerID+"third.jpg", (err)=>{
                            if(!err){
                              image4.mv('./public/banner-images/'+bannerID+"fourth.jpg", (err)=>{
                                if(!err){
                                  res.redirect('/admin/manage-banners')
    
                                }
                              }) 
    
                            }
                          }) 
                        }
                      }) 
                    }
                  }) 
                  
        }
    
      })
    }
  })
 
  });

  router.get('/delete-mainbanner', (req, res)=>{
    bannerHelper.deleteManiBanner().then((response)=>{
      if(response){
        res.redirect("/admin/manage-banners")
      }

    })
  });

  router.get('/add-category-banner', (req, res, next)=>{
    res.render('admin/home-page-category-banner',{isadmin});
  });
  router.post('/add-category-banner', (req, res, next)=>{
    console.log(req.files.image1);
    let image1 = req.files.image1;
    let image2 = req.files.image2;
    let place= "homecategory"
    bannerHelper.insertCategoryBanner(place).then((response)=>{
      if(response.status){
       
        var bannerID = response.bannerID
        console.log(bannerID);
        image1.mv('./public/banner-images/'+bannerID+"men.jpg", (err)=>{
          if(!err){
            image2.mv('./public/banner-images/'+bannerID+"women.jpg", (err)=>{
              if(!err){
                res.redirect('/admin/manage-banners')
              }
            })
          }
        })

      } 

    })
  });
  
  router.get('/delete-categorybanner', (req, res)=>{
    bannerHelper.deleteCategoryBanner().then((response)=>{
      if(response){
        res.redirect("/admin/manage-banners")
      }

    })
  });
  router.get('/add-product-banner', (req, res, next)=>{
    res.render('admin/product-list-banner',{isadmin});
  });
  router.post('/add-product-banner', (req, res, next)=>{
    console.log(req.files.image1);
    let image1 = req.files.image1;
    let place = "productBanner"
    bannerHelper.insertProductBanner(place).then((response)=>{
      if(response.status){
        let bannerID = response.bannerID;
        image1.mv('./public/banner-images/'+bannerID+"image.jpg",(err)=>{
          if(!err){
           
            res.redirect('/admin/manage-banners')
          }
        })
      }
      
    })

  });
  
  router.get('/delete-product-banner', (req, res)=>{
    bannerHelper.deleteProductBanner().then((response)=>{
      if(response){
        res.redirect("/admin/manage-banners")
      }

    })
  });







module.exports = router;