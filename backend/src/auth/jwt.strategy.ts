import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from "@nestjs/passport";
import {Injectable, Request, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.TOKEN_SECRET
        });
    }

    async validate(payload : any, done : Function) {
        const user = await this.authService.validateToken(payload);

        if(!user) {
            return done(new UnauthorizedException(),false);
        }

        done(null,user);
    }
}