import { w3cwebsocket as W3CWebSocket } from 'websocket';

const WebSocketClient = () => {
  const client = new W3CWebSocket('ws://192.168.2.60:8080');

  client.onopen = () => {
    console.log('WebSocket client connected');
  };

  client.onmessage = (message) => {
    console.log('Received message:', message);
 };

  client.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  client.onclose = () => {
    console.log('WebSocket connection closed');
  };

  const sendMessage = (message) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify( message ));
      console.log("message send")
    }
  };
  return {
    client,
    sendMessage,
  };
};

export default WebSocketClient;
