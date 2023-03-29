import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subdivision } from '../typeorm/entities/subdivision.entity';
import { SubdivisionService } from './subdivision.service';
import { SubdivisionController } from './subdivision.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subdivision])],
  exports: [TypeOrmModule],
  providers: [SubdivisionService],
  controllers: [SubdivisionController],
})
export class SubdivisionModule {}
