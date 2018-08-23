export class MockSpinnerService {
  public addRequest = jasmine.createSpy('addRequest');
  public matches = jasmine.createSpy('matches');
  public removeRequest = jasmine.createSpy('removeRequest');
}
