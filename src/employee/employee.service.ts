import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Employee } from '../typeorm/entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Subdivision } from '../typeorm/entities/subdivision.entity';
import { Assessment } from '../typeorm/entities/assessment.entity';
import { getCurrentAssessment } from '../utils/getCurrentAssessment';
import { SubdivisionService } from '../subdivision/subdivision.service';
import { getAverageCriteria } from '../utils/getAverageCriteria';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private usersRepository: Repository<Employee>,
    @InjectRepository(Subdivision)
    private subdivisionRepository: Repository<Subdivision>,
    @InjectRepository(Assessment)
    private assessmentRepository: Repository<Assessment>,
    private subdivisionService: SubdivisionService,
  ) {}

  async findAll(): Promise<Employee[]> {
    const employees: Employee[] = await this.usersRepository.find();
    const res: Employee[] = [];
    for (const item of employees) {
      const a = await this.findOne(item.id);
      res.push(a);
    }
    return res;
  }

  async findOne(id: number): Promise<Employee> {
    const employeeDto: Employee = await this.usersRepository.findOneBy({ id });

    if (!employeeDto) {
      throw new HttpException(
        'Employee not found. Cannot get employee.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const assessmentDto: Assessment[] = await this.assessmentRepository.findBy({
      idToEmployee: id,
    });

    const subdivisionDto: Subdivision = await this.subdivisionService.findOne(
      employeeDto.subdivisionId,
    );

    const lastAssArray = assessmentDto.slice().splice(assessmentDto.length - 1);

    employeeDto.password = undefined;
    employeeDto.subdivisionId = undefined;
    employeeDto.lastAssessment = getCurrentAssessment(lastAssArray);

    return {
      ...employeeDto,
      subdivision: subdivisionDto,
      assessment: assessmentDto,
      assessmentsCount: assessmentDto.length,
      employeeCurrentAssessment: getCurrentAssessment(assessmentDto),
      averageRespect: getAverageCriteria(
        assessmentDto.map((item) => item.respect),
      ),
      averageResultWork: getAverageCriteria(
        assessmentDto.map((item) => item.resultWork),
      ),
      averageQualityWork: getAverageCriteria(
        assessmentDto.map((item) => item.qualityWork),
      ),
      averageTeamWork: getAverageCriteria(
        assessmentDto.map((item) => item.teamWork),
      ),
      averageInformation: getAverageCriteria(
        assessmentDto.map((item) => item.information),
      ),
      averageSpeed: getAverageCriteria(assessmentDto.map((item) => item.speed)),
    };
  }

  async create(employeeDto: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = await this.usersRepository.create({
      ...employeeDto,
      createdAt: new Date(),
    });
    return await this.usersRepository.save(newEmployee);
  }

  async remove(id: number): Promise<DeleteResult> {
    const employee = await this.usersRepository.findOneBy({ id });
    if (!employee) {
      throw new HttpException(
        'Employee not found. Cannot delete employee.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.usersRepository.delete(id);
  }

  async update(
    id: number,
    employeeDto: CreateEmployeeDto,
  ): Promise<UpdateResult> {
    const employee = await this.usersRepository.findOneBy({ id });
    if (!employee) {
      throw new HttpException(
        'Employee not found. Cannot update employee.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.usersRepository.update(id, employeeDto);
  }
}
