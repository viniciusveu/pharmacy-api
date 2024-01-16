import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MedicineGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  medicineId: string;

  @Column()
  groupId: string;
}
