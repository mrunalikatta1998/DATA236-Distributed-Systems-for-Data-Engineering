const { Kafka } = require("kafkajs");
const connectDB = require("../db");
const Shipping = require("../models/shippingModel");
const { v4: uuidv4 } = require("uuid");

const kafka = new Kafka({ clientId: "shipping", brokers: ["localhost:9092"] });
const consumer = kafka.consumer({ groupId: "shipping-group" });

async function start() {
  await connectDB();
  await consumer.connect();
  await consumer.subscribe({ topic: "order-confirmed", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const msg = JSON.parse(message.value.toString());
      console.log("Shipping service received:", msg);

      const trackingId = "SHIP-" + uuidv4().slice(0, 6).toUpperCase();

      const newShipping = await Shipping.create({
        itemId: msg.itemId,
        itemName: msg.itemName,
        quantity: msg.quantity,
        trackingId,
        status: "Pending"
      });

      console.log("Shipping record created:", newShipping);
    },
  });
}

start();
