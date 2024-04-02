import {
  Column,
  Entity,
} from 'typeorm';
import { MetaDataEntity } from '../../../common/entity.metadata';

@Entity()
export class Event extends MetaDataEntity {
  @Column()
  email: string;

  @Column()
  type: string;
  
  @Column()
  message: string;

  @Column({ type: 'simple-json', nullable: true })
  details: Record<string, unknown>;
}
