import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	login(@Req() req: Request, @Body() body: { email: string; password: string }) {
		const { email, password } = body;
		this.authService.validateUser(req, email, password);
		return { message: 'Logged in' };
	}

	@Post('logout')
	logout(@Req() req: Request, @Res() res: Response) {
		this.authService.logout(req);
		res.send({ message: 'Logged out' });
	}
}
