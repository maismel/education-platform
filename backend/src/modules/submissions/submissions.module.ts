import { Module } from "@nestjs/common";
import { SubmissionsController } from "src/modules/submissions/submissions.controller";
import { SubmissionsService } from "src/modules/submissions/submissions.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
})
export class SubmissionsModule {}
