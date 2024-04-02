import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, IsNull, Not, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto, user: any) {
    const payload = {
      ...createEventDto,
      email: user.email,
      createdby: user.email,
    };
    if (createEventDto.type === 'load-app') {
      const evnt = await this.eventRepository.find({
        where: {
          email: user.email,
          type: 'load-app',
        },
        order: {
          updatedat: 'DESC',
        },
        take: 1,
      });

      if (evnt && evnt.length) {
        const ips: string[] = evnt[0].details?.ips as string[] || [];
        const payloadIps = createEventDto.details?.ips as string[] || [];
        const existingCount = evnt[0].details?.count as number || 0;

        if (payloadIps && payloadIps.length && !ips.includes(payloadIps[0])) {
          ips.push(payloadIps[0])
        }
        return this.eventRepository.save({
          ...evnt[0],
          ...payload,
          updatedby: user.email,
          details: {
            ...evnt[0].details,
            ...payload.details,
            ips,
            count: existingCount + 1,
          }
        });
      }

      return this.eventRepository.save({
        ...payload,
        details: {
          ...createEventDto.details,
          count: 1,
        }
      });
    } else {
      return this.eventRepository.save(payload);
    }
  }

  async findAll({ email, type, search }, user) {
    const whereOptions = {};

    if (search) {
      whereOptions['message'] = ILike(search);
    }

    if (email) {
      whereOptions['email'] = email;
    }

    if (type) {
      whereOptions['type'] = type;
    }

    return this.eventRepository.find({
      select: [
        'id',
        'type',
        'message',
        'email',
        'details',
        'updatedat',
      ],
      where: {
        ...whereOptions,
      }
    });
  }

  async findOne(id: number) {
    return this.eventRepository.findOne({ id });
  }

  async update(id: number, updateEventDto: UpdateEventDto, user: any) {
    return this.eventRepository.update(id, {
      ...updateEventDto,
      updatedby: user.email,
    });
  }

  async remove(id: number) {
    return this.eventRepository.delete(id);
  }
}
