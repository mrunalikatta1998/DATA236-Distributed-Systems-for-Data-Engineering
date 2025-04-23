const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "test-producer",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

async function sendMessage() {
  await producer.connect();

  const message = {
    itemId: "123",
    itemName: "Toy Rocket",
    quantity: 2
  };

  await producer.send({
    topic: "order-confirmed",
    messages: [
      { value: JSON.stringify(message) }
    ],
  });

  console.log("Test message sent to 'order-confirmed'");
  await producer.disconnect();
}

sendMessage();
