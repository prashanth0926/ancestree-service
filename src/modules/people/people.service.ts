import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, IsNull, Not, Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto, user: any) {
    const usr = await this.personRepository.findOne({
      name: user.name,
      familyname: user.lastName,
      dob: createPersonDto.dob,
    });

    if (usr) {
      return this.personRepository.save({
        ...usr,
        name: user.name,
        familyname: user.lastName,
        photo: user.picture,
        email: user.email,
        ...createPersonDto,
        createdby: user.email,
        aliases: [...(usr?.aliases || '').split(',').map(a => a && a.trim()), usr.name, user.name, usr.email, user.email].join(),
      });
    }

    return this.personRepository.save({
      name: user.name,
      familyname: user.lastName,
      photo: user.picture,
      email: user.email,
      ...createPersonDto,
      createdby: user.email,
    });
  }

  async findAll(user: any, familyname?: string, search?: string, familyHead?: boolean) {
    const whereOptions = {};

    if(familyname) {
      whereOptions['familyname'] = ILike(familyname);
    }

    if (familyHead) {
      return this.personRepository.find({
        relations: ['mom', 'spouse'],
        where: {
          ...whereOptions,
          mom: IsNull(),
          gender: 'male',
        }
      })
    }

    if (search) {
      return this.personRepository.find({
        where: [{
          name: ILike(`%${search}%`)
        }, {
          familyname: ILike(`%${search}%`)
        }, {
          maternalfamilyname: ILike(`%${search}%`)
        }]
      })
    }

    return this.personRepository.find({
      where: {
        ...whereOptions,
      }
    });
  }

  async findOne(id: number, relations?: string) {
    if (relations) {
      return this.personRepository.findOne({where: { id }, relations: relations.split(',').filter(a => a).map(a => a.trim()) });
    }

    return this.personRepository.findOne({ id });
  }

  async update(id: number, updatePersonDto: UpdatePersonDto, user: any) {
    return this.personRepository.update(id, {
      ...updatePersonDto,
      updatedby: user.email,
    });
  }

  async remove(id: number) {
    return this.personRepository.delete(id);
  }

 async getCurrent(user: any) {
   try {
      const usr = await this.personRepository.findOne({
        where: [{
          email: user.email
        }, {
          aliases: ILike(`%${user.email}%`)
        }],
        relations: ['mom', 'children', 'spouse']
      });

      if (usr) {
        return usr;
      } else {
        return {
          name: user.name,
          familyname: user.lastName,
        }
      } 
   } catch (error) {
     console.log('err: ', error);
   }
 }

 async searchFamilyNames(search?: string) {
   try {
    const query = this.personRepository.createQueryBuilder('person')
      .select('person.familyname')
      .distinctOn(['person.familyname'])

    if (search) {
      query.where('person.familyname ILIKE :search', { search: `%${search}%` });
    }
    
    const out = await query.getMany();

    return out.map(a => a.familyname);
   } catch (error) {
     console.log(error);
   }
 }
}
