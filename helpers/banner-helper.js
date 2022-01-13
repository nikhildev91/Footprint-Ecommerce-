const { response } = require('express');
const async = require('hbs/lib/async');
const {ObjectId} = require('mongodb');
var database = require('../dataConfig/databaseConnection');

    module.exports={

        checkThisBanner:(place)=>{
            return new Promise((resolve, reject)=>{
                database.get().collection("banner").findOne({place:place}).then((result)=>{
                    if(result){
                        return resolve(true)
                    }else{
                        return resolve(false)
                    }
                })
                })
                

        },
        deleteExistingMainBanner : (place)=>{
            return new Promise((resolve, reject)=>{
                database.get().collection("banner").deleteOne({place:place}).then((result)=>{
                    if(result){
                        return resolve(true)
                    }else{
                        return resolve(false)
                    }
                })
            })

        },

        addHomePageMainBanner : (BannerTitles)=>{
            return new Promise((resolve, reject)=>{
                BannerTitles.place= "homemainbanner"
                database.get().collection("banner").insertOne(BannerTitles).then((result)=>{
                    console.log(result.insertedId);
                   let bannerID = result.insertedId
                    return resolve({status : true, bannerID})
                })
            });


        },

        takebanners : ()=>{
            return new Promise (async(resolve, reject)=>{
                var banners = await database.get().collection("banner").findOne({place:"homemainbanner"})
                if(banners){
                    
                    resolve(banners)

                }
               
            })

        },
        takeCategoryBanners:()=>{
            return new Promise(async(resolve, reject)=>{
                let categoryBanners = await database.get().collection("banner").findOne({place : "homecategory"})
                resolve(categoryBanners)
            })

        },
        takeProductBanner : ()=>{
            return new Promise(async(resolve, reject)=>{
                let productBanner = await database.get().collection('banner').findOne({place: "productBanner"})
                resolve(productBanner)
            })

        },

        getMainBanner : ()=>{
            return new Promise(async(resolve, reject)=>{
               var banner = await database.get().collection("banner").findOne({place:"homemainbanner"})
               return resolve(banner)
            })
        },
        insertCategoryBanner : (BannerTitles)=>{
            return new Promise((resolve, reject)=>{
                
                database.get().collection("banner").insertOne({ place : BannerTitles }).then((result)=>{
                    let bannerID = result.insertedId

                    return resolve({status : true, bannerID})

                })
            })
        },
        getCategoryBanner:()=>{
            return new Promise(async(resolve, reject)=>{
                let homeCategoryBanner = await database.get().collection("banner").findOne({place : "homecategory"})
                return resolve(homeCategoryBanner)
            })
        },
        insertProductBanner:(place)=>{
            return new Promise((resolve, reject)=>{
                database.get().collection("banner").insertOne({place:place}).then((result)=>{
                    let bannerID = result.insertedId

                    return resolve({status:true,bannerID})
                })
            })
        },
        getProductListBanner:()=>{
            return new Promise(async(resolve, reject)=>{
                var productBanner = await database.get().collection("banner").findOne({place: "productBanner"})
                return resolve(productBanner)
            })
        },
        deleteManiBanner : ()=>{
            return new Promise((resolve, reject)=>{
                database.get().collection("banner").deleteOne({place:"homemainbanner"}).then(()=>{
                    return resolve(true)
                })
            })
        },
        deleteCategoryBanner:()=>{
            return new Promise((resolve, reject)=>{
                database.get().collection("banner").deleteOne({place : "homecategory"}).then(()=>{
                    return resolve(true)
                })
            })

        },
        deleteProductBanner : (()=>{
            return new Promise((resolve, reject)=>{
                database.get().collection("banner").deleteOne({place: "productBanner"}).then(()=>{
                    return resolve(true)
                })

            })

        })





    }