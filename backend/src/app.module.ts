import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CoursesModule } from './modules/courses/courses.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { SubmissionsModule } from './modules/submissions/submissions.module';
import { GradesModule } from './modules/grades/grades.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
import { MaterialsModule } from 'src/modules/materials/materials.module';
import { EnrollmentsModule } from 'src/modules/enrollments/enrollments.module';
import { AttendanceModule } from 'src/modules/attendance/attendance.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    CoursesModule,
    LessonsModule,
    SubmissionsModule,
    GradesModule,
    UsersModule,
    MaterialsModule,
    EnrollmentsModule,
    AttendanceModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
