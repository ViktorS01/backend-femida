import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('assessment')
export class AssessmentController {
  constructor(private assessmentService: AssessmentService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.assessmentService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.assessmentService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() assessment: CreateAssessmentDto) {
    this.assessmentService.create(assessment);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    this.assessmentService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Body() assessment: CreateAssessmentDto, @Param('id') id: number) {
    this.assessmentService.update(id, assessment);
  }
}
