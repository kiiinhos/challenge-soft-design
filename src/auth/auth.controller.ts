import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }
    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 201, description: 'Succeful login' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiTags('Login')
    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}