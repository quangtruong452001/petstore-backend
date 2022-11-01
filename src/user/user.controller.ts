import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

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
