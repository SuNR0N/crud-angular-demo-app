import { NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export class MockRouter {
  public navigate = jasmine.createSpy();
  private _testEvents = null;
  private subjectEvents = new BehaviorSubject<NavigationEnd>(this._testEvents);

  public get testEvents() {
    return this._testEvents;
  }

  public set testEvents(value: any) {
    this._testEvents = value;
    this.subjectEvents.next(this._testEvents);
  }

  public get events() {
    return this.subjectEvents.asObservable();
  }
}
