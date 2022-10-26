import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import {
  User,
  UserDocument,
} from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    // ** Generate the password hash
    const hashPassword = await argon.hash(dto.password);

    try {
      // ** Save the new user in the database
      const createdUser = await this.userModel.create({
        email: dto.email,
        hashPassword: hashPassword,
      });

      // ** Send back the token
      return this.signToken(
        createdUser.id,
        createdUser.email,
      );
    } catch (error) {
      throw new ForbiddenException('Credentials taken');
    }
  }

  async signin(dto: AuthDto) {
    // ** Find the user by email
    const user = await this.userModel.findOne({
      email: dto.email,
    });

    // ** If user does not exist throw exception
    if (!user)
      throw new ForbiddenException('Credential incorrect');

    // ** Compare password
    const pwMatches = await argon.verify(
      user.hashPassword,
      dto.password,
    );

    // ** If password is incorrect throw exception
    if (!pwMatches)
      throw new ForbiddenException('Credential incorrect');

    // ** Send back the token
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<object> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m', // ** 15 minutes,
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
