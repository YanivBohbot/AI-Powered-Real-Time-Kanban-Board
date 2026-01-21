import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@taskflow.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'securePass123', description: 'User password' })
  password: string;
}
