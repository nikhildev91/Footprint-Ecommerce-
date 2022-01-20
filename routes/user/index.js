var express = require('express');
var router = express.Router();
var userHelper = require('../../helpers/user-helper')
var bannerHelper= require('../../helpers/banner-helper');
const async = require('hbs/lib/async');
const { load } = require('dotenv');



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
      if(userSession){

        var cartProducts = await userHelper.getCartProducts(userSession._id)
      }
      let cartCount = 0;
              if(userSession){
                cartCount = await userHelper.getCartCount(userSession._id)
              }
            res.render('user/index', { isUser , isUserIndex : true, userSession, category, banners, categoryBanners, brands, recentProduct, cartCount, cartProducts});

});


router.get('/category-check/:category', async(req, res, next)=>{
  if(userSession){

    var cartProducts = await userHelper.getCartProducts(userSession._id)
  }
  let category = await userHelper.takeCategory()
  userHelper.findCategoryProducts(req.params.category).then((products)=>{
   bannerHelper.takeProductBanner().then(async(productBanner)=>{
    let cartCount = 0;
    if(userSession){
      cartCount = await userHelper.getCartCount(userSession._id)
    }

     res.render('user/category-products', { isUser , userSession , products ,category, productBanner, cartCount, cartProducts });
   })


  })


});

router.get('/category-check/product-details/:id',async function(req, res, next) {
  var productID = req.params.id;
  let category = await userHelper.takeCategory()
  if(userSession){

    var cartProducts = await userHelper.getCartProducts(userSession._id)
  }
  userHelper.getThisProduct(productID).then((product)=>{

    userHelper.getRecentProducts().then(async(recentProduct)=>{
      
      let cartCount = 0;
      if(userSession){
        cartCount = await userHelper.getCartCount(userSession._id)
      }
      res.render('user/product', {isUser, userSession, product, category, recentProduct, cartCount, cartProducts});
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
  
    let cartProducts = await userHelper.getCartProducts(userSession._id)
    let total = await userHelper.getTotalAmount(userSession._id)
      res.render('user/cart', {isUser, category, userSession, cartProducts, cartCount, total})


});

router.get('/add-to-cart/:id',async(req, res, next)=>{
  
 
    userHelper.addtoCart(req.params.id, userSession._id).then(()=>{
      res.redirect('/add-to-cart')
    })
  

});
router.post('/change-product-quantity',(req, res, next)=>{
  userHelper.changeProductQuantity(req.body).then(async(response)=>{
  let userId= req.session.userObj._id

  res.send(await userHelper.getTotalAmount(userId))
  })
});

router.post('/remove-cart-product',(req, res, next)=>{
  console.log(req.body.cart);
  console.log(req.body.product);
  userHelper.removeCartProduct(req.body.cart, req.body.product).then((response)=>{
    if(response){
      res.send(true)
    }
  }).catch(()=>{
    res.send(false)
  })
});

router.get('/profile/:id', async(req, res, next)=>{
  let category = await userHelper.takeCategory()
  let cartCount = 0;
  cartCount = await userHelper.getCartCount(userSession._id)
  
    let cartProducts = await userHelper.getCartProducts(userSession._id)

    let user = await userHelper.getUser(req.params.id)
    let  states = await userHelper.getStates()
    let userAddress = await userHelper.getAddress(req.params.id)
   
console.log('states', states )

      res.render('user/profile', {isUser, category, userSession, cartProducts, cartCount, user, states, userAddress})
});
router.post('/add-address/:id',async(req, res)=>{
  let response = await userHelper.addAddress(req.body, req.params.id)
  
  if(response){
    res.redirect('/profile/'+req.params.id)
  }
});
router.get('/edit-address/:id/:userId', async(req, res, next)=>{
  let category = await userHelper.takeCategory()
  let cartCount = 0;
  cartCount = await userHelper.getCartCount(userSession._id)
  
    let cartProducts = await userHelper.getCartProducts(userSession._id)
    console.log(req.params.id);
    console.log(req.params.userId);
    let getEditAddress=await userHelper.getEditAddress(req.params.id, req.params.userId)
    console.log(getEditAddress);

  res.render('user/edit-address',   {isUser,category, userSession, cartProducts, cartCount,getEditAddress}
  )
})
router.get('/edit', async(req, res, next)=>{
  let category = await userHelper.takeCategory()
  let cartCount = 0;
  cartCount = await userHelper.getCartCount(userSession._id)
  
    let cartProducts = await userHelper.getCartProducts(userSession._id)
  res.render('user/edit-profile',{isUser,category, userSession, cartProducts, cartCount})
})
router.post('/edit-address/:userId/:addressId',async(req, res, next)=>{
  console.log(req.body);
  console.log(req.params.userId)
  console.log(req.params.addressId);
  let response = await userHelper.updateAddress(req.body, req.params.userId, req.params.addressId)
  
  if(response){
    res.redirect('/profile/'+req.params.userId)
  }else{
    console.log('err vanne');
  }
});
router.get('/delete-address/:addressId/:userId',async(req, res, next)=>{
  let response = await userHelper.deleteAddress(req.params.addressId, req.params.userId);
  if(response){
    res.redirect('/profile/'+req.params.userId)
  }
})


router.get('/checkout', async(req, res, next)=>{
  let category = await userHelper.takeCategory()
  let cartCount = 0;
  cartCount = await userHelper.getCartCount(userSession._id)
  
    let cartProducts = await userHelper.getCartProducts(userSession._id)
    res.render('user/checkout',{isUser,category, userSession, cartProducts, cartCount})

});

router.post('/place-order/:cartId', async(req, res, next)=>{
  console.log("Nikhil Place order");
  console.log(req.body);
  console.log(req.params.cartId);

  let OrderProducts = await userHelper.getCartOrderProducts(req.params.cartId)
  console.log(OrderProducts.user);
  let getUserAddressForPlaceOrder = await userHelper.getUserAddressForPlaceOrder(OrderProducts.user)
  console.log(getUserAddressForPlaceOrder);

  res.render('user/checkout',{isUser, getUserAddressForPlaceOrder})

})





module.exports = router;
