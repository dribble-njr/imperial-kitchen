import { SseEventData } from '@imperial-kitchen/types';
import { Injectable, MessageEvent } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class SseService {
  private readonly events = new Subject<MessageEvent>();

  pushEvent(data: SseEventData, type = 'message') {
    const message: MessageEvent = {
      id: String(Date.now()),
      data,
      type
    };
    this.events.next(message);
  }

  getEventObservable() {
    return this.events.asObservable();
  }
}
