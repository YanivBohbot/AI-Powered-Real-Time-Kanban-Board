import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { List } from '../../lists/entities/list.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column('int')
  order: number; // Position in the list

  @Column({ default: 'MEDIUM' })
  priority: string; // LOW, MEDIUM, HIGH

  // AI Integration Field
  @Column({ type: 'text', nullable: true })
  aiSummary: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => List, (list) => list.cards, { onDelete: 'CASCADE' })
  list: List;
}
