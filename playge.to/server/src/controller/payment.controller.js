const Paymentwall = require('paymentwall');

const User = require("../model/user.model");
const Transaction = require("../model/transaction.model");


// https://github.com/paymentwall/paymentwall-node


var axios = require('axios')
Paymentwall.Configure(
    Paymentwall.Base.API_VC,
    '8c8962878af4e733f1a9e4b3e72a9b36', // = key in other // app key
    '848ea11edaa631a5cc37c6ed388c4041' // = uid in other // secret key here
);

async function sample (req, res, next){
    try {
        
        console.log('connected to sample')
        res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/game.controller/sample' + error)
    }
}
async function getPaymentwallWidget (req, res, next){
    try {
        var widget = new Paymentwall.Widget (
            req.user.name,
            'p1_1',
            [],
            {'email': req.user.email}
        );
        if (widget.getUrl())
            res.json({uri: widget.getUrl()})
        else
            res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/payment.controller/getPaymentwallWidget' + error)
    }
}

async function checkPaymentwallTransaction(req, res, next) {
    console.log(req.query)
    console.log(req.query['uid'])
    console.log((req.headers['x-forwarded-for'] || '').split(',').pop().trim() || req.socket.remoteAddress)
    var pingback = new Paymentwall.Pingback(`uid=${req.query['uid']}&currency=${req.query['currency']}&type=${req.query['type']}&ref=${req.query['ref']}&sig=${req.query['sig']}`, (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || req.socket.remoteAddress);
    var state = 0 // 0: not set 1: deliver 2: withdraw 3: other
    if (pingback.validate()) {
        var productId = pingback.getProduct().getId();
        if (pingback.isDeliverable()) {
            state = 1
            console.log('deliver the product')
        } else if (pingback.isCancelable()) {
            state = 2
            console.log('withdraw the product')
        } else {
            state = 3
        }
        var userId = pingback.getProduct().getUserId();
        User.findById(userId, (err, user) => {
            if (user) {
                var transaction = {}
                transaction.username = user.name
                transaction.type = req.query['type']
                transaction.date = new Date()
                transaction.state = state
                Transaction.create(transaction, (err, result) => {
                    console.log('The transaction is made')
                })
            } else
                console.log('User is not defined')
        })
    } else {
        console.log(pingback.getErrorSummary());
    }
    res.json({list: 'okay'})
    // http://www.yourserver.com/anypath?uid=1&currency=2&type=0&ref=3&sig=813bb3bb5a566fde24f6861c60396727
    // var parameters = {}
    // parameters.uid = 1
    // parameters.currency = 2
    // parameters.type = 0
    // parameters.ref = 3
    // var signature_version = 3
    // var secret_key = '8c8962878af4e733f1a9e4b3e72a9b36'
    // var pingback_signature = Paymentwall.PingbackSignature.calculateSignature(parameters,secret_key, signature_version);
    // console.log(pingback_signature)
}

async function getPingBack (req, res, next){
    try {
        
        var pingback = new Paymentwall.Pingback("query data in pingback request", "ip address of pingback");
        if (pingback.validate()) {
            var productId = pingback.getProduct().getId();
            if (pingback.isDeliverable()) {
                // deliver the product
            } else if (pingback.isCancelable()) {
                // withdraw the product
            } 
            console.log('OK'); // Paymentwall expects the string OK in response, otherwise the pingback will be resent
        } else {
            console.log(pingback.getErrorSummary());
        }
        res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/game.controller/sample' + error)
    }
}



module.exports = {
    getPaymentwallWidget,
    checkPaymentwallTransaction,
    getPingBack
  }