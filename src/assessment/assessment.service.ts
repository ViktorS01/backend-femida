import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Assessment } from '../typeorm/entities/assessment.entity';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UsersService } from '../users/users.service';
import { groupAssessmentsByMonth } from 'src/utils/groupAssessmentsByMonth';
import { getCriteriaCoefficient } from 'src/utils/getCriteriaCoefficient';
import { EmployeeService } from '../employee/employee.service';
import {
  AssessmentsFromSubdivision,
  HalfYearAssessmentListDTO,
} from './dto/types';
import { getCurrentAssessment } from '../utils/getCurrentAssessment';
import { SubdivisionService } from '../subdivision/subdivision.service';

@Injectable()
export class AssessmentService {
  constructor(
    @InjectRepository(Assessment)
    private assessmentRepository: Repository<Assessment>,
    private usersService: UsersService,
    private employeeService: EmployeeService,
    private subdivisionService: SubdivisionService,
  ) {}

  findAll(): Promise<Assessment[]> {
    return this.assessmentRepository.find();
  }

  findOne(id: number): Promise<Assessment> {
    return this.assessmentRepository.findOneBy({ id });
  }

  async findHalfYearAssessments(
    id: number,
    criteria = 1,
    entity: 'employee' | 'subdivision',
  ): Promise<HalfYearAssessmentListDTO[]> {
    let assessments: Assessment[];
    if (entity === 'employee') {
      assessments = await this.assessmentRepository.findBy({
        idToEmployee: id,
      });
    } else {
      assessments = await this.assessmentRepository.findBy({
        idToSubdivision: id,
      });
    }

    const halfYear = (1000 * 60 * 60 * 24 * 365.25) / 2;

    const halfYearAssessments: Assessment[] = assessments.filter(
      (assessment) => halfYear > +new Date() - +new Date(assessment.createdAt),
    );

    const groupedAssessments = groupAssessmentsByMonth(halfYearAssessments);
    const criteriaCoefficient = getCriteriaCoefficient(
      groupedAssessments,
      criteria,
    ).reverse();

    return criteriaCoefficient.map((item, index, arr) => {
      const buff = arr[index - 1]?.customerOrientationCoefficient || 0;

      return {
        ...item,
        delta: item.customerOrientationCoefficient >= buff ? 'up' : 'down',
      };
    });
  }

  async findFunctionAssessmentList(username: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user?.userId) {
      throw new HttpException(
        'User not found. Cannot get user.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const assessments: Assessment[] = await this.assessmentRepository.findBy({
      idToEmployee: user.userId,
    });

    let fromSubdivisionId: number[] = [];
    assessments.forEach((item) => {
      fromSubdivisionId.push(item.idFromSubdivision);
    });
    fromSubdivisionId = [...new Set(fromSubdivisionId)];

    const assessmentsFromSubdivisionArray: AssessmentsFromSubdivision[] = [];

    for (const subId of fromSubdivisionId) {
      const ass: Assessment[] = assessments.filter((item) => {
        return item.idFromSubdivision === subId;
      });
      if (ass.length) {
        const currentSubdivision = await this.subdivisionService.findOne(
          ass[0].idFromSubdivision,
        );
        assessmentsFromSubdivisionArray.push({
          name: currentSubdivision.name,
          value: getCurrentAssessment(ass),
        });
      }
    }

    return assessmentsFromSubdivisionArray;
  }

  async create(
    assessmentDto: CreateAssessmentDto,
    username: string,
  ): Promise<Assessment> {
    const user = await this.usersService.findOne(username);

    if (!user?.userId) {
      throw new HttpException(
        'User not found. Cannot get user.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const fromEmployee = await this.employeeService.findOne(user.userId);

    const toEmployee = await this.employeeService.findOne(
      assessmentDto.idToEmployee,
    );

    const newAssessment = await this.assessmentRepository.create({
      ...assessmentDto,
      idFromEmployee: user.userId,
      createdAt: new Date(),
      idFromSubdivision: fromEmployee.subdivision.id,
      idToSubdivision: toEmployee.subdivision.id,
    });

    return await this.assessmentRepository.save(newAssessment);
  }

  async remove(id: number): Promise<DeleteResult> {
    const assessment = await this.assessmentRepository.findOneBy({ id });
    if (!assessment) {
      throw new HttpException(
        'Assessment not found. Cannot delete assessment.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.assessmentRepository.delete(id);
  }

  async update(
    id: number,
    assessmentDto: CreateAssessmentDto,
  ): Promise<UpdateResult> {
    const assessment = await this.assessmentRepository.findOneBy({ id });
    if (!assessment) {
      throw new HttpException(
        'Assessment not found. Cannot update assessment.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.assessmentRepository.update(id, assessmentDto);
  }
}
