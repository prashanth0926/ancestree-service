import { MetaDataEntity } from '../../../common/entity.metadata';
export declare class Person extends MetaDataEntity {
    email: string;
    name: string;
    familyname: string;
    maternalfamilyname: string;
    gender: string;
    aliases: string;
    photo: string;
    dob: string;
    spouses: Person[];
    spouse: Person;
    children: Person[];
    mom: Person;
}
