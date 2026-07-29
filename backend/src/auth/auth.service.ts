import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuditService } from '../audit/audit.service';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly audit: AuditService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !user.activo) {
      throw new UnauthorizedException('Credenciales invalidas.');
    }

    const passwordOk = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordOk) {
      throw new UnauthorizedException('Credenciales invalidas.');
    }

    return this.buildAuthResponse(user.id, user.email, user.role, user.nombre);
  }

  /**
   * Crea un nuevo usuario. Pensado para uso administrativo (ver UsersModule),
   * pero tambien sirve para el registro inicial (ej. seed / primer admin).
   */
  async register(dto: RegisterDto, creatorUserId?: string) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('Ya existe un usuario con ese correo.');
    }

    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
    const user = await this.prisma.user.create({
      data: {
        nombre: dto.nombre,
        email: dto.email,
        passwordHash,
        role: dto.role ?? 'CAJERO',
      },
    });

    await this.audit.log('User', user.id, 'CREATE', creatorUserId, {
      nombre: user.nombre,
      email: user.email,
      role: user.role,
    });

    return this.buildAuthResponse(user.id, user.email, user.role, user.nombre);
  }

  private buildAuthResponse(userId: string, email: string, role: string, nombre: string) {
    const payload = { sub: userId, email, role, nombre };
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id: userId, email, role, nombre },
    };
  }
}
