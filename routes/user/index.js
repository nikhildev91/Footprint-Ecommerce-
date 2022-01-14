var express = require('express');
var router = express.Router();
var userHelper = require('../../helpers/user-helper')
var bannerHelper= require('../../helpers/banner-helper')



const isUser = true;
let userSession;
let category;

router.use(function(req, res, next) {
  userSession = req.session.user;
  category = req.session.category;
   
  next();
});


/* GET home page. */
router.get('/', function(req, res, next) {
    
    bannerHelper.takebanners().then((banners)=>{

      bannerHelper.takeCategoryBanners().then((categoryBanners)=>{
        userHelper.takeCategory().then((category)=>{
          req.session.category=category
          bannerHelper.getAllBrands().then((brands)=>{
            userHelper.getRecentProducts().then((recentProduct)=>{

            res.render('user/index', { isUser , isUserIndex : true, userSession, category, banners, categoryBanners, brands, recentProduct});
          })
          })

        })
        
      })
      
    })
});


router.get('/category-check/:category',(req, res, next)=>{
  
  userHelper.takeCategory().then((category)=>{
  userHelper.findCategoryProducts(req.params.category).then((products)=>{
   bannerHelper.takeProductBanner().then((productBanner)=>{

     res.render('user/category-products', { isUser , userSession , products ,category, productBanner });
   })


  })
})

});

router.get('/category-check/product-details/:id', function(req, res, next) {

  

  var productID = req.params.id;
  userHelper.takeCategory().then((category)=>{
  userHelper.getThisProduct(productID).then((product)=>{

    userHelper.getRecentProducts().then((recentProduct)=>{

      res.render('user/product', {isUser, userSession, product, category, recentProduct});
    })

  })
})
});


router.get('/cart',(req, res, next)=>{
  userHelper.takeCategory().then((category)=>{
  res.render('user/cart', {isUser, category})
  })
})




module.exports = router;
