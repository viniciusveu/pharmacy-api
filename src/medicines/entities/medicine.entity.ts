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
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  manufacturer: string;

  @Column()
  batch: number;

  @Column()
  type: string;

  @Column()
  posology: string;

  @Column()
  indications: string;

  @Column()
  contraindications: string;

  @ManyToMany(() => MedicineGroup, (group) => group.medicines)
  @JoinTable()
  groups: MedicineGroup[];

  @OneToMany(() => Stock, (stock) => stock.medicine)
  stock: Stock[];
}
