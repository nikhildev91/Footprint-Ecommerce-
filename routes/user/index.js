var express = require('express');
var router = express.Router();
var userHelper = require('../../helpers/user-helper')
var bannerHelper = require('../../helpers/banner-helper');
var hb = require('express-handlebars').create()
const async = require('hbs/lib/async');
const {
  load
} = require('dotenv');
var paypal = require('paypal-rest-sdk');
const { TaskRouterGrant } = require('twilio/lib/jwt/AccessToken');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AYGjlXg0nfklGTKKkJONL-q3cflFgCU7JVKeCwcSATHjqDJQyt5zL7QvVDKqXC2JQagVbja2QEzivXFq',
    'client_secret': 'EBDlxKwRqNBF_i5msqzLQ655p856RzvZfN15ZicsLA9DGTU6jCWrkTKgIzym-9162g7jFIOAUp9DlDOO'
  });



const isUser = true;
let userSession;
router.use(function (req, res, next) {
  userSession = req.session.userObj;
  next();
});

/* GET home page. */
router.get('/', async function (req, res, next) {
  let banners = await bannerHelper.takebanners()
  let categoryBanners = await bannerHelper.takeCategoryBanners()
  let category = await userHelper.takeCategory()
  let catname = await userHelper.takeCategoryname()
  let brands = await bannerHelper.getAllBrands()
  let recentProduct = await userHelper.getRecentProducts()
  if (userSession) {

    var cartProducts = await userHelper.getCartProducts(userSession._id)
  }
  let wishlistCount = 0;
  let cartCount = 0;
  if (userSession) {
    cartCount = await userHelper.getCartCount(userSession._id)
    wishlistCount = await userHelper.getWishlistCount(userSession._id)
  }
  res.render('user/index', {
    isUser,
    isUserIndex: true,
    userSession,
    category,
    catname,
    banners,
    categoryBanners,
    brands,
    recentProduct,
    cartCount,
    wishlistCount,
    cartProducts
  });

});

router.post('/search-result', async(req, res, next)=>{
  let searchItem = req.body.searchItem;
  let searchCategory = req.body.category;
  let searchProducts = await userHelper.getSearchProducts(searchCategory, searchItem)
  res.render('user/search-result', {isUser, searchProducts})

});

router.get('/get-tab-products', async(req, res, next)=>{
  console.log("routerill vanne");
  let allProducts = await userHelper.getallTabProducts()
  res.json(allProducts)
})

router.get('/category-check/:category', async (req, res, next) => {
  if (userSession) {
    var cartProducts = await userHelper.getCartProducts(userSession._id)
  }
  let category = await userHelper.takeCategory()
  let brands = await userHelper.takeBrand()
  userHelper.findCategoryProducts(req.params.category).then((products) => {
    bannerHelper.takeProductBanner().then(async (productBanner) => {
      let cartCount = 0;
      if (userSession) {
        cartCount = await userHelper.getCartCount(userSession._id)
      }
      res.render('user/category-products', {
        isUser,
        userSession,
        products,
        category,
        brands,
        productBanner,
        cartCount,
        cartProducts
      });
    })


  })


});

router.get('/category-check/product-details/:id', async function (req, res, next) {
  var productID = req.params.id;
  let category = await userHelper.takeCategory()
  if (userSession) {

    var cartProducts = await userHelper.getCartProducts(userSession._id)
  }
  userHelper.getThisProduct(productID).then((product) => {

    userHelper.getRecentProducts().then(async (recentProduct) => {

      let cartCount = 0;
      if (userSession) {
        cartCount = await userHelper.getCartCount(userSession._id)
      }
      res.render('user/product', {
        isUser,
        userSession,
        product,
        category,
        recentProduct,
        cartCount,
        cartProducts
      });
    })

  })

});

router.post('/add-to-wishlist', async(req, res, next)=>{
  if (userSession) {
    let userId = userSession._id;
    let proId  = req.body.proId
    let response = await userHelper.checkProductWishlist(userId, proId)
    console.log("result checkwishlist : ", response);
    if(response){
        res.send({status : false, errMsg : "This Product Already To Wishlist"})
    }else{
      
      userHelper.addtowishlist(userId, proId).then((response)=>{
        if(response){
          res.send({status : true})
        }else{
          res.send({status : false, errMsg : 'Error'})
        }
      })
    }
  }else{
    res.send({ status :false, errMsg : 'Please login'})
  }
})

router.use(function (req, res, next) {
  if (userSession) {
    next()
  } else {
    req.session.UserAccErr = "Please Login Or Signup"
    res.redirect('/login')
  }
});

