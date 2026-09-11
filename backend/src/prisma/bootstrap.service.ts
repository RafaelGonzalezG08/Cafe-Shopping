import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from './prisma.service';
import { Role } from '../common/enums';

/** Credenciales del primer acceso. La guia pide cambiarlas de inmediato. */
export const ADMIN_INICIAL_EMAIL = 'admin@cafeshopping.com';
export const ADMIN_INICIAL_PASSWORD = 'cafe1234';

/**
 * Deja la base utilizable la primera vez que se abre la aplicacion.
 *
 * Sin esto, una instalacion nueva arrancaba con la base vacia: no habia
 * ningun usuario, asi que nadie podia iniciar sesion y la aplicacion quedaba
 * inservible. En la version con Docker el problema no se veia porque los
 * usuarios los creaba un script de desarrollo (prisma/seed.ts) que el cliente
 * nunca ejecuta.
 *
 * Solo actua cuando NO hay usuarios. En una base con datos no toca nada, asi
 * que es seguro que corra en cada arranque.
 */
@Injectable()
export class BootstrapService {
  private readonly logger = new Logger(BootstrapService.name);

  constructor(private readonly prisma: PrismaService) {}

  async ensureInitialData(): Promise<void> {
    const usuarios = await this.prisma.user.count();
    if (usuarios === 0) {
      await this.prisma.user.create({
        data: {
          nombre: 'Administrador',
          email: ADMIN_INICIAL_EMAIL,
          passwordHash: await bcrypt.hash(ADMIN_INICIAL_PASSWORD, 10),
          role: Role.ADMIN,
          activo: true,
        },
      });
      this.logger.warn(
        `Instalacion nueva: se creo el usuario ${ADMIN_INICIAL_EMAIL} con la clave inicial. ` +
          `Debe cambiarse desde Configuracion en el primer uso.`,
      );
    }

    // El perfil del negocio es una fila unica que la pantalla de Configuracion
    // espera encontrar; sin ella la factura sale sin encabezado.
    const perfiles = await this.prisma.businessProfile.count();
    if (perfiles === 0) {
      await this.prisma.businessProfile.create({ data: {} });
      this.logger.log('Se creo el perfil del negocio con los valores por defecto.');
    }
  }
}
