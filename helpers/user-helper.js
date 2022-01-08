const async = require('hbs/lib/async');
const {ObjectId} = require('mongodb');
var database = require('../dataConfig/databaseConnection');


module.exports={

    insertNewUserData :(NewUserData)=>{

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
           var user = await database.get().collection("usersData").findOne({username:userLoginData.username, password:userLoginData.password})
        
           if(user){
               return resolve({status : true, user});
           }else{
               return resolve({status : false});
           }
        })
        
    }




}