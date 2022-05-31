import { Column, Entity, Unique } from 'typeorm';
import { MetaDataEntity } from '../../../common/entity.metadata';

@Unique('role_unique_constraint', ['email', 'role'])
@Entity()
export class Role extends MetaDataEntity {
  @Column()
  email: string;

  @Column()
  role: string;
}
