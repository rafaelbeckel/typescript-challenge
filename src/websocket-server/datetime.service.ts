import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as protobuf from 'protobufjs';
import { Socket } from 'socket.io';

@Injectable()
export class DatetimeService {
  private DateTimeMessage: protobuf.Type;

  constructor() {
    this.loadProtobuf();
  }

  private async loadProtobuf() {
    const protoFile = path.join(__dirname, '../protobuf/datetime.proto');
    const root = await protobuf.load(protoFile);
    this.DateTimeMessage = root.lookupType('DateTimeMessage');
  }

  sendDatetimeToClient(client: Socket) {
    const datetime = new Date().toISOString();
    const message = this.DateTimeMessage.create({ datetime });
    const buffer = this.DateTimeMessage.encode(message).finish();

    client.emit('datetime', buffer);
  }
}
