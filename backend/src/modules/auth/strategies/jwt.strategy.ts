import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY_123', // Must match the key in auth.module.ts
    });
  }

  async validate(payload: any) {
    // This method runs if the token is valid.
    // The return value is injected into the request object as 'req.user'
    return { id: payload.sub, email: payload.email };
  }
}
