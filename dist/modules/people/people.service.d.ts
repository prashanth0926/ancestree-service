import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
export declare class PeopleService {
    private personRepository;
    constructor(personRepository: Repository<Person>);
    create(createPersonDto: CreatePersonDto, user: any): Promise<({
        createdby: any;
        aliases: string;
        dob: string;
        name: any;
        familyname: any;
        photo: any;
        email: any;
        maternalfamilyname: string;
        gender: string;
        spouses: Person[];
        spouse: Person;
        children: Person[];
        mom: Person;
        id: number;
        createdat: Date;
        updatedat: Date;
        updatedby: string;
    } & Person) | ({
        createdby: any;
        dob: string;
        name: any;
        familyname: any;
        photo: any;
        email: any;
    } & Person)>;
    findAll(user: any, familyname?: string, search?: string, familyHead?: boolean): Promise<Person[]>;
    findOne(id: number, relations?: string): Promise<Person>;
    update(id: number, updatePersonDto: UpdatePersonDto, user: any): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    getCurrent(user: any): Promise<Person | {
        name: any;
        familyname: any;
    }>;
    searchFamilyNames(search?: string): Promise<string[]>;
}
