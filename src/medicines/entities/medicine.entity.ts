import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
