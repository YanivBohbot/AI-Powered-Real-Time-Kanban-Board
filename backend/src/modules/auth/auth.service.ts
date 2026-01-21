import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/users.entity'; // 👈 1. Import this

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    // 🔍 DEBUG LOGS
    console.log('--- Login Attempt ---');
    console.log('1. User found in DB:', user ? 'YES' : 'NO');
    if (user) {
      console.log('2. Stored Password (Hash):', user.password);
      console.log('3. Password being checked:', pass);
      const isMatch = await bcrypt.compare(pass, user.password);
      console.log('4. Password Match:', isMatch);
    }

    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // 👇 2. Change 'user: any' to 'user: User'
  login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: any) {
    const existingUser = await this.usersService.findOne(userData.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });

    return this.login(newUser);
  }
}
