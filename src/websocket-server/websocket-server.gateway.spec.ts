import { Test } from '@nestjs/testing';
import { Socket } from 'socket.io';

import { DatetimeService } from './datetime.service';
import { WebsocketServerGateway } from './websocket-server.gateway';

const mockDatetimeService = () => ({
  sendDatetimeToClient: jest.fn(),
});

const mockSocket = (): Partial<Socket> => ({
  id: 'test-socket-id',
});

describe('WebsocketServerGateway', () => {
  let gateway: WebsocketServerGateway;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        WebsocketServerGateway,
        { provide: DatetimeService, useFactory: mockDatetimeService },
      ],
    }).compile();

    gateway = moduleRef.get<WebsocketServerGateway>(WebsocketServerGateway);
  });

  it('should handle new client connection', () => {
    const mockClient = mockSocket() as Socket;

    expect(gateway.getClientCount()).toBe(0);

    gateway.handleConnection(mockClient);

    expect(gateway.getClientCount()).toBe(1);
  });

  it('should handle client disconnection', () => {
    const mockClient = mockSocket() as Socket;

    gateway.handleConnection(mockClient);
    expect(gateway.getClientCount()).toBe(1);

    gateway.handleDisconnect(mockClient);
    expect(gateway.getClientCount()).toBe(0);
  });
});