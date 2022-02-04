const {
    response
} = require('express');
const async = require('hbs/lib/async');
const {
    ObjectId
} = require('mongodb');
var database = require('../dataConfig/databaseConnection');
const Razorpay  = require('razorpay');
const { DataSessionInstance } = require('twilio/lib/rest/wireless/v1/sim/dataSession');
var instance = new Razorpay({
    key_id: 'rzp_test_OEEvw6L8TUCHKd',
    key_secret: 'oJlWYAn0TaqJEMwwnyAobx2B',
  });
// var paypal = require('paypal-rest-sdk');
// paypal.configure({
//     'mode': 'sandbox', //sandbox or live
//     'client_id': 'AdztJKbUC0wDPg_bnf_mdI0A23oJ5FIsJ_D9KTy9XiT_sozOZ5jhhxKGPVak9vttvjlE8TucfApdzLlG',
//     'client_secret': 'ECdrLz3xZK7odyw0ibTnjSu_1edFa8cc7HFUdeW7HHiqfy7lcj5dU7nbMeRTJ-cguDxyCvGZGQPbJMGk'
//   });

module.exports = {

    checkIsUser: (phone, email) => {
        return new Promise((resolve, reject) => {
            database.get().collection("usersData").findOne({
                $or: [{
                    phone: phone
                }, {
                    email: email
                }]
            }).then((result) => {
                if (result) {

                    return resolve(true)
                } else {

                    return resolve(false)

                }
            })
        })

    },

    insertNewUserData: (NewUserData) => {

        NewUserData.block = false;

        return new Promise((resolve, reject) => {

            database.get().collection("usersData").insertOne(NewUserData).then((result) => {
                database.get().collection("usersData").findOne({
                    _id: result.insertedId
                }).then((insertedUser) => {
                    return resolve({
                        status: true,
                        user: insertedUser
                    })
                })

            }).catch(() => {
                return reject({
                    status: false
                })
            })

        });



    },

    findUser: (userLoginData) => {
        console.log(userLoginData);

        return new Promise(async (resolve, reject) => {
            var user = await database.get().collection("usersData").findOne({
                username: userLoginData.username,
                password: userLoginData.password,
                block: false
            })

            if (user) {
                return resolve({
                    status: true,
                    user
                });
            } else {

                if (await database.get().collection('usersData').findOne({
                        username: userLoginData.username,
                        password: userLoginData.password
                    })) {
                    return resolve({
                        status: false,
                        errorMsg: 'Currently You are blocked '
                    })
                }

                if (await database.get().collection('usersData').findOne({
                        username: userLoginData.username
                    })) {
                    return resolve({
                        status: false,
                        errorMsg: 'Invalid Password '
                    })
                }

                return resolve({
                    status: false,
                    errorMsg: 'Invalid email or password '
                })

            }
        })

    },

    findPhone: (phone) => {
        return new Promise((resolve, reject) => {
            database.get().collection("usersData").findOne({
                phone: phone
            }).then((result) => {

                if (result) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }

            })
        })

    },

    findUserWithOtpPhone: (otpNumber) => {
        return new Promise((resolve, reject) => {
            var otpUser = database.get().collection("usersData").findOne({
                phone: otpNumber
            })

            if (otpUser) {
                return resolve({
                    status: true,
                    otpUser
                })
            } else {
                return resolve({
                    status: false
                })
            }
        })

    },

    findCategory: () => {
        return new Promise(async (resolve, reject) => {
            let categories = await database.get().collection("category").find().toArray()
            return resolve(categories)
        })

    },


    findCategoryProducts: (categoryName) => {
        console.log(categoryName);
        return new Promise(async (resolve, reject) => {
            let foundedCategoryProducts = await database.get().collection("products").find({
                category: categoryName
            }).toArray()

            console.log(foundedCategoryProducts);

            return resolve(foundedCategoryProducts)
        })

    },

    getMenProducts: () => {
        return new Promise(async (resolve, reject) => {
            var menProducts = await database.get().collection("products").find({
                category: "Men"
            }).toArray()
            //   console.log(menProducts);
            //   console.log("vannu illa");
            return resolve(menProducts)
        })
    },
    getWomenProducts: () => {
        return new Promise(async (resolve, reject) => {
            var womenProducts = await database.get().collection("products").find({
                category: "Women"
            }).toArray()
            //   console.log(menProducts);
            //   console.log("vannu illa");
            return resolve(womenProducts)
        })
    },
    getKidsProducts: () => {
        return new Promise(async (resolve, reject) => {
            var kidsProducts = await database.get().collection("products").find({
                category: "Kids"
            }).toArray()
            //   console.log(menProducts);
            //   console.log("vannu illa");
            return resolve(kidsProducts)
        })
    },

    getThisProduct: (productID) => {
        return new Promise(async (resolve, reject) => {
            var product = await database.get().collection("products").findOne({
                _id: ObjectId(productID)
            })

            console.log(product);

            return resolve(product);
        })

    },
    getSearchProducts : (searchCategory, searchItem)=>{
        return new Promise(async(resolve, reject)=>{
            let products = await database.get().collection('products').aggregate([
                {
                    $match:{$or:[ {
                        'category':{$regex:"^"+searchCategory, $options:'i'},
                    },{
                        $or:[
                            {'productTitle':{$regex:searchItem, $options:'i'}},
                            {'brand':{$regex:searchItem, $options:'i'}},
                            {'category':{$regex:searchItem, $options:'i'}},
                            {'subcategory':{$regex:searchItem, $options:'i'}},
                            {'material':{$regex:searchItem, $options:'i'}},
                        ]
                    }

                    ]
                        
                    }
                }
            ]).toArray()
           
            resolve(products)
          
        })
    },
    getallTabProducts : ()=>{
        return new Promise(async(resolve, reject)=>{
            let products = await database.get().collection("products").find().toArray()
            resolve(products)
        })
    },
    takeCategory: () => {
        return new Promise(async (resolve, reject) => {
            let categories = await database.get().collection("category").aggregate([{
                $lookup: {
                    from: "subCategory",
                    localField: "_id",
                    foreignField: "categoryID",
                    as: "subcategory"

                }
            }]).toArray()

            return resolve(categories)
        })
    },
    takeBrand : ()=>{
        return new Promise(async(resolve, reject)=>{
            let brands = await database.get().collection('brands').find().toArray()
            resolve(brands)
        })
    },
    takeCategoryname : ()=>{
        return new Promise(async(resolve, reject)=>{
            var category = await database.get().collection('category').find({$or : [{category : "MEN" }, {category : "WOMEN"}]}).toArray()
            resolve(category)
        })
    },

    getRecentProducts: () => {
        return new Promise(async (resolve, reject) => {
            var recentProduct = await database.get().collection("products").find().limit(7).toArray()
            resolve(recentProduct)
        })
    },
    checkProductWishlist : (userId, proId)=>{
        return new Promise(async(resolve, reject)=>{
             database.get().collection('wishlist').findOne(
                {$and: [
                        {userId : ObjectId(userId)}, {items : ObjectId(proId)}
                ]}
            ).then((result)=>{
                if(result){

                    resolve(true)
                }else{
                    resolve(false)
                }
            })
        })
    },
    addtowishlist : (userId, proId)=>{
        return new Promise(async(resolve, reject)=>{
            
            let wishlist = await database.get().collection('wishlist').findOne(
                {userId :ObjectId(userId)}
            )
            if (wishlist){
                database.get().collection('wishlist').updateOne(
                    {userId : ObjectId(userId)},
                     {
                        $push : {
                            items : ObjectId(proId) 
                        }
                    }
                ).then(()=>{
                    resolve(true)
                })
            }else{
                let wishlistObj ={
                    userId : ObjectId(userId),
                    items : [ObjectId(proId)]
                }
                database.get().collection('wishlist').insertOne(wishlistObj).then(()=>{
                    resolve(true)
                })
            }
        })
    },
    getWishlist : (userId)=>{
        return new Promise(async(resolve, reject)=>{
          let products = await database.get().collection('wishlist').aggregate([
              {$match: {userId : ObjectId(userId)}},
              {$unwind: "$items"},
              {$lookup : {
                  from : 'products',
                  localField : 'items',
                  foreignField: '_id',
                  as: 'productList'
              }},
              {$unwind : "$productList"},
              {$project : {
                  'productList' : 1
              }}
          ]).toArray()
          console.log(products);
            resolve(products)
        })
    },
    removeProductFromWishlist : (wishlistId, proId)=>{
        return new Promise((resolve, reject)=>{
            database.get().collection('wishlist').updateOne({_id : ObjectId(wishlistId)},
            {$pull : {
                items : ObjectId(proId)
            }}
            ).then(()=>{
                resolve(true)
            })
        })
    },
    getWishlistCount : (userId)=>{
        return new Promise(async(resolve, reject)=>{
            let count = 0;
            let wishlist = await database.get().collection("wishlist").findOne({
                userId: ObjectId(userId)
            })
            if (wishlist) {
                count = wishlist.items.length
            }
            
            resolve(count)
        })
    },
    addtoCart: (proId, userId) => {
        return new Promise(async (resolve, reject) => {
            let product = await database.get().collection('products').findOne({
                _id: ObjectId(proId)
            })
            let proObj = {
                item: ObjectId(proId),
                quantity: 1,
                productTotal: product.price
            }

            let userCart = await database.get().collection("cart").findOne({
                user: ObjectId(userId)
            })
            if (userCart) {
                let proExist = userCart.products.findIndex(product => product.item == proId)
                console.log(proExist);
                if (proExist != -1) {
                    database.get().collection('cart').updateOne({
                        user: ObjectId(userId),
                        'products.item': ObjectId(proId)
                    }, {
                        $inc: {
                            'products.$.quantity': 1
                        }
                    }).then(() => {
                        resolve()
                    })
                } else {

                    database.get().collection('cart').updateOne({
                        user: ObjectId(userId)
                    }, {
                        $push: {
                            products: proObj
                        }
                    }).then((response) => {
                        resolve()
                    })
                }
            } else {
                let cartObj = {
                    user: ObjectId(userId),
                    products: [proObj]
                }
                database.get().collection("cart").insertOne(cartObj).then((response) => {
                    resolve()
                })
            }
        })
    },

    getCartProducts: (userId) => {
        return new Promise(async (resolve, reject) => {
            let cartItems = await database.get().collection("cart").aggregate([{
                    $match: {
                        user: ObjectId(userId)
                    },

                },
                {
                    $unwind: '$products'
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'products.item',
                        foreignField: '_id',
                        as: 'cartProducts'
                    }
                },
                {
                    $unwind: '$cartProducts'
                },
                {
                    $project: {
                        quantity: '$products.quantity',
                        total: {
                            $multiply: [
                                '$cartProducts.price', '$products.quantity'
                            ]
                        },
                        product: '$cartProducts'
                    }
                }
            ]).toArray()
            console.log('cartItems', cartItems)
            resolve(cartItems)
        })

    },
    getCartCount: (userId) => {

        return new Promise(async (resolve, reject) => {
            let count = 0;
            let cart = await database.get().collection("cart").findOne({
                user: ObjectId(userId)
            })
            if (cart) {
                count = cart.products.length
            }
            resolve(count)
        })

    },
    changeProductQuantity: (details) => {
        details.count = parseInt(details.count)
        details.quantity = parseInt(details.quantity)
        console.log(typeof details.count);

        return new Promise((resolve, reject) => {
            if (details.count == -1 && details.quantity === 1) {
                database.get().collection('cart').updateOne({
                    _id: ObjectId(details.cart)
                }, {
                    $pull: {
                        products: {
                            item: ObjectId(details.product)
                        }
                    }
                }).then((response) => {
                    resolve({
                        removeProduct: true
                    })
                })
            } else {

                database.get().collection('cart').updateOne({
                    _id: ObjectId(details.cart),
                    'products.item': ObjectId(details.product)
                }, {
                    $inc: {
                        'products.$.quantity': details.count
                    },
                    $set: {
                        'products.$.productTotal': parseFloat(details.productTotal)
                    }
                }).then((response) => {

                    resolve({
                        status: true
                    })
                })
            }

        })
    },

    removeCartProduct: (cartId, proId) => {
        return new Promise((resolve, reject) => {
            database.get().collection('cart').updateOne({
                _id: ObjectId(cartId)
            }, {
                $pull: {
                    products: {
                        item: ObjectId(proId)
                    }
                }
            }).then((result) => {
                resolve(true)
            }).catch(() => {
                reject(false)
            })
        })
    },

    getTotalAmount: (userId) => {
        console.log("gettotalAmount vilichu");
        console.log(userId);
        return new Promise(async (resolve, reject) => {
            let totalAmount = await database.get().collection("cart").aggregate([{
                    $match: {
                        user: ObjectId(userId)
                    },

                },
                {
                    $unwind: '$products'
                },
                {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity'
                    }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'item',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $project: {
                        item: 1,
                        quantity: 1,
                        product: {
                            $arrayElemAt: ['$product', 0]
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: {
                                $multiply: ['$quantity', '$product.price']
                            }
                        }
                    }
                }
            ]).toArray()


            let productsTotal = await database.get().collection("cart").aggregate([{
                    $match: {
                        user: ObjectId(userId)
                    },

                },
                {
                    $unwind: '$products'
                },
                {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity'
                    }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'item',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $unwind: '$product'
                },
                {
                    $project: {
                        item: 1,
                        quantity: 1,
                        total: {
                            $sum: {
                                $multiply: ['$quantity', '$product.price']
                            }
                        }
                    }
                },
            ]).toArray()
              
            resolve({
                subtotal: totalAmount[0],
                productsTotal
            })

        })
    },

    getUser: (userId) => {

        return new Promise(async (resolve, reject) => {
            let user = await database.get().collection('usersData').findOne({
                _id: ObjectId(userId)
            })
            resolve(user)
        })
    },
    myOrders: (userId) => {
        return new Promise(async (resolve, reject) => {
            let orderDetails = await database.get().collection('orderPlaced').aggregate([
        {
            $match:{userId : ObjectId(userId)}
        },{
            $unwind:"$products.productsTotal"
            
        },{
            $lookup:{
                from: 'products',
                        localField: 'products.productsTotal.item',
                        foreignField: '_id',
                        as: 'productList'
            }
        },{
            $unwind:"$productList"
        },{
            $group:{
                _id:'$_id',
                data:{
                    $push:"$$ROOT"
                }
            }
        }
            ]).toArray()
            resolve(orderDetails)
        })
    },
    getProductsViewMyOrders : (orderId)=>{
        return new Promise(async (resolve, reject) => {
            let products = await database.get().collection('orderPlaced').aggregate([{
                    $match: {
                        _id: ObjectId(orderId)
                    }
                },
                {
                    $project: {
                        'productArr': '$products.productsTotal'
                    }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'productArr.item',
                        foreignField: '_id',
                        as: 'productList'
                    }
                },
                {
                    $unwind: "$productList"
                },
                {
                    $project: {
                        'title': '$productList.productTitle',
                        'price': '$productList.price',
                        'proId': '$productList._id'

                    }
                }
            ]).toArray()
            resolve(products);
        })
    },
    addAddress: (userDetails, userId) => {
        return new Promise((resolve, reject) => {
            userDetails._id = ObjectId()
            database.get().collection('address').findOne({
                userId: ObjectId(userId)
            }).then((response) => {
                if (response) {
                    database.get().collection('address').updateOne({
                        userId: ObjectId(userId)
                    }, {
                        $push: {
                            address: userDetails
                        }
                    }).then(() => {
                        resolve(true)
                    })
                } else {
                    let userAddress = {
                        userId: ObjectId(userId),
                        address: [userDetails]
                    }
                    database.get().collection('address').insertOne(userAddress).then(() => {
                        resolve(true)
                    })
                }
            })
        })
    },
    getAddress: (userId) => {
        return new Promise(async (resolve, reject) => {
            let userAddress = await database.get().collection('address').findOne({
                userId: ObjectId(userId)
            })
            resolve(userAddress)
        })
    },



    getEditAddress: (addressId, userId) => {
        return new Promise(async (resolve, reject) => {
            let editAddress = await database.get().collection('address').aggregate([{
                    $match: {
                        userId: ObjectId(userId)
                    }
                },
                {
                    $unwind: "$address"
                },
                {
                    $match: {
                        "address._id": ObjectId(addressId)
                    }
                }
            ]).toArray()

            resolve(editAddress[0])
        })
    },
    updateAddress: (editedAddress, userId, addressId) => {
        let firstname = editedAddress.firstname;
        let lastname = editedAddress.lastname;
        let phone = editedAddress.phone;
        let pincode = editedAddress.pincode;
        let address = editedAddress.address;
        let district = editedAddress.district;
        let state = editedAddress.state;
        let landmark = editedAddress.landmark;
        let altenativePhone = editedAddress.alternativePhone;
        let addressType = editedAddress.addressType;

        return new Promise((resolve, reject) => {
            database.get().collection('address').updateOne({
                userId: ObjectId(userId),
                "address._id": ObjectId(addressId)
            }, {
                $set: {
                    "address.$.firstname": firstname,
                    "address.$.lastname": lastname,
                    "address.$.phone": phone,
                    "address.$.pincode": pincode,
                    "address.$.address": address,
                    "address.$.district": district,
                    "address.$.state": state,
                    "address.$.landmark": landmark,
                    "address.$.alternativePhone": altenativePhone,
                    "address.$.addressType": addressType
                }
            }).then(() => {
                resolve(true)
            })
        })
    },
    deleteAddress: (addressId, userId) => {
        return new Promise((resolve, reject) => {
            database.get().collection('address').updateOne({
                userId: ObjectId(userId)
            }, {
                $pull: {
                    address: {
                        _id: ObjectId(addressId)
                    }
                }
            }).then(() => {
                resolve(true)
            })
        })

    },


    getCartOrderProducts: (cartId) => {
        return new Promise(async (resolve, reject) => {
            let orderProduct = await database.get().collection("cart").aggregate([{
                    $match: {
                        _id: ObjectId(cartId)
                    },

                },
                {
                    $unwind: '$products'
                },
                {
                    $project: {
                        user: '$user',
                        item: '$products.item',
                        quantity: '$products.quantity'
                    }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'item',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $project: {
                        item: 1,
                        quantity: 1,
                        user: 1,
                        product: {
                            $arrayElemAt: ['$product', 0]
                        }
                    }
                }
            ]).toArray()
            console.log(orderProduct[0]);
            resolve(orderProduct[0])


        })
    },

    getUserAddressForPlaceOrder: (userId) => {
        return new Promise(async (resolve, reject) => {
            let userAddress = await database.get().collection('address').findOne({
                userId: ObjectId(userId)
            })

            resolve(userAddress)
        })
    },

    getSelectedAddress: (userId, addressId) => {
        return new Promise(async (resolve, reject) => {
            let address = await database.get().collection('address').aggregate([{
                    $match: {
                        userId: ObjectId(userId)
                    }
                },
                {
                    $unwind: "$address"
                },
                {
                    $match: {
                        'address._id': ObjectId(addressId)
                    }
                }
            ]).toArray()

            resolve(address[0])
        })
    },

    getProductsForPlaceOrder: (cartId) => {
        return new Promise(async (resolve, reject) => {
            let cartItems = await database.get().collection("cart").aggregate([{
                    $match: {
                        _id: ObjectId(cartId)
                    },

                },
                {
                    $unwind: '$products'
                },
                {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity',
                        productTotal: '$products.productTotal'
                    }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'item',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $project: {
                        item: 1,
                        quantity: 1,
                        productTotal: 1,
                        product: {
                            $arrayElemAt: ['$product', 0]
                        }
                    }
                }
            ]).toArray()

            resolve(cartItems)

        })
    },

    getUserId: (cartId) => {
        return new Promise(async (resolve, reject) => {
            let cart = await database.get().collection('cart').findOne({
                _id: ObjectId(cartId)
            })
            resolve(cart.user)
        })
    }, 
    placeOrder: (order, productstotalPrice, userid) => {

        return new Promise(async (resolve, reject) => {
            if (order.buynow ==='true') {
                let status = order.paymentMethod === 'COD' ? 'Placed' : 'Pending'
             
                var product = await database.get().collection('products').findOne({
                    _id: ObjectId(order.proId)
                })
                let date = new Date()
                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();

                let fullDate = `${day}-${month}-${year}`;

                if(order.appliedCoupon === 'true'){
                    let payableAmount = parseInt(order.appliedgrandTotal)
                    var orderObj = {
                        date: fullDate,
                        deliveryDetails: {
                            name: order.firstname,
                            mobile: order.phone,
                            address: order.address,
                            pincode: order.pincode
                        },
                        userId: ObjectId(userid),
                        paymentMethod: order.paymentMethod,
                        products: {
                            subtotal: {
                                _id: null,
                                total: product.price
                            },
                            productsTotal: [{
                                item: ObjectId(order.proId),
                                quantity: 1,
                                total: product.price
                            }]
                        },
                        buynow :order.buynow,
                        status: status,
                        couponApplied : true,
                        payableAmount : payableAmount,
                        couponDiscount : order.couponDiscount,
                        couponDiscountAmount : order.couponDiscountAmount

                    }

                }else{
                    var orderObj = {
                        date: fullDate,
                        deliveryDetails: {
                            name: order.firstname,
                            mobile: order.phone,
                            address: order.address,
                            pincode: order.pincode
                        },
                        userId: ObjectId(userid),
                        paymentMethod: order.paymentMethod,
                        products: {
                            subtotal: {
                                _id: null,
                                total: product.price
                            },
                            productsTotal: [{
                                item: ObjectId(order.proId),
                                quantity: 1,
                                total: product.price
                            }]
                        },
                        buynow :order.buynow,
                        status: status
                    }
                }
                    
                database.get().collection('orderPlaced').insertOne(orderObj).then((result) => {
                    if(order.appliedCoupon === 'true' && order.paymentMethod === 'COD'){
                        database.get().collection('userUsedCoupons').findOne({userId : ObjectId(order.userId)}).then((result)=>{
                            if(result){
                                database.get().collection('userUsedCoupons').updateOne({userId : ObjectId(order.userId)}, 
                                {
                                    $push : {couponcodes: order.couponCode}
                                })
                            }else{

                                database.get().collection('userUsedCoupons').insertOne({userId : ObjectId(order.userId), couponcodes: [order.couponCode]})
                            }
                        })
                    }
                    resolve({
                        orderId: result.insertedId
                    })
                })
            } else {
                let status = order.paymentMethod === 'COD' ? 'Placed' : 'Pending'
                let date = new Date()
                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
                let fullDate = `${day}-${month}-${year}`;
                if(order.appliedCoupon === 'true'){
                    let payableAmount = parseInt(order.appliedgrandTotal)
                    var orderObj = {
                        date: fullDate,
                        deliveryDetails: {
                            name: order.firstname,
                            mobile: order.phone,
                            address: order.address,
                            district : order.district,
                            pincode: order.pincode,
                            landmark: order.landmark,
                            altenativePhone : order.altenativePhone,
    
                        },
                        userId: ObjectId(order.userId),
                        paymentMethod: order.paymentMethod,
                        products: productstotalPrice,
                        buynow :order.buynow,
                        status: status,
                        couponApplied : true,
                        payableAmount : payableAmount,
                        couponDiscount : order.couponDiscount,
                        couponDiscountAmount : order.couponDiscountAmount
                    }

                }else{
                var orderObj = {
                    date: fullDate,
                    deliveryDetails: {
                        name: order.firstname,
                        mobile: order.phone,
                        address: order.address,
                        district : order.district,
                        pincode: order.pincode,
                        landmark: order.landmark,
                        altenativePhone : order.altenativePhone,

                    },
                    userId: ObjectId(order.userId),
                    paymentMethod: order.paymentMethod,
                    products: productstotalPrice,
                    buynow :order.buynow,
                    status: status
                }
            }
                database.get().collection('orderPlaced').insertOne(orderObj).then((result) => {
                    if(order.paymentMethod === 'COD'){
                        database.get().collection('cart').deleteOne({ user: ObjectId(order.userId) })
                    }
                    if(order.appliedCoupon === 'true' && order.paymentMethod === 'COD'){
                        database.get().collection('userUsedCoupons').findOne({userId : ObjectId(order.userId)}).then((result)=>{
                            if(result){
                                database.get().collection('userUsedCoupons').updateOne({userId : ObjectId(order.userId)}, 
                                {
                                    $push : {couponcodes: order.couponCode}
                                })
                            }else{

                                database.get().collection('userUsedCoupons').insertOne({userId : ObjectId(order.userId), couponcodes: [order.couponCode]})
                            }
                        })
                    }
                    resolve({ orderId: result.insertedId})
                })
            }
        })
    },
    getOrderDetalis: (userId, orderId) => {
        return new Promise(async (resolve, reject) => {
            let orderDetails = await database.get().collection('orderPlaced').findOne({
                $and: [{
                    _id: ObjectId(orderId)
                }, {
                    userId: ObjectId(userId)
                }]
            })
            resolve(orderDetails)
        })
    },
    getProducts: (orderId) => {
        return new Promise(async (resolve, reject) => {
            let products = await database.get().collection('orderPlaced').aggregate([{
                    $match: {
                        _id: ObjectId(orderId)
                    }
                },
                { $unwind: 
                        '$products.productsTotal'
},
                {
                    $lookup: {
                        from: 'products',
                        localField: 'products.productsTotal.item',
                        foreignField: '_id',
                        as: 'productList'
                    }
                },
                {
                    $unwind: "$productList"
                }
                // {
                //     $project: {
                //         'title': '$productList.productTitle',
                //         'price': '$productList.price',
                //         'proId': '$productList._id'

                //     }
                // }
            ]).toArray()
            console.log(products[0]);
            resolve(products);
        })
    },
    getMyOrders: (orderid) => {
        return new Promise(async (resolve, reject) => {
            let myorders = await database.get().collection('orderPlaced').aggregate([
                {
                    $match:{_id : ObjectId(orderid)}
                },{
                    $unwind:"$products.productsTotal"
                    
                },{
                    $lookup:{
                        from: 'products',
                                localField: 'products.productsTotal.item',
                                foreignField: '_id',
                                as: 'productList'
                    }
                },{
                    $unwind:"$productList"
                },{
                    $group:{
                        _id:'$_id',
                        data:{
                            $push:"$$ROOT"
                        }
                    }
                }
            ]).toArray()
            console.log(myorders);
            console.log(myorders[0].data[0]);
            
            resolve(myorders)
        })
    },
    checkOrderStatusForCancel: (orderId) => {
        return new Promise((resolve, reject) => {
            database.get().collection('orderPlaced').findOne({
                $and: [{
                    _id: ObjectId(orderId)
                }, 
                {
                    status: "Delivered"
                }]
            }).then((result) => {
                if (result) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    },
    cancelOrder: (orderId) => {
        return new Promise((resolve, reject) => {
            database.get().collection('orderPlaced').updateOne({
                _id: ObjectId(orderId)
            }, {
                $set: {
                    status: "Cancelled"
                }
            }).then(() => {
                resolve(true)
            })
        })
    },
    getUserProfileDetails: (userId) => {
        return new Promise(async (resolve, reject) => {
            let userProfile = await database.get().collection('usersData').findOne({
                _id: ObjectId(userId)
            })
            resolve(userProfile)
        })
    },
    editProfileDetails: (userId, profieDetails) => {
        return new Promise((resolve, reject) => {
            database.get().collection('usersData').updateOne({
                _id: ObjectId(userId)
            }, {
                $set: {
                    firstname: profieDetails.firstname,
                    lasname: profieDetails.lastname,
                    phone: profieDetails.phone,
                    email: profieDetails.email
                }
            }).then((result) => {
                console.log(result);

                resolve({
                    status: true
                })
            })
        })
    },
    checkCurrentPassword: (currentPassword, userId) => {
        return new Promise(async (resolve, reject) => {
            database.get().collection('usersData').findOne({
                $and: [{
                    _id: ObjectId(userId)
                }, {
                    password: currentPassword
                }]
            }).then((response) => {

                if (response) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    },
    updatePassword: (newPassword, userid) => {
        return new Promise((resolve, reject) => {
            database.get().collection('usersData').updateOne({
                _id: ObjectId(userid)
            }, {
                $set: {
                    password: newPassword,
                    confirmpassword: newPassword
                }
            }).then(() => {
                resolve(true)
            })
        })
    },
    getProductForBuyNow: (proId) => {
        return new Promise(async (resolve, reject) => {
            let product = await database.get().collection('products').findOne({
                _id: ObjectId(proId)
            })
            resolve(product)
        })
    },
    getSingleProduct: (proId) => {
        return new Promise(async (resolve, reject) => {
            let product = await database.get().collection('products').findOne({
                _id: ObjectId(proId)
            })
            resolve(product)
        })
    },

    checkcouponCode : (couponCode)=>{
        console.log("vilichu", couponCode);
        return new Promise((resolve, reject)=>{
            database.get().collection('coupons').findOne({couponcode:couponCode}).then((result)=>{
                if(result){
                    resolve({coupon : result, status: true})
                }else{
                    resolve({status : false})
                }
            })
        })
    },

        checkUserUsedCoupon : (couponCode, userId)=>{
        return new Promise((resolve,reject)=>{
            database.get().collection('userUsedCoupons').findOne({$and : [{userId : ObjectId(userId)}, {couponcodes : couponCode.couponcode}]}).then((result)=>{
                console.log("coupon used", result);
                if(result){
                    resolve({status : true})
                }else{
                    resolve({status: false})
                }
            })
        })
    },
    addCouponUserUsed : (coupon, userId)=>{
        let usedCouponDetails = {
            userId : ObjectId(userId),
            couponcode : coupon.couponcode,
            discount : coupon.discount,
            date : coupon.date
        }
        return new Promise((resolve, reject)=>{
            database.get().collection('userUsedCoupons').insertOne(usedCouponDetails).then(()=>{
                resolve(true)
            })
        })
    },
    generateRazorpay:(orderId, amount)=>{console.log("razorpay : ", amount);
        let rupees = amount*100 
         
        return new Promise((resolve, reject)=>{
            var options ={
                amount: rupees,
                currency: "INR",
                receipt: ""+orderId
              }

              console.log(options.amount);
           instance.orders.create(options,(err, order)=>{
               if(err){
                   console.log("err Razorpay: ");
                   console.log(err);
               }
                console.log(order);
                resolve(order)
           })
             

        })
    },
    verifyPayment : (details)=>{
        return new Promise((resolve, reject)=>{
            const crypto = require('crypto');
            let hmac = crypto.createHmac('sha256','oJlWYAn0TaqJEMwwnyAobx2B');
            hmac.update(details['payment[razorpay_order_id]']+'|'+details['payment[razorpay_payment_id]']);
            hmac=hmac.digest('hex')
            if(hmac == details['payment[razorpay_signature]']){
                resolve()
            }else{
                reject()
            }

        })
    },
    changePaymentStatus : (orderId, userId)=>{
        console.log("order Id : ", orderId);
        return new Promise(async(resolve, reject) => {
           await database.get().collection('orderPlaced').updateOne({
                _id: ObjectId(orderId)
            }, {
                $set: {
                    status: "Placed"
                }
            }).then((result) => {
                 database.get().collection('cart').deleteOne({ user: ObjectId(userId) }).then(()=>{

                     if(result){
     
                         resolve(true)
                     }
                 })
            })
        })

    },
    addcoupontoUser : (userId, couponcode)=>{
        return new Promise((resolve, reject)=>{
            database.get().collection('userUsedCoupons').findOne({userId : ObjectId(userId)}).then((result)=>{
                if(result){
                    database.get().collection('userUsedCoupons').updateOne({userId : ObjectId(userId)}, 
                    {
                        $push : {couponcodes:couponcode}
                    }).then(()=>{
                        resolve(true)
                    })
                }else{
                    database.get().collection('userUsedCoupons').insertOne({userId : ObjectId(userId), couponcodes: [couponcode]}).then(()=>{
                        resolve(true)
                    })
                }
            })
        })
    }
    // generatePaypal:(orderId, amount)=>{
    //     console.log("amount : ", amount);
    //     return new Promise((resolve, reject)=>{
    //         var create_payment_json = {
    //             "intent": "sale",
    //             "payer": {
    //                 "payment_method": "paypal"
    //             },
    //             "redirect_urls": {
    //                 "return_url": "/order-success",
    //                 "cancel_url": "/"
    //             },
    //             "transactions": [{
    //                 // "item_list": {
    //                 //     "items": [{
    //                 //         "name": "item",
    //                 //         "sku": "item",
    //                 //         "price": "1.00",
    //                 //         "currency": "USD",
    //                 //         "quantity": 1
    //                 //     }]
    //                 // },
    //                 "amount": {
    //                     "currency": "USD",
    //                     "total": ""+amount
    //                 },
    //                 "description": "This is the payment description."
    //             }]
    //         };
    //         paypal.payment.create(create_payment_json, function (error, payment) {
    //             if (error) {
    //                 throw error;
    //             } else {
    //                 // console.log("Create Payment Response");
    //                 // console.log(payment);
    //                 resolve(payment)
    //             }
    //         });
             
    //     })
    // }


}