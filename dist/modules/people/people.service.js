"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const person_entity_1 = require("./entities/person.entity");
let PeopleService = class PeopleService {
    constructor(personRepository) {
        this.personRepository = personRepository;
    }
    async create(createPersonDto, user) {
        const usr = await this.personRepository.findOne({
            name: user.name,
            familyname: user.lastName,
            dob: createPersonDto.dob,
        });
        if (usr) {
            return this.personRepository.save(Object.assign(Object.assign(Object.assign(Object.assign({}, usr), { name: user.name, familyname: user.lastName, photo: user.picture, email: user.email }), createPersonDto), { createdby: user.email, aliases: [...((usr === null || usr === void 0 ? void 0 : usr.aliases) || '').split(',').map(a => a && a.trim()), usr.name, user.name, usr.email, user.email].join() }));
        }
        return this.personRepository.save(Object.assign(Object.assign({ name: user.name, familyname: user.lastName, photo: user.picture, email: user.email }, createPersonDto), { createdby: user.email }));
    }
    async findAll(user, familyname, search, familyHead) {
        const whereOptions = {};
        if (familyname) {
            whereOptions['familyname'] = (0, typeorm_2.ILike)(familyname);
        }
        if (familyHead) {
            return this.personRepository.find({
                relations: ['mom', 'spouse'],
                where: Object.assign(Object.assign({}, whereOptions), { mom: (0, typeorm_2.IsNull)(), gender: 'male' })
            });
        }
        if (search) {
            return this.personRepository.find({
                where: [{
                        name: (0, typeorm_2.ILike)(`%${search}%`)
                    }, {
                        familyname: (0, typeorm_2.ILike)(`%${search}%`)
                    }, {
                        maternalfamilyname: (0, typeorm_2.ILike)(`%${search}%`)
                    }]
            });
        }
        return this.personRepository.find({
            where: Object.assign({}, whereOptions)
        });
    }
    async findOne(id, relations) {
        if (relations) {
            return this.personRepository.findOne({ where: { id }, relations: relations.split(',').filter(a => a).map(a => a.trim()) });
        }
        return this.personRepository.findOne({ id });
    }
    async update(id, updatePersonDto, user) {
        return this.personRepository.update(id, Object.assign(Object.assign({}, updatePersonDto), { updatedby: user.email }));
    }
    async remove(id) {
        return this.personRepository.delete(id);
    }
    async getCurrent(user) {
        try {
            const usr = await this.personRepository.findOne({
                where: [{
                        email: user.email
                    }, {
                        aliases: (0, typeorm_2.ILike)(`%${user.email}%`)
                    }],
                relations: ['mom', 'children', 'spouse']
            });
            if (usr) {
                return usr;
            }
            else {
                return {
                    name: user.name,
                    familyname: user.lastName,
                };
            }
        }
        catch (error) {
            console.log('err: ', error);
        }
    }
    async searchFamilyNames(search) {
        try {
            const query = this.personRepository.createQueryBuilder('person')
                .select('person.familyname')
                .distinctOn(['person.familyname']);
            if (search) {
                query.where('person.familyname ILIKE :search', { search: `%${search}%` });
            }
            const out = await query.getMany();
            return out.map(a => a.familyname);
        }
        catch (error) {
            console.log(error);
        }
    }
};
PeopleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(person_entity_1.Person)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PeopleService);
exports.PeopleService = PeopleService;
//# sourceMappingURL=people.service.js.map