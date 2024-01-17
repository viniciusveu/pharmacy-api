import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Medicine } from '../../medicines/entities/medicine.entity';

@Entity()
export class MedicineGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Medicine, (medicine) => medicine.groups)
  @JoinTable()
  medicines: Medicine[];
}
