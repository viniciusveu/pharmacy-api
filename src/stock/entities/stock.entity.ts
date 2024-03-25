/* istanbul ignore file */
import { ApiProperty } from '@nestjs/swagger';
import { Medicine } from '../../medicines/entities/medicine.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Id do lote',
    example: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0a',
  })
  id: string;

  @Column()
  @ApiProperty({ description: 'Id do medicamento', example: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0a' })
  medicineId: string;

  @Column({ default: 0 })
  @ApiProperty({ description: 'Quantidade em estoque', example: 10, default: 0 })
  quantity: number;

  @Column({ default: 'default' })
  @ApiProperty({ description: 'Categoria do lote', example: 'default', default: 'default' })
  category: string;

  @ManyToOne(() => Medicine, (medicine) => medicine.stock, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'medicineId' })
  medicine: Medicine;
}
