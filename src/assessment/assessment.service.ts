import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Assessment } from '../typeorm/entities/assessment.entity';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { getCurrentAssessment } from '../utils/getCurrentAssessment';
import { UsersService } from '../users/users.service';

@Injectable()
export class AssessmentService {
  constructor(
    @InjectRepository(Assessment)
    private assessmentRepository: Repository<Assessment>,
    private usersService: UsersService,
  ) {}

  findAll(): Promise<Assessment[]> {
    return this.assessmentRepository.find();
  }

  findOne(id: number): Promise<Assessment> {
    return this.assessmentRepository.findOneBy({ id });
  }

  async findHalfYearAssessments(
    id: number,
    criteria: number,
    entity: 'employee' | 'subdivision',
  ): Promise<any> {
    if (entity === 'employee') {
      const assessments: Assessment[] = await this.assessmentRepository.findBy({
        idToEmployee: id,
      });
      if (criteria === 1) {
        if (assessments.length) {
          // вернул среднее за все время
          // а нужно вернуть среднее за каждый месяц
          // написать функцию подсчета средних за каждый месяц, за последнее полугодие
          // assessments[0].createdAt - Date
          // отсортировать оценки по месяцам и уже внутри каждого месяца посчитать среднее
          // вернуть HalfYearAssessmentListDTO[]
          // ОКП - 1,
          // Скорость - 2,
          // Надежн. информации - 3,
          // Качество работы - 4,
          // Результат работы - 5,
          // Командная работа - 6,
          // Уважение и этика - 7
          const res = getCurrentAssessment(assessments);
          console.log(res);
        }
      }
      return `${id} ${criteria} ${entity}`;
    }
    return `${id} ${criteria} ${entity}`;
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

    const newAssessment = await this.assessmentRepository.create({
      ...assessmentDto,
      idFromEmployee: user.userId,
      createdAt: new Date(),
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
