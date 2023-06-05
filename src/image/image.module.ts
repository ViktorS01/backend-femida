import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../typeorm/entities/employee.entity';
import { SubdivisionService } from '../subdivision/subdivision.service';
import { Subdivision } from '../typeorm/entities/subdivision.entity';
import { Assessment } from '../typeorm/entities/assessment.entity';
import { AssessmentService } from '../assessment/assessment.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Subdivision, Assessment]),
    MulterModule.register({
      dest: './files',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
      serveStaticOptions: {
        index: false,
      },
    }),
  ],
  exports: [TypeOrmModule],
  providers: [
    ImageService,
    EmployeeService,
    SubdivisionService,
    AssessmentService,
    UsersService,
  ],
  controllers: [ImageController],
})
export class ImageModule {}
