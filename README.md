# tp6-kafka-node
TP6 : Streaming de données avec Kafka, Node.js, MongoDB et Express
 Objectif du TP :
Mettre en place un système de **streaming de données temps réel** à l’aide de :
- **Apache Kafka** pour la gestion des flux
- **Node.js** pour la production et la consommation des messages
- **MongoDB** pour le stockage
- **Express.js** pour la création d’une API REST

---
 Technologies utilisées

- [Kafka](https://kafka.apache.org/)
- [KafkaJS](https://kafka.js.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)

---
 Architecture
graph LR
    A[Producer Node.js] -->|envoie message| B[Kafka Topic]
    B -->|lit message| C[Consumer Node.js]
    C -->|insère| D[MongoDB]
    D -->|API REST| E[Client (Postman / navigateur)]

1. Démarrer Zookeeper :
bin/zookeeper-server-start.sh config/zookeeper.properties
2. Démarrer Kafka :
bin/kafka-server-start.sh config/server.properties
3. Créer un topic :
bin/kafka-topics.sh --create --topic test-topic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
4. Lancer le producteur :
node producer.js
5. Lancer le consommateur (enregistre dans MongoDB) :
node consumer.js
6. Démarrer l’API REST :
node api.js
7. Accéder aux messages :
 http://localhost:3000/messages


