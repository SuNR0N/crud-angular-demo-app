import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IProfileDTO } from '../interfaces/dtos/ProfileDTO';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profile = new BehaviorSubject<IProfileDTO>(null);

  getProfile() {
    return this.profile.asObservable();
  }

  setProfile(profile: IProfileDTO) {
    this.profile.next(profile);
  }

  clear() {
    this.profile.next(null);
  }
}
