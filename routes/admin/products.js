// var express = require('express');
// var router = express.Router();



// router.get('/add-product', function(req, res, next) {


//     res.render('admin/add-product',{isadmin});
//   });

//   router.post('/add-product', (req, res, next)=>{
//     // console.log(req.body);
//     // console.log(req.files.image);

//     adminHelper.addProduct(req.body).then((id)=>{
//       let image = req.files.image
//       image.mv('./public/product-images/'+id+".jpg",(err, done)=>{
//         if(!err){
//           res.redirect('/admin/add-product')
//         }else{
//           console.log(err);
//         }
//       })
//     })
//   })

//   router.get('/edit-product', function(req, res, next) {
//     res.render('admin/edit-product',{isadmin});
//   });

//   router.get('/manage-products', function(req, res, next) {
//     adminHelper.getAllProducts().then((allProducts)=>{
//       console.log(allProducts);

//       res.render('admin/manage-products',{isadmin, allProducts});
//     })
//   });

//   module.exports = router;
