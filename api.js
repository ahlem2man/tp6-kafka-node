const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const uri = 'mongodb://localhost:27017'; 
const client = new MongoClient(uri);

app.get('/messages', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('kafkaDB');
    const messages = await db.collection('messages').find().toArray();
    res.json(messages);
  } catch (error) {
    console.error('Erreur MongoDB :', error);
    res.status(500).send('Erreur serveur');
  }
});

app.listen(port, () => {
  console.log(`API REST disponible sur : http://localhost:${port}/messages`);
});
