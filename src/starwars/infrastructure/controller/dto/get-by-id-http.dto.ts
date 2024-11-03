import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetByIdHttpDto {
  @IsNotEmpty()
  id: string;
}
