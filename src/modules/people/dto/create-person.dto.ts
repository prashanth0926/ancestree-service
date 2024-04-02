import { ApiProperty } from "@nestjs/swagger";

export class CreatePersonDto {
  @ApiProperty()
  dob: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  familyname: string;
}
