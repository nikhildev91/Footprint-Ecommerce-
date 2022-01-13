const async = require('hbs/lib/async');
const {ObjectId} = require('mongodb');
var database = require('../dataConfig/databaseConnection');


module.exports={

    checkIsUser : (phone, email)=>{
        return new Promise((resolve, reject)=>{
            database.get().collection("usersData").findOne({$or :[{phone : phone}, {email:email}]}).then((result)=>{
                if(result){

                    return resolve(true)
                }else{
                  
                        return resolve(false)
                    
                }
            })
        })

    },

    insertNewUserData :(NewUserData)=>{

        NewUserData.block = false;

        return new Promise ((resolve, reject)=>{

            database.get().collection("usersData").insertOne(NewUserData).then((result)=>{
                database.get().collection("usersData").findOne({_id : result.insertedId }).then((insertedUser) =>{
                    return resolve({ status : true, user : insertedUser })
                })
                
            }).catch(()=>{
                return reject({ status : false })
            })
            
        });

  

    },

    findUser : (userLoginData)=>{
        console.log(userLoginData);

        return new Promise (async(resolve, reject)=>{
           var user = await database.get().collection("usersData").findOne({username:userLoginData.username, password:userLoginData.password,block:false})
        
           if(user){
               return resolve({status : true, user});
           }else{

            if (await database.get().collection('usersData').findOne({username:userLoginData.username, password:userLoginData.password})){
                return resolve({status : false, errorMsg : 'Currently You are blocked '})
            }

            if (await database.get().collection('usersData').findOne({username:userLoginData.username})){
                return resolve({status : false, errorMsg : 'Invalid Password '})
            }
            
            return resolve({status : false, errorMsg : 'Invalid email or password '})

           }
        })
        
    },

    findPhone :(phone)=>{
        return new Promise((resolve, reject)=>{
            database.get().collection("usersData").findOne({phone:phone}).then((result)=>{

                if(result){
                    return resolve(true)
                }else{
                    return resolve(false)
                }

            })
        })

    },

    findUserWithOtpPhone : (otpNumber)=>{
        return new Promise ((resolve, reject)=>{
            var otpUser = database.get().collection("usersData").findOne({phone:otpNumber})

            if(otpUser){
                return resolve({status : true , otpUser})
            }else{
                return resolve({status : false})
            }
        })

    },

    findCategory : ()=>{
        return new Promise (async(resolve, reject)=>{
            let categories = await database.get().collection("category").find().toArray()
            return resolve(categories)
        })

    },
    

    findCategoryProducts : (categoryName)=>{
        console.log(categoryName);
        return new Promise(async(resolve, reject)=>{
            let foundedCategoryProducts = await database.get().collection("products").find({category:categoryName}).toArray()

        console.log(foundedCategoryProducts);
            
            return resolve(foundedCategoryProducts)
        })

    },

    getMenProducts : ()=>{
        return new Promise (async(resolve, reject)=>{
          var menProducts = await database.get().collection("products").find({category:"Men"}).toArray()
        //   console.log(menProducts);
        //   console.log("vannu illa");
          return resolve(menProducts)
        })
    },
    getWomenProducts: ()=>{
        return new Promise (async(resolve, reject)=>{
            var womenProducts = await database.get().collection("products").find({category:"Women"}).toArray()
          //   console.log(menProducts);
          //   console.log("vannu illa");
            return resolve(womenProducts)
    })
},
getKidsProducts: ()=>{
    return new Promise (async(resolve, reject)=>{
        var kidsProducts = await database.get().collection("products").find({category:"Kids"}).toArray()
      //   console.log(menProducts);
      //   console.log("vannu illa");
        return resolve(kidsProducts)
})
},

getThisProduct : (productID)=>{
    return new Promise (async(resolve, reject)=>{
        var product = await database.get().collection("products").findOne({_id:ObjectId(productID)})

        console.log(product);
      
        return resolve(product);
})

}

    
}