var Paymentwall = require('paymentwall');
// https://github.com/paymentwall/paymentwall-node


var axios = require('axios')
// Paymentwall.Configure(
//     Paymentwall.Base.API_GOODS,
//     'YOUR_APPLICATION_KEY',
//     'YOUR_SECRET_KEY'
// );
Paymentwall.Configure(
    Paymentwall.Base.API_GOODS,
    '8c8962878af4e733f1a9e4b3e72a9b36', // = key in other
    '848ea11edaa631a5cc37c6ed388c4041' // = uid in other
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
        console.log('connected to getPaymentwallWidget')
        var widget = new Paymentwall.Widget(
            'user40012',
            'p10',
            [],
            {'email': 'user@hostname.com'}
          );
          console.log(widget.getHtmlCode());
        if (widget.getHtmlCode())
            res.json({widget: widget.getHtmlCode()})
        else
            res.json({list: 'okay'})
    } catch (error) {
        console.log('api/controller/payment.controller/getPaymentwallWidget' + error)
    }
}
module.exports = {
    getPaymentwallWidget
  }