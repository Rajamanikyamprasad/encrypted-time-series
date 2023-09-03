// src/App.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3002'); // Replace with the Listener Service address

function App() {
  const [dataStream, setDataStream] = useState([]);

  useEffect(() => {
    socket.on('encryptedDataStream', (data) => {
      // Update the data stream when new data is received
      setDataStream((prevData) => [...prevData, ...data]);
    });
  }, []);

  return (
    <div className="App">
      <h1>Received Data</h1>
      <ul>
        {dataStream.map((data, index) => (
          <li key={index}>
            Name: {data.name}, Origin: {data.origin}, Destination: {data.destination}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
