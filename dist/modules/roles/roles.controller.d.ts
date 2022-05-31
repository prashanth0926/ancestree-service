import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    getRoles(): Promise<import("./entities/roles.entity").Role[]>;
}
