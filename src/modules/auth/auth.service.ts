import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User, UserDocument } from '../user/schemas/user.schema';
import { LoginUserDto, CreateUserDto } from '../user/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { jwtExpiresIn, jwtSecret } from 'src/config/jwt.config';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return user;
  }

  async login(user: LoginUserDto): Promise<{ access_token: string }> {
    const { username, password } = user;
    const foundUser = await this.validateUser(username, password);

    const payload = { username, password };
    const signOptions: JwtSignOptions = { expiresIn: jwtExpiresIn };
    const token = this.jwtService.sign(payload, {
      secret: jwtSecret,
      ...signOptions,
    });

    return {
      access_token: token,
    };
  }

  async register(user: CreateUserDto): Promise<User> {
    const { username, email } = user;
    const existingUser = await this.userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      if (existingUser.username === user.username) {
        throw new ConflictException('Username is already in use');
      }
      if (existingUser.email === user.email) {
        throw new ConflictException('Email is already in use');
      }
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.userModel.create({
      username: user.username,
      email: user.email,
      password: hashedPassword,
    });

    return newUser;
  }
}
