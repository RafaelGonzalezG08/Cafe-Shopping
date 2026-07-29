import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsString, MinLength, ValidateNested } from 'class-validator';
import { SaleItemDto } from './create-sale.dto';

export class UpdateSaleDto {
  @ApiProperty({ description: 'Clave del usuario administrador que autoriza la correccion.' })
  @IsString()
  @MinLength(1, { message: 'Debes ingresar la clave del administrador.' })
  adminPassword: string;

  @ApiProperty({ type: [SaleItemDto] })
  @IsArray()
  @ArrayMinSize(1, { message: 'La venta debe tener al menos un item.' })
  @ValidateNested({ each: true })
  @Type(() => SaleItemDto)
  items: SaleItemDto[];
}
