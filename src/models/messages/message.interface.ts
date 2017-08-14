import { Profile } from "../profile/profile.interface";

export interface Message {
    userFromId: string;
    userFromProfile: {
        firstName: string;
        lastName: string;
        avatar: string;
    };
    userToId: string;
    userToProfile: {
        firstName: string;
        lastName: string;
        avatar: string;
    };
    content: string;
}