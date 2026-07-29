import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';
import { InvoicesService } from '../invoices/invoices.service';
import { StorageService } from '../invoices/storage.service';
import { UpdateBusinessProfileDto } from './dto/update-business-profile.dto';

@Injectable()
export class SettingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
    private readonly invoicesService: InvoicesService,
    private readonly storage: StorageService,
  ) {}

  async getProfile() {
    const profile = await this.prisma.businessProfile.findFirst();
    if (profile) return profile;
    return this.prisma.businessProfile.create({ data: {} });
  }

  async updateProfile(dto: UpdateBusinessProfileDto, userId?: string) {
    const existing = await this.getProfile();
    const updated = await this.prisma.businessProfile.update({
      where: { id: existing.id },
      data: dto,
    });
    await this.audit.log('BusinessProfile', updated.id, 'UPDATE', userId, dto as any);
    return updated;
  }

  /** Sube/reemplaza el icono/logo del negocio (se ve en el menu lateral y en las facturas). */
  async updateLogo(buffer: Buffer, mimetype: string, userId?: string) {
    const existing = await this.getProfile();
    const ext = mimetype === 'image/png' ? 'png' : mimetype === 'image/webp' ? 'webp' : mimetype === 'image/svg+xml' ? 'svg' : 'jpg';
    const key = `branding/logo-${Date.now()}.${ext}`;
    const logoUrl = await this.storage.upload(buffer, key, mimetype);
    const updated = await this.prisma.businessProfile.update({
      where: { id: existing.id },
      data: { logoUrl },
    });
    await this.audit.log('BusinessProfile', updated.id, 'UPDATE', userId, { logoUrl });
    return updated;
  }

  /**
   * Estado (configurado/no configurado) de las integraciones externas. Nunca
   * devuelve secretos, solo si estan presentes, para poder mostrarlo en la UI
   * sin exponer credenciales.
   */
  getIntegrationsStatus() {
    return this.invoicesService.integrationsStatus;
  }
}
