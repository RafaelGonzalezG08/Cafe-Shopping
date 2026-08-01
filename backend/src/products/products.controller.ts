import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, AuthenticatedUser } from '../common/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Query('all') all?: string, @CurrentUser() user?: AuthenticatedUser) {
    const products = await this.productsService.findAll(all !== 'true');
    return products.map((p) => this.stripCostForNonAdmin(p, user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user?: AuthenticatedUser) {
    const product = await this.productsService.findOne(id);
    return this.stripCostForNonAdmin(product, user);
  }

  /** El costo de adquisicion es sensible (margen del negocio): solo ADMIN lo recibe en la respuesta. */
  private stripCostForNonAdmin<T extends { costoUnitario?: unknown }>(product: T, user?: AuthenticatedUser): T {
    if (user?.role === Role.ADMIN) return product;
    const { costoUnitario, ...rest } = product;
    return rest as T;
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } }))
  async create(
    @Body() dto: CreateProductDto,
    @CurrentUser() user: AuthenticatedUser,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const product = await this.productsService.create(dto, user.userId);
    if (!file) return product;
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('El archivo debe ser una imagen.');
    }
    return this.productsService.updatePhoto(product.id, file.buffer, file.mimetype, user.userId);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } }))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @CurrentUser() user: AuthenticatedUser,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const product = await this.productsService.update(id, dto, user.userId);
    if (!file) return product;
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('El archivo debe ser una imagen.');
    }
    return this.productsService.updatePhoto(id, file.buffer, file.mimetype, user.userId);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.productsService.remove(id, user.userId);
  }

  @Post(':id/photo')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } }))
  uploadPhoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    if (!file) throw new BadRequestException('No se recibio ningun archivo.');
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('El archivo debe ser una imagen.');
    }
    return this.productsService.updatePhoto(id, file.buffer, file.mimetype, user.userId);
  }
}
