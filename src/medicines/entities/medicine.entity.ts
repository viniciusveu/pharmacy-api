import { ApiProperty } from '@nestjs/swagger';
import { MedicineGroup } from '../../medicine-groups/entities/medicine-group.entity';
import { Stock } from '../../stock/entities/stock.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Medicine {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: '5f6d9d5b-3a6b-4a6d-9d5b-3a6d9d5b3a6d',
    description: 'The id of the medicine',
    uniqueItems: true,
    required: true,
  })
  id: string;

  @Column()
  @ApiProperty({ example: 'Paracetamol', description: 'The name of the medicine' })
  name: string;

  @Column()
  @ApiProperty({
    example: 'Paracetamol 500mg',
    description: 'The description of the medicine',
  })
  description: string;

  @Column()
  @ApiProperty({ example: 'Bayer', description: 'The manufacturer of the medicine' })
  manufacturer: string;

  @Column()
  @ApiProperty({ example: 1234, description: 'The batch number of the medicine' })
  batch: number;

  @Column()
  @ApiProperty({ example: 'Tablet', description: 'The type of the medicine' })
  type: string;

  @Column()
  @ApiProperty({
    example: '2 vezes por dia',
    description: 'The posology of the medicine',
  })
  posology: string;

  @Column()
  @ApiProperty({
    example: 'Dores',
    description: 'The indications of the medicine',
  })
  indications: string;

  @Column()
  @ApiProperty({
    example: 'Dores',
    description: 'The contraindications of the medicine',
  })
  contraindications: string;

  @ManyToMany(() => MedicineGroup, (group) => group.medicines)
  @JoinTable()
  groups: MedicineGroup[];

  @OneToMany(() => Stock, (stock) => stock.medicine)
  stock: Stock[];
}
