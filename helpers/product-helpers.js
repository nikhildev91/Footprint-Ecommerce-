const async = require('hbs/lib/async');
const {ObjectId} = require('mongodb');
var database = require('../dataConfig/databaseConnection');

    module.exports={


        addproduct : (products)=>{

            return new Promise ((resolve, reject)=>{
                database.get().collection("products").insertOne(products).then((result)=>{
                    console.log(result.insertedId);
                    return resolve({status : true, Id : result.insertedId})
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
                }}).then((result)=>{
                    console.log(productID);
                    console.log(result);
                    return resolve({status : true, id : productID})
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