const dotenv = require('dotenv');
const path = require('node:path');
const io = require('socket.io-client');
const protobuf = require('protobufjs');

dotenv.config();

const PORT = process.env.PORT || 3000;
const socket = io.connect(`http://localhost:${PORT}`);

protobuf.load(path.join(__dirname, '../src/protobuf/datetime.proto'), (err, root) => {
  if (err) throw err;

  const DateTimeMessage = root.lookupType('DateTimeMessage');

  socket.on('datetime', (buffer) => {
    const message = DateTimeMessage.decode(new Uint8Array(buffer));
    console.log('Received datetime:', message.datetime);
  });
});
