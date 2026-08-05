import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from 'class-validator';
import { Material, MATERIALES } from '../../common/enums';

export class CreateProductDto {
  @ApiPropertyOptional({
    example: 'AN-0001',
    description: 'Si se omite, se genera automaticamente a partir del nombre (2 letras + numero secuencial).',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  sku?: string;

  @ApiProperty({ example: 'Cafe con leche 12oz' })
  @IsString()
  @MinLength(2)
  nombre: string;

  @ApiProperty({ example: 120.0 })
  @Type(() => Number)
  @IsNumber()
  @IsPositive({ message: 'El precio debe ser mayor a cero.' })
  precioUnitario: number;

  @ApiPropertyOptional({
    example: 65.0,
    description: 'Costo de adquisicion de la pieza (solo ADMIN puede verlo/editarlo). Se usa para calcular margen.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  costoUnitario?: number;

  @ApiProperty({ example: 50 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  stock: number;

  @ApiPropertyOptional({ enum: MATERIALES, example: Material.PLATA })
  @IsOptional()
  @IsIn(MATERIALES, { message: 'Material invalido.' })
  material?: Material;
}
