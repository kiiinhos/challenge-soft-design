import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/auth/local.auth';
import { JwtModule } from '@nestjs/jwt';


describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'local' }),
        JwtModule.register({
          secret: 'mySecret',
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return a JWT token when login is successful', async () => {
      const user = { username: 'test', password: 'test' };
      jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
      jest.spyOn(authService, 'login').mockResolvedValue({ access_token: 'jwt-token' });

      const req = { user };
      const result = await controller.login(req);

      expect(result).toEqual({ access_token: 'jwt-token' });
    });
  });
});
