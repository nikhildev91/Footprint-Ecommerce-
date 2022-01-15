var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
var userHelper = require('../../helpers/user-helper');
require('dotenv').config()

const serviceSSID = process.env.serviceSSID
const accountSSID = process.env.accountSSID
const authToken = process.env.authToken


const client = require('twilio')(accountSSID, authToken)


const isUser = true;

router.get('/', function (req, res, next) {
	
	if (req.session.isLoggedin || req.session.otpUserLoggedin || req.session.isFreshUserLoggedin) {
		res.redirect('/');
	} else {
		userHelper.takeCategory().then(async(category) => {
			let cartCount = 0;
              if(req.session.userObj){
                cartCount = await userHelper.getCartCount(req.session.userObj._id)
              }
			let accUserErr = req.session.UserAccErr;
			req.session.UserAccErr = null;
			let loginMob = req.session.loginMob;
			req.session.loginMob = null;
			var errMsg = req.session.errMsg
			req.session.errMsg = null;
			res.render('user/login', { isUser, errMsg, loginMob, category, accUserErr});
		})

	}

});

router.post('/', function (req, res, next) {
	var userLoginData = req.body;
	userHelper.findUser(userLoginData).then((response) => {

		if (response.user) {
			req.session.userObj = response.user;
			req.session.isLoggedin = response.status;
			res.redirect('/');
		} else {
			req.session.errMsg = response.errorMsg
			res.redirect('/login');
		}
	})
});

/* GET users listing. */

router.get('/logout', function (req, res, next) {
	req.session.userObj = null;
	req.session.isLoggedin = false;
	res.redirect('/login');
});

router.post('/mobile', (req, res, next) => {
	 req.session.number= req.body.phone;
	 let number = req.session.number;

	userHelper.findPhone(number).then((response) => {
		if (response) {
			client.verify
				.services(serviceSSID)
				.verifications.create({
					to: `+91${number}`,
					channel: "sms"
				})
				.then((resp) => {
					req.session.loginOtpMobNum = number
					res.redirect('/login/otp-verification')
				});

		} else {
			req.session.loginMob = "Sorry You Haven't Account"
			res.redirect('/login')
		}
	})
});
router.get('/otp-verification',(req, res, next)=>{
	let resendMsg = req.session.resendMsg;
	req.session.resendMsg = false;
let mobNumErr = req.session.otpMoberr;
req.session.otpMoberr = null;
	res.render('user/loginOtp',{isUser, mobNumErr, otpverify:true, resendMsg})
})

router.post('/otp', (req, res, next) => {
	
	let otpCode = req.body.code;
	let otpNumber = req.session.number;
	client.verify
		.services(serviceSSID)
		.verificationChecks.create({
			to: `+91${otpNumber}`,
			code: otpCode
		}).then((resp) => {
			if (resp.valid) {
				userHelper.findUserWithOtpPhone(otpNumber).then((response) => {
					if (response.status) {
					
		                req.session.userObj = response.otpUser
		                req.session.isLoggedin = response.status
						res.redirect('/')
					}
				})
			} else {
				req.session.otpMoberr = "Invalid OTP"
				req.session.resendMsg = true
				res.redirect('/login/otp-verification')
			}
		}).catch((err) => {
			console.log(err);
		})
})

router.post('/resendOtp', (req, res)=>{
	let number = req.session.number
	client.verify
			.services(serviceSSID)
			.verifications.create({
			to: `+91${number}`,
			channel: "sms"
			})
			.then((resp)=>{
			res.send(true)
			}).catch((resp)=>{
			  res.send(false)
			})
})

module.exports = router;