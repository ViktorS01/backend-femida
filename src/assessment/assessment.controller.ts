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
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Entity } from './dto/types';

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
  @Get('/function/subdivision')
  getFunctionAssessmentList(@Request() req) {
    return this.assessmentService.findFunctionAssessmentList(req.user.username);
  }

  @UseGuards(AuthGuard)
  @Get('/employee/:id')
  getEmployeeHalfYearAssessments(
    @Param('id') id: number,
    @Query('criteria') criteria: number,
  ) {
    return this.assessmentService.findHalfYearAssessments(
      id,
      criteria,
      'employee',
    );
  }

  @UseGuards(AuthGuard)
  @Get('/subdivision/:id')
  getSubdivisionHalfYearAssessments(
    @Param('id') id: number,
    @Query('criteria') criteria: number,
  ) {
    return this.assessmentService.findHalfYearAssessments(
      id,
      criteria,
      'subdivision',
    );
  }

  @UseGuards(AuthGuard)
  @Get('/comments/:id')
  getComments(@Param('id') id: number, @Query('entity') entity: Entity) {
    return this.assessmentService.getCommentsById(id, entity);
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() assessment: CreateAssessmentDto, @Request() req) {
    this.assessmentService.create(assessment, req.user.username);
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
