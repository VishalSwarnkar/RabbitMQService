var amqp = require('amqplib/callback_api');
require('dotenv').config()

var publisher = {

  sendorders: function (queue, orders) {
    amqp.connect('amqp://test:test@mt.nodesense.ai', function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }

        channel.assertQueue(queue, {
          durable: false
        });

          const order_details= {
            orderId: orders.orderId,
            restaurantId: orders.restaurantId,
            quantity: orders.quantity,
            amount: orders.amount,
            city: orders.city,
            orderDate: orders.date,
            to: 'vishalswa@gmail.com',
            subject: "Order placed",
            body: orders
          }
          
          channel.sendToQueue(queue, Buffer.from(order_details));
          console.log(" [x] Sent %s", order_details);        
      });
      setTimeout(function () {
        connection.close();
        process.exit(0)
      }, 500);
    });
  }
};

module.exports = publisher;
