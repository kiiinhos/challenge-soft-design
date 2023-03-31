import { LocalStrategy } from 'src/auth/local.auth';
import { AuthService } from 'src/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    localStrategy = new LocalStrategy(authService);
  });

  describe('validate', () => {
    it('should return a user object when given valid credentials', async () => {
      const mockUser = { username: 'test', password: 'password' };
      jest.spyOn(authService, 'validateUser').mockResolvedValue(mockUser);

      const result = await localStrategy.validate(mockUser.username, mockUser.password);

      expect(result).toEqual(mockUser);
    });

    it('should throw an UnauthorizedException when given invalid credentials', async () => {
      const mockUser = { username: 'test', password: 'password' };
      jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

      await expect(localStrategy.validate(mockUser.username, mockUser.password)).rejects.toThrow(UnauthorizedException);
    });
  });
});
