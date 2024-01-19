import { ApiProperty } from "@nestjs/swagger";

export class User {
  id?: string;

  @ApiProperty({
    example: 'vinic',
    description: 'Username'
  })
  username: string;

  @ApiProperty({
    example: '123456',
    description: 'Password'
  })
  password: string;
}
