import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';

class MockJwtService {
  sign() {
    return 'token';
  }
}

describe('AuthController', () => {
  let controller: AuthController;
  let service: Partial<AuthService> = {
    login: jest.fn(),
  };

  const mockUserService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: JwtService,
          useClass: MockJwtService
        },
        {
          provide: UsersService,
          useValue: mockUserService
        },
        {
          provide: AuthService,
          useValue: service
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return the result of authService.login', async () => {
      // Arrange
      const loginAuthDto: LoginAuthDto = {
        username: 'vinic',
        password: '123456',
      };
      const expectedResponse = { access_token: 'your-access-token' };
      jest.spyOn(service, 'login').mockResolvedValue(expectedResponse);

      // Act
      const result = await controller.login(loginAuthDto);

      // Assert
      expect(service.login).toHaveBeenCalledWith(loginAuthDto);
      expect(result).toBe(expectedResponse);
    });
  });
});
