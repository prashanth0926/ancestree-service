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
var Person_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const typeorm_1 = require("typeorm");
const entity_metadata_1 = require("../../../common/entity.metadata");
let Person = Person_1 = class Person extends entity_metadata_1.MetaDataEntity {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Person.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Person.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Person.prototype, "familyname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Person.prototype, "maternalfamilyname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Person.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Person.prototype, "aliases", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Person.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Person.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Person_1, person => person.spouse),
    __metadata("design:type", Array)
], Person.prototype, "spouses", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Person_1, person => person.spouses),
    __metadata("design:type", Person)
], Person.prototype, "spouse", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Person_1, (person) => person.mom),
    __metadata("design:type", Array)
], Person.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Person_1, (person) => person.children, { cascade: ['insert'] }),
    __metadata("design:type", Person)
], Person.prototype, "mom", void 0);
Person = Person_1 = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)('person_unique_constraint', ['name', 'familyname', 'dob'])
], Person);
exports.Person = Person;
//# sourceMappingURL=person.entity.js.map