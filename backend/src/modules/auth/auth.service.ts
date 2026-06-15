import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  // REGISTER
  async register(dto: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          role: 'STUDENT',
        },
      });

      return {
        id: user.id,
        email: user.email,
        role: user.role,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log('REGISTER ERROR:', err.message);

        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(
        'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // LOGIN
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new UnauthorizedException();

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException();

    const token = this.jwt.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  // JWT
  private generateToken(userId: string, email: string, role: string) {
    const payload = {
      sub: userId,
      email,
      role,
    };

    return {
      access_token: this.jwt.sign(payload),
    };
  }

  async getProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
      },
    });
  }
}
