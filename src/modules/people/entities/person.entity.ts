import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { MetaDataEntity } from '../../../common/entity.metadata';

@Entity()
@Unique('person_unique_constraint', ['name', 'familyname', 'dob'])
export class Person extends MetaDataEntity {
  @Column({ nullable: true })
  email: string;

  @Column()
  name: string;

  @Column()
  familyname: string;

  @Column({ nullable: true })
  maternalfamilyname: string;

  @Column()
  gender: string;

  @Column({ nullable: true })
  aliases: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ type: 'date' })
  dob: string;

  @OneToMany(() => Person, person => person.spouse)
  spouses: Person[];

  @ManyToOne(() => Person, person => person.spouses)
  spouse: Person;

  @OneToMany(() => Person, (person) => person.mom)
  children: Person[];

  @ManyToOne(() => Person, (person) => person.children, { cascade: ['insert'] })
  mom: Person;
}
