import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDTO {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
