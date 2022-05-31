import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from './roles.decorator';
import { RolesService } from './roles.service';

@ApiBearerAuth()
@ApiTags('Role')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Roles('admin', 'superadmin')
  getRoles() {
    return this.rolesService.getRoles();
  }
}
