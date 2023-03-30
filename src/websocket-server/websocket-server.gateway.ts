import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { DatetimeService } from './datetime.service';

@WebSocketGateway()
export class WebsocketServerGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private clients: Socket[] = [];
  private maxClients: number = parseInt(process.env.MAX_CLIENTS) || 10;
  private datetimeInterval: number = parseInt(process.env.DATETIME_INTERVAL) || 5000;

  constructor(private readonly datetimeService: DatetimeService) { }

  async afterInit(server: Server) {
    setInterval(() => {
      this.clients.forEach(client => {
        this.datetimeService.sendDatetimeToClient(client);
      });
    }, this.datetimeInterval);
  }

  handleConnection(client: Socket) {
    if (this.getClientCount() >= this.maxClients) {
      console.log(`Client connection rejected (limit reached): ${client.id}`);
      client.disconnect();
      return;
    }

    this.clients.push(client);
  }

  handleDisconnect(client: Socket) {
    this.clients = this.clients.filter(c => c.id !== client.id);
  }

  getClientCount(): number {
    return this.clients.length;
  }

  @SubscribeMessage('acknowledge')
  handleMessage(client: Socket, payload: string): string {
    return 'Server received: ' + payload;
  }
}
