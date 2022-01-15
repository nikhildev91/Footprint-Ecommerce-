var express = require('express');
var router = express.Router();
var userHelper = require('../../helpers/user-helper')
var bannerHelper= require('../../helpers/banner-helper');
const async = require('hbs/lib/async');



const isUser = true;
let userSession;
router.use(function(req, res, next) {
  userSession = req.session.userObj;
  next();
});

/* GET home page. */
router.get('/', async function(req, res, next) {
      let banners= await bannerHelper.takebanners()
      let categoryBanners = await bannerHelper.takeCategoryBanners()
      let category = await userHelper.takeCategory()
      let brands = await bannerHelper.getAllBrands()
      let recentProduct = await userHelper.getRecentProducts()
      let cartCount = 0;
              if(userSession){
                cartCount = await userHelper.getCartCount(userSession._id)
              }
            res.render('user/index', { isUser , isUserIndex : true, userSession, category, banners, categoryBanners, brands, recentProduct, cartCount});

});


router.get('/category-check/:category', async(req, res, next)=>{
  
  let category = await userHelper.takeCategory()
  userHelper.findCategoryProducts(req.params.category).then((products)=>{
   bannerHelper.takeProductBanner().then(async(productBanner)=>{
    let cartCount = 0;
    if(userSession){
      cartCount = await userHelper.getCartCount(userSession._id)
    }

     res.render('user/category-products', { isUser , userSession , products ,category, productBanner, cartCount });
   })


  })


});

router.get('/category-check/product-details/:id',async function(req, res, next) {
  var productID = req.params.id;
  let category = await userHelper.takeCategory()
  userHelper.getThisProduct(productID).then((product)=>{

    userHelper.getRecentProducts().then(async(recentProduct)=>{
      
      let cartCount = 0;
      if(userSession){
        cartCount = await userHelper.getCartCount(userSession._id)
      }
      res.render('user/product', {isUser, userSession, product, category, recentProduct, cartCount});
    })

  })

});

router.use(function(req, res, next){
  if(userSession){
    next()
  }else{
    req.session.UserAccErr ="Please Login Or Signup"
   res.redirect('/login')
  }

})
router.get('/add-to-cart', async(req, res, next)=>{
  let category = await userHelper.takeCategory()
  let cartCount = 0;
  cartCount = await userHelper.getCartCount(userSession._id)
  
    let products = await userHelper.getCartProducts(userSession._id)

      res.render('user/cart', {isUser, category, userSession, products, cartCount})


});

router.get('/add-to-cart/:id',async(req, res, next)=>{
  
 
    userHelper.addtoCart(req.params.id, userSession._id).then(()=>{
      res.redirect('/add-to-cart')
    })
  

})





module.exports = router;
