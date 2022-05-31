"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const axios_1 = require("axios");
const config = require("config");
const THROTTLE = 50;
let AuthService = class AuthService {
    constructor() {
        this.usersCache = {};
    }
    async checkAuth(payload) {
        var _a, _b;
        try {
            const r = jwt.decode(payload.token);
            const isTokenValid = (((_a = config.tokenValidator) === null || _a === void 0 ? void 0 : _a.issuers) || []).includes(r.iss) &&
                r.exp >= new Date().getTime() / 1000;
            if (r.email && isTokenValid) {
                const usr = this.usersCache[r.email];
                if (usr) {
                    if (usr['time']) {
                        const secondsDiff = Math.round(new Date().getTime() / 1000) - usr['time'] + 0.01;
                        if (usr['rate']) {
                            usr['rate'] = (usr['rate'] + 1 / secondsDiff) / 2;
                        }
                        else {
                            usr['rate'] = 1 / secondsDiff;
                        }
                    }
                    usr['time'] = Math.round(new Date().getTime() / 1000);
                    if (usr['hits']) {
                        usr['hits'] += 1;
                    }
                    else {
                        usr['hits'] = 1;
                    }
                }
                else {
                    this.usersCache[r.email] = {
                        hits: 1,
                        time: Math.round(new Date().getTime() / 1000),
                        rate: 0,
                    };
                }
                if (this.usersCache[r.email]['rate'] > THROTTLE) {
                    try {
                        const { data: tokenValid } = await (0, axios_1.default)(`${(_b = config.tokenValidator) === null || _b === void 0 ? void 0 : _b.validatorHost}${payload.token}`);
                        if (tokenValid) {
                            this.usersCache[r.email] = {
                                hits: 1,
                                time: Math.round(new Date().getTime() / 1000),
                                rate: 0,
                            };
                        }
                        else {
                            throw new Error('Token invalid');
                        }
                    }
                    catch (error) {
                        throw error;
                    }
                }
                return {
                    name: r.name,
                    email: r.email,
                    isEmailCorrect: r.email_verified,
                    picture: r.picture,
                    firstName: r.given_name,
                    lastName: r.family_name,
                };
            }
            else {
                throw new Error('Token invalid');
            }
        }
        catch (error) {
            console.error(error);
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    getUsersCache(user) {
        if (user && this.usersCache[user]) {
            return this.usersCache[user];
        }
        return this.usersCache;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map