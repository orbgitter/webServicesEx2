const orders = require('./OrdersRepository');
//const user = require('./user');

const getSingleOrder = (req, res) => {
  const { order_id } = req.urlObject.query;

  if (!Number.isNaN(order_id)) {
    const order = orders.getOrder(order_id);

    if (order) {
      res.writeHeader(200);
      res.end(JSON.stringify(order));
    } else {
      res.writeHeader(404);
      res.end(`order was not found`);    }
  } else {
    res.writeHeader(404);
    res.end(`id is isNan`);
  }  
};

const getAllOrders = (req, res) => {
  const allOrders = orders.getOrders();

  if (allOrders) {
   // user.status === 'admin' || 
      res.writeHeader(200);
      res.end(JSON.stringify(allOrders));
  } else {
    res.writeHeader(404);
    console.log(`Either not Admin nor orders don't exists`);
    res.end();
  }   
};

const createOrder = (req, res) => {
  let body = '';
  let date;

  req.on('data', chunk => {
    body += chunk.toString();
  })
  req.on('end', () => {
    const newDataItem = JSON.parse(body);
    orders.newOrder(newDataItem);
    res.writeHeader(200);
    console.log(`New order was created !`);
    res.end();
  });
};

const editOrder = (req, res) => {
  //const { id } = req.urlObject.query;
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  })
  req.on('end', () => {
    const newDataItem = JSON.parse(body);
    if (newDataItem.id > orders.length) {
      res.writeHeader(404);
      console.log(`No such order with such id:`+ order_id);
      res.end();
    } else {
      orders.editExistedOrder(newDataItem);
      res.writeHeader(200);
      console.log(`Your edit is done`);
      res.end();
  }
  });
}

  const deleteOrder = (req, res) => {
    const { id } = req.urlObject.query;
    console.log(id);
  if (!Number.isNaN(id)) {
      orders.deleteExistedOrder(id);
      res.writeHeader(200);
      console.log(`Order was deleted`);
      res.end();
  } else {
    res.writeHeader(404);
    console.log(`Couldn't delete order with id` + order_id);
    res.end();
  }  
};

const deleteAllOrders = (req, res) => {
 // if (user.status === 'admin'){
      orders.deleteAllExistedOrders();
      res.writeHeader(200);
      console.log(`All orders were deleted successfully`);
      res.end();
 // } else {
      res.writeHeader(404);
      console.log(`Couldn't delete the orders`);
      res.end();
// }
};


module.exports = {
  getSingleOrder,
  getAllOrders,
  createOrder,
  editOrder,
  deleteOrder,
  deleteAllOrders
};