router.get('/wishlist', async(req, res, next)=>{
    let userId = req.session.userObj._id;
  let items = await userHelper.getWishlist(userId)
  res.render('user/wishlist', {isUser, items})
});



router.get('/add-to-cart', async (req, res, next) => {
  let category = await userHelper.takeCategory()
  let cartCount = 0;
  cartCount = await userHelper.getCartCount(userSession._id)
  let cartProducts = await userHelper.getCartProducts(userSession._id);
  let cartId = null;
  if (cartProducts[0]) {
    cartId = cartProducts[0]._id;
  }
if(cartCount === 0){
  var ordebtndisable = true
}
  let total = await userHelper.getTotalAmount(userSession._id)
  res.render('user/cart', {
    isUser,
    category,
    userSession,
    cartProducts,
    cartCount,
    cartId,
    total,
    ordebtndisable
  })
});

router.get('/add-to-cart/:id', async (req, res, next) => {
  userHelper.addtoCart(req.params.id, userSession._id).then(() => {
    res.redirect('/add-to-cart')
  })
});

router.post('/remove-wishlist-product', async(req, res, next)=>{
 console.log("product wishlist : ", req.body);
  let wishlistId = req.body.wishlistId;
  let proId = req.body.proId
  let response = await userHelper.removeProductFromWishlist(wishlistId, proId)
  if(response){
    res.send({status : true})
  }
});

router.post('/change-product-quantity', (req, res, next) => {
  userHelper.changeProductQuantity(req.body).then(async (response) => {
    let userId = req.session.userObj._id
    res.send(await userHelper.getTotalAmount(userId))
  })
});

router.post('/remove-cart-product', (req, res, next) => {
  console.log(req.body.cart);
  console.log(req.body.product);
  userHelper.removeCartProduct(req.body.cart, req.body.product).then(async(response) => {
    console.log("*********");
    console.log(response);
    if (response === true) {
      console.log("ENtered");
      // res.send(true)
      let category = await userHelper.takeCategory()
  let cartCount = 0;
  cartCount = await userHelper.getCartCount(userSession._id)
  let cartProducts = await userHelper.getCartProducts(userSession._id);
  let cartId = null;
  if (cartProducts[0]) {
    cartId = cartProducts[0]._id;
  }
  if(cartCount === 0){
    var ordebtndisable = true
  }else{
    var ordebtndisable = false
  }
  let total = await userHelper.getTotalAmount(userSession._id)
  
  hb.render('views/user/cart.hbs', {
    isUser,
    category,
    userSession,
    cartProducts,
    cartCount,
    cartId,
    total

  }).then((renderCartPage)=>{
    console.log("This is then");
    res.send({status : true,renderCartPage, ordebtndisable})
  })
    }
  }).catch((err) => {
    console.log("This is catch"+err );
    res.send({status : false})
  })
});

router.get('/profile/:id', async (req, res, next) => {
  let category = await userHelper.takeCategory()
  let cartCount = 0;
  cartCount = await userHelper.getCartCount(userSession._id)
  let cartProducts = await userHelper.getCartProducts(userSession._id)
  let user = await userHelper.getUser(req.params.id)
  let userAddress = await userHelper.getAddress(req.params.id)


  let orders = await userHelper.myOrders(req.params.id)
  console.log("user Session Undo",userSession);
  res.render('user/profile', {
      isUser,
      category,
      userSession,
      cartProducts,
      cartCount,
      user,
      userAddress,
      orders
  })

  // if(orders){
  //   var OrderId = orders._id;
  //   console.log(OrderId);
  // }
  // let products = await userHelper.getProductsViewMyOrders(OrderId)


  // let currentPasswordErr = req.session.currentPasswordErr;
  // req.session.currentPasswordErr = null;
  // let successMsgChangePassword = req.session.changePasswordSuccess;
  // req.session.changePasswordSuccess = null;
  //  res.render('user/profile', {
  //   isUser,
  //   category,
  //   userSession,
  //   cartProducts,
  //   cartCount,
  //   user,
  //   userAddress,
  //   orders,
  //   products,
  //   currentPasswordErr,
  //   successMsgChangePassword
  // })
});

router.post('/add-address/:id', async (req, res) => {
  let response = await userHelper.addAddress(req.body, req.params.id)
  if (response) {
    res.redirect('/profile/' + req.params.id)
  }
});

