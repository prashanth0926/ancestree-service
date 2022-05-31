import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
export declare class PeopleController {
    private readonly peopleService;
    constructor(peopleService: PeopleService);
    create(createPersonDto: CreatePersonDto, req: any): Promise<({
        createdby: any;
        aliases: string;
        dob: string;
        name: any;
        familyname: any;
        photo: any;
        email: any;
        maternalfamilyname: string;
        gender: string;
        spouses: import("./entities/person.entity").Person[];
        spouse: import("./entities/person.entity").Person;
        children: import("./entities/person.entity").Person[];
        mom: import("./entities/person.entity").Person;
        id: number;
        createdat: Date;
        updatedat: Date;
        updatedby: string;
    } & import("./entities/person.entity").Person) | ({
        createdby: any;
        dob: string;
        name: any;
        familyname: any;
        photo: any;
        email: any;
    } & import("./entities/person.entity").Person)>;
    findAll(req: any, familyname: string, search: string, familyHead: boolean): Promise<import("./entities/person.entity").Person[]>;
    searchFamilyNames(search: string): any[] | Promise<string[]>;
    getCurrent(req: any): Promise<import("./entities/person.entity").Person | {
        name: any;
        familyname: any;
    }>;
    findOne(id: string, relations: any): Promise<import("./entities/person.entity").Person>;
    update(id: string, updatePersonDto: UpdatePersonDto, req: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
