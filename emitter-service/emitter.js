// emitter.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const crypto = require('crypto');
const data = require('./data.json');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomData = () => {
  const name = data.names[getRandomInt(0, data.names.length - 1)];
  const origin = data.origins[getRandomInt(0, data.origins.length - 1)];
  const destination = data.destinations[getRandomInt(0, data.destinations.length - 1)];
  const secretKey = crypto.createHash('md5').update(`${name}${origin}${destination}`).digest('hex');
  
  return { name, origin, destination, secretKey };
};

io.on('connection', (socket) => {
  setInterval(() => {
    const dataStream = Array.from({ length: getRandomInt(49, 499) }, generateRandomData);
    socket.emit('encryptedDataStream', dataStream);
  }, 10000); // Emit data every 10 seconds

  console.log('Emitter connected');
});

server.listen(3001, () => {
  console.log('Emitter Service is running on port 3001');
});
