import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (req.headers && req.headers.authorization) {
      let accessToken = req.headers.authorization;
      if (
        (req.headers.authorization.split(' ')[0] || '').toLowerCase() ===
        'bearer'
      ) {
        accessToken = req.headers.authorization.split(' ')[1];
      }
      try {
        const decoded = await this.authService.checkAuth({ token: accessToken });
        let userdata = {
          ...decoded,
          ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
          userAgent: req.headers['user-agent'],
        };
        req.user = userdata;
        return true;
      } catch (err) {
        console.error('JWT validation error', err);
        return false;
      }
    } else {
      return false;
    }
  }
}
