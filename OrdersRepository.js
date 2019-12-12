const { EventEmitter } = require('events');
const ordersJson = require('./data/orders.json');

class OrdersRepository extends EventEmitter {
    constructor() {
      super();
      this._orders = ordersJson;
    }
  
    getOrder(id) {
      this.emit("singleOrder", this._orders[id-1]); // Fire event
  
      return this._orders[id-1];
    }

    getOrders() {
      this.emit("allOrders", this._orders); // Fire event
  
      return this._orders;
    }

    newOrder(newData) {
      this._orders.push(newData);
      this.emit("newSingleOrder", this._orders[this._orders.length-1]); 
      return this._orders[this._orders.length-1];
    }

    editExistedOrder(newData) {
      this._orders[newData.id - 1].order = newData.order;
      this._orders[newData.id - 1].artist = newData.artist;
      this.emit("newEditedOrder", this._orders[newData.id - 1]); 
      return this._orders[newData.id - 1];
    }

    deleteExistedOrder(id) {
      this.emit("deleteExistedOrder", this._orders); 
      this._orders.splice(id, 1);
      return this._orders;
    }

    deleteAllExistedOrders() {
      this.emit("deleteAllExistedOrders", this._orders); 
      this._orders.splice(0, this._orders.length);
      return this._orders;
    }
  }
  
  const ordersRepo = (new OrdersRepository())
    .on('singleOrder', data => console.log(`Get single order: ${data.order}`))
    .on('allOrders', data => console.log(`Get all order: ${data.order}`))
    .on('newSingleOrder', data => console.log(`Create new order: ${JSON.stringify(data)}`))
    .on('newEditedOrder', data => console.log(`Edit order: ${data}`))
    .on('deleteExistedOrder', data => console.log(`order deleted!`))
    .on('deleteAllExistedOrders', data => console.log(`all orders deleted!`));
  
  module.exports = ordersRepo;
