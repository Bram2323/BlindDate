export interface IProfile {
    dateOfBirth: string;
    description: string;
    gender: string;
    id: number;
    imageId: number;
    interests: [];
    lookingForGender: string[];
    sexualities: [];
    preferences: number[];
    traits: [];
    userId: string;
    username: string;
}

export interface IFetchOption {
    id: number;
    name: string;
}
export interface IFetchTrait {
    id: number;
    question: string;
}
export interface IProfileForm {
    id?: number;
    description: string;
    gender: string;
    lookingForGender: string[];
    sexualities: number[];
    preferences: number[];
    dateOfBirth: string;
    imageId: number | null;
    interests: number[];
    traits: ITrait[];
    minAge: number;
    maxAge: number;
}

export interface ITrait {
    id: number;
    answer: string;
}
