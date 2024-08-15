export interface IProfile {
    dateOfBirth: string;
    description: string;
    gender: string;
    id: number;
    imageId: number;
    interests: [];
    lookingForGender: string;
    sexualities: [];
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
}

export interface ITrait {
    id: number;
    answer: string;
}
