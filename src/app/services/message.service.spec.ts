import { MessageService } from './message.service';

describe('MessageService', () => {
  let messageService: MessageService;

  beforeEach(() => {
    messageService = new MessageService();
  });

  describe('add', () => {
    it('should add the provided message to the messages', () => {
      messageService.add('foo');

      expect(messageService.messages).toContain('foo');
      expect(messageService.messages.length).toBe(1);
    });
  });

  describe('clear', () => {
    it('should remove all messages', () => {
      messageService.add('foo');
      messageService.add('bar');

      messageService.clear();

      expect(messageService.messages).toEqual([]);
    });
  });
});
