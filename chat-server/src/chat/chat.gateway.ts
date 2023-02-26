import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway({cors : true})
export class ChatGateway {
  handleConnection(client: any, ...args: any[]) {
    console.log(`client ${client.id}connected`);
  }
  handleDisconnect(client: any) {
    console.log(`client ${client.id}disconnected`);
  }
@WebSocketServer() server;





  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    const roomId = payload.roomId;
    console.log('message', payload);
    this.server.emil('mesage-' + roomId, payload);
    return 'Hello world!';
  }
}
