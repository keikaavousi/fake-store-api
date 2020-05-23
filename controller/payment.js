const ZarinpalCheckout = require('zarinpal-checkout');
var zarinpal = ZarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);
const Cart = require("../model/cart");


module.exports.paymentRequest = (req,res) => {
    console.log(req.params.id)
    console.log(req.body)
    zarinpal.PaymentRequest({
      Amount: req.body.total*1000,
      CallbackURL: `http://localhost:3333/invoice?cart=${req.params.id}`,
      Description: 'سفارش آنلاین آشپزخانه ویترین',
      Email: req.body.email,
      Mobile: req.body.tel
    }).then(response => {
      console.log(response)
      if (response.status === 100) {
        //console.log(response.url);
        res.json({url:response.url})
      }
    }).catch(err => {
      console.error(err);
    })
  }

  module.exports.paymentVerification = (req,res) => {
   let usercart = ''

    Cart.findById(req.params.cart)
    .populate('discount','discount')
    .populate('region','price')
    .select()
    .then(cart=>{

        usercart = cart

        zarinpal.PaymentVerification({
            Amount: cart.total*1000,
            Authority: req.params.token,
        }).then(function (response) {
            if (response.status == 101 || response.status ==100) {
               Cart.updateOne(
                  {
                    _id: cart._id,
                  },
                  {
                    $set: {
                      completed: true,
                    },
                  }
                )
                .then((cart) =>{
                  console.log(cart)
                  res.json(usercart)
                })
                .catch(err=>console.log(err))
  
            } else {
                console.log(response);
                res.json({status:'failed'})
            }
        }).catch(function (err) {
            console.log(err);
        });
        
    })
  }

  module.exports.unverifiedTransactions = (req,res)=>{
    zarinpal.UnverifiedTransactions().then(function (response) {
          if (response.status == 100) {
              console.log(response.authorities);
          }
      }).catch(function (err) {
          console.log(err);
      });
  }

  module.exports.refreshAuthurity= (req,res)=>{
    zarinpal.RefreshAuthority({
          Authority: req.params.token,
          Expire: req.params.expire
      }).then(function (response) {
          if (response.status == 100) {
              res.send('<h2>You can Use: <u>' + req.params.token + '</u> — Expire in: <u>' + req.params.expire + '</u></h2>');
          }
      }).catch(function (err) {
          console.log(err);
      })
}