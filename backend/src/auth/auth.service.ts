import { SignInDto } from './dto/sign-in-dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const { email, password } = signInDto;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }
    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { sub: user._id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<{ access_token: string }> {
    const user = {
      email: signUpDto.email,
      password: signUpDto.password,
    };
    await this.usersService.create(user);
    return this.signIn(user);
  }
}
