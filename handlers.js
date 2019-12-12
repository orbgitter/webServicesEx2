const orders = require('./OrdersRepository');

const getSingleOrder = (req, res) => {
  const { id } = req.urlObject.query;

  if (!Number.isNaN(id)) {
    const order = orders.getOrder(id);

    if (order) {
      res.writeHeader(200);
      res.end(JSON.stringify(order));
    } else {
      // log and return 'song not found' error
    }
  } else {
    // log and return 'id is isNaN' error
  }  
};

const getAllOrders = (req, res) => {
  const allSongs = orders.getOrders();

  if (allSongs) {
      res.writeHeader(200);
      res.end(JSON.stringify(allSongs));
  } else {
    res.writeHeader(404);
    res.end();
  }   
};

const createOrder = (req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  })
  req.on('end', () => {
    const newDataItem = JSON.parse(body);
    orders.newOrder(newDataItem);
    res.writeHeader(200);
    res.end('ok');
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
      res.end(`no such order with such id: id`);
    } else {
      orders.editExistedOrder(newDataItem);
      res.writeHeader(200);
      res.end('your edit is done');
  }
  });
}

  const deleteOrder = (req, res) => {
    const { id } = req.urlObject.query;
    console.log(id);
  if (!Number.isNaN(id)) {
      orders.deleteExistedOrder(id);
      res.writeHeader(200);
      res.end();
  } else {
    res.writeHeader(404);
      res.end();
  }  
};

const deleteAllOrders = (req, res) => {
    orders.deleteAllExistedOrders();
    res.writeHeader(200);
    res.end();
};


module.exports = {
  getSingleOrder,
  getAllOrders,
  createOrder,
  editOrder,
  deleteOrder,
  deleteAllOrders
};
