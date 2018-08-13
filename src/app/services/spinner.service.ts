import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private pendingRequests: HttpRequest<any>[] = [];

  addRequest(request: HttpRequest<any>) {
    this.pendingRequests.push(request);
  }

  removeRequest(request: HttpRequest<any>) {
    const index = this.pendingRequests.indexOf(request);
    if (index !== -1) {
      this.pendingRequests.splice(index, 1);
    }
  }

  matches(...matchers: Array<[string, RegExp]>): boolean {
    return this.pendingRequests.some((request) => matchers.some((matcher) => {
      const [ method, regExp ] = matcher;
      return request.method === method && regExp.test(request.url);
    }));
  }
}
