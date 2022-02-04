const async = require('hbs/lib/async');
const {ObjectId} = require('mongodb');
const { tasksUrl } = require('twilio/lib/jwt/taskrouter/util');
const { AwsInstance } = require('twilio/lib/rest/accounts/v1/credential/aws');
var database = require('../dataConfig/databaseConnection');

module.exports={

    findAdmin : (adminLoginData)=>{
        return new Promise (async(resolve, reject)=>{
            var admin = await database.get().collection("admin").findOne({email:adminLoginData.email,password:adminLoginData.password})
                if(admin){
                    return resolve({status:true, admin})
                }else{
                    return resolve({status:false})

                }

        })

    },
    allusers : ()=>{
        
        return new Promise (async(resolve, reject)=>{
            var getAllUsers = await database.get().collection("usersData").find().toArray()
            if(getAllUsers){
                resolve(getAllUsers)
            }
        })
    },
    blockUser : (userID)=>{
        return new Promise ((resolve, reject)=>{
            database.get().collection("usersData").updateOne({_id:ObjectId(userID)},
            {$set:{block:true}}
            ).then(()=>{
                return resolve(true)
            })
        })
    },
    unblockUser : (userID)=>{
        return new Promise ((resolve, reject)=>{
            database.get().collection("usersData").updateOne({_id:ObjectId(userID)},
            {$set:{block:false}}
            ).then(()=>{
                return resolve(true)
            })
        })
    },
    getOrdersForManage : ()=>{
        return new Promise(async(resolve, reject)=>{
            let getOrders = await database.get().collection('orderPlaced').aggregate([
                {
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
            // console.log(getOrders[0].data[0]);
            resolve(getOrders)
        })
    },
    viewProductDetails : (orderId)=>{
        return new Promise(async(resolve, reject)=>{
            let products = await database.get().collection('orderPlaced').aggregate([
                {
                    $match:{_id:ObjectId(orderId)}
                },
                {
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
            console.log("========================nvavasdj ===========================");
            console.log(products[0].data[0]);
            console.log(products);
            resolve(products)
        })
    },
    checkOrderStatusPacked : (orderid)=>{
        return new Promise((resolve, reject)=>{
         database.get().collection('orderPlaced').findOne({$and :[{_id:ObjectId(orderid)},{status:"Cancelled"}]}).then((result)=>{
                if(result){
                    resolve(true)
                }else{
                    resolve(false)
                }
            })
        })
    },
    orderPacked : (orderId)=>{
        console.log("packked vilichu");
        return new Promise(async(resolve, reject)=>{
          
        
                database.get().collection('orderPlaced').updateOne({_id : ObjectId(orderId)},
                {
                    $set:{
                        status : "Packed"
                    }
                }).then(()=>{
                    resolve({status : true})
                })
            
        })
    },

    checkOrderStatusShipped1 : (orderid)=>{
        return new Promise((resolve, reject)=>{
            database.get().collection('orderPlaced').findOne({$and :[{_id:ObjectId(orderid)},{status:"Cancelled"}]}).then((result)=>{
                   if(result){
                       resolve(true)
                   }else{
                       resolve(false)
                   }
               })
           })

    },
    checkOrderStatusShipped2 : (orderid)=>{
        return new Promise((resolve, reject)=>{
            database.get().collection('orderPlaced').findOne({$and :[{_id:ObjectId(orderid)},{status:"Packed"}]}).then((result)=>{
                   if(result){
                       resolve(true)
                   }else{
                       resolve(false)
                   }
               })
           })

    },
    orderShipped : (orderId)=>{
        console.log("shipped vilichu");
        return new Promise(async(resolve, reject)=>{
          
        
                database.get().collection('orderPlaced').updateOne({_id : ObjectId(orderId)},
                {
                    $set:{
                        status : "Shipped"
                    }
                }).then(()=>{
                    resolve({status : true})
                })
            
        })

    },
    checkOrderStatusDelivered1 : (orderid)=>{
        return new Promise((resolve, reject)=>{
            database.get().collection('orderPlaced').findOne({$and :[{_id:ObjectId(orderid)},{status:"Cancelled"}]}).then((result)=>{
                   if(result){
                       resolve(true)
                   }else{
                       resolve(false)
                   }
               })
           })
    },
    checkOrderStatusDelivered2 : (orderid)=>{
        return new Promise((resolve, reject)=>{
            database.get().collection('orderPlaced').findOne({$and :[{_id:ObjectId(orderid)},{status:"Packed"}]}).then((result)=>{
                   if(result){
                       resolve(true)
                   }else{
                       resolve(false)
                   }
               })
           })

    },
    checkOrderStatusDelivered3 : (orderid)=>{
        return new Promise((resolve, reject)=>{
            database.get().collection('orderPlaced').findOne({$and :[{_id:ObjectId(orderid)},{status:"Shipped"}]}).then((result)=>{
                   if(result){
                       resolve(true)
                   }else{
                       resolve(false)
                   }
               })
           })

    },
    orderDelivered : (orderid)=>{
        console.log("delivered vilichu");
        return new Promise(async(resolve, reject)=>{
          
        
                database.get().collection('orderPlaced').updateOne({_id : ObjectId(orderid)},
                {
                    $set:{
                        status : "Delivered"
                    }
                }).then(()=>{
                    resolve({status : true})
                })
            
        })

    },
    checkOrderStatusReject1 :(orderid)=>{
        return new Promise((resolve, reject)=>{
            database.get().collection('orderPlaced').findOne({$and :[{_id:ObjectId(orderid)},{status:"Cancelled"}]}).then((result)=>{
                   if(result){
                       resolve(true)
                   }else{
                       resolve(false)
                   }
               })
           })
    },
    checkOrderStatusReject2 : (orderid)=>{
        return new Promise((resolve, reject)=>{
            database.get().collection('orderPlaced').findOne({$and :[{_id:ObjectId(orderid)},{status:"Placed"}]}).then((result)=>{
                   if(result){
                       resolve(true)
                   }else{
                       resolve(false)
                   }
               })
           })
    },
orderCancel :(orderid)=>{
    return new Promise(async(resolve, reject)=>{
      
    
            database.get().collection('orderPlaced').updateOne({_id : ObjectId(orderid)},
            {
                $set:{
                    status : "Cancelled"
                }
            }).then(()=>{
                resolve({status : true})
            })
        
    })
},

addNewCoupons : (couponDetails)=>{
    return new Promise((resolve, reject)=>{
        let coupon = {
            couponcode : couponDetails.couponcode,
            discount : parseInt(couponDetails.discount),
            date : new Date(couponDetails.date)
        }
        database.get().collection('coupons').findOne({couponcode : couponDetails.couponcode}).then((result)=>{
            if(result){
                resolve(false)
            }else{

                database.get().collection('coupons').insertOne(coupon).then(()=>{
                    database.get().collection("coupons").createIndex( { date: 1 }, { expireAfterSeconds: 0 } ).then(()=>{
                        resolve(true)
                    })
                })
            }
        })
    })
},
getCoupons : ()=>{
    return new Promise(async(resolve, reject)=>{
        let coupons = await database.get().collection('coupons').find().toArray()
        resolve(coupons)
    })
},
deleteCoupons : (couponCode)=>{
    return new Promise((resolve, reject)=>{
        database.get().collection('coupons').deleteOne(couponCode).then(()=>{
            resolve(true)
        })
    })
},

getCategoryForManageOffer : ()=>{
return new Promise(async(resolve, reject)=>{
   let category = await database.get().collection('category').find().toArray()
   resolve(category)
})
},
getCategoryOffers : ()=>{
    return new Promise(async(resolve, reject)=>{
        var categoryOffer = await database.get().collection('caregoryOffer').find().toArray()
        resolve(categoryOffer)
        
    })
},
// deleteCategoryOffer : (categoryOferId)=>{
//     return new Promise((resolve, reject)=>{
//         database.get().collection('categoryOffer').deleteOne({_id : ObjectId(categoryOferId)}).then(()=>{
//             resolve(true)
//         })
//     })
// },
checkCategoryOffer : (category)=>{
    return new Promise((resolve, reject)=>{
    database.get().collection("categoryOffer").findOne({category : category}).then((result)=>{
        if(result){
            resolve(true)
        }else{
            resolve(false)
        }
    })
    })
},
updateCategoryOffer : (categoryOffer)=>{
return new Promise((resolve, reject)=>{
    database.get().collection("categoryOffer").updateOne({category:categoryOffer.category},
        {
            $set:{
                category: categoryOffer.category,
                discount: categoryOffer.discount,
                date : categoryOffer.date
            }
        }).then(()=>{
            database.get().collection("categoryOffer").createIndex( { date: 1 }, { expireAfterSeconds: 0 } ).then(()=>{
                resolve(true)

            })
    })
})
},
addCategoryOffer : (categoryOffer)=>{
    return new Promise((resolve, reject)=>{
        database.get().collection("categoryOffer").insertOne(categoryOffer).then(()=>{
            database.get().collection("categoryOffer").createIndex( { date: 1 }, { expireAfterSeconds: 0 } ).then(()=>{
                resolve(true)

            })
        })
    })
},
getCategoryOffers : ()=>{
    return new Promise(async(resolve, reject)=>{
       let categoryOffer = await database.get().collection("categoryOffer").find().toArray()
       resolve(categoryOffer)
    })
},
deleteCategoryOffer : (categoryId)=>{
    return new Promise(async(resolve, reject)=>{
        let category = await database.get().collection('categoryOffer').findOne({_id : ObjectId(categoryId)})
         category = category.category
      let products = await database.get().collection('products').aggregate([
            {
                $match: {category : category}
            }
        ]).toArray()
        await products.map(async(products)=>{
            let productPrice = products.oldPrice;
            let proId = products._id;
            await database.get().collection('products').updateMany({_id : ObjectId(proId)},
            {
                $set: {
                    price : productPrice,
                    offer : false
                }
            }).then(()=>{
                database.get().collection('categoryOffer').deleteOne({_id:ObjectId(categoryId)}).then((result)=>{        
                    if(result.acknowledged){
                        resolve(true)
                    }
                })
            })
        })

        
    })
},
updateCategoryOfferProduct : (categoryOffer)=>{
    let category = categoryOffer.category
    return new Promise(async(resolve, reject)=>{
        let products = await database.get().collection("products").aggregate([
        
            {
                $match:{category: category}
            }
        
        ]).toArray()

        console.log(products);
        await products.map(async(products)=>{
            let productPrice = parseInt(products.price);
             let  discountPrice = productPrice-((productPrice*categoryOffer.discount)/100)
             discountPrice = parseInt(discountPrice.toFixed(2))
             let proId = products._id;

             await database.get().collection('products').updateMany({_id:proId},
                {
                    $set:{
                        price : discountPrice,
                        offer: true,
                        oldPrice: productPrice
                    }
                }).then(()=>{
                    resolve(true)
                })
            

        })
    })
},
ProductOffer : (proId, offerDetails)=>{
    return new Promise((resolve, reject)=>{
        database.get().collection('products').findOne({$and:[{_id : ObjectId(proId)},{offer: true} ]}).then((result)=>{
            if(result){
                    resolve({already : true})
            }else{
                database.get().collection('productOffer').findOne({proId : ObjectId(proId)}).then((result)=>{
                    if(result){
                        resolve({already1 : true})
                    }else{

                        let productOffer ={
                            proId : proId,
                            discount : parseInt(offerDetails.discount),
                            date: new Date(offerDetails.date) 
                        }
                        database.get().collection('productOffer').insertOne(productOffer).then(()=>{
                            database.get().collection("productOffer").createIndex( { date: 1 }, { expireAfterSeconds: 0 } ).then(()=>{
                                resolve({status : true})
                            })
                        })
                    }
                })
            }
        })
    })
},
addOfferToProduct : (proId, offerDetails)=>{
    console.log("prodIdsd : ", proId);
    return new Promise(async(resolve, reject)=>{
        let products = await database.get().collection('products').findOne({_id : ObjectId(proId)})
        console.log("products : ",products);
       let productPrice = parseInt(products.price);
       let discountPrice = productPrice-((productPrice*offerDetails.discount)/100);
         let discountprice = parseInt(discountPrice.toFixed());
        let proOfferPrice={
            productPrice : productPrice,
            discountPrice : discountprice,
              proId : products._id
        }
        // await products.map(async(products)=>{
        //     let productPrice = parseInt(products.price);
        //      let  discountPrice = productPrice-((productPrice*offerDetails.discount)/100)
        //      discountPrice = parseInt(discountPrice.toFixed(2))
        //      let proId = products._id;

             database.get().collection("products").updateOne({_id : ObjectId(proOfferPrice.proId)},
             {
                 $set:{
                    price : discountPrice,
                    offer: true,
                    oldPrice: productPrice
                 }
             }).then(()=>{
                 resolve(true)
             })

        // })
    })
}
    
}