router.get('/edit-address/:id/:userId', async (req, res, next) => {
  let category = await userHelper.takeCategory()
  let cartCount = 0;
  cartCount = await userHelper.getCartCount(userSession._id)
  let cartProducts = await userHelper.getCartProducts(userSession._id)
  let getEditAddress = await userHelper.getEditAddress(req.params.id, req.params.userId)
  res.render('user/edit-address', {
    isUser,
    category,
    userSession,
    cartProducts,
    cartCount,
    getEditAddress
  })
})
router.get('/edit-profile/:userid', async (req, res, next) => {
  let category = await userHelper.takeCategory()
  let cartCount = 0;
  cartCount = await userHelper.getCartCount(userSession._id)
  let cartProducts = await userHelper.getCartProducts(userSession._id)
  let userProfile = await userHelper.getUserProfileDetails(req.params.userid)
  res.render('user/edit-profile', {
    isUser,
    category,
    userSession,
    cartProducts,
    cartCount,
    userProfile
  })
})
router.post('/edit-profile/:userid', async (req, res) => {
  console.log(req.body);
  console.log(req.files.image1);
  let profileImage = req.files.image1
  let response = await userHelper.editProfileDetails(req.params.userid, req.body)
  if (response.status) {
    let userId = response.userId
    profileImage.mv('./public/profile-images/' + req.params.userid + 'profile.jpg', (err, done) => {
      if (!err) {

        res.redirect('/profile/' + req.params.userid)
      }
    })
  }

});

router.post('/edit-address/:userId/:addressId', async (req, res, next) => {
  let response = await userHelper.updateAddress(req.body, req.params.userId, req.params.addressId)
  if (response) {
    res.redirect('/profile/' + req.params.userId)
  } else {
    console.log('err vanne');
  }
});
router.get('/delete-address/:addressId/:userId', async (req, res, next) => {
  let response = await userHelper.deleteAddress(req.params.addressId, req.params.userId);
  if (response) {
    res.redirect('/profile/' + req.params.userId)
  }
});

router.post('/change-password/:userid', async (req, res, next) => {
  console.log("currentPassword : ", req.body);
  let response = await userHelper.checkCurrentPassword(req.body.currentPassword, req.params.userid)
  console.log(response);
  if (response) {
    let response = await userHelper.updatePassword(req.body.newPassword, req.params.userid)
    if (response) {
      req.session.changePasswordSuccess = "Success Your Password Changed"
      res.redirect('/profile/' + req.params.userid)
    }
  } else {
    req.session.currentPasswordErr = "Didn't Change Password. Worng Current Password"
    res.redirect('/profile/' + req.params.userid)
  }
});

router.post('/place-order/:cartId', async (req, res, next) => {
  let OrderProducts = await userHelper.getCartOrderProducts(req.params.cartId)
  let getUserAddressForPlaceOrder = await userHelper.getUserAddressForPlaceOrder(OrderProducts.user)
  let getProductsForPlaceOrder = await userHelper.getProductsForPlaceOrder(req.params.cartId)
  let subTotal = req.body.subTotal;
  let productTotal = req.body.productTotal[0]
  let userId = await userHelper.getUserId(req.params.cartId)
  req.session.couponApplycount =1;
  res.render('user/checkout', {
    isUser,
    buyOne:false,
    getUserAddressForPlaceOrder,
    getProductsForPlaceOrder,
    subTotal,
    productTotal,
    userId
  })


});

router.post('/get-confirm-address', async (req, res, next) => {
  let addressId = req.body.addressId;
  let userId = req.body.userId;
  let address = await userHelper.getSelectedAddress(userId, addressId)
  res.json(address)
});


router.post('/apply-coupon', async(req, res, next)=>{
  console.log(req.body);
 var couponApplycount = req.session.couponApplycount
  var couponCode = req.body.couponcode;
  var userId = req.session.userObj._id;
  var resp = await userHelper.checkcouponCode(couponCode)
  if(resp.status){
    let response = await userHelper.checkUserUsedCoupon(resp.coupon, userId)
    if(response.status){
        console.log('user already used coupon');
    }else{
      if(req.body.buyone ==="true"){
        if(couponApplycount ==1){
          let total = req.body.productPrice;
          let discount = resp.coupon.discount;
          let dis = ((total*discount)/100)
          let grandTotal = total - dis
          console.log(grandTotal);
          req.session.couponApplycount++
          res.json({totalAmount : grandTotal, discount : discount, dis : dis})
          
        }else{
          res.json({errMsg : "Coupon Exist"})
        }
      }else if(req.body.buyone === "false"){
        if(couponApplycount ==1){
        let total = req.body.grandTotal;
        let discount = resp.coupon.discount;
        let dis = ((total*discount)/100)
        let grandTotal = total - dis
        req.session.couponApplycount++
        res.json({totalAmount : grandTotal, discount : discount, dis : dis})
      }else{
        res.json({errMsg : "Coupon Exist"})
      }
      }
      
    }
  }else{
    console.log(resp.status);
    console.log("date not match");
  }
})

