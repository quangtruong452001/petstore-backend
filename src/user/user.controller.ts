import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@Controller('users')
export class UserController {
  // ** GET /users/me
  // ** UseGuards will run before it goes into Route Handler
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: { id: string; email: string }) {
    return user;
  }
}
