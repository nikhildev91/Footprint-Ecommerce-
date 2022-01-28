const async = require('hbs/lib/async');
const {ObjectId} = require('mongodb');
const { tasksUrl } = require('twilio/lib/jwt/taskrouter/util');
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
    console.log("cancelled vilichu");
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
}
    
}