import { PublisherModule } from './publisher.module';

describe('PublisherModule', () => {
  let publisherModule: PublisherModule;

  beforeEach(() => {
    publisherModule = new PublisherModule();
  });

  it('should create an instance', () => {
    expect(publisherModule).toBeTruthy();
  });
});
