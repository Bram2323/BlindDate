export interface IProfile {
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

export interface IFetchOption {
    id: number;
    name: string;
}
export interface IFetchTrait {
    id: number;
    question: string;
}

export interface ITrait {
    id: number;
    answer: string;
}
