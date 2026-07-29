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
}
