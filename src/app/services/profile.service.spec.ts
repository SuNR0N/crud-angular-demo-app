import { IProfileDTO } from '../interfaces/dtos/ProfileDTO';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  const profileMock = {} as IProfileDTO;
  let profileService: ProfileService;

  beforeEach(() => {
    profileService = new ProfileService();
  });

  describe('getProfile', () => {
    it('should return the profile as an observable', () => {
      profileService.getProfile().subscribe(
        (profile) => expect(profile).toBeNull(),
      );
    });
  });

  describe('setProfile', () => {
    it('should set the next value of the profile subject', () => {
      let value: any;
      profileService.getProfile().subscribe(
        (profile) => value = profile,
      );
      profileService.setProfile(profileMock);

      expect(value).toBe(profileMock);
    });
  });

  describe('clear', () => {
    it('should set the next value of the profile subject to null', () => {
      let value: any;
      profileService.getProfile().subscribe(
        (profile) => value = profile,
      );
      profileService.setProfile(profileMock);
      profileService.clear();

      expect(value).toBeNull();
    });
  });
});
