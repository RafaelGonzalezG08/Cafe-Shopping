import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min, MinLength } from 'class-validator';

export class UpdateBusinessProfileDto {
  @ApiProperty({ example: 'Cafe Shopping' })
  @IsString()
  @MinLength(2)
  nombre: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  identifFiscal?: string;

  @ApiProperty({ example: 0.18 })
  @IsNumber()
  @Min(0)
  @Max(1)
  tasaImpuesto: number;

  @ApiProperty({ required: false, description: 'Numero al que llegan los pedidos del catalogo web.' })
  @IsOptional()
  @IsString()
  telefonoWhatsapp?: string;

  @ApiProperty({ required: false, description: 'Frase corta bajo el nombre en el catalogo.' })
  @IsOptional()
  @IsString()
  descripcionWeb?: string;

  @ApiProperty({ required: false, description: 'Como pagar por transferencia (banco, cuenta, titular).' })
  @IsOptional()
  @IsString()
  datosPago?: string;
}
