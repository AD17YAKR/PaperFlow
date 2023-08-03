import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('details')
  @UseGuards(AuthGuard())
  async findUserById(@Req() req: any) {
    return this.userService.findUserById(req.user._id);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  async getAllUsers(@Req() req: any) {
    return this.userService.getAllUsers(req.user._id);
  }
}
