import { Profile } from '../../models/profile/profile.interface';

const profileList: Profile[] = [
    { firstName: 'Austin', lastName: 'OConnell',avatar: '', email: 'austin@austin.com', dateOfBirth: new Date()},
    { firstName: 'John', lastName: 'Doe', avatar: '', email: 'john@doe.com', dateOfBirth: new Date()},
    { firstName: 'Christine', lastName: 'OConnell', avatar: '', email: 'christine@oconnell.com', dateOfBirth: new Date()},
    { firstName: 'Garrett', lastName: 'Turner', avatar: '', email: 'garrett@turner.com', dateOfBirth: new Date()}
];

export const PROFILE_LIST = profileList;