import { Module } from '@nestjs/common';

import { DatetimeService } from './datetime.service';
import { WebsocketServerGateway } from './websocket-server.gateway';

@Module({
  providers: [WebsocketServerGateway, DatetimeService]
})
export class WebsocketServerModule { }
