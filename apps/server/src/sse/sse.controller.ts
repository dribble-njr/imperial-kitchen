import { Body, Controller, Post, Sse } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/common/decorator/user.decorator';
import { PushSSEEventDTO } from './dto/push-event.dto';
import { SSEService } from './sse.service';

@Controller('sse')
export class SSEController {
  constructor(
    private sseService: SSEService,
    private AuthService: AuthService
  ) {}

  // 订阅事件
  @Sse('events')
  async events(@User('id') userId: number) {
    const eventStream = this.sseService.getOrCreateUserEventStream(userId);
    return eventStream.asObservable();
  }

  // 推送事件
  @Post('push')
  pushEvent(@Body() data: PushSSEEventDTO) {
    try {
      this.sseService.pushEvent(data, data.targetIds, data.type);
      return true;
    } catch (error) {
      return false;
    }
  }
}
