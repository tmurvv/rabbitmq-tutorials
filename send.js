#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    var exchange = 'logs';
    var type = 'fanout';
    var msg = 'Hello logs!';

    channel.assertExchange(exchange, type, {
      durable: false
    });

    channel.publish(exchange, "", Buffer.from(msg)); // blank param would be for a specific queue

    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 500);
});