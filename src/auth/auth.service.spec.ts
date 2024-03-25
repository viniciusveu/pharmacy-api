import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        JwtService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('should return an access token when login is successful', async () => {
      // Arrange
      const loginAuthDto: LoginAuthDto = {
        username: 'vinic',
        password: '123456',
      };
      const user = {
        id: 'user-id',
        username: 'vinic',
        password: '123456',
      };
      const expectedToken = 'your-access-token';
      jest.spyOn(usersService, 'findOne').mockReturnValue(user);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(expectedToken);

      // Act
      const result = await service.login(loginAuthDto);

      // Assert
      expect(usersService.findOne).toHaveBeenCalledWith(loginAuthDto.username);
      expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: user.id, username: user.username });
      expect(result).toEqual({ access_token: expectedToken });
    });

    it('should throw an UnauthorizedException when login is unsuccessful', async () => {
      // Arrange
      const loginAuthDto: LoginAuthDto = {
        username: 'vinic',
        password: '123456',
      };
      const user = {
        id: 'user-id',
        username: 'vinic',
        password: 'wrong-password',
      };
      jest.spyOn(usersService, 'findOne').mockReturnValue(user);

      // Act and Assert
      await expect(service.login(loginAuthDto)).rejects.toThrow(UnauthorizedException);
      expect(usersService.findOne).toHaveBeenCalledWith(loginAuthDto.username);
    });
  });
});