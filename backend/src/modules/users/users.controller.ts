import { Body, Controller, Get, Param, Patch, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from 'src/modules/users/dto/update-profile.dto';
import { UsersService } from 'src/modules/users/users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  me(@Req() req: any) {
    return this.usersService.getById(req.user.id);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }
  @Patch('me')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, cb) => {
          const unique = randomUUID();
          const ext = extname(file.originalname);
          cb(null, `${unique}${ext}`);
        },
      }),
    }),
  )
  updateMe(
    @CurrentUser() user: { id: string },
    @Body() dto: UpdateProfileDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.usersService.updateProfile(user.id, dto, avatar);
  }
}
