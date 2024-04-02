import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {
  @ApiProperty()
  type: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  details?: Record<string, unknown>;

  email?: string;

  createdby?: string;
}
