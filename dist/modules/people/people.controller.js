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
exports.PeopleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const people_service_1 = require("./people.service");
const create_person_dto_1 = require("./dto/create-person.dto");
const update_person_dto_1 = require("./dto/update-person.dto");
let PeopleController = class PeopleController {
    constructor(peopleService) {
        this.peopleService = peopleService;
    }
    create(createPersonDto, req) {
        return this.peopleService.create(createPersonDto, req.user);
    }
    findAll(req, familyname, search, familyHead) {
        return this.peopleService.findAll(req.user, familyname, search, familyHead);
    }
    searchFamilyNames(search) {
        if (!search || (search && search.length < 3)) {
            return [];
        }
        return this.peopleService.searchFamilyNames(search);
    }
    getCurrent(req) {
        return this.peopleService.getCurrent(req.user);
    }
    findOne(id, relations) {
        return this.peopleService.findOne(+id, relations);
    }
    update(id, updatePersonDto, req) {
        return this.peopleService.update(+id, updatePersonDto, req.user);
    }
    remove(id) {
        return this.peopleService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_person_dto_1.CreatePersonDto, Object]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({
        type: String,
        name: 'familyname',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        type: String,
        name: 'search',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        type: Boolean,
        name: 'familyHead',
        required: false,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('familyname')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('familyHead')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Boolean]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('familyNames'),
    (0, swagger_1.ApiQuery)({
        type: String,
        name: 'search',
        required: true,
    }),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "searchFamilyNames", null);
__decorate([
    (0, common_1.Get)('current'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "getCurrent", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiQuery)({
        type: String,
        name: 'relations',
        required: false,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('relations')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_person_dto_1.UpdatePersonDto, Object]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "remove", null);
PeopleController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('People'),
    (0, common_1.Controller)('people'),
    __metadata("design:paramtypes", [people_service_1.PeopleService])
], PeopleController);
exports.PeopleController = PeopleController;
//# sourceMappingURL=people.controller.js.map