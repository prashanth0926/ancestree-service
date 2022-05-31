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
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@ApiBearerAuth()
@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto, @Req() req) {
    return this.peopleService.create(createPersonDto, req.user);
  }

  @Get()
  @ApiQuery({
    type: String,
    name: 'familyname',
    required: false,
  })
  @ApiQuery({
    type: String,
    name: 'search',
    required: false,
  })
  @ApiQuery({
    type: Boolean,
    name: 'familyHead',
    required: false,
  })
  findAll(@Req() req, @Query('familyname') familyname: string, @Query('search') search: string, @Query('familyHead') familyHead: boolean) {
    return this.peopleService.findAll(req.user, familyname, search, familyHead);
  }

  @Get('familyNames')
  @ApiQuery({
    type: String,
    name: 'search',
    required: true,
  })
  searchFamilyNames(@Query('search') search: string) {
    if (!search || (search && search.length < 3)) {
      return [];
    }
    return this.peopleService.searchFamilyNames(search);
  }

  @Get('current')
  getCurrent(@Req() req) {
    return this.peopleService.getCurrent(req.user);
  }

  @Get(':id')
  @ApiQuery({
    type: String,
    name: 'relations',
    required: false,
  })
  findOne(@Param('id') id: string, @Query('relations') relations) {
    return this.peopleService.findOne(+id, relations);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto, @Req() req) {
    return this.peopleService.update(+id, updatePersonDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    if (
      ![
        (config?.admins || '').split(',').filter(a => a).map(a => a.trim()).map(a => a.toLowerCase())
      ].includes((req.user.email || '').toLowerCase())
    ) {
      return new UnauthorizedException('you are not authorized to perform this action!');
    }
    return this.peopleService.remove(+id);
  }
}
