import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  medicineId: string;

  @Column()
  amount: number;
}
