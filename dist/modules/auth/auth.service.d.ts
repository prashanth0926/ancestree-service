import { AuthPayloadDto } from './dto/auth.dto';
export declare class AuthService {
    private usersCache;
    checkAuth(payload: AuthPayloadDto): Promise<{
        name: any;
        email: any;
        isEmailCorrect: any;
        picture: any;
        firstName: any;
        lastName: any;
    }>;
    getUsersCache(user: string): Record<string, number> | Record<string, Record<string, number>>;
}
