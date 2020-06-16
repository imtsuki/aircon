import { IsIn, IsNotEmpty, IsAlphanumeric } from 'class-validator';

export class CreateUserDto {
  @IsAlphanumeric()
  readonly username: string;
  @IsNotEmpty()
  readonly password: string;
  @IsIn(['client', 'desk', 'manager', 'admin'])
  readonly role: string;
}
