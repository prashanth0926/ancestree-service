import * as config from 'config';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@ApiBearerAuth()
@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto, @Req() req) {
    return this.eventService.create(createEventDto, req.user);
  }

  @Get()
  @ApiQuery({
    type: String,
    name: 'type',
    required: false,
  })
  @ApiQuery({
    type: String,
    name: 'email',
    required: false,
  })
  @ApiQuery({
    type: String,
    name: 'search',
    required: false,
  })
  findAll(@Req() req, @Query('type') type: string, @Query('search') search: string, @Query('email') email: string) {
    if (
      ![
        ...(config?.admins || '').split(',').filter(Boolean).map(a => a.trim()).map(a => a.toLowerCase())
      ].includes((req.user.email || '').toLowerCase())
    ) {
      throw new UnauthorizedException('you are not authorized to perform this action!');
    }
    return this.eventService.findAll({type, search, email}, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto, @Req() req) {
    if (
      ![
        ...(config?.admins || '').split(',').filter(Boolean).map(a => a.trim()).map(a => a.toLowerCase())
      ].includes((req.user.email || '').toLowerCase())
    ) {
      throw new UnauthorizedException('you are not authorized to perform this action!');
    }
    return this.eventService.update(+id, updateEventDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    if (
      ![
        ...(config?.admins || '').split(',').filter(Boolean).map(a => a.trim()).map(a => a.toLowerCase())
      ].includes((req.user.email || '').toLowerCase())
    ) {
      throw new UnauthorizedException('you are not authorized to perform this action!');
    }
    return this.eventService.remove(+id);
  }
}
