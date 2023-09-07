const socket = new WebSocket('ws://localhost:8080'); // Adjust the URL as needed

socket.onmessage = (event) => {
  // Handle incoming data from the server
  let data = event.data;

  // Update the HTML with the received data
  document.getElementById('output').textContent = data;
};

socket.onclose = (event) => {
  console.log('WebSocket connection closed:', event);
};

socket.onerror = (event) => {
  console.error('WebSocket error:', event);
};