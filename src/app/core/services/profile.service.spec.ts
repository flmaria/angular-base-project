import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { Profile } from '../model/Profile';
import { asyncData } from '../testing/async-observable-helpers';

describe('ProfileService', () => {
  let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  
  let profileService: ProfileService;
  
  beforeEach(() => {
    profileService = new ProfileService(httpClientSpy);
  });

  it('should return profiles', () => {
    let expectedProfileList = [];

    let profile = new Profile();
    profile.id = 1;
    profile.name = "profile test";
    expectedProfileList.push(profile);
    
    httpClientSpy.get.and.returnValue(asyncData(expectedProfileList));

    profileService.listAll().subscribe(
      profiles => expect(profiles).toEqual(expectedProfileList, 'expected profiles'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
