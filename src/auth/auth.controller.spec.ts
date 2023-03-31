import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a JWT token when login is successful', async () => {
      const user = { username: 'testuser', password: 'testpass' };
      const token = { access_token: 'testtoken' };
      jest.spyOn(authService, 'login').mockResolvedValue(token);
      expect(await controller.login({ user })).toEqual(token);
    });
  });
});
