import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSubdivisionDto } from './dto/create-subdivision.dto';
import { Subdivision } from '../typeorm/entities/subdivision.entity';
import { Assessment } from '../typeorm/entities/assessment.entity';
import { Employee } from '../typeorm/entities/employee.entity';
import { getCurrentAssessment } from '../utils/getCurrentAssessment';

@Injectable()
export class SubdivisionService {
  constructor(
    @InjectRepository(Subdivision)
    private subdivisionRepository: Repository<Subdivision>,
    @InjectRepository(Assessment)
    private assessmentRepository: Repository<Assessment>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Subdivision[]> {
    const subdivisionsDto: Subdivision[] =
      await this.subdivisionRepository.find();
    const res: Subdivision[] = [];
    for (const item of subdivisionsDto) {
      const employeesInSubdivision: Employee[] =
        await this.employeeRepository.findBy({
          subdivisionId: item.id,
        });
      const assessment: Assessment[] = [];
      for (const item of employeesInSubdivision) {
        const assessmentDto: Assessment[] =
          await this.assessmentRepository.findBy({
            idToEmployee: item.id,
          });
        assessmentDto.forEach((item) => assessment.push(item));
      }
      res.push({
        ...item,
        assessment,
        assessmentsCount: assessment.length,
        subdivisionCurrentAssessment: getCurrentAssessment(assessment),
      });
    }
    return res;
  }

  async findOne(id: number): Promise<Subdivision> {
    const subdivisionDto = await this.subdivisionRepository.findOneBy({ id });
    const employeesInSubdivision: Employee[] =
      await this.employeeRepository.findBy({
        subdivisionId: subdivisionDto.id,
      });
    const assessment: Assessment[] = [];
    for (const item of employeesInSubdivision) {
      const assessmentDto: Assessment[] =
        await this.assessmentRepository.findBy({
          idToEmployee: item.id,
        });
      assessmentDto.forEach((item) => assessment.push(item));
    }
    return {
      ...subdivisionDto,
      assessment,
      assessmentsCount: assessment.length,
      subdivisionCurrentAssessment: getCurrentAssessment(assessment),
    };
  }

  async create(subdivisionDto: CreateSubdivisionDto): Promise<Subdivision> {
    const newSubdivision = await this.subdivisionRepository.create(
      subdivisionDto,
    );
    return await this.subdivisionRepository.save(newSubdivision);
  }

  async remove(id: number): Promise<DeleteResult> {
    const subdivision = await this.subdivisionRepository.findOneBy({ id });
    if (!subdivision) {
      throw new HttpException(
        'Subdivision not found. Cannot delete subdivision.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.subdivisionRepository.delete(id);
  }

  async update(
    id: number,
    subdivisionDto: CreateSubdivisionDto,
  ): Promise<UpdateResult> {
    const subdivision = await this.subdivisionRepository.findOneBy({ id });
    if (!subdivision) {
      throw new HttpException(
        'Subdivision not found. Cannot update subdivision.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.subdivisionRepository.update(id, subdivisionDto);
  }
}
