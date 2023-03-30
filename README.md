# typescript-challenge

## Solution
This project implements a WebSocket server and a standalone client using NestJS, socket.io, and Protocol Buffers for message serialization.

The server sends simple datetime messages to all connected clients at a fixed interval of 5 seconds by default. 

The time interval and port are configurable in the `.env` file.

### Running the server
`npm start`

### Running the client
`npm run test:client`

### Running unit tests
`npm run test`

---

## Original Challenge Description

---

## WebSocket Server and Client with Protobuf Messages

### Background

Your task is to create a WebSocket server and client using Node.js, socket.io, and protobuf for message serialization. Protobuf is a language- and platform-neutral data serialization format developed by Google, designed to be smaller, faster, and simpler than XML.

### Requirements

#### Server Requirements

- Create a WebSocket server using Node.js and socket.io that accepts connections on a specified port.
- Use protobuf to encode and decode messages sent between the client and server.
- The server should send a message to all connected clients at a fixed interval of 5 seconds. The message should contain the current date and time.
- The server should be able to handle multiple concurrent client connections.

#### Client Requirements

- Create a WebSocket client using Node.js and socket.io that connects to the server.
- Use protobuf to encode and decode messages sent between the client and server.
- The client should log messages received from the server to the console.

### Deliverables

- A working WebSocket server and client implementation that meets the above requirements.
- Code should be written in Typescript.
- Protobuf should be used for message serialization and deserialization.
- The code should be well-organized, easy to read, and properly commented.
- The code should be tested locally to ensure it meets all requirements.
- The code should be delivered in a git repository with clear instructions on how to run the server and client locally.
