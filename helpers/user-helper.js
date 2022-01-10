const async = require('hbs/lib/async');
const {ObjectId} = require('mongodb');
var database = require('../dataConfig/databaseConnection');


module.exports={

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

    getMenProducts : ()=>{
        return new Promise (async(resolve, reject)=>{
          var menProducts = await database.get().collection("products").find({category:"Men"}).toArray()
          console.log(menProducts);
          console.log("vannu illa");
          resolve(menProducts)
        })
    }




}