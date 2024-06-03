import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthService {
	private readonly validEmail = 'admin@example.com';
	private readonly validPassword = 'password123';

	validateUser(req: Request, email: string, password: string): boolean {
		if (email === this.validEmail && password === this.validPassword) {
			req.session.isAuthenticated = true;
			return true;
		}
		throw new UnauthorizedException('Invalid credentials');
	}

	logout(req: Request): void {
		req.session.destroy((err) => {
			if (err) {
				throw new UnauthorizedException('Logout failed');
			}
		});
	}
}
