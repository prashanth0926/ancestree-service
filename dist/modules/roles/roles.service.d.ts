import { Repository } from 'typeorm';
import { Role } from './entities/roles.entity';
export declare class RolesService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
    getRoles(): Promise<Role[]>;
}
