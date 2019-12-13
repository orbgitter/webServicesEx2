const url = require('url');
const { getSingleOrder, getAllOrders, createOrder, editOrder, deleteOrder, deleteAllOrders } = require('./handlers');

module.exports = (req, res) => {
    console.log(`Request ${req.method} came from ${req.url}`);

    const urlObject = url.parse(req.url, true, false);
    req.urlObject = urlObject;

    switch (req.method) {
        case 'GET':
            if (urlObject.path.startsWith('/getSingleOrder')) {
                getSingleOrder(req, res);
            }
            if (urlObject.path.startsWith('/getAllOrders')) {
                getAllOrders(req, res);
            }
            break;
        case 'POST':
            if (urlObject.path.startsWith('/createOrder')){
                createOrder(req, res);
            }
            break;
        case 'PUT':
            if (urlObject.path.startsWith('/editOrder')){
                editOrder(req, res);
            } 
            break;
        case 'DELETE':
            if (urlObject.path.startsWith('/deleteOrder')){
                deleteOrder(req, res);
            }
            
            if (urlObject.path.startsWith('/deleteAllOrders')){
                deleteAllOrders(req, res);
            }
            break;
            
        default:
                console.log(`The protocol you chose doesn't exist`);
    }
};
