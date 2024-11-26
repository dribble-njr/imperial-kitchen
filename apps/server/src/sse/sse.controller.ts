import { Body, Controller, Post, Sse, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Token } from 'src/common/decorator/token.decorator';
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
  async events(@Token() token: string) {
    const user = await this.AuthService.getUserInfoByToken(token);
    if (!user) {
      throw new UnauthorizedException();
    }

    const eventStream = this.sseService.getOrCreateUserEventStream(user.id);
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
