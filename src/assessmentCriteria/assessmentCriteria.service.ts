import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Assessment } from '../typeorm/entities/assessment.entity';
import { CreateAssessmentCriteriaDto } from './dto/create-assessmentCriteria.dto';
import { AssessmentCriteria } from '../typeorm/entities/assessmentCriteria.entity';

@Injectable()
export class AssessmentCriteriaService {
  constructor(
    @InjectRepository(Assessment)
    private assessmentCriteriaRepository: Repository<AssessmentCriteria>,
  ) {}

  findAll(): Promise<AssessmentCriteria[]> {
    return this.assessmentCriteriaRepository.find();
  }

  findOne(id: number): Promise<AssessmentCriteria> {
    return this.assessmentCriteriaRepository.findOneBy({ id });
  }

  async create(
    assessmentCriteriaDto: CreateAssessmentCriteriaDto,
  ): Promise<AssessmentCriteria> {
    const newAssessmentCriteria =
      await this.assessmentCriteriaRepository.create(assessmentCriteriaDto);
    return await this.assessmentCriteriaRepository.save(newAssessmentCriteria);
  }

  async remove(id: number): Promise<DeleteResult> {
    const assessment = await this.assessmentCriteriaRepository.findOneBy({
      id,
    });
    if (!assessment) {
      throw new HttpException(
        'assessmentCriteria not found. Cannot delete assessmentCriteria.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.assessmentCriteriaRepository.delete(id);
  }

  async update(
    id: number,
    assessmentCriteriaDto: CreateAssessmentCriteriaDto,
  ): Promise<UpdateResult> {
    const assessmentCriteria =
      await this.assessmentCriteriaRepository.findOneBy({
        id,
      });
    if (!assessmentCriteria) {
      throw new HttpException(
        'AssessmentCriteria not found. Cannot update assessmentCriteria.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.assessmentCriteriaRepository.update(
      id,
      assessmentCriteriaDto,
    );
  }
}