router.post('/order-placed', async (req, res, next) => {
  console.log(req.body);
  if(req.body.appliedCoupon === 'true'){
    console.log("req.body.appliedgrandTotal >" , req.body.appliedgrandTotal);
    req.session.appliedgrandTotal = req.body.appliedgrandTotal
  }
    var totalprice = await userHelper.getTotalAmount(req.body.userId)
    
  userHelper.placeOrder(req.body, totalprice,  req.body.userId).then(async(response)=>{
    req.session.orderId = response.orderId;
    if(req.body.appliedCoupon === 'true'){
      console.log("coupon applied");
      var totalPrice = req.session.appliedgrandTotal
      var amount = parseInt(totalPrice)
      console.log(amount);
    }else{ 
      var amount = parseInt(req.body.grandTotal)
    }
    if(req.body.paymentMethod==='COD'){

      res.json({codSuccess : true})
    }else if(req.body.paymentMethod==='Razorpay'){
     console.log("same ;" , amount);
     var response = await userHelper.generateRazorpay(response.orderId, amount)
     res.json({response : response, razorpay : true})
    }else if(req.body.paymentMethod==='Paypal'){
      if(req.body.appliedCoupon === 'true'){
        var totalPrice = req.body.appliedgrandTotal
      }else{
        var totalPrice = req.body.grandTotal
      }
      let amount = parseInt(totalPrice)
      var create_payment_json = {
        "intent": "sale", 
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/order-success",
            "cancel_url": "http://localhost:3000"
        },
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": amount
            },
            "description": "This is the payment description."

        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
          throw error;
      } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === "approval_url"){
            userHelper.changePaymentStatus(response.orderId).then(()=>{

              res.send({forwardLink: payment.links[i].href});
            })
          
          }
        }
        
      }
  });
     
    }
  })
});

router.get('/order-success',async(req, res)=>{
  let userId = req.session.userObj._id;
  let orderId = req.session.orderId;
  let orderDetails = await userHelper.getOrderDetalis(userId, orderId)
  let products = await userHelper.getProducts(orderId)
  res.render('user/thankyouPage', {isUser, products, orderDetails})
})

router.get('/product-checkout/:proid', async (req, res, next) => {
  req.session.couponApplycount =1;
  let userId = req.session.userObj._id
  let product = await userHelper.getProductForBuyNow(req.params.proid)
  let getUserAddressForPlaceOrder = await userHelper.getUserAddressForPlaceOrder(userId)
  res.render('user/checkout', {
    isUser,
    getUserAddressForPlaceOrder,
    product,
    userId,
    buyOne:true
  })
});

router.get('/view-myorder_details/:orderid', async (req, res, next) => {
  let category = await userHelper.takeCategory()
  let cartCount = 0;
  cartCount = await userHelper.getCartCount(userSession._id)
  let cartProducts = await userHelper.getCartProducts(userSession._id)
  let orderDetails = await userHelper.getMyOrders(req.params.orderid)
  if (orderDetails[0].data[0].status === "Placed") {
    var orderStatus1 = "Placed"
  }
  if (orderDetails[0].data[0].status === "Packed") {
    var orderStatus2 = "Packed"
  }
  if (orderDetails[0].data[0].status === "Shipped") {
    var orderStatus3 = "Shipped"
  }
  if (orderDetails[0].data[0].status === "Delivered") {
    var orderStatus4 = "Delivered"
    var delivered = true;
  }
  if (orderDetails[0].data[0].status === "Cancelled") {
    var orderStatus5 = "Cancelled"
    var cancel = true;
  }
  if (delivered || cancel) {
    var cancelbtn = true
  }
  res.render('user/view-orderDetails', {
    isUser,
    category,
    userSession,
    cartProducts,
    cartCount,
    orderDetails,
    orderStatus1,
    orderStatus2,
    orderStatus3,
    orderStatus4,
    orderStatus5,
    cancelbtn
  })
});

router.get('/order-cancel/:orderid', async (req, res) => {
  let response = await userHelper.checkOrderStatusForCancel(req.params.orderid)
  if (response == false) {
    let response = await userHelper.cancelOrder(req.params.orderid)
    if (response) {
      res.redirect('/view-myorder_details/' + req.params.orderid)
    }
  }
});

router.post('/verify_payment', (req, res)=>{
  console.log(req.body);
  userHelper.verifyPayment(req.body).then(()=>{
    userHelper.changePaymentStatus(req.body['order[receipt]']).then(()=>{
      console.log("payment success");
      res.json({status:true})
    })
  }).catch((err)=>{
    console.log(err);
    res.json({status:false, errMsg :'paymet failed'})
  })
});






module.exports = router;