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
    }
}