export interface IProfile {
    id?: number;
    username?: string;
    imageId: number | null;
    dateOfBirth: string;
    age?: number;
    minAge: number;
    maxAge: number;
    gender: string;
    lookingForGender: string[];
    description: string;
    sexualities: IFetchOption[] | number[];
    preferences: IFetchOption[] | number[];
    interests: IFetchOption[] | number[];
    traits: ITrait[];
}

export interface IMinimalProfile {
    id?: number;
    username?: string;
    dateOfBirth: string;
    age?: number;
    gender: string;
    description: string;
    preferences: IFetchOption[] | number[];
    interests: IFetchOption[] | number[];
    traits: ITrait[];
}

export interface IFetchOption {
    id: number;
    name: string;
}

export interface ITrait {
    id: number;
    answer: string;
}
