import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { Board } from '../../boards/entities/board.entity';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  // Relation: Workspace belongs to an Owner (User)
  @ManyToOne(() => User, (user) => user.ownedWorkspaces)
  owner: User;

  // Relation: Workspace has many Boards
  @OneToMany(() => Board, (board) => board.workspace)
  boards: Board[];
}
