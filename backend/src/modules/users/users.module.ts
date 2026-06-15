import { Module } from "@nestjs/common";
import { UsersController } from "src/modules/users/users.controller";
import { UsersService } from "src/modules/users/users.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
