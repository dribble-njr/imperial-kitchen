import { SSEEventData, SSEEventType } from '@imperial-kitchen/types';
import { Injectable, MessageEvent } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class SSEService {
  private readonly events = new Map<number, Subject<MessageEvent>>();

  getOrCreateUserEventStream(userId: number) {
    if (!this.events.has(userId)) {
      this.events.set(userId, new Subject<MessageEvent>());
    }
    return this.events.get(userId);
  }

  pushEvent(data: SSEEventData, targetIds?: number[], type: SSEEventType = SSEEventType.MESSAGE) {
    const message: MessageEvent = {
      id: String(Date.now()),
      data,
      type
    };

    if (targetIds) {
      // 推送给指定用户
      targetIds.forEach((targetId) => {
        this.events.get(targetId)?.next(message);
      });
    } else {
      // 推送给所有用户
      this.events.forEach((subject) => subject.next(message));
    }
  }

  removeUserEventStream(userId: number) {
    this.events.delete(userId);
  }
}
