import { ApiProperty } from "@nestjs/swagger";

export class CreatePersonDto {
  @ApiProperty()
  dob: string;
}
