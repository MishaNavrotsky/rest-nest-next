import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto {
  @Expose()
  @ApiProperty({ example: '6e42d22c-4f78-4ab0-9e12-e48ded3aa899' })
  id!: string;

  @Expose()
  @ApiProperty({ example: 'misha@example.com' })
  email!: string;

  @Expose()
  @ApiProperty({ example: 'Misha' })
  name!: string;

  @Expose()
  @ApiProperty({ example: '2026-05-26T22:37:59.000Z' })
  createdAt!: string;

  @Expose()
  @ApiProperty({ example: '2026-05-26T22:37:59.000Z' })
  updatedAt!: string;
}
