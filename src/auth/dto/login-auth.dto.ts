/* istanbul ignore file */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'vinic',
        description: 'Username',
        required: true
    })
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '123456',
        description: 'Password',
        required: true
    })
    password: string;
}
