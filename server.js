const fs = require('fs');
const WebSocket = require('ws');
const http = require('http');
const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Function to send data to connected clients
function sendData(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// Function to read the last non-empty line of a file
function readLastNonEmptyLine(filePath, callback) {
  const readable = fs.createReadStream(filePath, { encoding: 'utf-8' });
  let lastNonEmptyLine = '';
  readable.on('data', chunk => {
    const lines = chunk.split('\n');
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].trim() !== '') {
        lastNonEmptyLine = lines[i];
        break;
      }
    }
  });

  readable.on('end', () => {
    callback(lastNonEmptyLine);
  });
}

// Monitor the file for changes and send updates to clients
const filePath = './output.txt';
fs.watchFile(filePath, (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    readLastNonEmptyLine(filePath, lastNonEmptyLine => {
      if (lastNonEmptyLine !== '') {
        sendData(lastNonEmptyLine);
      }
    });
  }
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});