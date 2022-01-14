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
    },
    checkCategory:(category)=>{
        
        return new Promise((resolve, reject)=>{
            database.get().collection("category").findOne({category:category}).then((result)=>{

                if(result){
                    return resolve(true)

                }else{
                    return resolve(false)
                }
                
            })
        })
        
    },

    insertCategory : (category)=>{
        return new Promise ((resolve, reject)=>{
            database.get().collection('category').insertOne({category:category}).then(()=>{
                return resolve(true)
            })
        })
    },
    getAllCategory : ()=>{
        return new Promise (async(resolve, reject)=>{
            let category = database.get().collection("category").find().toArray()

            if(category){
                return resolve(category)
            }
        })
    },

    deleteCategory : (categoryID)=>{
        return new Promise((resolve, reject)=>{
            database.get().collection("category").deleteOne({_id:ObjectId(categoryID)}).then(()=>{
                return resolve(true)
            })
        })
    },

    takeCategory :()=>{
        return new Promise(async(resolve, reject)=>{
            var categoryName = await database.get().collection("category").find().toArray()
            return resolve(categoryName)
        })
    },

    checkSubCategory : (subCategory, categoryID)=>{
        return new Promise((resolve, reject)=>{
            database.get().collection("subCategory").findOne({$and:[{subcategory:subCategory},{_id:ObjectId(categoryID)}]}).then((result)=>{
                if(result){
                    return resolve(true)
                }else{
                    return resolve(false)
                }
            })

        })
    },

    insertSubCategory : (subCategory, categoryID)=>{
        return new Promise((resolve, reject)=>{
            database.get().collection("subCategory").insertOne({subcategory : subCategory, categoryID: ObjectId(categoryID) }).then(()=>{
                return resolve(true)
            })
        })
    },
    findSubCategory: (CatID)=>{
        return new Promise (async(resolve, reject)=>{
            let Subcategory = await database.get().collection("subCategory").find({categoryID:ObjectId(CatID)}).toArray()
            return resolve(Subcategory)
        })
    },
    deleteSubCategory : (subcategoryID)=>{
        return new Promise ((resolve, reject)=>{
            database.get().collection("subCategory").findOne({_id:ObjectId(subcategoryID)}).then((result) => {
                let categoryID = result.categoryID;
                database.get().collection("subCategory").deleteOne({_id:ObjectId(subcategoryID)}).then(()=>{
                    return resolve({ status : true , categoryID })
                })
            })
        })
    },
    takeSubCategory : ()=>{
        return new Promise((resolve, reject)=>{
            database.get().collection("subCategory").find({$and:[{}]})
        })
    }
    }