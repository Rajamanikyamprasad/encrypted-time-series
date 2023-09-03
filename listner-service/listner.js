// listener.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const crypto = require('crypto');
const mongoose = require('mongoose');
const TimeSeriesData = require('./models/TimeSeriesData');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

io.on('connection', (socket) => {
  console.log('Listener connected');

  socket.on('encryptedDataStream', (dataStream) => {
    dataStream.forEach((encryptedData) => {
      const secretKey = crypto.createHash('md5').update(`${encryptedData.name}${encryptedData.origin}${encryptedData.destination}`).digest('hex');

      if (secretKey !== encryptedData.secretKey) {
        console.log('Data integrity compromised, discarding operation');
        return;
      }

      const timestamp = new Date();
      const dataToSave = { ...encryptedData, timestamp };

      const timeSeriesData = new TimeSeriesData(dataToSave);

      timeSeriesData.save()
        .then(() => console.log('Data saved to MongoDB'))
        .catch((error) => console.error('Error saving data:', error));
    });
  });
});

server.listen(3002, () => {
  console.log('Listener Service is running on port 3002');
});