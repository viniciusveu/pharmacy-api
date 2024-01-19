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
  id: string;

  @Column()
  medicineId: string;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: 'default' })
  category: string;

  @ManyToOne(() => Medicine, (medicine) => medicine.stock, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'medicineId' })
  medicine: Medicine;
}
