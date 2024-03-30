import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import * as config from 'config';
import { AuthPayloadDto } from './dto/auth.dto';

const THROTTLE = config?.throttle;

@Injectable()
export class AuthService {
  private usersCache: Record<string, Record<string, number>> = {};

  async checkAuth(payload: AuthPayloadDto) {
    try {
      const r = jwt.decode(payload.token);
      const isTokenValid =
        (config.tokenValidator?.issuers || []).includes(r.iss) &&
        r.exp >= new Date().getTime() / 1000;

      if (r.email && isTokenValid) {
        const usr = this.usersCache[r.email];
        if (usr) {
          if (usr['time']) {
            const secondsDiff =
              Math.round(new Date().getTime() / 1000) - usr['time'] + 0.01;
            if (usr['rate']) {
              usr['rate'] = (usr['rate'] + 1 / secondsDiff) / 2;
            } else {
              usr['rate'] = 1 / secondsDiff;
            }
          }
          usr['time'] = Math.round(new Date().getTime() / 1000);
          if (usr['hits']) {
            usr['hits'] += 1;
          } else {
            usr['hits'] = 1;
          }
        } else {
          this.usersCache[r.email] = {
            hits: 1,
            time: Math.round(new Date().getTime() / 1000),
            rate: 0,
          };
        }

        if (this.usersCache[r.email]['rate'] < THROTTLE) {
          try {
            const { data: tokenValid } = await axios(
              `${config.tokenValidator?.validatorHost}${payload.token}`,
            );

            if (tokenValid) {
              this.usersCache[r.email] = {
                hits: 1,
                time: Math.round(new Date().getTime() / 1000),
                rate: 0,
              };
            } else {
              throw new Error('Token invalid');
            }
          } catch (error) {
            throw error;
          }
        } else {
          throw new UnauthorizedException(`Throttle (${this.usersCache[r.email]['rate']}) exceeded for ${r.email}!`);
        }

        return {
          name: r.name,
          email: r.email,
          isEmailCorrect: r.email_verified,
          picture: r.picture,
          firstName: r.given_name,
          lastName: r.family_name,
        };
      } else {
        throw new Error('Token invalid');
      }
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException(error.message);
    }
  }

  getUsersCache(user: string) {
    if (user && this.usersCache[user]) {
      return this.usersCache[user];
    }
    return this.usersCache;
  }
}
