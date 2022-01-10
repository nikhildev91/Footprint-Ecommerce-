const async = require('hbs/lib/async');
const {ObjectId} = require('mongodb');
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

    addProduct : (productDetails)=>{
        
        return new Promise ((resolve, reject)=>{
            if (!Array.isArray(productDetails['images[]'])){
                productDetails['images'] = [ productDetails['images[]'] ]
            }else{
                productDetails['images'] = productDetails['images[]']
            }

            productDetails['images[]'] = null;
            database.get().collection("products").insertOne(productDetails).then((result)=>{
                
                return resolve(result.insertedId)
            })
        })
    },

    getAllProducts:()=>{
        return new Promise (async(resolve, reject)=>{
            var allProducts = await database.get().collection("products").find().toArray()
            
             resolve(allProducts)

        })
    },
    findUpdatingProduct:(userId)=>{
        return new Promise ((resolve, reject)=>{
            database.get().collection("products").findOne({_id:ObjectId(userId)}).then((foundUser)=>{
                resolve(foundUser)

            })
        })

    },
    updateProduct:(productID, productUpdateDetails)=>{
        console.log(productUpdateDetails.size+" onn nokkiye");
        return new Promise ((resolve, reject)=>{
            database.get().collection('products').updateOne({_id:ObjectId(productID)},{$set:{
           

  productTitle:productUpdateDetails.productTitle,
  productDescription:productUpdateDetails.productDescription,
  brand:productUpdateDetails.brand,
  category:productUpdateDetails.category,
  subCategory:productUpdateDetails.subCategory,
  colour:productUpdateDetails.colour,
  material: productUpdateDetails.material,
  'size[]':productUpdateDetails['size[]'],
  quantity: productUpdateDetails.quantity,
  price: productUpdateDetails.price
            }}).then(()=>{
                resolve(true)
            })
        })

    },

    deleteProduct: (productID)=>{
        return new Promise ((resolve, reject)=>{
            database.get().collection("products").deleteOne({_id:ObjectId(productID)}).then(()=>{
                resolve(true)
            })
        })
    }

}