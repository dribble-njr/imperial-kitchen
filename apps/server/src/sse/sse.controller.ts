import { Body, Controller, Post, Sse } from '@nestjs/common';
import { SseService } from './sse.service';

@Controller('sse')
export class SseController {
  constructor(private sseService: SseService) {}

  // 订阅事件
  @Sse('events')
  events() {
    return this.sseService.getEventObservable();
  }

  // 推送事件
  @Post('push')
  pushEvent(@Body() data: { message: string; type?: string; target?: string }) {
    try {
      this.sseService.pushEvent(data);
      return true;
    } catch (error) {
      return false;
    }
  }
}
