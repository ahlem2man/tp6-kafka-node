const { Kafka } = require('kafkajs');
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017'; 

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
  const mongoClient = new MongoClient(uri);
  await mongoClient.connect();
  const db = mongoClient.db('kafkaDB');
  const collection = db.collection('messages');

  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value.toString();
      console.log('Message reçu :', value);

      await collection.insertOne({
        value,
        timestamp: new Date(),
      });
    },
  });
};

run().catch(console.error);
