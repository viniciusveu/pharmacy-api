import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Medicine } from '../../medicines/entities/medicine.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class MedicineGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'Antibiotics' })
  name: string;

  @ManyToMany(() => Medicine, (medicine) => medicine.groups)
  @JoinTable()
  medicines: Medicine[];
}
