export class MockHttpClient {
  public get = jasmine.createSpy('get');
  public post = jasmine.createSpy('post');
  public request = jasmine.createSpy('request');
}
