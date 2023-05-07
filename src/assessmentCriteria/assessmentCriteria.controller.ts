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
import { AuthGuard } from '../auth/auth.guard';
import { CreateAssessmentCriteriaDto } from './dto/create-assessmentCriteria.dto';
import { AssessmentCriteriaService } from './assessmentCriteria.service';

@Controller('assessmentsCriteria')
export class AssessmentCriteriaController {
  constructor(private assessmentCriteriaService: AssessmentCriteriaService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.assessmentCriteriaService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.assessmentCriteriaService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() assessmentCriteria: CreateAssessmentCriteriaDto) {
    this.assessmentCriteriaService.create(assessmentCriteria);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    this.assessmentCriteriaService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Body() assessmentCriteria: CreateAssessmentCriteriaDto,
    @Param('id') id: number,
  ) {
    this.assessmentCriteriaService.update(id, assessmentCriteria);
  }
}
