import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Workspace } from '../../workspaces/entities/workspace.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  fullName: string;

  // Relation: User owns many Workspaces
  @OneToMany(() => Workspace, (workspace) => workspace.owner)
  ownedWorkspaces: Workspace[];
}
